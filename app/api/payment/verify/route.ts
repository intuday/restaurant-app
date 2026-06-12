// app/api/payment/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../../lib/firebase-admin"; // Fixed path
import { FieldValue } from "firebase-admin/firestore";
import { verifyPaymentSignature } from "../../../../lib/razorpay"; // Fixed path

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    const {
      razorpayOrderId,    // From Razorpay checkout response (Online Only)
      razorpayPaymentId,  // From Razorpay checkout response (Online Only)
      razorpaySignature,  // From Razorpay checkout response (Online Only)
    } = body;

    // Frontend agar orderData bheje ya orderDetails, dono support honge
    const rawOrderData = body.orderData || body.orderDetails;

    // Payload verification
    if (!rawOrderData) {
      return NextResponse.json(
        { success: false, error: "Order data or details are required to save the order." },
        { status: 400 }
      );
    }

    // Keys mismatch ko handle karne ke liye fallbacks
    const totalAmount = Number(rawOrderData.total || rawOrderData.totalAmount || 0);
    const itemsArray = rawOrderData.items || [];
    const currentUserId = rawOrderData.userId || "";

    // Strictly Validate crucial parameters
    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid order total. Total must be greater than 0." },
        { status: 400 }
      );
    }

    if (!itemsArray || itemsArray.length === 0) {
      return NextResponse.json(
        { success: false, error: "Order must contain at least one item." },
        { status: 400 }
      );
    }

    if (!currentUserId) {
      return NextResponse.json(
        { success: false, error: "User authentication required." },
        { status: 401 }
      );
    }

    // ─────────────────────────────────────────────────────────────────
    // CHECK METHOD: Automatic Online vs Offline Detection 
    // ─────────────────────────────────────────────────────────────────
    const isOfflineMode = !razorpayOrderId || !razorpaySignature;
    const currentMethod = rawOrderData.paymentMethod || (isOfflineMode ? "CASH_ON_TABLE" : "ONLINE");

    const finalOrderId = razorpayOrderId || `offline_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
    const finalPaymentId = razorpayPaymentId || "CASH_ON_TABLE_PENDING";

    if (!isOfflineMode) {
      // ONLINE PAYMENT: Signature Check Verification Mandatory
      if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
        return NextResponse.json(
          { success: false, error: "Missing online payment validation tokens." },
          { status: 400 }
        );
      }

      const isSignatureValid = verifyPaymentSignature(
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature
      );

      if (!isSignatureValid) {
        console.error("🚨 SECURITY ALERT: Invalid payment signature received!");
        return NextResponse.json(
          { success: false, error: "Payment verification failed. Signature invalid." },
          { status: 400 }
        );
      }

      // Idempotency check for duplicate clicks (Online Orders)
      const existingOrderQuery = await adminDb
        .collection("orders")
        .where("razorpayOrderId", "==", razorpayOrderId)
        .limit(1)
        .get();

      if (!existingOrderQuery.empty) {
        return NextResponse.json(
          {
            success: true,
            orderId: existingOrderQuery.docs[0].id,
            message: "Order already processed successfully.",
          },
          { status: 200 }
        );
      }
    }

    // ─────────────────────────────────────────────────────────────────
    // PREPARE THE FINAL DOCUMENT FOR FIRESTORE (Strict Types)
    // ─────────────────────────────────────────────────────────────────
    const completeOrderRecord: Record<string, unknown> = {
      ...rawOrderData,
      paymentMethod: currentMethod,
      razorpayOrderId: finalOrderId,
      razorpayPaymentId: finalPaymentId,
      paymentStatus: isOfflineMode ? "Pending" : "Paid",
      orderStatus: "Confirmed",
      status: rawOrderData.status || "pending", // 🔥 Ensure default fallback value status (lowercase) always matches
      createdAt: Date.now(), // 🔥 FIX: ISO String hata kar Number Milliseconds dala jo Admin dashboard easily read and mathematical sort kar sake
    };

    // Save order to Firestore via Admin SDK
    const orderRef = await adminDb.collection("orders").add({
      ...completeOrderRecord,
      serverCreatedAt: FieldValue.serverTimestamp(),
    });

    console.log(`✅ Order [${currentMethod}] saved successfully:`, orderRef.id);

    return NextResponse.json(
      {
        success: true,
        orderId: orderRef.id,
        message: isOfflineMode 
          ? "Order placed successfully via Cash on Table! 📲" 
          : "Payment verified and order placed successfully! 🎉",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Order verification crash:", error);
    return NextResponse.json(
      { success: false, error: "Payment verification failed due to a server error." },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}