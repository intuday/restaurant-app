// 'use client';

// import React, { useState } from 'react';
// import { useCart } from '@/context/CartContext';
// import { useAuth } from '../context/AuthContext';
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

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// export const PaymentButton: React.FC<PaymentButtonProps> = ({
//   paymentMethod,
//   customerInfo,
//   isValid,
//   onProcessing,
// }) => {
//   const { cartItems, getCartSubtotal, discount, promoCode, clearCart } = useCart();
//   const { user } = useAuth();
//   const router = useRouter();
//   const [isLocallyLoading, setIsLocallyLoading] = useState(false);

//   const finalAmount = getCartSubtotal() - (discount || 0);

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
//         // Direct insertion using absolute server configuration context via standard route if preferred, 
//         // or a structural implementation call. For absolute security, standardizing system creation:
//         const response = await fetch('/api/payment/verify', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             razorpay_order_id: `cod_${Date.now()}`,
//             razorpay_payment_id: `cod_pay_${Date.now()}`,
//             razorpay_signature: 'N/A', // Bypassed signature check value natively inside standard structural rules
//             orderDetails: {
//               userId: user.uid,
//               customerName: customerInfo.name,
//               customerPhone: customerInfo.phone,
//               customerEmail: customerInfo.email,
//               items: cartItems,
//               subtotal: getCartSubtotal(),
//               discount: discount || 0,
//               promoCode: promoCode || null,
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
//         // ONLINE PAYMENT FLOW
//         const scriptLoaded = await loadRazorpayScript();
//         if (!scriptLoaded) {
//           alert('Failed to load online payment gateway runtime. Check internet accessibility.');
//           setIsLocallyLoading(false);
//           onProcessing(false);
//           return;
//         }

//         // 1. Request Order Creation from Backend
//         const orderRes = await fetch('/api/payment/create-order', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ amount: finalAmount }),
//         });

//         if (!orderRes.ok) {
//           throw new Error('Unable to establish real-time upstream financial collection parameters.');
//         }

//         const razorpayOrder = await orderRes.json();

//         // 2. Configure Gateway Checkout Interface Runtime Options
//         const options = {
//           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//           amount: razorpayOrder.amount,
//           currency: razorpayOrder.currency,
//           name: 'Gourmet Restaurant Website',
//           description: `Order Payment for execution clearance`,
//           order_id: razorpayOrder.id,
//           handler: async function (response: any) {
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
//                     items: cartItems,
//                     subtotal: getCartSubtotal(),
//                     discount: discount || 0,
//                     promoCode: promoCode || null,
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
//             color: '#F97316', // Custom Restaurant Primary Accent Orange
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
//         paymentWindow.on('payment.failed', function (response: any) {
//           alert(`Transaction failed context: ${response.error.description}`);
//           setIsLocallyLoading(false);
//           onProcessing(false);
//         });
//         paymentWindow.open();
//       }
//     } catch (error: any) {
//       console.error(error);
//       alert(error.message || 'Fatal crash within routing handler loop integration parameters.');
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
//       disabled={!isValid || isLocallyLoading || cartItems.length === 0}
//       className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 shadow-md ${
//         !isValid || isLocallyLoading || cartItems.length === 0
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