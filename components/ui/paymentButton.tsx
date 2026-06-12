// // // // 'use client';

// // // // import React, { useState } from 'react';
// // // // import { useCart } from '@/app/context/CartContext';
// // // // import { useAuth } from '@/app/context/AuthContext';
// // // // import { useRouter } from 'next/navigation';

// // // // interface PaymentButtonProps {
// // // //   paymentMethod: 'COD' | 'ONLINE';
// // // //   customerInfo: {
// // // //     name: string;
// // // //     phone: string;
// // // //     email: string;
// // // //   };
// // // //   isValid: boolean;
// // // //   onProcessing: (loading: boolean) => void;
// // // // }

// // // // // Strong type definitions replacing 'any' instances to satisfy lint rules
// // // // interface RazorpaySuccessResponse {
// // // //   razorpay_order_id: string;
// // // //   razorpay_payment_id: string;
// // // //   razorpay_signature: string;
// // // // }

// // // // interface RazorpayFailedResponse {
// // // //   error: {
// // // //     code: string;
// // // //     description: string;
// // // //     source: string;
// // // //     step: string;
// // // //     reason: string;
// // // //     metadata: {
// // // //       order_id: string;
// // // //       payment_id: string;
// // // //     };
// // // //   };
// // // // }

// // // // interface RazorpayInstance {
// // // //   open: () => void;
// // // //   on: (event: 'payment.failed', callback: (response: RazorpayFailedResponse) => void) => void;
// // // // }

// // // // declare global {
// // // //   interface Window {
// // // //     Razorpay: new (options: Record<string, unknown>) => RazorpayInstance;
// // // //   }
// // // // }

// // // // export const PaymentButton: React.FC<PaymentButtonProps> = ({
// // // //   paymentMethod,
// // // //   customerInfo,
// // // //   isValid,
// // // //   onProcessing,
// // // // }) => {
// // // //   // Aligned with your exact CartContext properties
// // // //   const { cart, cartTotal, clearCart } = useCart();
// // // //   const { user } = useAuth();
// // // //   const router = useRouter();
// // // //   const [isLocallyLoading, setIsLocallyLoading] = useState(false);

// // // //   // Default placeholders for discount values since they aren't in your context type definition
// // // //   const discount = 0;
// // // //   const promoCode = null;
// // // //   const finalAmount = cartTotal - discount;

// // // //   const loadRazorpayScript = (): Promise<boolean> => {
// // // //     return new Promise((resolve) => {
// // // //       if (window.Razorpay) {
// // // //         resolve(true);
// // // //         return;
// // // //       }
// // // //       const script = document.createElement('script');
// // // //       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// // // //       script.onload = () => resolve(true);
// // // //       script.onerror = () => resolve(false);
// // // //       document.body.appendChild(script);
// // // //     });
// // // //   };

// // // //   const handlePayment = async () => {
// // // //     if (!user) {
// // // //       alert('You must be securely logged in to complete transactions.');
// // // //       return;
// // // //     }

// // // //     setIsLocallyLoading(true);
// // // //     onProcessing(true);

// // // //     try {
// // // //       if (paymentMethod === 'COD') {
// // // //         const response = await fetch('/api/payment/verify', {
// // // //           method: 'POST',
// // // //           headers: { 'Content-Type': 'application/json' },
// // // //           body: JSON.stringify({
// // // //             razorpay_order_id: `cod_${Date.now()}`,
// // // //             razorpay_payment_id: `cod_pay_${Date.now()}`,
// // // //             razorpay_signature: 'N/A',
// // // //             orderDetails: {
// // // //               userId: user.uid,
// // // //               customerName: customerInfo.name,
// // // //               customerPhone: customerInfo.phone,
// // // //               customerEmail: customerInfo.email,
// // // //               items: cart,
// // // //               subtotal: cartTotal,
// // // //               discount: discount,
// // // //               promoCode: promoCode,
// // // //               totalAmount: finalAmount,
// // // //             },
// // // //           }),
// // // //         });

// // // //         const data = await response.json();
// // // //         if (response.ok && data.success) {
// // // //           clearCart();
// // // //           router.push(`/checkout/success?id=${data.orderId}`);
// // // //         } else {
// // // //           alert(data.error || 'Failed to complete Cash on Delivery order.');
// // // //         }
// // // //       } else {
// // // //         const scriptLoaded = await loadRazorpayScript();
// // // //         if (!scriptLoaded) {
// // // //           alert('Failed to load online payment gateway runtime. Check internet accessibility.');
// // // //           setIsLocallyLoading(false);
// // // //           onProcessing(false);
// // // //           return;
// // // //         }

// // // //         const orderRes = await fetch('/api/payment/create-order', {
// // // //           method: 'POST',
// // // //           headers: { 'Content-Type': 'application/json' },
// // // //           body: JSON.stringify({ amount: finalAmount }),
// // // //         });

