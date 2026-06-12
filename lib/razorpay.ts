// // // // // // lib/razorpay.ts
// // // // // // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// // // // // // Server-side Razorpay utilities.
// // // // // // Contains: Razorpay instance, signature verification, amount conversion.
// // // // // // NEVER import this in client-side code (contains secret key).
// // // // // // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// // // // // // Razorpay Node.js SDK - server-side only
// // // // // import Razorpay from "razorpay";

// // // // // // Node.js crypto module for HMAC signature verification
// // // // // // Built-in to Node.js, no installation needed
// // // // // import crypto from "crypto";

// // // // // // ─────────────────────────────────────────────────────────────────────────
// // // // // // Validate that required environment variables are present.
// // // // // // This will throw during build/startup if keys are missing,
// // // // // // giving you an early error rather than a cryptic runtime failure.
// // // // // // ─────────────────────────────────────────────────────────────────────────
// // // // // const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
// // // // // const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

// // // // // // Validate environment variables at module load time
// // // // // if (!RAZORPAY_KEY_ID) {
// // // // //   throw new Error(
// // // // //     "RAZORPAY_KEY_ID is not defined in environment variables. " +
// // // // //     "Please add it to .env.local"
// // // // //   );
// // // // // }

// // // // // if (!RAZORPAY_KEY_SECRET) {
// // // // //   throw new Error(
// // // // //     "RAZORPAY_KEY_SECRET is not defined in environment variables. " +
// // // // //     "Please add it to .env.local"
// // // // //   );
// // // // // }

// // // // // // ─────────────────────────────────────────────────────────────────────────
// // // // // // Razorpay instance - singleton pattern.
// // // // // // key_id: Your Razorpay Key ID (rzp_test_xxx or rzp_live_xxx)
// // // // // // key_secret: Your Razorpay Key Secret (server-side only, never expose)
// // // // // // ─────────────────────────────────────────────────────────────────────────
// // // // // export const razorpayInstance = new Razorpay({
// // // // //   key_id: RAZORPAY_KEY_ID,
// // // // //   key_secret: RAZORPAY_KEY_SECRET,
// // // // // });

// // // // // // ─────────────────────────────────────────────────────────────────────────
// // // // // // convertToSmallestUnit: Converts INR amount to paise.
// // // // // // Razorpay accepts amounts in the SMALLEST currency unit.
// // // // // // For INR: 1 Rupee = 100 Paise
// // // // // // Example: ₹250.50 → 25050 paise
// // // // // // Math.round() handles floating point precision issues
// // // // // // ─────────────────────────────────────────────────────────────────────────
// // // // // export function convertToSmallestUnit(amountInINR: number): number {
// // // // //   // Multiply by 100 to convert Rupees to Paise
// // // // //   // Math.round prevents floating point issues like 250.1 * 100 = 25009.999...
// // // // //   return Math.round(amountInINR * 100);
// // // // // }

// // // // // // ─────────────────────────────────────────────────────────────────────────
// // // // // // convertFromSmallestUnit: Converts paise back to INR.
// // // // // // Used when displaying amounts received from Razorpay webhook/API.
// // // // // // Example: 25050 paise → ₹250.50
// // // // // // ─────────────────────────────────────────────────────────────────────────
// // // // // export function convertFromSmallestUnit(amountInPaise: number): number {
// // // // //   return amountInPaise / 100;
// // // // // }

// // // // // // ─────────────────────────────────────────────────────────────────────────
// // // // // // verifyPaymentSignature: Cryptographically verifies Razorpay payment.
// // // // // //
// // // // // // HOW SIGNATURE VERIFICATION WORKS:
// // // // // // ─────────────────────────────────
// // // // // // 1. Razorpay creates a signature using:
// // // // // //    HMAC-SHA256(razorpay_order_id + "|" + razorpay_payment_id, key_secret)
// // // // // //
// // // // // // 2. We recreate the same HMAC-SHA256 on our server using the same key_secret
// // // // // //
// // // // // // 3. If both signatures match → payment is genuine (came from Razorpay)
// // // // // // 4. If signatures don't match → payment may be tampered/fraudulent
// // // // // //
// // // // // // This is the CRITICAL security step. Never skip this verification.
// // // // // // ─────────────────────────────────────────────────────────────────────────
// // // // // export function verifyPaymentSignature(
// // // // //   razorpayOrderId: string,    // From Razorpay response: response.razorpay_order_id
// // // // //   razorpayPaymentId: string,  // From Razorpay response: response.razorpay_payment_id
// // // // //   razorpaySignature: string   // From Razorpay response: response.razorpay_signature
// // // // // ): boolean {
// // // // //   // Step 1: Create the body string that Razorpay used to generate signature
// // // // //   // Format is always: orderId + "|" + paymentId
// // // // //   const body = `${razorpayOrderId}|${razorpayPaymentId}`;

