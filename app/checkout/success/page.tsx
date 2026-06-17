// // 'use client';

// // import React, { useEffect, useState, Suspense } from 'react';
// // import { useSearchParams } from 'next/navigation';
// // import Link from 'next/link';
// // import { db } from '@/lib/firebase'; 
// // import { doc, onSnapshot } from 'firebase/firestore';

// // // Detailed Interface for Professional Receipt
// // interface OrderItem {
// //   id: string;
// //   name: string;
// //   quantity: number;
// //   price: number;
// // }

// // interface OrderDetails {
// //   id: string;
// //   orderNo: string; 
// //   items: OrderItem[];
// //   subtotal: number;
// //   tax: number;
// //   total: number;
// //   tableNumber: string;
// //   paymentMethod: string;
// //   customerName: string;
// //   status: string;
// // }

// // function SuccessPageContent() {
// //   const searchParams = useSearchParams();
// //   // const router = useRouter();
// //   const orderId = searchParams.get('id');
  
// //   const [order, setOrder] = useState<OrderDetails | null>(null);
// //   const [loading, setLoading] = useState(() => !orderId);

// //   useEffect(() => {
// //     if (!orderId) return;

// //     const orderDocRef = doc(db, 'orders', orderId);

// //     const unsubscribe = onSnapshot(orderDocRef, (docSnap) => {
// //       if (docSnap.exists()) {
// //         const data = docSnap.data();
// //         const rawOrderNo = data.orderNo || 0;
// //         const formattedOrderNo = String(rawOrderNo).padStart(3, '0');

// //         setOrder({
// //           id: docSnap.id,
// //           orderNo: formattedOrderNo,
// //           items: data.items || [], // Array of items ordered
// //           subtotal: data.subtotal || 0,
// //           tax: data.tax || 0,
// //           total: data.total || 0,
// //           tableNumber: data.tableNumber || 'N/A',
// //           paymentMethod: data.paymentMethod || 'UNKNOWN',
// //           customerName: data.customerName || 'Valued Guest',
// //           status: data.status || 'Pending'
// //         });
// //       } else {
// //         console.error("No such order found!");
// //       }
// //       setLoading(false);
// //     }, (error) => {
// //       console.error('Error fetching real-time data:', error);
// //       setLoading(false);
// //     });

// //     return () => unsubscribe();
// //   }, [orderId]);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center text-white">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
// //       </div>
// //     );
// //   }

// //   if (!order && !loading) {
// //     return (
// //       <div className="min-h-screen bg-[#0B0F17] flex flex-col items-center justify-center text-white p-4">
// //         <h2 className="text-xl font-bold mb-4">Order Details Not Found</h2>
// //         <Link href="/menu" className="bg-orange-500 px-4 py-2 rounded-xl">Go back to Menu</Link>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#0B0F17] text-gray-100 flex flex-col items-center justify-center p-4 relative overflow-y-auto py-12">
// //       <div className="absolute top-[-20%] left-[-10%] w-125 h-125 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
// //       <div className="absolute bottom-[-20%] right-[-10%] w-125 h-125 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

// //       {/* Main Container */}
// //       <div className="w-full max-w-md bg-[#161C2A]/60 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl text-center relative z-10">
        
// //         {/* Success Header */}
// //         <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-4 animate-bounce">
// //           <svg className="h-8 w-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
// //           </svg>
// //         </div>

// //         <h1 className="text-2xl font-extrabold text-white mb-1">Order Placed Successfully!</h1>
// //         <p className="text-gray-400 text-xs mb-6">Thank you, {order?.customerName}. Your order has been sent to the kitchen.</p>

// //         {/* Digital Invoice / Receipt */}
// //         <div className="bg-[#0F1320]/80 border border-gray-800/80 rounded-2xl p-5 text-left space-y-4 mb-6">
          
// //           {/* TOKEN DISPLAY */}
// //           <div className="flex flex-col items-center justify-center py-2 border-b border-dashed border-gray-800 text-center">
// //             <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase mb-0.5">Token Number</span>
// //             <span className="text-4xl font-black text-orange-500 font-mono tracking-widest"> </span>
// //               {order?.orderNo}
// //           <p className="font-semibold text-white-800 dark:text-white uppercase font-mono">
// //                     ID: #{order?.id?.slice(0, 8)}
// //                   </p>
// //           </div>
          