// // // //         // if (!orderRes.ok) {
// // // //         //   throw new Error('Unable to establish real-time upstream financial collection parameters.');
// // // //         // }
// // // // // ─── Puraane block ko hata kar isko chipkao ───
// // // // if (!orderRes.ok) {
// // // //   // Backend se exact error message nikal rahe hain
// // // //   const errorData = await orderRes.json().catch(() => ({}));
// // // //   const backendError = errorData.error || 'Unable to establish real-time upstream financial collection parameters.';
  
// // // //   // Yeh aapko browser par saaf-saaf pop-up dega ki dikkat kahan hai
// // // //   alert(`Validation Error: ${backendError}`); 
// // // //   throw new Error(backendError);
// // // // }
// // // // // ──────────────────────────────────────────────
// // // //         const razorpayOrder = await orderRes.json();

// // // //         const options = {
// // // //           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
// // // //           amount: razorpayOrder.amount,
// // // //           currency: razorpayOrder.currency,
// // // //           name: 'Gourmet Restaurant Website',
// // // //           description: `Order Payment for execution clearance`,
// // // //           order_id: razorpayOrder.id,
// // // //           handler: async function (response: RazorpaySuccessResponse) {
// // // //             try {
// // // //               onProcessing(true);
// // // //               const verifyRes = await fetch('/api/payment/verify', {
// // // //                 method: 'POST',
// // // //                 headers: { 'Content-Type': 'application/json' },
// // // //                 body: JSON.stringify({
// // // //                   razorpay_order_id: response.razorpay_order_id,
// // // //                   razorpay_payment_id: response.razorpay_payment_id,
// // // //                   razorpay_signature: response.razorpay_signature,
// // // //                   orderDetails: {
// // // //                     userId: user.uid,
// // // //                     customerName: customerInfo.name,
// // // //                     customerPhone: customerInfo.phone,
// // // //                     customerEmail: customerInfo.email,
// // // //                     items: cart,
// // // //                     subtotal: cartTotal,
// // // //                     discount: discount,
// // // //                     promoCode: promoCode,
// // // //                     totalAmount: finalAmount,
// // // //                   },
// // // //                 }),
// // // //               });

// // // //               const verifyData = await verifyRes.json();
// // // //               if (verifyRes.ok && verifyData.success) {
// // // //                 clearCart();
// // // //                 router.push(`/checkout/success?id=${verifyData.orderId}`);
// // // //               } else {
// // // //                 alert(verifyData.error || 'Signature manipulation detected or validation logic rejected order.');
// // // //               }
// // // //             } catch (err) {
// // // //               console.error(err);
// // // //               alert('Error execution parameter checks failed while verifying transactions.');
// // // //             } finally {
// // // //               setIsLocallyLoading(false);
// // // //               onProcessing(false);
// // // //             }
// // // //           },
// // // //           prefill: {
// // // //             name: customerInfo.name,
// // // //             email: customerInfo.email,
// // // //             contact: customerInfo.phone,
// // // //           },
// // // //           theme: {
// // // //             color: '#F97316',
// // // //           },
// // // //           modal: {
// // // //             ondismiss: function () {
// // // //               setIsLocallyLoading(false);
// // // //               onProcessing(false);
// // // //               alert('Payment interface window closed by user request.');
// // // //             },
// // // //           },
// // // //         };

// // // //         const paymentWindow = new window.Razorpay(options);
// // // //         paymentWindow.on('payment.failed', function (response: RazorpayFailedResponse) {
// // // //           alert(`Transaction failed context: ${response.error.description}`);
// // // //           setIsLocallyLoading(false);
// // // //           onProcessing(false);
// // // //         });
// // // //         paymentWindow.open();
// // // //       }
// // // //     } catch (error: unknown) {
// // // //       console.error(error);
// // // //       const errorMessage = error instanceof Error ? error.message : 'Unknown compilation exception error';
// // // //       alert(errorMessage || 'Fatal crash within routing handler loop integration parameters.');
// // // //     } finally {
// // // //       if (paymentMethod === 'COD') {
// // // //         setIsLocallyLoading(false);
// // // //         onProcessing(false);
// // // //       }
// // // //     }
// // // //   };

// // // //   return (
// // // //     <button
// // // //       type="button"
// // // //       onClick={handlePayment}
// // // //       disabled={!isValid || isLocallyLoading || cart.length === 0}
// // // //       className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 shadow-md ${
// // // //         !isValid || isLocallyLoading || cart.length === 0
// // // //           ? 'bg-gray-400 cursor-not-allowed shadow-none'
// // // //           : 'bg-orange-500 hover:bg-orange-600 active:scale-[0.99]'
// // // //       }`}
// // // //     >
// // // //       {isLocallyLoading
// // // //         ? 'Processing System Operations...'
// // // //         : paymentMethod === 'COD'
// // // //         ? 'Place Cash On Delivery Order'
// // // //         : 'Proceed to Secure Payment Gateway'}
// // // //     </button>
// // // //   );
// // // // };
// // // 'use client';

// // // import React, { useState } from 'react';
// // // import { useCart } from '@/app/context/CartContext';
// // // import { useAuth } from '@/app/context/AuthContext';
// // // import { useRouter } from 'next/navigation';

