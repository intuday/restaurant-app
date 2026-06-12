// app/api/payment/webhook/route.ts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// API Route: POST /api/payment/webhook
//
// PURPOSE:
// Handles Razorpay webhook events for reliable payment confirmation.
// Webhooks are server-to-server calls - more reliable than frontend callbacks.
// Even if user closes browser, webhook ensures payment is recorded.
//
// SETUP IN RAZORPAY DASHBOARD:
// → Settings → Webhooks → Add Webhook
// → URL: https://yourdomain.com/api/payment/webhook
// → Events: payment.captured, payment.failed, order.paid
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { FieldValue } from "firebase-admin/firestore";

// ─────────────────────────────────────────────────────────────────────────
// Razorpay Webhook Event Types
// ─────────────────────────────────────────────────────────────────────────
interface RazorpayWebhookPayload {
  entity: string;
  account_id: string;
  event: string;
  contains: string[];
  payload: {
    payment?: {
      entity: {
        id: string;               // Payment ID
        order_id: string;         // Associated order ID
        amount: number;           // Amount in paise
        currency: string;
        status: string;           // "captured", "failed", etc.
        method: string;           // "upi", "card", "netbanking"
        email: string;
        contact: string;
        notes: Record<string, string>;
        error_code?: string;
        error_description?: string;
      };
    };
    order?: {
      entity: {
        id: string;
        amount: number;
        status: string;
        receipt: string;
      };
    };
  };
}

// ─────────────────────────────────────────────────────────────────────────
// POST /api/payment/webhook
// ─────────────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // ─────────────────────────────────────────────────────────────────
    // STEP 1: Get raw body and signature header
    // IMPORTANT: Use request.text() not request.json() 
    // Signature verification needs the EXACT raw body string
    // ─────────────────────────────────────────────────────────────────
    const rawBody = await request.text();

    // Razorpay sends signature in this header
    const webhookSignature = request.headers.get("x-razorpay-signature");

    if (!webhookSignature) {
      console.error("🚨 Webhook received without signature header");
      return NextResponse.json(
        { error: "Missing webhook signature" },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────────────────────────
    // STEP 2: Verify webhook signature
    // This ensures the webhook is from Razorpay, not an impersonator
    // ─────────────────────────────────────────────────────────────────
    const isValid = verifyWebhookSignature(rawBody, webhookSignature);

    if (!isValid) {
      console.error("🚨 Invalid webhook signature - possible security breach");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────────────────────────
    // STEP 3: Parse the webhook payload
    // ─────────────────────────────────────────────────────────────────
    const webhookData: RazorpayWebhookPayload = JSON.parse(rawBody);
    const { event, payload } = webhookData;

    console.log("📨 Webhook received:", event);

    // ─────────────────────────────────────────────────────────────────
    // STEP 4: Handle different webhook events
    // ─────────────────────────────────────────────────────────────────
    switch (event) {

      // ─────────────────────────────────────────────────────────────
      // payment.captured: Payment was successful
      // ─────────────────────────────────────────────────────────────
      case "payment.captured": {
        const payment = payload.payment?.entity;
        if (!payment) break;

        // Update order in Firestore if it exists
        const ordersQuery = await adminDb
          .collection("orders")
          .where("razorpayOrderId", "==", payment.order_id)
          .limit(1)
          .get();

        if (!ordersQuery.empty) {
          const orderDoc = ordersQuery.docs[0];
          await orderDoc.ref.update({
            paymentStatus: "Paid",
            razorpayPaymentId: payment.id,
            orderStatus: "Confirmed",
            webhookConfirmedAt: FieldValue.serverTimestamp(),
          });
          console.log("✅ Payment captured, order updated:", orderDoc.id);
        }
        break;
      }

      // ─────────────────────────────────────────────────────────────
      // payment.failed: Payment attempt failed
      // ─────────────────────────────────────────────────────────────
      case "payment.failed": {
        const payment = payload.payment?.entity;
        if (!payment) break;

        const ordersQuery = await adminDb
          .collection("orders")
          .where("razorpayOrderId", "==", payment.order_id)
          .limit(1)
          .get();

        if (!ordersQuery.empty) {
          const orderDoc = ordersQuery.docs[0];
          await orderDoc.ref.update({
            paymentStatus: "Failed",
            orderStatus: "Cancelled",
            failureReason: payment.error_description || "Payment failed",
            webhookUpdatedAt: FieldValue.serverTimestamp(),
          });
          console.log("❌ Payment failed, order updated:", orderDoc.id);
        }
        break;
      }

      // ─────────────────────────────────────────────────────────────
      // order.paid: Order was fully paid (all partial payments done)
      // ─────────────────────────────────────────────────────────────
      case "order.paid": {
        console.log("✅ Order fully paid:", payload.order?.entity?.id);
        break;
      }

      // Log unhandled events
      default:
        console.log("ℹ️ Unhandled webhook event:", event);
    }

    // ─────────────────────────────────────────────────────────────────
    // STEP 5: Return 200 to acknowledge webhook receipt
    // Razorpay will retry if we don't return 200
    // ─────────────────────────────────────────────────────────────────
    return NextResponse.json(
      { received: true },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Webhook processing error:", error);

    // Still return 200 to prevent Razorpay from retrying on our parsing errors
    // Change to 500 only if you want retries
    return NextResponse.json(
      { received: true, error: "Processing error" },
      { status: 200 }
    );
  }
}