// //           {/* ITEM SUMMARY SECTION */}
// //           <div className="border-b border-gray-800/60 pb-3">
// //             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Items Ordered</h3>
// //             <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
// //               {order?.items.map((item) => (
// //                 <div key={item.id} className="flex justify-between items-center text-sm">
// //                   <span className="text-gray-300">
// //                     {item.name} <span className="text-xs text-orange-400 font-bold">x{item.quantity}</span>
// //                   </span>
// //                   <span className="font-mono text-gray-400">₹{(item.price * item.quantity).toFixed(2)}</span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* BILL BREAKDOWN */}
// //           <div className="space-y-1.5 text-xs border-b border-gray-800/60 pb-3">
// //             <div className="flex justify-between text-gray-400">
// //               <span>Subtotal</span>
// //               <span className="font-mono">₹{order?.subtotal.toFixed(2)}</span>
// //             </div>
// //             <div className="flex justify-between text-gray-400">
// //               <span>GST / Taxes</span>
// //               <span className="font-mono">₹{order?.tax.toFixed(2)}</span>
// //             </div>
// //             <div className="flex justify-between text-gray-400">
// //               <span>Table Info</span>
// //               <span className="text-white font-medium bg-gray-800 px-1.5 py-0.5 rounded">{order?.tableNumber}</span>
// //             </div>
// //           </div>

// //           {/* TOTAL AMOUNT */}
// //           <div className="flex justify-between items-center pt-1">
// //             <span className="text-sm font-bold text-white">Amount Paid</span>
// //             <span className="text-lg font-extrabold text-emerald-400">₹{order?.total.toFixed(2)}</span>
// //           </div>
// //         </div>

// //         {/* CONTACT & SUPPORT SECTION */}
// //         <div className="bg-gray-900/40 border border-gray-800/50 rounded-xl p-3.5 mb-6 text-left text-xs">
// //           <p className="text-gray-400 font-semibold mb-1">Need help with your order?</p>
// //           <p className="text-gray-500 mb-2">If you have any changes or queries, contact the restaurant counter immediately:</p>
// //           <div className="flex justify-between text-orange-400 font-medium">
// //             <a href="tel:+919876543210" className="hover:underline">📞 Call: +91 98765 43210</a>
// //             <span>📍 Counter No. 1</span>
// //           </div>
// //         </div>

// //         {/* ACTIONS */}
// //         <div className="space-y-2.5">
// //           <Link
// //             href="/my-orders"
// //             className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all text-sm shadow-md shadow-emerald-600/10"
// //           >
// //             Track in My Orders 📋
// //           </Link>
          
// //           <Link
// //             href="/menu"
// //             className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all text-sm active:scale-[0.99]"
// //           >
// //             Order Something More
// //           </Link>
// //         </div>

// //         {/* <p className="mt-4 text-[11px] text-gray-500">
// //           Order ID: <span className="font-mono select-all text-gray-400">{orderId}</span>
// //         </p> */}

// //       </div>
// //     </div>
// //   );
// // }

// // export default function SuccessPage() {
// //   return (
// //     <Suspense fallback={
// //       <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center text-white">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
// //       </div>
// //     }>
// //       <SuccessPageContent />
// //     </Suspense>
// //   );
// // }
// "use client";

// import React, { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import { db, auth } from "@/lib/firebase"; 
// import { doc, onSnapshot } from "firebase/firestore";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { 
//   CheckCircle2, 
//   ShoppingBag, 
//   UtensilsCrossed, 
//   Clock, 
//   Receipt, 
//   ArrowRight,
//   MapPin,
//   Calendar
// } from "lucide-react";

// interface OrderItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
//   category: string;
// }

// interface OrderData {
//   id?: string;
//   userId: string;
//   customerName: string;
//   customerPhone: string;
//   customerEmail: string;
//   items: OrderItem[];
//   subtotal?: number;
//   subTotal?: number;
//   discount?: number;
//   promoCode?: string;
//   totalAmount?: number;
//   total?: number;
//   status: string;
//   paymentMethod: string;
//   tableNumber?: string | number;
//   createdAt: any;
// }

// export default function CheckoutSuccessPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const orderId = searchParams.get("id");