// // // interface PaymentButtonProps {
// // //   paymentMethod: 'COD' | 'ONLINE';
// // //   customerInfo: {
// // //     name: string;
// // //     phone: string;
// // //     email: string;
// // //   };
// // //   isValid: boolean;
// // //   onProcessing: (loading: boolean) => void;
// // // }

// // // // Strong type definitions replacing 'any' instances to satisfy lint rules
// // // interface RazorpaySuccessResponse {
// // //   razorpay_order_id: string;
// // //   razorpay_payment_id: string;
// // //   razorpay_signature: string;
// // // }

// // // interface RazorpayFailedResponse {
// // //   error: {
// // //     code: string;
// // //     description: string;
// // //     source: string;
// // //     step: string;
// // //     reason: string;
// // //     metadata: {
// // //       order_id: string;
// // //       payment_id: string;
// // //     };
// // //   };
// // // }

// // // interface RazorpayInstance {
// // //   open: () => void;
// // //   on: (event: 'payment.failed', callback: (response: RazorpayFailedResponse) => void) => void;
// // // }

// // // declare global {
// // //   interface Window {
// // //     Razorpay: new (options: Record<string, unknown>) => RazorpayInstance;
// // //   }
// // // }

// // // export const PaymentButton: React.FC<PaymentButtonProps> = ({
// // //   paymentMethod,
// // //   customerInfo,
// // //   isValid,
// // //   onProcessing,
// // // }) => {
// // //   // Aligned with your exact CartContext properties
// // //   const { cart, cartTotal, clearCart } = useCart();
// // //   const { user } = useAuth();
// // //   const router = useRouter();
// // //   const [isLocallyLoading, setIsLocallyLoading] = useState(false);

// // //   // Default placeholders for discount values since they aren't in your context type definition
// // //   const discount = 0;
// // //   const promoCode = null;
// // //   const finalAmount = cartTotal - discount;

// // //   const loadRazorpayScript = (): Promise<boolean> => {
// // //     return new Promise((resolve) => {
// // //       if (window.Razorpay) {
// // //         resolve(true);
// // //         return;
// // //       }
// // //       const script = document.createElement('script');
// // //       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// // //       script.onload = () => resolve(true);
// // //       script.onerror = () => resolve(false);
// // //       document.body.appendChild(script);
// // //     });
// // //   };

// // //   const handlePayment = async () => {
// // //     if (!user) {
// // //       alert('You must be securely logged in to complete transactions.');
// // //       return;
// // //     }

// // //     setIsLocallyLoading(true);
// // //     onProcessing(true);

// // //     try {
// // //       if (paymentMethod === 'COD') {
// // //         const response = await fetch('/api/payment/verify', {
// // //           method: 'POST',
// // //           headers: { 'Content-Type': 'application/json' },
// // //           body: JSON.stringify({
// // //             razorpay_order_id: `cod_${Date.now()}`,
// // //             razorpay_payment_id: `cod_pay_${Date.now()}`,
// // //             razorpay_signature: 'N/A',
// // //             orderDetails: {
// // //               userId: user.uid,
// // //               customerName: customerInfo.name,
// // //               customerPhone: customerInfo.phone,
// // //               customerEmail: customerInfo.email,
// // //               items: cart,
// // //               subtotal: cartTotal,
// // //               discount: discount,
// // //               promoCode: promoCode,
// // //               totalAmount: finalAmount,
// // //             },
// // //           }),
// // //         });

// // //         const data = await response.json();
// // //         if (response.ok && data.success) {
// // //           clearCart();
// // //           router.push(`/checkout/success?id=${data.orderId}`);
// // //         } else {
// // //           alert(data.error || 'Failed to complete Cash on Delivery order.');
// // //         }
// // //       } else {
// // //         const scriptLoaded = await loadRazorpayScript();
// // //         if (!scriptLoaded) {
// // //           alert('Failed to load online payment gateway runtime. Check internet accessibility.');
// // //           setIsLocallyLoading(false);
// // //           onProcessing(false);
// // //           return;
// // //         }

// // //         // 🔥 FIXED: Ab hum amount ke saath customer validation details bhi backend ko bhej rahe hain
// // //         const orderRes = await fetch('/api/payment/create-order', {
// // //           method: 'POST',
// // //           headers: { 'Content-Type': 'application/json' },
// // //           body: JSON.stringify({ 
// // //             amount: finalAmount,
// // //             currency: 'INR',
// // //             customerName: customerInfo.name,
// // //             phone: customerInfo.phone,
// // //             email: customerInfo.email
// // //           }),
// // //         });

// // //         if (!orderRes.ok) {
// // //           const errorData = await orderRes.json().catch(() => ({}));
// // //           const backendError = errorData.error || 'Unable to establish real-time upstream financial collection parameters.';
// // //           alert(`Validation Error: ${backendError}`); 
// // //           throw new Error(backendError);
// // //         }

// // //         const razorpayOrder = await orderRes.json();

