// // // import { NextResponse } from 'next/server';
// // // import Razorpay from 'razorpay';

// // // const razorpay = new Razorpay({
// // //   key_id: process.env.RAZORPAY_KEY_ID!,
// // //   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// // // });

// // // export async function POST(req: Request) {
// // //   try {
// // //     const { amount } = await req.json();

// // //     const options = {
// // //       amount: Math.round(amount * 100), // convert to paise
// // //       currency: 'INR',
// // //       receipt: `receipt_${Date.now()}`,
// // //     };

// // //     const order = await razorpay.orders.create(options);
// // //     return NextResponse.json(order);
// // //   } catch (error: unknown) {
// // //     console.error('Order creation failure:', error);
// // //     const message = error instanceof Error ? error.message : 'Internal Server Error';
// // //     return NextResponse.json({ error: message }, { status: 500 });
// // //   }
// // // }
// // // app/api/payment/create-order/route.ts
// // // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// // // API Route: POST /api/payment/create-order
// // //
// // // PURPOSE:
// // // Creates a Razorpay order on the server side.
// // // This MUST be done server-side because:
// // // 1. Key Secret must never be exposed to browser
// // // 2. Amount cannot be manipulated by user (server controls it)
// // // 3. Order creation is authenticated and logged
// // //
// // // FLOW:
// // // Frontend sends cart data → We create Razorpay order → Return order ID
// // // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// // // Next.js server-side request/response types
// // import { NextRequest, NextResponse } from "next/server";

// // // Our Razorpay utilities (server-side only)
// // import {
// //   razorpayInstance,
// //   convertToSmallestUnit,
// //   generateReceiptId,
// //   isTestMode,
// // } from "@/lib/razorpay";

// // // TypeScript interfaces
// // import type {
// //   CreateOrderRequest,
// //   CreateOrderResponse,
// // } from "@/types/payment";

// // // ─────────────────────────────────────────────────────────────────────────
// // // POST handler - only POST method is accepted for this route
// // // Next.js 15 App Router: export named functions matching HTTP methods
// // // ─────────────────────────────────────────────────────────────────────────
// // export async function POST(request: NextRequest): Promise<NextResponse> {
// //   try {
// //     // ─────────────────────────────────────────────────────────────────
// //     // STEP 1: Parse and validate incoming request body
// //     // ─────────────────────────────────────────────────────────────────
    
// //     // Parse JSON body from the request
// //     const body: CreateOrderRequest = await request.json();

// //     // Destructure all required fields from request
// //     const {
// //       amount,
// //       currency = "INR",  // Default to INR if not specified
// //       customerName,
// //       phone,
// //       email,
// //       notes,
// //     } = body;

// //     // ─────────────────────────────────────────────────────────────────
// //     // STEP 2: Input Validation
// //     // Validate all required fields before calling Razorpay
// //     // Never trust client-sent data without validation
// //     // ─────────────────────────────────────────────────────────────────

// //     // Amount validation
// //     if (!amount || typeof amount !== "number" || amount <= 0) {
// //       return NextResponse.json<CreateOrderResponse>(
// //         { success: false, error: "Invalid amount. Amount must be a positive number." },
// //         { status: 400 }  // 400 Bad Request
// //       );
// //     }

// //     // Minimum order amount check (Razorpay minimum is ₹1 = 100 paise)
// //     if (amount < 1) {
// //       return NextResponse.json<CreateOrderResponse>(
// //         { success: false, error: "Minimum order amount is ₹1." },
// //         { status: 400 }
// //       );
// //     }

// //     // Maximum amount check (optional business rule - e.g., ₹1,00,000)
// //     if (amount > 100000) {
// //       return NextResponse.json<CreateOrderResponse>(
// //         { success: false, error: "Maximum order amount is ₹1,00,000. Please contact us for large orders." },
// //         { status: 400 }
// //       );
// //     }

// //     // Customer name validation
// //     if (!customerName || typeof customerName !== "string" || customerName.trim().length < 2) {
// //       return NextResponse.json<CreateOrderResponse>(
// //         { success: false, error: "Valid customer name is required." },
// //         { status: 400 }
// //       );
// //     }

