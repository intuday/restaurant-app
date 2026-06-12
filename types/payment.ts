// types/payment.ts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// This file contains ALL TypeScript interfaces for the payment system.
// Centralizing types here prevents duplication and ensures consistency.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ─────────────────────────────────────────────────────────────────────────
// ORDER ITEM: Represents a single item in the cart/order
// ─────────────────────────────────────────────────────────────────────────
export interface OrderItem {
  id: string;           // Unique product ID from your menu database
  name: string;         // Display name e.g., "Paneer Butter Masala"
  price: number;        // Price per unit in INR (e.g., 250)
  quantity: number;     // Number of units ordered
  category?: string;    // Optional: "Main Course", "Beverages", etc.
  imageUrl?: string;    // Optional: Product image URL
}

// ─────────────────────────────────────────────────────────────────────────
// PAYMENT METHOD: Union type for all supported payment methods
// COD = Cash on Delivery (offline payment)
// All other values trigger Razorpay online payment flow
// ─────────────────────────────────────────────────────────────────────────
export type PaymentMethod =
  | "COD"          // Cash on Delivery
  | "UPI"          // UPI (GPay, PhonePe, Paytm, etc.)
  | "CARD"         // Credit or Debit Card
  | "NETBANKING"   // Internet Banking
  | "WALLET"       // Wallets (Paytm, Amazon Pay, etc.)
  | "EMI"          // Equated Monthly Installments
  | "RAZORPAY";    // Let Razorpay auto-detect best method

// ─────────────────────────────────────────────────────────────────────────
// PAYMENT STATUS: Tracks the payment lifecycle
// ─────────────────────────────────────────────────────────────────────────
export type PaymentStatus =
  | "Pending"    // COD orders or payment not yet completed
  | "Paid"       // Successfully paid online
  | "Failed"     // Payment attempt failed
  | "Refunded";  // Payment was refunded

// ─────────────────────────────────────────────────────────────────────────
// ORDER STATUS: Tracks the restaurant's order fulfillment lifecycle
// ─────────────────────────────────────────────────────────────────────────
export type OrderStatus =
  | "Confirmed"   // Order received and confirmed
  | "Preparing"   // Kitchen is preparing the order
  | "Ready"       // Order is ready for pickup/delivery
  | "Delivered"   // Order delivered to customer
  | "Cancelled";  // Order was cancelled

// ─────────────────────────────────────────────────────────────────────────
// FIRESTORE ORDER: Complete order document saved in Firestore
// This is the exact structure stored in the 'orders' collection
// ─────────────────────────────────────────────────────────────────────────
export interface FirestoreOrder {
  // Customer Information
  userId: string;         // Firebase Auth UID
  customerName: string;   // Full name of customer
  phone: string;          // Customer phone number (10 digits)
  tableNumber: string;    // Restaurant table number or "Takeaway"

  // Order Items
  items: OrderItem[];     // Array of ordered items
  subtotal: number;       // Total before tax (INR)
  tax: number;            // Tax amount (INR)
  total: number;          // Final amount including tax (INR)

  // Payment Information
  paymentMethod: PaymentMethod;   // How customer wants to pay
  paymentStatus: PaymentStatus;   // Current payment status

  // Razorpay specific fields (empty string for COD)
  razorpayOrderId: string;    // Razorpay generated order ID (order_xxxx)
  razorpayPaymentId: string;  // Razorpay payment ID after success (pay_xxxx)

  // Order Management
  orderStatus: OrderStatus;  // Current fulfillment status
  createdAt: string;         // ISO timestamp of order creation

  // Optional metadata
  specialInstructions?: string;  // Any special requests
  estimatedTime?: number;        // Estimated time in minutes
}

// ─────────────────────────────────────────────────────────────────────────
// CREATE ORDER REQUEST: Sent from frontend to /api/payment/create-order
// ─────────────────────────────────────────────────────────────────────────
export interface CreateOrderRequest {
  amount: number;           // Amount in INR (will be converted to paise)
  currency: string;         // "INR" always
  receipt: string;          // Unique receipt ID for tracking
  customerName: string;     // Customer name for Razorpay checkout
  phone: string;            // Customer phone for auto-fill in checkout
  email?: string;           // Optional email
  notes?: Record<string, string>; // Additional metadata sent to Razorpay
}

// ─────────────────────────────────────────────────────────────────────────
// CREATE ORDER RESPONSE: Returned from /api/payment/create-order
// ─────────────────────────────────────────────────────────────────────────
export interface CreateOrderResponse {
  success: boolean;
  orderId?: string;   // Razorpay Order ID to initiate checkout
  amount?: number;    // Amount in paise (for Razorpay SDK)
  currency?: string;  // "INR"
  error?: string;     // Error message if success is false
}