// // //         const options = {
// // //           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
// // //           amount: razorpayOrder.amount,
// // //           currency: razorpayOrder.currency,
// // //           name: 'Gourmet Restaurant Website',
// // //           description: `Order Payment for execution clearance`,
// // //           order_id: razorpayOrder.orderId, // Fixed mapping to match your backend response token structure (orderId)
// // //           handler: async function (response: RazorpaySuccessResponse) {
// // //             try {
// // //               onProcessing(true);
// // //               const verifyRes = await fetch('/api/payment/verify', {
// // //                 method: 'POST',
// // //                 headers: { 'Content-Type': 'application/json' },
// // //                 body: JSON.stringify({
// // //                   razorpay_order_id: response.razorpay_order_id,
// // //                   razorpay_payment_id: response.razorpay_payment_id,
// // //                   razorpay_signature: response.razorpay_signature,
// // //                   orderDetails: {
// // //                     userId: user.uid,
// // //                     customerName: customerInfo.name,
// // //                     customerPhone: customerInfo.phone,
// // //                     customerEmail: customerInfo.email,
// // //                     items: cart,
// // //                     subtotal: cartTotal,
// // //                     discount: discount,
// // //                     promoCode: promoCode,
// // //                     totalAmount: finalAmount,
// // //                   },
// // //                 }),
// // //               });

// // //               const verifyData = await verifyRes.json();
// // //               if (verifyRes.ok && verifyData.success) {
// // //                 clearCart();
// // //                 router.push(`/checkout/success?id=${verifyData.orderId}`);
// // //               } else {
// // //                 alert(verifyData.error || 'Signature manipulation detected or validation logic rejected order.');
// // //               }
// // //             } catch (err) {
// // //               console.error(err);
// // //               alert('Error execution parameter checks failed while verifying transactions.');
// // //             } finally {
// // //               setIsLocallyLoading(false);
// // //               onProcessing(false);
// // //             }
// // //           },
// // //           prefill: {
// // //             name: customerInfo.name,
// // //             email: customerInfo.email,
// // //             contact: customerInfo.phone,
// // //           },
// // //           theme: {
// // //             color: '#F97316',
// // //           },
// // //           modal: {
// // //             ondismiss: function () {
// // //               setIsLocallyLoading(false);
// // //               onProcessing(false);
// // //               alert('Payment interface window closed by user request.');
// // //             },
// // //           },
// // //         };

// // //         const paymentWindow = new window.Razorpay(options);
// // //         paymentWindow.on('payment.failed', function (response: RazorpayFailedResponse) {
// // //           alert(`Transaction failed context: ${response.error.description}`);
// // //           setIsLocallyLoading(false);
// // //           onProcessing(false);
// // //         });
// // //         paymentWindow.open();
// // //       }
// // //     } catch (error: unknown) {
// // //       console.error(error);
// // //       const errorMessage = error instanceof Error ? error.message : 'Unknown compilation exception error';
// // //       alert(errorMessage || 'Fatal crash within routing handler loop integration parameters.');
// // //     } finally {
// // //       if (paymentMethod === 'COD') {
// // //         setIsLocallyLoading(false);
// // //         onProcessing(false);
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <button
// // //       type="button"
// // //       onClick={handlePayment}
// // //       disabled={!isValid || isLocallyLoading || cart.length === 0}
// // //       className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 shadow-md ${
// // //         !isValid || isLocallyLoading || cart.length === 0
// // //           ? 'bg-gray-400 cursor-not-allowed shadow-none'
// // //           : 'bg-orange-500 hover:bg-orange-600 active:scale-[0.99]'
// // //       }`}
// // //     >
// // //       {isLocallyLoading
// // //         ? 'Processing System Operations...'
// // //         : paymentMethod === 'COD'
// // //         ? 'Place Cash On Delivery Order'
// // //         : 'Proceed to Secure Payment Gateway'}
// // //     </button>
// // //   );
// // // };
// // 'use client';

// // import React, { useState } from 'react';
// // import { useCart } from '@/app/context/CartContext';
// // import { useAuth } from '@/app/context/AuthContext';
// // import { useRouter } from 'next/navigation';

// // // FIXED: Direct central types se custom definitions import kar li taaki koi clash na ho!
// // import type { 
// //   RazorpayCheckoutOptions, 
// //   RazorpayPaymentResponse 
// // } from '../../types/payment';

// // interface PaymentButtonProps {
// //   paymentMethod: 'COD' | 'ONLINE';
// //   customerInfo: {
// //     name: string;
// //     phone: string;
// //     email: string;
// //   };
// //   isValid: boolean;
// //   onProcessing: (loading: boolean) => void;
// // }

// // interface RazorpayFailedResponse {
// //   error: {
// //     code: string;
// //     description: string;
// //     source: string;
// //     step: string;
// //     reason: string;
// //     metadata: {
// //       order_id: string;
// //       payment_id: string;
// //     };
// //   };
// // }

// // export const PaymentButton: React.FC<PaymentButtonProps> = ({
// //   paymentMethod,
// //   customerInfo,
// //   isValid,
// //   onProcessing,
// // }) => {
// //   const { cart, cartTotal, clearCart } = useCart();
// //   const { user } = useAuth();
// //   const router = useRouter();
// //   const [isLocallyLoading, setIsLocallyLoading] = useState(false);