// // // // //   // Step 2: Generate our own HMAC-SHA256 signature
// // // // //   // Using the SAME key_secret that Razorpay used
// // // // //   const expectedSignature = crypto
// // // // //     .createHmac("sha256", RAZORPAY_KEY_SECRET!)  // Algorithm and secret key
// // // // //     .update(body)                                 // Data to hash
// // // // //     .digest("hex");                               // Output as hexadecimal string

// // // // //   // Step 3: Compare signatures using timing-safe comparison
// // // // //   // crypto.timingSafeEqual prevents timing attacks where attackers
// // // // //   // can determine correct characters by measuring response time
// // // // //   try {
// // // // //     // Convert strings to Buffer for timingSafeEqual
// // // // //     const signatureBuffer = Buffer.from(razorpaySignature, "hex");
// // // // //     const expectedBuffer = Buffer.from(expectedSignature, "hex");

// // // // //     // Buffers must be same length for timingSafeEqual
// // // // //     if (signatureBuffer.length !== expectedBuffer.length) {
// // // // //       return false;
// // // // //     }

// // // // //     // Returns true only if all bytes match
// // // // //     return crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
// // // // //   } catch {
// // // // //     // If any error occurs during comparison, treat as invalid
// // // // //     return false;
// // // // //   }
// // // // // }

// // // // // // ─────────────────────────────────────────────────────────────────────────
// // // // // // verifyWebhookSignature: Verifies Razorpay webhook signature.
// // // // // // Different from payment signature - uses webhook secret.
// // // // // // Called when processing webhook events from Razorpay servers.
// // // // // // ─────────────────────────────────────────────────────────────────────────
// // // // // export function verifyWebhookSignature(
// // // // //   webhookBody: string,         // Raw request body as string
// // // // //   webhookSignature: string     // From header: x-razorpay-signature
// // // // // ): boolean {
// // // // //   const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

// // // // //   if (!webhookSecret) {
// // // // //     console.error("RAZORPAY_WEBHOOK_SECRET is not configured");
// // // // //     return false;
// // // // //   }

// // // // //   // Generate HMAC-SHA256 of webhook body using webhook secret
// // // // //   const expectedSignature = crypto
// // // // //     .createHmac("sha256", webhookSecret)
// // // // //     .update(webhookBody)
// // // // //     .digest("hex");

// // // // //   try {
// // // // //     const signatureBuffer = Buffer.from(webhookSignature, "hex");
// // // // //     const expectedBuffer = Buffer.from(expectedSignature, "hex");

// // // // //     if (signatureBuffer.length !== expectedBuffer.length) {
// // // // //       return false;
// // // // //     }

// // // // //     return crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
// // // // //   } catch {
// // // // //     return false;
// // // // //   }
// // // // // }

// // // // // // ─────────────────────────────────────────────────────────────────────────
// // // // // // generateReceiptId: Creates a unique receipt ID for each order.
// // // // // // Format: rcpt_TIMESTAMP_RANDOM
// // // // // // Example: rcpt_1703123456789_a1b2c3
// // // // // // Receipt ID is shown in Razorpay Dashboard for tracking.
// // // // // // ─────────────────────────────────────────────────────────────────────────
// // // // // export function generateReceiptId(): string {
// // // // //   const timestamp = Date.now();                                    // Current timestamp in ms
// // // // //   const random = Math.random().toString(36).substring(2, 8);      // Random 6-char string
// // // // //   return `rcpt_${timestamp}_${random}`;                           // Unique receipt ID
// // // // // }

// // // // // // ─────────────────────────────────────────────────────────────────────────
// // // // // // isTestMode: Helper to check if running in test mode.
// // // // // // Key ID starting with 'rzp_test_' = test mode.
// // // // // // Useful for conditional logging and UI indicators.
// // // // // // ─────────────────────────────────────────────────────────────────────────
// // // // // export function isTestMode(): boolean {
// // // // //   return RAZORPAY_KEY_ID?.startsWith("rzp_test_") ?? false;
// // // // // }
// // // // // lib/razorpay.ts
// // // // import Razorpay from 'razorpay';

// // // // export const isTestMode = process.env.NODE_ENV !== 'production';

// // // // // Razorpay Instance initialize karo
// // // // export const razorpayInstance = new Razorpay({
// // // //   key_id: process.env.RAZORPAY_KEY_ID || '',
// // // //   key_secret: process.env.RAZORPAY_KEY_SECRET || '',
// // // // });