// //     // Phone validation - Indian phone numbers (10 digits)
// //     const phoneRegex = /^[6-9]\d{9}$/;
// //     if (!phone || !phoneRegex.test(phone.replace(/\s/g, ""))) {
// //       return NextResponse.json<CreateOrderResponse>(
// //         { success: false, error: "Valid 10-digit Indian phone number is required." },
// //         { status: 400 }
// //       );
// //     }

// //     // Currency validation
// //     const supportedCurrencies = ["INR"];
// //     if (!supportedCurrencies.includes(currency)) {
// //       return NextResponse.json<CreateOrderResponse>(
// //         { success: false, error: `Currency ${currency} is not supported. Use INR.` },
// //         { status: 400 }
// //       );
// //     }

// //     // ─────────────────────────────────────────────────────────────────
// //     // STEP 3: Convert amount to paise
// //     // Razorpay requires amount in smallest currency unit
// //     // INR: 1 Rupee = 100 Paise
// //     // Example: ₹250 → 25000 paise
// //     // ─────────────────────────────────────────────────────────────────
// //     const amountInPaise = convertToSmallestUnit(amount);

// //     // ─────────────────────────────────────────────────────────────────
// //     // STEP 4: Generate unique receipt ID
// //     // Receipt ID helps track orders in Razorpay dashboard
// //     // ─────────────────────────────────────────────────────────────────
// //     const receiptId = generateReceiptId();

// //     // ─────────────────────────────────────────────────────────────────
// //     // STEP 5: Create Razorpay Order via API
// //     // This calls Razorpay's server to create a payment order
// //     // Returns an order with unique order_id (e.g., order_XXXXXXXX)
// //     // ─────────────────────────────────────────────────────────────────
// //     const razorpayOrder = await razorpayInstance.orders.create({
// //       // Amount in paise (required by Razorpay)
// //       amount: amountInPaise,

// //       // Currency - INR for Indian Rupees
// //       currency: currency,

// //       // Unique receipt ID for this order (for your records)
// //       receipt: receiptId,

// //       // Notes are stored with the order in Razorpay dashboard
// //       // Useful for filtering and searching in dashboard
// //       notes: {
// //         customerName: customerName.trim(),
// //         phone: phone,
// //         email: email || "",
// //         environment: isTestMode() ? "test" : "production",
// //         ...notes,  // Spread any additional notes from request
// //       },

// //       // partial_payment: false means full amount must be paid
// //       // Set to true if you want to allow partial payments
// //       partial_payment: false,
// //     });

// //     // ─────────────────────────────────────────────────────────────────
// //     // STEP 6: Log for debugging (remove in production or use proper logger)
// //     // ─────────────────────────────────────────────────────────────────
// //     if (isTestMode()) {
// //       console.log("✅ Razorpay Test Order Created:", {
// //         orderId: razorpayOrder.id,
// //         amount: razorpayOrder.amount,
// //         currency: razorpayOrder.currency,
// //         receipt: razorpayOrder.receipt,
// //       });
// //     }

// //     // ─────────────────────────────────────────────────────────────────
// //     // STEP 7: Return success response
// //     // Frontend will use orderId to initialize Razorpay checkout
// //     // ─────────────────────────────────────────────────────────────────
// //     return NextResponse.json<CreateOrderResponse>(
// //       {
// //         success: true,
// //         orderId: razorpayOrder.id,          // e.g., "order_ABC123XYZ"
// //         amount: razorpayOrder.amount,        // Amount in paise
// //         currency: razorpayOrder.currency,    // "INR"
// //       },
// //       { status: 200 }
// //     );

// //   } catch (error) {
// //     // ─────────────────────────────────────────────────────────────────
// //     // ERROR HANDLING
// //     // Razorpay SDK errors have a specific structure
// //     // ─────────────────────────────────────────────────────────────────

// //     // Log error for debugging (use proper logging service in production)
// //     console.error("❌ Razorpay order creation failed:", error);

// //     // Check if it's a Razorpay API error (has specific error structure)
// //     if (error && typeof error === "object" && "error" in error) {
// //       const razorpayError = error as {
// //         error: {
// //           code: string;
// //           description: string;
// //           reason: string;
// //         };
// //       };