// //   const discount = 0;
// //   const promoCode = null;
// //   const finalAmount = cartTotal - discount;

// //   const loadRazorpayScript = (): Promise<boolean> => {
// //     return new Promise((resolve) => {
// //       if (window.Razorpay) {
// //         resolve(true);
// //         return;
// //       }
// //       const script = document.createElement('script');
// //       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// //       script.onload = () => resolve(true);
// //       script.onerror = () => resolve(false);
// //       document.body.appendChild(script);
// //     });
// //   };

// //   const handlePayment = async () => {
// //     if (!user) {
// //       alert('You must be securely logged in to complete transactions.');
// //       return;
// //     }

// //     setIsLocallyLoading(true);
// //     onProcessing(true);

// //     try {
// //       if (paymentMethod === 'COD') {
// //         const response = await fetch('/api/payment/verify', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({
// //             razorpayOrderId: '',
// //             razorpayPaymentId: '', 
// //             razorpaySignature: '', 
// //             orderData: {
// //               userId: user.uid,
// //               customerName: customerInfo.name,
// //               phone: customerInfo.phone,
// //               email: customerInfo.email,
// //               tableNumber: "Table X", 
// //               items: cart,
// //               subtotal: cartTotal,
// //               discount: discount,
// //               promoCode: promoCode,
// //               total: finalAmount, 
// //               paymentMethod: 'COD',
// //               paymentStatus: 'Pending',
// //               orderStatus: 'Confirmed'
// //             },
// //           }),
// //         });

// //         const data = await response.json();
// //         if (response.ok && data.success) {
// //           clearCart();
// //           router.push(`/checkout/success?id=${data.orderId}`);
// //         } else {
// //           alert(data.error || 'Failed to complete Cash on Delivery order.');
// //         }
// //       } else {
// //         const scriptLoaded = await loadRazorpayScript();
// //         if (!scriptLoaded) {
// //           alert('Failed to load online payment gateway runtime. Check internet accessibility.');
// //           setIsLocallyLoading(false);
// //           onProcessing(false);
// //           return;
// //         }

// //         const orderRes = await fetch('/api/payment/create-order', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ 
// //             amount: finalAmount,
// //             currency: 'INR',
// //             customerName: customerInfo.name,
// //             phone: customerInfo.phone,
// //             email: customerInfo.email
// //           }),
// //         });

// //         if (!orderRes.ok) {
// //           const errorData = await orderRes.json().catch(() => ({}));
// //           const backendError = errorData.error || 'Unable to establish real-time upstream financial collection parameters.';
// //           alert(`Validation Error: ${backendError}`); 
// //           throw new Error(backendError);
// //         }

// //         const razorpayOrder = await orderRes.json();

// //         const options: RazorpayCheckoutOptions = {
// //           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
// //           amount: razorpayOrder.amount,
// //           currency: razorpayOrder.currency,
// //           name: 'Gourmet Restaurant Website',
// //           description: `Order Payment for execution clearance`,
// //           order_id: razorpayOrder.orderId, 
// //           handler: async function (response: RazorpayPaymentResponse) {
// //             try {
// //               onProcessing(true);
              
// //               const verifyRes = await fetch('/api/payment/verify', {
// //                 method: 'POST',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify({
// //                   razorpayOrderId: response.razorpay_order_id,
// //                   razorpayPaymentId: response.razorpay_payment_id,
// //                   razorpaySignature: response.razorpay_signature,
// //                   orderData: {
// //                     userId: user.uid,
// //                     customerName: customerInfo.name,
// //                     phone: customerInfo.phone,
// //                     email: customerInfo.email,
// //                     tableNumber: "Table X",
// //                     items: cart,
// //                     subtotal: cartTotal,
// //                     discount: discount,
// //                     promoCode: promoCode,
// //                     total: finalAmount,
// //                     paymentMethod: 'RAZORPAY',
// //                     paymentStatus: 'Paid',
// //                     orderStatus: 'Confirmed'
// //                   },
// //                 }),
// //               });

// //               const verifyData = await verifyRes.json();
// //               if (verifyRes.ok && verifyData.success) {
// //                 clearCart();
// //                 router.push(`/checkout/success?id=${verifyData.orderId}`);
// //               } else {
// //                 alert(verifyData.error || 'Signature manipulation detected or validation logic rejected order.');
// //               }
// //             } catch (err) {
// //               console.error(err);
// //               alert('Error execution parameter checks failed while verifying transactions.');
// //             } finally {
// //               setIsLocallyLoading(false);
// //               onProcessing(false);
// //             }
// //           },
// //           prefill: {
// //             name: customerInfo.name,
// //             email: customerInfo.email,
// //             contact: customerInfo.phone,
// //           },
// //           theme: {
// //             color: '#F97316',
// //           },
// //           modal: {
// //             ondismiss: function () {
// //               setIsLocallyLoading(false);
// //               onProcessing(false);
// //               alert('Payment interface window closed by user request.');
// //             },
// //           },
// //         };