//   const [user, setUser] = useState<User | null>(null);
//   const [authLoading, setAuthLoading] = useState(true);
//   const [order, setOrder] = useState<OrderData | null>(null);
//   const [orderLoading, setOrderLoading] = useState(true);

//   const fallbackImage = "https://images.unsplash.com/photo-1561047029-3000c68339ca";

//   // 1. Firebase Auth tracking
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setAuthLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   // 2. Real-time Firestore document retrieval
//   useEffect(() => {
//     if (!orderId) {
//       setOrderLoading(false);
//       return;
//     }

//     const docRef = doc(db, "orders", orderId);
//     const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
//       if (docSnap.exists()) {
//         setOrder({
//           id: docSnap.id,
//           ...docSnap.data()
//         } as OrderData);
//       } else {
//         console.error("No such order database record found matching ID:", orderId);
//       }
//       setOrderLoading(false);
//     }, (error) => {
//       console.error("Error subscribing to order document streams:", error);
//       setOrderLoading(false);
//     });

//     return () => unsubscribeSnapshot();
//   }, [orderId]);

//   if (authLoading || orderLoading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] dark:bg-gray-950">
//         <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
//         <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Assembling receipt snapshot...</p>
//       </div>
//     );
//   }

//   if (!orderId || !order) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] dark:bg-gray-950 px-4 text-center">
//         <div className="max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
//           <p className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Order Reference Absent</p>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
//             We cannot verify receipt data fields because the structural invoice token parameters are invalid.
//           </p>
//           <button onClick={() => router.push("/menu")} className="w-full bg-orange-500 text-white py-3 px-4 rounded-xl font-semibold">
//             Return to Menu
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const rawPaymentMethod = (order.paymentMethod || "").toUpperCase();
//   const isCashOnTable = rawPaymentMethod.includes("CASH") || rawPaymentMethod.includes("TABLE");

//   // Safe Math Fallbacks to prevent .toFixed() runtime crashes
//   const displaySubtotal = Number(order.subtotal || order.subTotal || 0);
//   const displayDiscount = Number(order.discount || 0);
//   const displayTotal = Number(order.totalAmount || order.total || 0);

//   return (
//     <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-12 px-4">
//       <div className="max-w-xl mx-auto">
        
//         {/* SUCCESS CARD HEADER */}
//         <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-xl text-center space-y-4 mb-6">
//           <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
//             <CheckCircle2 className="w-10 h-10" />
//           </div>
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">Order Confirmed!</h1>
//             <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider mt-1">
//               Sent directly to the kitchen
//             </p>
//           </div>
          
//           <div className="pt-2 flex items-center justify-center gap-1.5 flex-wrap">
//             <span className="text-xs text-gray-400">Order ID:</span>
//             <span className="text-xs font-mono font-bold bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded text-gray-800 dark:text-gray-200 uppercase tracking-wider">
//               {orderId}
//             </span>
//           </div>
//         </div>

//         {/* LOGISTICS & SERVICE META DETAILS */}
//         <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-md space-y-4 mb-6">
//           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-2">
//             Service Tracking Details
//           </h3>
//           <div className="grid grid-cols-2 gap-4 text-xs">
//             <div className="space-y-1">
//               <span className="text-gray-400 block">Assigned Destination</span>
//               {order.tableNumber ? (
//                 <span className="inline-flex items-center gap-1 font-bold text-orange-500 text-sm">
//                   <UtensilsCrossed className="w-3.5 h-3.5" /> Table {order.tableNumber}
//                 </span>
//               ) : (
//                 <span className="font-semibold text-gray-700 dark:text-gray-300">Takeaway Counter</span>
//               )}
//             </div>
//             <div className="space-y-1">
//               <span className="text-gray-400 block">Payment Logistics</span>
//               <span className="font-semibold text-gray-800 dark:text-gray-200">
//                 {isCashOnTable ? "🪙 Cash On Table" : "💳 Settled Online"}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* RECEIPTS ITEMS DISPATCH MATRICES */}
//         <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-md space-y-4 mb-6">
//           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-2">
//             Items Invoice summary
//           </h3>
          