// // // // // Paise ko Paise (smallest unit) me badalne ke liye (e.g. ₹1 = 100 paise)
// // // // export const convertToSmallestUnit = (amount: number): number => {
// // // //   return Math.round(amount * 100);
// // // // };

// // // // // Unique receipt ID banane ke liye
// // // // export const generateReceiptId = (): string => {
// // // //   return `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
// // // // };
// // // // lib/razorpay.ts
// // // import Razorpay from 'razorpay';

// // // //  isTestMode ko function bana diya taaki route.ts crash na ho
// // // export const isTestMode = (): boolean => {
// // //   return process.env.RAZORPAY_KEY_ID?.startsWith("rzp_test_") ?? true;
// // // };

// // // // Razorpay Instance initialize karo
// // // export const razorpayInstance = new Razorpay({
// // //   key_id: process.env.RAZORPAY_KEY_ID || '',
// // //   key_secret: process.env.RAZORPAY_KEY_SECRET || '',
// // // });

// // // // Paise ko paise (smallest unit) me badalne ke liye (e.g. ₹1 = 100 paise)
// // // export const convertToSmallestUnit = (amount: number): number => {
// // //   return Math.round(amount * 100);
// // // };

// // // // Unique receipt ID banane ke liye
// // // export const generateReceiptId = (): string => {
// // //   return `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
// // // };
// // // lib/razorpay.ts
// // import Razorpay from 'razorpay';

// // // Dono config check kar lo taaki fallback bana rahe
// // const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || '';
// // const keySecret = process.env.RAZORPAY_KEY_SECRET || '';

// // export const isTestMode = (): boolean => {
// //   return keyId.startsWith("rzp_test_") ?? true;
// // };

// // // Razorpay Instance Safely Initialize karo
// // export const razorpayInstance = new Razorpay({
// //   key_id: keyId,
// //   key_secret: keySecret,
// // });

// // export const convertToSmallestUnit = (amount: number): number => {
// //   return Math.round(amount * 100);
// // };

// // export const generateReceiptId = (): string => {
// //   return `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
// // };
// // lib/razorpay.ts
// import Razorpay from 'razorpay';

// // 1. Keys ko fetch karo aur check karo
// const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
// const keySecret = process.env.RAZORPAY_KEY_SECRET;

// // ⚠️ Debugging ke liye terminal par print karke check karein (Sirf test mode ke liye)
// console.log("--- Razorpay Key Loading Status ---");
// console.log("Loaded Key ID:", keyId ? "FOUND (Starts with " + keyId.substring(0, 8) + ")" : "NOT FOUND ❌");
// console.log("Loaded Secret:", keySecret ? "FOUND" : "NOT FOUND ❌");
// console.log("-----------------------------------");

// export const isTestMode = (): boolean => {
//   return keyId?.startsWith("rzp_test_") ?? true;
// };

// // 2. Razorpay Instance Initialize karo (Agar undefined hai toh khali string bypass karein)
// export const razorpayInstance = new Razorpay({
//   key_id: keyId || '',
//   key_secret: keySecret || '',
// });

// export const convertToSmallestUnit = (amount: number): number => {
//   return Math.round(amount * 100);
// };

// export const generateReceiptId = (): string => {
//   return `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
// };
// lib/razorpay.ts
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Dono variables ko strict load karo fallbacks ke sath
const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || '';
const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET_KEY || ''; 

console.log("--- Razorpay Key Loading Status ---");
console.log("Loaded Key ID:", keyId ? "FOUND (Starts with " + keyId.substring(0, 8) + ")" : "NOT FOUND ❌");
console.log("Loaded Secret:", keySecret ? "FOUND ✅" : "NOT FOUND ❌");
console.log("-----------------------------------");

export const isTestMode = (): boolean => {
  return keyId.startsWith("rzp_test_");
};

// Razorpay Instance Initialize
export const razorpayInstance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export const convertToSmallestUnit = (amount: number): number => {
  return Math.round(amount * 100);
};

export const generateReceiptId = (): string => {
  return `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
};

// 🔥 FIXED: Yeh function chhoot gaya tha jise verify route dhoondh raha hai
export const verifyPaymentSignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  if (!keySecret) return false;
  
  const generatedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
    
  return generatedSignature === signature;
};
  export const verifyWebhookSignature = (
  payload: string,
  signature: string
): boolean => {
  if (!keySecret) return false;

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(payload)
    .digest("hex");

  return expectedSignature === signature;

};