// //         const paymentWindow = new window.Razorpay(options);
        
// //         // 🔥 FIXED: 'any' ko hata kar type check satisfy karne ke liye proper custom signature callback mapping use ki
// //         paymentWindow.on('payment.failed', function (response: unknown) {
// //           const failedData = response as RazorpayFailedResponse;
// //           alert(`Transaction failed context: ${failedData.error.description}`);
// //           setIsLocallyLoading(false);
// //           onProcessing(false);
// //         });
        
// //         paymentWindow.open();
// //       }
// //     } catch (error: unknown) {
// //       console.error(error);
// //       const errorMessage = error instanceof Error ? error.message : 'Unknown compilation exception error';
// //       alert(errorMessage || 'Fatal crash within routing handler loop integration parameters.');
// //     } finally {
// //       if (paymentMethod === 'COD') {
// //         setIsLocallyLoading(false);
// //         onProcessing(false);
// //       }
// //     }
// //   };

// //   return (
// //     <button
// //       type="button"
// //       onClick={handlePayment}
// //       disabled={!isValid || isLocallyLoading || cart.length === 0}
// //       className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 shadow-md ${
// //         !isValid || isLocallyLoading || cart.length === 0
// //           ? 'bg-gray-400 cursor-not-allowed shadow-none'
// //           : 'bg-orange-500 hover:bg-orange-600 active:scale-[0.99]'
// //       }`}
// //     >
// //       {isLocallyLoading
// //         ? 'Processing System Operations...'
// //         : paymentMethod === 'COD'
// //         ? 'Place Cash On Delivery Order'
// //         : 'Proceed to Secure Payment Gateway'}
// //     </button>
// //   );
// // };
// 'use client';

// import React, { useState } from 'react';
// import { useCart } from '@/app/context/CartContext';
// import { useAuth } from '@/app/context/AuthContext';
// import { useRouter } from 'next/navigation';

// import type { 
//   RazorpayCheckoutOptions, 
//   RazorpayPaymentResponse 
// } from '../../types/payment';

// interface PaymentButtonProps {
//   paymentMethod: 'COD' | 'ONLINE';
//   customerInfo: {
//     name: string;
//     phone: string;
//     email: string;
//   };
//   isValid: boolean;
//   onProcessing: (loading: boolean) => void;
// }

// interface RazorpayFailedResponse {
//   error: {
//     code: string;
//     description: string;
//     source: string;
//     step: string;
//     reason: string;
//     metadata: {
//       order_id: string;
//       payment_id: string;
//     };
//   };
// }

// export const PaymentButton: React.FC<PaymentButtonProps> = ({
//   paymentMethod,
//   customerInfo,
//   isValid,
//   onProcessing,
// }) => {
//   const { cart, cartTotal, clearCart } = useCart();
//   const { user } = useAuth();
//   const router = useRouter();
//   const [isLocallyLoading, setIsLocallyLoading] = useState(false);

//   const discount = 0;
//   const promoCode = null;
//   const finalAmount = cartTotal - discount;