// //       return NextResponse.json<CreateOrderResponse>(
// //         {
// //           success: false,
// //           error: razorpayError.error.description || "Payment service error. Please try again.",
// //         },
// //         { status: 502 }  // 502 Bad Gateway (upstream service failed)
// //       );
// //     }

// //     // Generic error response (don't expose internal details to client)
// //     return NextResponse.json<CreateOrderResponse>(
// //       {
// //         success: false,
// //         error: "Failed to create payment order. Please try again.",
// //       },
// //       { status: 500 }  // 500 Internal Server Error
// //     );
// //   }
// // }

// // // ─────────────────────────────────────────────────────────────────────────
// // // Reject non-POST requests with 405 Method Not Allowed
// // // ─────────────────────────────────────────────────────────────────────────
// // export async function GET(): Promise<NextResponse> {
// //   return NextResponse.json(
// //     { error: "Method not allowed. Use POST." },
// //     { status: 405 }
// //   );
// // }
// // app/api/payment/create-order/route.ts
// // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// // API Route: POST /api/payment/create-order
// // PURPOSE: Creates a Razorpay order on the server side.
// // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// import { NextRequest, NextResponse } from "next/server";

// //  FIXED: `@/` alias ko hata kar direct relative path de diya hai
// import {
//   razorpayInstance,
//   convertToSmallestUnit,
//   generateReceiptId,
//   isTestMode,
// } from "@/lib/razorpay"; // 👈 Ye relative path hi rakhna Turbopack ke liye

// // TypeScript interfaces
// import type {
//   CreateOrderRequest,
//   CreateOrderResponse,
// } from "@/types/payment";

// export async function POST(request: NextRequest): Promise<NextResponse> {
//   try {
//     const body: CreateOrderRequest = await request.json();

//     const {
//       amount,
//       currency = "INR",
//       customerName,
//       phone,
//       email,
//       notes,
//     } = body;

//     // Input Validation
//     if (!amount || typeof amount !== "number" || amount <= 0) {
//       return NextResponse.json<CreateOrderResponse>(
//         { success: false, error: "Invalid amount. Amount must be a positive number." },
//         { status: 400 }
//       );
//     }

//     if (amount < 1) {
//       return NextResponse.json<CreateOrderResponse>(
//         { success: false, error: "Minimum order amount is ₹1." },
//         { status: 400 }
//       );
//     }

//     if (amount > 100000) {
//       return NextResponse.json<CreateOrderResponse>(
//         { success: false, error: "Maximum order amount is ₹1,00,000." },
//         { status: 400 }
//       );
//     }

//     if (!customerName || typeof customerName !== "string" || customerName.trim().length < 2) {
//       return NextResponse.json<CreateOrderResponse>(
//         { success: false, error: "Valid customer name is required." },
//         { status: 400 }
//       );
//     }

//     const phoneRegex = /^[6-9]\d{9}$/;
//     if (!phone || !phoneRegex.test(phone.replace(/\s/g, ""))) {
//       return NextResponse.json<CreateOrderResponse>(
//         { success: false, error: "Valid 10-digit Indian phone number is required." },
//         { status: 400 }
//       );
//     }

//     const supportedCurrencies = ["INR"];
//     if (!supportedCurrencies.includes(currency)) {
//       return NextResponse.json<CreateOrderResponse>(
//         { success: false, error: `Currency ${currency} is not supported. Use INR.` },
//         { status: 400 }
//       );
//     }

//     // Convert amount to paise & generate receipt
//     const amountInPaise = convertToSmallestUnit(amount);
//     const receiptId = generateReceiptId();

//     // Create Razorpay Order
//     const razorpayOrder = await razorpayInstance.orders.create({
//       amount: amountInPaise,
//       currency: currency,
//       receipt: receiptId,
//       notes: {
//         customerName: customerName.trim(),
//         phone: phone,
//         email: email || "",
//         environment: isTestMode() ? "test" : "production",
//         ...notes,
//       },
//       partial_payment: false,
//     });

//     if (isTestMode()) {
//       console.log("✅ Razorpay Test Order Created:", {
//         orderId: razorpayOrder.id,
//         amount: razorpayOrder.amount,
//         currency: razorpayOrder.currency,
//         receipt: razorpayOrder.receipt,
//       });
//     }