// ─────────────────────────────────────────────────────────────────────────
// VERIFY PAYMENT REQUEST: Sent from frontend to /api/payment/verify
// After Razorpay checkout success callback
// ─────────────────────────────────────────────────────────────────────────
export interface VerifyPaymentRequest {
  // Razorpay verification fields (all 3 required for signature verification)
  razorpayOrderId: string;    // From Razorpay response
  razorpayPaymentId: string;  // From Razorpay response
  razorpaySignature: string;  // From Razorpay response (HMAC SHA256)

  // Order data to save in Firestore
  orderData: FirestoreOrder;
}

// ─────────────────────────────────────────────────────────────────────────
// VERIFY PAYMENT RESPONSE: Returned from /api/payment/verify
// ─────────────────────────────────────────────────────────────────────────
export interface VerifyPaymentResponse {
  success: boolean;
  orderId?: string;    // Firestore document ID of saved order
  message?: string;    // Success message
  error?: string;      // Error message if verification fails
}

// ─────────────────────────────────────────────────────────────────────────
// RAZORPAY CHECKOUT OPTIONS: Options passed to Razorpay.open()
// This matches the Razorpay JavaScript SDK interface
// ─────────────────────────────────────────────────────────────────────────
export interface RazorpayCheckoutOptions {
  key: string;           // NEXT_PUBLIC_RAZORPAY_KEY_ID
  amount: number;        // Amount in paise (INR × 100)
  currency: string;      // "INR"
  name: string;          // Restaurant name (shown in checkout)
  description: string;   // Order description
  image?: string;        // Restaurant logo URL
  order_id: string;      // Razorpay Order ID from backend
  
  // Callback after successful payment
  handler: (response: RazorpayPaymentResponse) => void;
  
  // Pre-fill customer details
  prefill: {
    name: string;
    email: string;
    contact: string;    // Phone number
  };
  
  // UI Customization
  theme: {
    color: string;      // Hex color for checkout UI
  };
  
  // Payment method configuration
  config?: {
    display: {
      hide?: Array<{ method: string }>;   // Hide specific methods
      preferences?: { show_default_blocks: boolean };
    };
  };
  
  // Modal configuration
  modal?: {
    ondismiss?: () => void;   // Called when user closes checkout
    animation?: boolean;
    backdropclose?: boolean;
  };
  
  // Notes passed to Razorpay (appear in dashboard)
  notes?: Record<string, string>;
}

// ─────────────────────────────────────────────────────────────────────────
// RAZORPAY PAYMENT RESPONSE: Received in handler callback after payment
// ─────────────────────────────────────────────────────────────────────────
export interface RazorpayPaymentResponse {
  razorpay_order_id: string;    // Order ID (matches what we created)
  razorpay_payment_id: string;  // New payment ID assigned by Razorpay
  razorpay_signature: string;   // HMAC SHA256 signature for verification
}

// ─────────────────────────────────────────────────────────────────────────
// RAZORPAY GLOBAL: Extends Window interface for Razorpay SDK
// The Razorpay JS SDK attaches itself to window.Razorpay
// ─────────────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    Razorpay: new (options: RazorpayCheckoutOptions) => {
      open: () => void;       // Opens the checkout modal
      close: () => void;      // Programmatically closes modal
      on: (event: string, callback: (response: unknown) => void) => void;
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────
// CHECKOUT FORM DATA: Data collected from the checkout form
// ─────────────────────────────────────────────────────────────────────────
export interface CheckoutFormData {
  customerName: string;         // Required
  phone: string;                // Required, 10 digits
  email: string;                // Optional for COD, required for online
  tableNumber: string;          // Table number or "Takeaway"
  paymentMethod: PaymentMethod; // Selected payment method
  specialInstructions?: string; // Optional special requests
}

// ─────────────────────────────────────────────────────────────────────────
// COD ORDER REQUEST: Sent when customer selects Cash on Delivery
// ─────────────────────────────────────────────────────────────────────────
export interface CODOrderRequest {
  orderData: FirestoreOrder;
}

// ─────────────────────────────────────────────────────────────────────────
// COD ORDER RESPONSE: Returned after COD order is saved
// ─────────────────────────────────────────────────────────────────────────
export interface CODOrderResponse {
  success: boolean;
  orderId?: string;   // Firestore document ID
  message?: string;
  error?: string;
}