//   const loadRazorpayScript = (): Promise<boolean> => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) {
//         resolve(true);
//         return;
//       }
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async () => {
//     if (!user) {
//       alert('You must be securely logged in to complete transactions.');
//       return;
//     }

//     setIsLocallyLoading(true);
//     onProcessing(true);

//     try {
//       if (paymentMethod === 'COD') {
//         const response = await fetch('/api/payment/verify', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             rayorpayOrderId: '',
//             razorpayPaymentId: '', 
//             razorpaySignature: '', 
//             orderData: {
//               userId: user.uid,
//               customerName: customerInfo.name,
//               phone: customerInfo.phone,
//               email: customerInfo.email,
//               tableNumber: "Table X", 
//               items: cart,
//               subtotal: cartTotal,
//               discount: discount,
//               promoCode: promoCode,
//               total: finalAmount, 
//               paymentMethod: 'COD',
//               paymentStatus: 'Pending',
//               orderStatus: 'Confirmed',
//               status: 'pending', // 🔥 FIX: Admin panel layout mapping value added
//               createdAt: Date.now() // 🔥 FIX: Sorting parameter explicitly injected
//             },
//           }),
//         });

//         const data = await response.json();
//         if (response.ok && data.success) {
//           clearCart();
//           return router.push(`/checkout/success?id=${data.orderId}`);
//         } else {
//           alert(data.error || 'Failed to complete Cash on Delivery order.');
//           setIsLocallyLoading(false);
//           onProcessing(false);
//         }
//       } else {
//         const scriptLoaded = await loadRazorpayScript();
//         if (!scriptLoaded) {
//           alert('Failed to load online payment gateway runtime. Check internet accessibility.');
//           setIsLocallyLoading(false);
//           onProcessing(false);
//           return;
//         }

//         const orderRes = await fetch('/api/payment/create-order', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ 
//             amount: finalAmount,
//             currency: 'INR',
//             customerName: customerInfo.name,
//             phone: customerInfo.phone,
//             email: customerInfo.email
//           }),
//         });

//         if (!orderRes.ok) {
//           const errorData = await orderRes.json().catch(() => ({}));
//           const backendError = errorData.error || 'Unable to establish upstream financial collection.';
//           alert(`Validation Error: ${backendError}`); 
//           setIsLocallyLoading(false);
//           onProcessing(false);
//           return;
//         }

//         const razorpayOrder = await orderRes.json();

//         const options: RazorpayCheckoutOptions = {
//           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//           amount: razorpayOrder.amount,
//           currency: razorpayOrder.currency,
//           name: 'Gourmet Restaurant Website',
//           description: `Order Payment for execution clearance`,
//           order_id: razorpayOrder.orderId, 
//           handler: async function (response: RazorpayPaymentResponse) {
//             try {
//               onProcessing(true);
              
//               const verifyRes = await fetch('/api/payment/verify', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                   razorpayOrderId: response.razorpay_order_id,
//                   razorpayPaymentId: response.razorpay_payment_id,
//                   razorpaySignature: response.razorpay_signature,
//                   orderData: {
//                     userId: user.uid,
//                     customerName: customerInfo.name,
//                     phone: customerInfo.phone,
//                     email: customerInfo.email,
//                     tableNumber: "Table X",
//                     items: cart,
//                     subtotal: cartTotal,
//                     discount: discount,
//                     promoCode: promoCode,
//                     total: finalAmount,
//                     paymentMethod: 'RAZORPAY',
//                     paymentStatus: 'Paid',
//                     orderStatus: 'Confirmed',
//                     status: 'pending', // 🔥 FIX: Admin panel layout mapping value added
//                     createdAt: Date.now() // 🔥 FIX: Sorting parameter explicitly injected
//                   },
//                 }),
//               });

//               const verifyData = await verifyRes.json();
//               if (verifyRes.ok && verifyData.success) {
//                 clearCart();
//                 router.push(`/checkout/success?id=${verifyData.orderId}`);
//                 return;
//               } else {
//                 alert(verifyData.error || 'Signature verification failed.');
//                 setIsLocallyLoading(false);
//                 onProcessing(false);
//               }
//             } catch (err) {
//               console.error(err);
//               alert('Error execution parameter checks failed while verifying transactions.');
//               setIsLocallyLoading(false);
//               onProcessing(false);
//             }
//           },
//           prefill: {
//             name: customerInfo.name,
//             email: customerInfo.email,
//             contact: customerInfo.phone,
//           },
//           theme: {
//             color: '#F97316',
//           },
//           modal: {
//             ondismiss: function () {
//               setIsLocallyLoading(false);
//               onProcessing(false);
//               alert('Payment interface window closed by user request.');
//             },
//           },
//         };

//         const paymentWindow = new window.Razorpay(options);
        
//         paymentWindow.on('payment.failed', function (response: unknown) {
//           const failedData = response as RazorpayFailedResponse;
//           alert(`Transaction failed context: ${failedData.error.description}`);
//           setIsLocallyLoading(false);
//           onProcessing(false);
//         });
        
//         paymentWindow.open();
//       }
//     } catch (error: unknown) {
//       console.error(error);
//       setIsLocallyLoading(false);
//       onProcessing(false);
//       const errorMessage = error instanceof Error ? error.message : 'Unknown compilation exception error';
//       alert(errorMessage || 'Fatal crash within routing handler loop.');
//     }
//   };

//   return (
//     <button
//       type="button"
//       onClick={handlePayment}
//       disabled={!isValid || isLocallyLoading || cart.length === 0}
//       className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 shadow-md ${
//         !isValid || isLocallyLoading || cart.length === 0
//           ? 'bg-gray-400 cursor-not-allowed shadow-none'
//           : 'bg-orange-500 hover:bg-orange-600 active:scale-[0.99]'
//       }`}
//     >
//       {isLocallyLoading
//         ? 'Processing System Operations...'
//         : paymentMethod === 'COD'
//         ? 'Place Cash On Delivery Order'
//         : 'Proceed to Secure Payment Gateway'}
//     </button>
//   );
// };/
'use client';

import React, { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

import type { 
  RazorpayCheckoutOptions, 
  RazorpayPaymentResponse 
} from '../../types/payment';

// 🔥 FIX: Props se 'customOrderId' hata diya gaya hai taaki TS Error 2322 fix ho sake
interface PaymentButtonProps {
  paymentMethod: 'COD' | 'ONLINE';
  customerInfo: {
    name: string;
    phone: string;
    email: string;
  };
  isValid: boolean;
  onProcessing: (loading: boolean) => void;
  subtotal: number;
  tax: number;
  totalAmount: number;
}

interface RazorpayFailedResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
  };
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  paymentMethod,
  customerInfo,
  isValid,
  onProcessing,
  subtotal,
  tax,
  totalAmount
}) => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [isLocallyLoading, setIsLocallyLoading] = useState(false);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!user) {
      alert('You must be securely logged in to complete transactions.');
      return;
    }

    setIsLocallyLoading(true);
    onProcessing(true);

    // 🔥 FIX: Cryptographically secure ya safe function ab sirf click handler loop ke ANDAR execute hoga.
    // Yeh render phase mein nahi chal raha, isliye React Purity rules isse completely safe maante hain!
    const min = 10000000;
    const max = 99999999;
    const customOrderId = String(Math.floor(Math.random() * (max - min + 1)) + min);

    try {
      if (paymentMethod === 'COD') {
        const response = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rayorpayOrderId: '',
            razorpayPaymentId: '', 
            razorpaySignature: '', 
            customOrderId: customOrderId, 
            orderData: {
              userId: user.uid,
              customerName: customerInfo.name,
              phone: customerInfo.phone,
              email: customerInfo.email,
              tableNumber: "Table X", 
              items: cart,
              subtotal: subtotal,
              tax: tax,
              total: totalAmount, 
              paymentMethod: 'COD',
              paymentStatus: 'Pending',
              orderStatus: 'Confirmed',
              status: 'pending',
              createdAt: Date.now()
            },
          }),
        });

        const data = await response.json();
        if (response.ok && data.success) {
          clearCart();
          return router.push(`/checkout/success?id=${data.orderId || customOrderId}`);
        } else {
          alert(data.error || 'Failed to complete Cash on Delivery order.');
          setIsLocallyLoading(false);
          onProcessing(false);
        }
      } else {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          alert('Failed to load online payment gateway runtime. Check internet accessibility.');
          setIsLocallyLoading(false);
          onProcessing(false);
          return;
        }

        const orderRes = await fetch('/api/payment/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            amount: totalAmount,
            currency: 'INR',
            customerName: customerInfo.name,
            phone: customerInfo.phone,
            email: customerInfo.email
          }),
        });

        if (!orderRes.ok) {
          const errorData = await orderRes.json().catch(() => ({}));
          const backendError = errorData.error || 'Unable to establish upstream financial collection.';
          alert(`Validation Error: ${backendError}`); 
          setIsLocallyLoading(false);
          onProcessing(false);
          return;
        }

        const razorpayOrder = await orderRes.json();

        const options: RazorpayCheckoutOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: 'Gourmet Restaurant Website',
          description: `Order Payment for execution clearance`,
          order_id: razorpayOrder.orderId, 
          handler: async function (response: RazorpayPaymentResponse) {
            try {
              onProcessing(true);
              
              const verifyRes = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  customOrderId: customOrderId,
                  orderData: {
                    userId: user.uid,
                    customerName: customerInfo.name,
                    phone: customerInfo.phone,
                    email: customerInfo.email,
                    tableNumber: "Table X",
                    items: cart,
                    subtotal: subtotal,
                    tax: tax,
                    total: totalAmount,
                    paymentMethod: 'RAZORPAY',
                    paymentStatus: 'Paid',
                    orderStatus: 'Confirmed',
                    status: 'pending',
                    createdAt: Date.now()
                  },
                }),
              });

              const verifyData = await verifyRes.json();
              if (verifyRes.ok && verifyData.success) {
                clearCart();
                return router.push(`/checkout/success?id=${verifyData.orderId || customOrderId}`);
              } else {
                alert(verifyData.error || 'Signature verification failed.');
                setIsLocallyLoading(false);
                onProcessing(false);
              }
            } catch (err) {
              console.error(err);
              alert('Error execution parameter checks failed while verifying transactions.');
              setIsLocallyLoading(false);
              onProcessing(false);
            }
          },
          prefill: {
            name: customerInfo.name,
            email: customerInfo.email,
            contact: customerInfo.phone,
          },
          theme: {
            color: '#F97316',
          },
          modal: {
            ondismiss: function () {
              setIsLocallyLoading(false);
              onProcessing(false);
              alert('Payment interface window closed by user request.');
            },
          },
        };

        const paymentWindow = new window.Razorpay(options);
        
        paymentWindow.on('payment.failed', function (response: unknown) {
          const failedData = response as RazorpayFailedResponse;
          alert(`Transaction failed context: ${failedData.error.description}`);
          setIsLocallyLoading(false);
          onProcessing(false);
        });
        
        paymentWindow.open();
      }
    } catch (error: unknown) {
      console.error(error);
      setIsLocallyLoading(false);
      onProcessing(false);
      const errorMessage = error instanceof Error ? error.message : 'Unknown compilation exception error';
      alert(errorMessage || 'Fatal crash within routing handler loop.');
    }
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={!isValid || isLocallyLoading || cart.length === 0}
      className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 shadow-md ${
        !isValid || isLocallyLoading || cart.length === 0
          ? 'bg-gray-400 cursor-not-allowed shadow-none'
          : 'bg-orange-500 hover:bg-orange-600 active:scale-[0.99]'
      }`}
    >
      {isLocallyLoading
        ? 'Processing System Operations...'
        : paymentMethod === 'COD'
        ? 'Place Cash On Delivery Order'
        : 'Proceed to Secure Payment Gateway'}
    </button>
  );
};