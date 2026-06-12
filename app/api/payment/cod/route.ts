// app/api/payment/cod/route.ts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// API Route: POST /api/payment/cod
//
// PURPOSE:
// Handles Cash on Delivery orders.
// No Razorpay involved - directly saves order to Firestore.
// paymentStatus = "Pending" (payment collected at delivery)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import type { CODOrderRequest, CODOrderResponse, FirestoreOrder } from "@/types/payment";

// ─────────────────────────────────────────────────────────────────────────
// POST /api/payment/cod - Save COD order to Firestore
// ─────────────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // ─────────────────────────────────────────────────────────────────
    // STEP 1: Parse request body
    // ─────────────────────────────────────────────────────────────────
    const body: CODOrderRequest = await request.json();
    const { orderData } = body;

    // ─────────────────────────────────────────────────────────────────
    // STEP 2: Validate order data
    // ─────────────────────────────────────────────────────────────────

    if (!orderData) {
      return NextResponse.json<CODOrderResponse>(
        { success: false, error: "Order data is required." },
        { status: 400 }
      );
    }

    // Check required fields
    if (!orderData.userId) {
      return NextResponse.json<CODOrderResponse>(
        { success: false, error: "User authentication required." },
        { status: 401 }
      );
    }

    if (!orderData.items || orderData.items.length === 0) {
      return NextResponse.json<CODOrderResponse>(
        { success: false, error: "Order must contain at least one item." },
        { status: 400 }
      );
    }

    if (!orderData.total || orderData.total <= 0) {
      return NextResponse.json<CODOrderResponse>(
        { success: false, error: "Invalid order total." },
        { status: 400 }
      );
    }

    if (!orderData.customerName || orderData.customerName.trim().length < 2) {
      return NextResponse.json<CODOrderResponse>(
        { success: false, error: "Valid customer name is required." },
        { status: 400 }
      );
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!orderData.phone || !phoneRegex.test(orderData.phone)) {
      return NextResponse.json<CODOrderResponse>(
        { success: false, error: "Valid phone number is required." },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────────────────────────
    // STEP 3: Prepare COD order document
    // For COD: paymentStatus = "Pending", no Razorpay IDs
    // ─────────────────────────────────────────────────────────────────
    const codOrder: FirestoreOrder = {
      // Customer info
      userId: orderData.userId,
      customerName: orderData.customerName.trim(),
      phone: orderData.phone,
      tableNumber: orderData.tableNumber || "Takeaway",

      // Order items
      items: orderData.items,
      subtotal: orderData.subtotal,
      tax: orderData.tax,
      total: orderData.total,

      // Payment info - COD specific
      paymentMethod: "COD",
      paymentStatus: "Pending",      // Will be collected at delivery

      // No Razorpay IDs for COD
      razorpayOrderId: "",
      razorpayPaymentId: "",

      // Order status
      orderStatus: "Confirmed",      // Order confirmed immediately

      // Timestamp (server-generated)
      createdAt: new Date().toISOString(),

      // Optional fields
      specialInstructions: orderData.specialInstructions || "",
    };

    // ─────────────────────────────────────────────────────────────────
    // STEP 4: Save to Firestore
    // ─────────────────────────────────────────────────────────────────
    const orderRef = await adminDb.collection("orders").add({
      ...codOrder,
      // Server-side timestamp for accurate ordering
      serverCreatedAt: FieldValue.serverTimestamp(),
    });

    console.log("✅ COD Order saved:", {
      firestoreId: orderRef.id,
      userId: orderData.userId,
      total: orderData.total,
    });

    // ─────────────────────────────────────────────────────────────────
    // STEP 5: Return success
    // ─────────────────────────────────────────────────────────────────
    return NextResponse.json<CODOrderResponse>(
      {
        success: true,
        orderId: orderRef.id,
        message: "Order placed successfully! Please pay when food arrives. 🍽️",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ COD order creation error:", error);

    return NextResponse.json<CODOrderResponse>(
      {
        success: false,
        error: "Failed to place order. Please try again.",
      },
      { status: 500 }
    );
  }
}