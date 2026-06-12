// 'use client';

// import React, { useState } from 'react';
// import { useCart } from '../app/context/CartContext';
// import { useAuth } from '../app/context/AuthContext';
// import { useRouter } from 'next/navigation';

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

// // Strong type definitions replacing 'any' instances to satisfy lint rules
// interface RazorpaySuccessResponse {
//   razorpay_order_id: string;
//   razorpay_payment_id: string;
//   razorpay_signature: string;
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

// interface RazorpayInstance {
//   open: () => void;
//   on: (event: 'payment.failed', callback: (response: RazorpayFailedResponse) => void) => void;
// }

// declare global {
//   interface Window {
//     Razorpay: new (options: Record<string, unknown>) => RazorpayInstance;
//   }
// }

// export const PaymentButton: React.FC<PaymentButtonProps> = ({
//   paymentMethod,
//   customerInfo,
//   isValid,
//   onProcessing,
// }) => {
//   // Aligned with your exact CartContext properties
//   const { cart, cartTotal, clearCart } = useCart();
//   const { user } = useAuth();
//   const router = useRouter();
//   const [isLocallyLoading, setIsLocallyLoading] = useState(false);

//   // Default placeholders for discount values since they aren't in your context type definition
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
//             razorpay_order_id: `cod_${Date.now()}`,
//             razorpay_payment_id: `cod_pay_${Date.now()}`,
//             razorpay_signature: 'N/A',
//             orderDetails: {
//               userId: user.uid,
//               customerName: customerInfo.name,
//               customerPhone: customerInfo.phone,
//               customerEmail: customerInfo.email,
//               items: cart,
//               subtotal: cartTotal,
//               discount: discount,
//               promoCode: promoCode,
//               totalAmount: finalAmount,
//             },
//           }),
//         });

//         const data = await response.json();
//         if (response.ok && data.success) {
//           clearCart();
//           router.push(`/checkout/success?id=${data.orderId}`);
//         } else {
//           alert(data.error || 'Failed to complete Cash on Delivery order.');
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
//           body: JSON.stringify({ amount: finalAmount }),
//         });

//         if (!orderRes.ok) {
//           throw new Error('Unable to establish real-time upstream financial collection parameters.');
//         }

//         const razorpayOrder = await orderRes.json();

//         const options = {
//           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//           amount: razorpayOrder.amount,
//           currency: razorpayOrder.currency,
//           name: 'Gourmet Restaurant Website',
//           description: `Order Payment for execution clearance`,
//           order_id: razorpayOrder.id,
//           handler: async function (response: RazorpaySuccessResponse) {
//             try {
//               onProcessing(true);
//               const verifyRes = await fetch('/api/payment/verify', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_payment_id: response.razorpay_payment_id,
//                   razorpay_signature: response.razorpay_signature,
//                   orderDetails: {
//                     userId: user.uid,
//                     customerName: customerInfo.name,
//                     customerPhone: customerInfo.phone,
//                     customerEmail: customerInfo.email,
//                     items: cart,
//                     subtotal: cartTotal,
//                     discount: discount,
//                     promoCode: promoCode,
//                     totalAmount: finalAmount,
//                   },
//                 }),
//               });

//               const verifyData = await verifyRes.json();
//               if (verifyRes.ok && verifyData.success) {
//                 clearCart();
//                 router.push(`/checkout/success?id=${verifyData.orderId}`);
//               } else {
//                 alert(verifyData.error || 'Signature manipulation detected or validation logic rejected order.');
//               }
//             } catch (err) {
//               console.error(err);
//               alert('Error execution parameter checks failed while verifying transactions.');
//             } finally {
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
//         paymentWindow.on('payment.failed', function (response: RazorpayFailedResponse) {
//           alert(`Transaction failed context: ${response.error.description}`);
//           setIsLocallyLoading(false);
//           onProcessing(false);
//         });
//         paymentWindow.open();
//       }
//     } catch (error: unknown) {
//       console.error(error);
//       const errorMessage = error instanceof Error ? error.message : 'Unknown compilation exception error';
//       alert(errorMessage || 'Fatal crash within routing handler loop integration parameters.');
//     } finally {
//       if (paymentMethod === 'COD') {
//         setIsLocallyLoading(false);
//         onProcessing(false);
//       }
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
// };