//     return NextResponse.json<CreateOrderResponse>(
//       {
//         success: true,
//         orderId: razorpayOrder.id,
//         amount: razorpayOrder.amount,
//         currency: razorpayOrder.currency,
//       },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("❌ Razorpay order creation failed:", error);

//     if (error && typeof error === "object" && "error" in error) {
//       const razorpayError = error as {
//         error: { code: string; description: string; reason: string };
//       };

//       return NextResponse.json<CreateOrderResponse>(
//         {
//           success: false,
//           error: razorpayError.error.description || "Payment service error. Please try again.",
//         },
//         { status: 502 }
//       );
//     }

//     return NextResponse.json<CreateOrderResponse>(
//       {
//         success: false,
//         error: "Failed to create payment order. Please try again.",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(): Promise<NextResponse> {
//   return NextResponse.json(
//     { error: "Method not allowed. Use POST." },
//     { status: 405 }
//   );
// }
// app/api/payment/create-order/route.ts
import { NextRequest, NextResponse } from "next/server";

// ─── FIXED: Shortcut alias ko hata kar sahi relative paths lagaya ───
import {
  razorpayInstance,
  convertToSmallestUnit,
  generateReceiptId,
  isTestMode,
} from "../../../../lib/razorpay"; 

import type {
  CreateOrderRequest,
  CreateOrderResponse,
} from "../../../../types/payment";
// ──────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateOrderRequest = await request.json();

    const {
      amount,
      currency = "INR",
      customerName,
      phone,
      email,
      notes,
    } = body;

    // Input Validation
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json<CreateOrderResponse>(
        { success: false, error: "Invalid amount. Amount must be a positive number." },
        { status: 400 }
      );
    }

    if (amount < 1) {
      return NextResponse.json<CreateOrderResponse>(
        { success: false, error: "Minimum order amount is ₹1." },
        { status: 400 }
      );
    }

    if (amount > 100000) {
      return NextResponse.json<CreateOrderResponse>(
        { success: false, error: "Maximum order amount is ₹1,00,000." },
        { status: 400 }
      );
    }

    if (!customerName || typeof customerName !== "string" || customerName.trim().length < 2) {
      return NextResponse.json<CreateOrderResponse>(
        { success: false, error: "Valid customer name is required." },
        { status: 400 }
      );
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone || !phoneRegex.test(phone.replace(/\s/g, ""))) {
      return NextResponse.json<CreateOrderResponse>(
        { success: false, error: "Valid 10-digit Indian phone number is required." },
        { status: 400 }
      );
    }

    const supportedCurrencies = ["INR"];
    if (!supportedCurrencies.includes(currency)) {
      return NextResponse.json<CreateOrderResponse>(
        { success: false, error: `Currency ${currency} is not supported. Use INR.` },
        { status: 400 }
      );
    }

    // Convert amount to paise & generate receipt
    const amountInPaise = convertToSmallestUnit(amount);
    const receiptId = generateReceiptId();

    // Create Razorpay Order
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: amountInPaise,
      currency: currency,
      receipt: receiptId,
      notes: {
        customerName: customerName.trim(),
        phone: phone,
        email: email || "",
        environment: isTestMode() ? "test" : "production",
        ...notes,
      },
      partial_payment: false,
    });

    if (isTestMode()) {
      console.log("✅ Razorpay Test Order Created:", {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        receipt: razorpayOrder.receipt,
      });
    }

    // 🔥 FIXED: razorpayOrder.amount ko strictly Number() me cast kiya type validation satisfy karne ke liye
    return NextResponse.json<CreateOrderResponse>(
      {
        success: true,
        orderId: razorpayOrder.id,
        amount: Number(razorpayOrder.amount), 
        currency: razorpayOrder.currency,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Razorpay order creation failed:", error);

    if (error && typeof error === "object" && "error" in error) {
      const razorpayError = error as {
        error: { code: string; description: string; reason: string };
      };

      return NextResponse.json<CreateOrderResponse>(
        {
          success: false,
          error: razorpayError.error.description || "Payment service error. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json<CreateOrderResponse>(
      {
        success: false,
        error: "Failed to create payment order. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}