//           <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-60 overflow-y-auto pr-1">
//             {order.items?.map((item, idx) => {
//               const itemPrice = Number(item.price || 0);
//               const itemQuantity = Number(item.quantity || 1);
//               return (
//                 <div key={item.id || idx} className="py-3 flex items-center justify-between gap-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
//                       {/* eslint-disable-next-line @next/next/no-img-element */}
//                       <img
//                         src={item.image && item.image.trim() !== "" ? item.image : fallbackImage}
//                         alt={item.name || "Menu item"}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div>
//                       <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{item.name || "Café Item"}</h4>
//                       <p className="text-xs text-gray-400 font-medium">₹{itemPrice.toFixed(2)} × {itemQuantity}</p>
//                     </div>
//                   </div>
//                   <span className="text-sm font-bold text-gray-800 dark:text-white">
//                     ₹{(itemPrice * itemQuantity).toFixed(2)}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>

//           {/* PRICES BILLING CALCULATION */}
//           <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2 text-xs">
//             <div className="flex justify-between text-gray-500">
//               <span>Subtotal</span>
//               <span>₹{displaySubtotal.toFixed(2)}</span>
//             </div>
//             {displayDiscount > 0 && (
//               <div className="flex justify-between text-emerald-600 font-medium">
//                 <span>Promo Discount {order.promoCode ? `(${order.promoCode.toUpperCase()})` : ""}</span>
//                 <span>-₹{displayDiscount.toFixed(2)}</span>
//               </div>
//             )}
//             <div className="flex justify-between text-sm font-black text-gray-900 dark:text-white pt-2 border-t border-dashed border-gray-200 dark:border-gray-800">
//               <span>Grand Total</span>
//               <span className="text-orange-500 text-base">₹{displayTotal.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* FOOTER ACTIONS COMPONENT */}
//         <div className="flex flex-col sm:flex-row items-center gap-3">
//           <Link href="/myorders" className="w-full text-center py-3 px-4 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl font-semibold text-sm transition">
//             View Live Tracking
//           </Link>
//           <Link href="/menu" className="w-full text-center py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-sm shadow-md transition flex items-center justify-center gap-2">
//             <span>Order Something Else</span>
//             <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// }
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/firebase'; 
import { doc, onSnapshot } from 'firebase/firestore';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  id: string;
  orderNo: string; 
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  tableNumber: string;
  paymentMethod: string;
  customerName: string;
  status: string;
}

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [sessionTable, setSessionTable] = useState<string>('N/A');
  const [loading, setLoading] = useState(() => !orderId);

  useEffect(() => {
    let isCurrent = true;

    // 🛠️ FIX 1: Hydration and ESLint sync-render safety using async microtask block
    setTimeout(() => {
      if (!isCurrent) return;
      if (typeof window !== 'undefined') {
        const storedTable = sessionStorage.getItem('qr_table_number');
        if (storedTable) {
          setSessionTable(storedTable);
          console.log("🎒 Success Page Recovered Session Table:", storedTable);
        }
      }
    }, 0);

    if (!orderId) return;

    const orderDocRef = doc(db, 'orders', orderId);

    const unsubscribe = onSnapshot(orderDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const rawOrderNo = data.orderNo || 0;
        const formattedOrderNo = String(rawOrderNo).padStart(3, '0');

        // 🛠️ FIX 2: Strict Table Extraction validation order
        // Pehle active valid values check karega, agar invalid ya empty string string mila toh direct session storage use karega
        const localBackup = typeof window !== 'undefined' ? sessionStorage.getItem('qr_table_number') : null;
        
        let resolvedTable = data.tableNumber || data.table_number || localBackup || 'N/A';
        
        // Agar firestore se direct empty string ya 'Takeaway' return ho raha ho jabki user QR se aaya hai
        if ((resolvedTable === 'Takeaway' || resolvedTable === '') && localBackup) {
          resolvedTable = localBackup;
        }

        setOrder({
          id: docSnap.id,
          orderNo: formattedOrderNo,
          items: data.items || [], 
          subtotal: Number(data.subtotal || data.subTotal || 0),
          tax: Number(data.tax || 0),
          total: Number(data.total || data.totalAmount || 0),
          tableNumber: resolvedTable.toString(),
          paymentMethod: data.paymentMethod || data.payment_method || 'UNKNOWN',
          customerName: data.customerName || 'Valued Guest',
          status: data.status || 'Pending'
        });
      } else {
        console.error("No such order found!");
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching real-time data:', error);
      setLoading(false);
    });

    return () => {
      isCurrent = false;
      unsubscribe();
    };
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!order && !loading) {
    return (
      <div className="min-h-screen bg-[#0B0F17] flex flex-col items-center justify-center text-white p-4">
        <h2 className="text-xl font-bold mb-4">Order Details Not Found</h2>
        <Link href="/menu" className="bg-orange-500 px-4 py-2 rounded-xl">Go back to Menu</Link>
      </div>
    );
  }

  // Final validation layout fallback hierarchy
  const displayTableNumber = order?.tableNumber && order.tableNumber !== 'N/A' && order.tableNumber !== '' 
    ? order.tableNumber 
    : (sessionTable !== 'N/A' ? sessionTable : 'Takeaway');

  return (
    <div className="min-h-screen bg-[#0B0F17] text-gray-100 flex flex-col items-center justify-center p-4 relative overflow-y-auto py-12">
      <div className="absolute top-[-20%] left-[-10%] w-125 h-125 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-125 h-125 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md bg-[#161C2A]/60 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl text-center relative z-10">
        
        {/* Success Header */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-4 animate-bounce">
          <svg className="h-8 w-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-extrabold text-white mb-1">Order Placed Successfully!</h1>
        <p className="text-gray-400 text-xs mb-6">Thank you, {order?.customerName}. Your order has been sent to the kitchen.</p>

        {/* Digital Invoice / Receipt */}
        <div className="bg-[#0F1320]/80 border border-gray-800/80 rounded-2xl p-5 text-left space-y-4 mb-6">
          
          {/* TOKEN DISPLAY */}
          <div className="flex flex-col items-center justify-center py-2 border-b border-dashed border-gray-800 text-center">
            <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase mb-0.5">Token Number</span>
            <span className="text-4xl font-black text-orange-500 font-mono tracking-widest mb-1">
              {order?.orderNo}
            </span>
            <p className="font-semibold text-gray-400 uppercase font-mono text-[11px]">
              ID: #{order?.id?.slice(0, 8)}
            </p>
          </div>

          {/* ITEM SUMMARY SECTION */}
          <div className="border-b border-gray-800/60 pb-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Items Ordered</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {order?.items.map((item, idx) => (
                <div key={item.id || idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">
                    {item.name} <span className="text-xs text-orange-400 font-bold">x{item.quantity}</span>
                  </span>
                  <span className="font-mono text-gray-400">₹{(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BILL BREAKDOWN */}
          <div className="space-y-1.5 text-xs border-b border-gray-800/60 pb-3">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span className="font-mono">₹{(order?.subtotal || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>GST / Taxes</span>
              <span className="font-mono">₹{(order?.tax || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>Table Info</span>
              <span className="text-white font-black bg-orange-600/90 px-2 py-0.5 rounded shadow-sm tracking-wide text-[11px]">
                {displayTableNumber.startsWith('Table') ? displayTableNumber : `Table ${displayTableNumber}`}
              </span>
            </div>
          </div>

          {/* TOTAL AMOUNT */}
          <div className="flex justify-between items-center pt-1">
            <span className="text-sm font-bold text-white">Amount Paid</span>
            <span className="text-lg font-extrabold text-emerald-400">₹{(order?.total || 0).toFixed(2)}</span>
          </div>
        </div>

        {/* CONTACT & SUPPORT SECTION */}
        <div className="bg-gray-900/40 border border-gray-800/50 rounded-xl p-3.5 mb-6 text-left text-xs">
          <p className="text-gray-400 font-semibold mb-1">Need help with your order?</p>
          <p className="text-gray-500 mb-2">If you have any changes or queries, contact the restaurant counter immediately:</p>
          <div className="flex justify-between text-orange-400 font-medium">
            <a href="tel:+919876543210" className="hover:underline">📞 Call: +91 98765 43210</a>
            <span>📍 Counter No. 1</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="space-y-2.5">
          <Link
            href="/myorders"
            className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all text-sm shadow-md shadow-emerald-600/10"
          >
            Track in My Orders 📋
          </Link>
          
          <Link
            href="/menu"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all text-sm active:scale-[0.99]"
          >
            Order Something More
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}