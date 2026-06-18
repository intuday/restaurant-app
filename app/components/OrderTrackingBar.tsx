// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { useRouter } from 'next/navigation';
// // // // import { doc, onSnapshot } from 'firebase/firestore';
// // // // import { db } from '@/lib/firebase';

// // // // interface OrderState {
// // // //   id: string;
// // // //   tableNumber: string;
// // // //   status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
// // // //   createdAt: number; // timestamp ms
// // // // }

// // // // export default function OrderTrackingBar() {
// // // //   const [order, setOrder] = useState<OrderState | null>(null);
// // // //   const [timeLeft, setTimeLeft] = useState<string>('15:00');
// // // //   const [isDelayed, setIsDelayed] = useState<boolean>(false);
// // // //   const router = useRouter();

// // // //   useEffect(() => {
// // // //     // 1. Fetch active order ID from local storage
// // // //     const activeOrderId = localStorage.getItem('active_order_id');
// // // //     if (!activeOrderId) return;

// // // //     // 2. Real-time Firebase Listener attachment
// // // //     const docRef = doc(db, 'orders', activeOrderId);
// // // //     const unsubscribe = onSnapshot(docRef, (docSnap) => {
// // // //       if (docSnap.exists()) {
// // // //         const data = docSnap.data();
// // // //         const status = data.status;

// // // //         // Auto-hide structural guard if order resolves
// // // //         if (status === 'completed' || status === 'cancelled') {
// // // //           localStorage.removeItem('active_order_id');
// // // //           setOrder(null);
// // // //         } else {
// // // //           setOrder({
// // // //             id: docSnap.id,
// // // //             tableNumber: data.tableNumber || 'Takeaway',
// // // //             status: status,
// // // //             createdAt: data.createdAt?.toMillis() || Date.now(),
// // // //           });
// // // //         }
// // // //       } else {
// // // //         setOrder(null);
// // // //       }
// // // //     });

// // // //     return () => unsubscribe();
// // // //   }, []);

// // // //   // 3. Absolute Synchronized Countdown Timer Engine
// // // //   useEffect(() => {
// // // //     if (!order) return;

// // // //     const interval = setInterval(() => {
// // // //       const now = Date.now();
// // // //       const orderTime = order.createdAt;
// // // //       const fifteenMinutesInMs = 15 * 60 * 1000;
// // // //       const elapsedTime = now - orderTime;
// // // //       const remainingTime = fifteenMinutesInMs - elapsedTime;

// // // //       if (remainingTime <= 0) {
// // // //         setIsDelayed(true);
// // // //         setTimeLeft('00:00');
// // // //         clearInterval(interval);
// // // //       } else {
// // // //         setIsDelayed(false);
// // // //         const minutes = Math.floor(remainingTime / 60 / 1000);
// // // //         const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
// // // //         setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
// // // //       }
// // // //     }, 1000);

// // // //     return () => clearInterval(interval);
// // // //   }, [order]);

// // // //   if (!order) return null;

// // // //   // Status badging mapping dictionary
// // // //   const statusLabels = {
// // // //     pending: '🕒 Order Received',
// // // //     preparing: '👨‍🍳 Cooking in Progress',
// // // //     ready: '🔔 Ready to Serve',
// // // //   };

// // // //   return (
// // // //     <div 
// // // //       onClick={() => router.push('/myorders')}
// // // //       className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-[0_-8px_30px_rgb(0,0,0,0.3)] border-t border-orange-500/30 p-4 cursor-pointer backdrop-blur-md transition-all duration-300 transform translate-y-0 hover:bg-gray-800"
// // // //     >
// // // //       <div className="max-w-6xl mx-auto flex items-center justify-between">
// // // //         <div className="flex items-center gap-3">
// // // //           <div className="bg-orange-600 p-2 rounded-full animate-pulse">
// // // //             <span className="text-xl">🍕</span>
// // // //           </div>
// // // //           <div>
// // // //             <h4 className="font-bold text-sm md:text-base text-orange-500">
// // // //               Active Order #{order.id.slice(-4).toUpperCase()}
// // // //             </h4>
// // // //             <p className="text-xs text-gray-400 font-medium">
// // // //               Table {order.tableNumber} • {isDelayed ? <span className="text-red-400 font-bold">Delayed</span> : statusLabels[order.status as keyof typeof statusLabels]}
// // // //             </p>
// // // //           </div>
// // // //         </div>

// // // //         <div className="text-right">
// // // //           {isDelayed ? (
// // // //             <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-bold border border-red-500/30 animate-pulse">
// // // //               ⚠️ Delayed
// // // //             </span>
// // // //           ) : (
// // // //             <div>
// // // //               <span className="text-xs text-gray-400 block uppercase tracking-wider">Estimated Time</span>
// // // //               <span className="text-base md:text-lg font-black text-white font-mono">{timeLeft} min</span>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { useRouter, usePathname } from 'next/navigation';
// // // import { doc, onSnapshot } from 'firebase/firestore';
// // // import { db } from '@/lib/firebase';

// // // interface OrderState {
// // //   id: string;
// // //   tableNumber: string;
// // //   status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
// // //   createdAt: number; // timestamp ms
// // // }

// // // export default function OrderTrackingBar() {
// // //   const [order, setOrder] = useState<OrderState | null>(null);
// // //   const [timeLeft, setTimeLeft] = useState<string>('15:00');
// // //   const [isDelayed, setIsDelayed] = useState<boolean>(false);
// // //   const router = useRouter();
// // //   const pathname = usePathname();

// // //   useEffect(() => {
// // //     // 1. Fetch active order ID from local storage
// // //     const activeOrderId = localStorage.getItem('active_order_id');
// // //     if (!activeOrderId) return;

// // //     // 2. Real-time Firebase Listener attachment
// // //     const docRef = doc(db, 'orders', activeOrderId);
// // //     const unsubscribe = onSnapshot(docRef, (docSnap) => {
// // //       if (docSnap.exists()) {
// // //         const data = docSnap.data();
// // //         const status = data.status;

// // //         // Auto-hide ONLY when admin marks order as completed or cancelled
// // //         if (status === 'completed' || status === 'cancelled') {
// // //           localStorage.removeItem('active_order_id');
// // //           setOrder(null);
// // //         } else {
// // //           setOrder({
// // //             id: docSnap.id,
// // //             tableNumber: data.tableNumber || 'Takeaway',
// // //             status: status,
// // //             // Fallback to current system timestamp safely if Firestore value hasn't resolved on server yet
// // //             createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now(),
// // //           });
// // //         }
// // //       } else {
// // //         setOrder(null);
// // //       }
// // //     }, (error) => {
// // //       console.error("Tracking dynamic listener failed:", error);
// // //     });

// // //     return () => unsubscribe();
// // //   }, []);

// // //   // 3. Absolute Synchronized Countdown Timer Engine
// // //   useEffect(() => {
// // //     if (!order) return;

// // //     const runTimerLogic = () => {
// // //       const now = Date.now();
// // //       const orderTime = order.createdAt;
// // //       const fifteenMinutesInMs = 15 * 60 * 1000;
// // //       const elapsedTime = now - orderTime;
// // //       const remainingTime = fifteenMinutesInMs - elapsedTime;

// // //       if (remainingTime <= 0) {
// // //         setIsDelayed(true);
// // //         setTimeLeft('00:00');
// // //       } else {
// // //         setIsDelayed(false);
// // //         const minutes = Math.floor(remainingTime / 60 / 1000);
// // //         const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
// // //         setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
// // //       }
// // //     };

// // //     runTimerLogic(); // Execute immediately once on mounted interval lifecycle
// // //     const interval = setInterval(runTimerLogic, 1000);

// // //     return () => clearInterval(interval);
// // //   }, [order]);

// // //   // If there's no active order, or if the customer is already on the dedicated /myorders route, hide the tracking bar.
// // //   if (!order || pathname === '/myorders') return null;

// // //   // Status badging mapping dictionary
// // //   const statusLabels = {
// // //     pending: '🕒 Order Received',
// // //     preparing: '👨‍🍳 Cooking in Progress',
// // //     ready: '🔔 Ready to Serve',
// // //   };

// // //   return (
// // //     <div 
// // //       onClick={() => router.push('/myorders')}
// // //       className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 text-white shadow-[0_-8px_30px_rgb(0,0,0,0.5)] border-t border-orange-500/40 p-4 cursor-pointer backdrop-blur-md transition-all duration-300 transform translate-y-0 hover:bg-gray-800 select-none"
// // //     >
// // //       <div className="max-w-6xl mx-auto flex items-center justify-between">
// // //         <div className="flex items-center gap-3">
// // //           <div className="bg-orange-600 p-2 rounded-full animate-pulse">
// // //             <span className="text-xl">🛒</span>
// // //           </div>
// // //           <div>
// // //             <h4 className="font-bold text-sm md:text-base text-orange-500">
// // //               Active Order #{order.id.slice(-4).toUpperCase()}
// // //             </h4>
// // //             <p className="text-xs text-gray-400 font-medium">
// // //               Table {order.tableNumber} • {isDelayed ? <span className="text-red-400 font-bold">⚠️ Order Delayed</span> : statusLabels[order.status as keyof typeof statusLabels]}
// // //             </p>
// // //           </div>
// // //         </div>

// // //         <div className="text-right">
// // //           {isDelayed ? (
// // //             <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-bold border border-red-500/30 animate-pulse uppercase tracking-wider text-[10px]">
// // //               Exceeded 15 Mins
// // //             </span>
// // //           ) : (
// // //             <div>
// // //               <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Estimated Time</span>
// // //               <span className="text-sm md:text-base font-black text-white font-mono">{timeLeft} remaining</span>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect, useCallback, useRef } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { doc, onSnapshot } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';

// // interface OrderState {
// //   id: string;
// //   tableNumber: string;
// //   status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
// //   createdAt: number;
// //   items?: number;
// //   totalAmount?: number;
// // }

// // const STATUS_CONFIG = {
// //   pending: {
// //     label: 'Order Placed',
// //     icon: '🕒',
// //     bgColor: 'bg-yellow-500/15',
// //     borderColor: 'border-yellow-500/30',
// //     progressColor: 'from-yellow-500 to-yellow-400',
// //     progressPercent: 25,
// //     pulseColor: 'bg-yellow-500',
// //     textColor: 'text-yellow-400',
// //   },
// //   preparing: {
// //     label: 'Being Prepared',
// //     icon: '🍳',
// //     bgColor: 'bg-orange-500/15',
// //     borderColor: 'border-orange-500/30',
// //     progressColor: 'from-orange-500 to-orange-400',
// //     progressPercent: 60,
// //     pulseColor: 'bg-orange-500',
// //     textColor: 'text-orange-400',
// //   },
// //   ready: {
// //     label: 'Ready to Serve',
// //     icon: '🔔',
// //     bgColor: 'bg-green-500/15',
// //     borderColor: 'border-green-500/30',
// //     progressColor: 'from-green-500 to-green-400',
// //     progressPercent: 100,
// //     pulseColor: 'bg-green-500',
// //     textColor: 'text-green-400',
// //   },
// //   completed: {
// //     label: 'Delivered',
// //     icon: '🎉',
// //     bgColor: 'bg-green-500/15',
// //     borderColor: 'border-green-500/30',
// //     progressColor: 'from-green-500 to-green-400',
// //     progressPercent: 100,
// //     pulseColor: 'bg-green-500',
// //     textColor: 'text-green-400',
// //   },
// //   cancelled: {
// //     label: 'Cancelled',
// //     icon: '❌',
// //     bgColor: 'bg-red-500/15',
// //     borderColor: 'border-red-500/30',
// //     progressColor: 'from-red-500 to-red-400',
// //     progressPercent: 0,
// //     pulseColor: 'bg-red-500',
// //     textColor: 'text-red-400',
// //   },
// // } as const;

// // const TIMELINE_STEPS = [
// //   {
// //     key: 'pending' as const,
// //     label: 'Order Received',
// //     sub: 'Restaurant got your order',
// //     icon: '📋',
// //   },
// //   {
// //     key: 'preparing' as const,
// //     label: 'Being Prepared',
// //     sub: 'Chef is cooking your food',
// //     icon: '🍳',
// //   },
// //   {
// //     key: 'ready' as const,
// //     label: 'Ready to Serve',
// //     sub: 'Your order is ready!',
// //     icon: '🔔',
// //   },
// //   {
// //     key: 'completed' as const,
// //     label: 'Served',
// //     sub: 'Enjoy your meal!',
// //     icon: '🎉',
// //   },
// // ];

// // const STATUS_ORDER = ['pending', 'preparing', 'ready', 'completed'] as const;

// // function OrderTrackingBar() {
// //   const [order, setOrder] = useState<OrderState | null>(null);
// //   const [timeLeft, setTimeLeft] = useState<string>('');
// //   const [isDelayed, setIsDelayed] = useState<boolean>(false);
// //   const [isExpanded, setIsExpanded] = useState<boolean>(false);
// //   const [mounted, setMounted] = useState<boolean>(false);
// //   // ✅ Use ref to avoid setState in effect for initial null check
// //   const orderRef = useRef<OrderState | null>(null);
// //   const router = useRouter();

// //   // ✅ Mount guard - no setState issues
// //   useEffect(() => {
// //     setMounted(true);
// //   }, []);

// //   // ✅ Firebase listener - setState only inside async callbacks (not synchronously)
// //   useEffect(() => {
// //     if (!mounted) return;

// //     const activeOrderId = localStorage.getItem('active_order_id');

// //     // ✅ Use ref check first, then schedule state update via callback pattern
// //     if (!activeOrderId) {
// //       // Use a microtask to avoid synchronous setState in effect body
// //       const timer = setTimeout(() => {
// //         setOrder(null);
// //         orderRef.current = null;
// //       }, 0);
// //       return () => clearTimeout(timer);
// //     }

// //     const docRef = doc(db, 'orders', activeOrderId);

// //     const unsubscribe = onSnapshot(
// //       docRef,
// //       // ✅ setState inside callback - this is the correct pattern
// //       (docSnap) => {
// //         if (!docSnap.exists()) {
// //           localStorage.removeItem('active_order_id');
// //           setOrder(null);
// //           orderRef.current = null;
// //           return;
// //         }

// //         const data = docSnap.data();
// //         const status = data.status as OrderState['status'];

// //         // ✅ Resolve createdAt from all possible Firestore formats
// //         let createdAtMs: number;
// //         if (data.createdAt?.toMillis) {
// //           createdAtMs = data.createdAt.toMillis();
// //         } else if (data.createdAt?.seconds) {
// //           createdAtMs = data.createdAt.seconds * 1000;
// //         } else if (typeof data.createdAt === 'number') {
// //           createdAtMs = data.createdAt;
// //         } else {
// //           const saved = localStorage.getItem(`order_created_${activeOrderId}`);
// //           createdAtMs = saved ? parseInt(saved, 10) : Date.now();
// //         }

// //         // ✅ Persist createdAt so timer survives page refresh
// //         localStorage.setItem(
// //           `order_created_${activeOrderId}`,
// //           String(createdAtMs)
// //         );

// //         const newOrder: OrderState = {
// //           id: docSnap.id,
// //           tableNumber: data.tableNumber || 'Takeaway',
// //           status,
// //           createdAt: createdAtMs,
// //           items: Array.isArray(data.items)
// //             ? data.items.length
// //             : typeof data.items === 'number'
// //             ? data.items
// //             : 0,
// //           totalAmount: data.totalAmount || 0,
// //         };

// //         setOrder(newOrder);
// //         orderRef.current = newOrder;

// //         if (status === 'completed' || status === 'cancelled') {
// //           setTimeout(() => {
// //             localStorage.removeItem('active_order_id');
// //             localStorage.removeItem(`order_created_${activeOrderId}`);
// //             setOrder(null);
// //             orderRef.current = null;
// //           }, 8000);
// //         }
// //       },
// //       (error) => {
// //         console.error('OrderTrackingBar error:', error);
// //       }
// //     );

// //     return () => unsubscribe();
// //   }, [mounted]);

// //   // ✅ Timer effect - setState only inside setInterval callback (not synchronously)
// //   useEffect(() => {
// //     // ✅ Derive computed values instead of calling setState synchronously
// //     if (!order || order.status === 'completed' || order.status === 'cancelled') {
// //       // Use the setter as a function to avoid direct sync call in effect body
// //       const t = setTimeout(() => {
// //         setTimeLeft('');
// //         setIsDelayed(false);
// //       }, 0);
// //       return () => clearTimeout(t);
// //     }

// //     const ESTIMATE_MS = 15 * 60 * 1000;
// //     const savedCreatedAt = order.createdAt;

// //     const tick = () => {
// //       const now = Date.now();
// //       const elapsed = now - savedCreatedAt;
// //       const remaining = ESTIMATE_MS - elapsed;

// //       if (remaining <= 0) {
// //         const over = Math.abs(remaining);
// //         const m = Math.floor(over / 60000);
// //         const s = Math.floor((over % 60000) / 1000);
// //         // ✅ setState inside interval callback - correct pattern
// //         setIsDelayed(true);
// //         setTimeLeft(`+${m}:${s.toString().padStart(2, '0')}`);
// //       } else {
// //         const m = Math.floor(remaining / 60000);
// //         const s = Math.floor((remaining % 60000) / 1000);
// //         setIsDelayed(false);
// //         setTimeLeft(`${m}:${s.toString().padStart(2, '0')}`);
// //       }
// //     };

// //     // Run first tick inside requestAnimationFrame to avoid sync setState
// //     const rafId = requestAnimationFrame(tick);
// //     const interval = setInterval(tick, 1000);

// //     return () => {
// //       cancelAnimationFrame(rafId);
// //       clearInterval(interval);
// //     };
// //   }, [order?.createdAt, order?.status, order]);

// //   const toggleExpand = useCallback((e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     setIsExpanded((prev) => !prev);
// //   }, []);

// //   const closeExpanded = useCallback(() => {
// //     setIsExpanded(false);
// //   }, []);

// //   const navigateTo = useCallback(
// //     (path: string) => (e: React.MouseEvent) => {
// //       e.stopPropagation();
// //       router.push(path);
// //       setIsExpanded(false);
// //     },
// //     [router]
// //   );

// //   if (!mounted || !order) return null;

// //   const config = STATUS_CONFIG[order.status];
// //   // ✅ Consistent ID slice - same everywhere in component
// //   const orderId = order.id.slice(-5).toUpperCase();

// //   return (
// //     <>
// //       {/* Backdrop */}
// //       {isExpanded && (
// //         <div
// //           className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm transition-opacity duration-300"
// //           onClick={closeExpanded}
// //         />
// //       )}

// //       {/* Floating Container - Zomato/Dominos Style */}
// //       <div className="fixed bottom-4 left-3 right-3 sm:left-4 sm:right-4 md:left-auto md:right-6 md:w-full md:max-w-sm lg:max-w-md z-[999]">

// //         {/* ── Expanded Panel (slides up) ── */}
// //         <div
// //           className={`overflow-hidden transition-all duration-300 ease-out ${
// //             isExpanded
// //               ? 'max-h-[480px] opacity-100'
// //               : 'max-h-0 opacity-0 pointer-events-none'
// //           }`}
// //         >
// //           <div className="bg-[#12121f] border border-b-0 border-white/10 rounded-t-2xl overflow-hidden">

// //             {/* Panel Header */}
// //             <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-white/[0.06]">
// //               <div>
// //                 <p className="text-white font-bold text-sm">Live Order Tracking</p>
// //                 <p className="text-gray-500 text-[11px] mt-0.5">Order #{orderId}</p>
// //               </div>
// //               <button
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   closeExpanded();
// //                 }}
// //                 className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
// //                 aria-label="Close panel"
// //               >
// //                 <svg
// //                   className="w-3.5 h-3.5 text-gray-400"
// //                   fill="none"
// //                   viewBox="0 0 24 24"
// //                   stroke="currentColor"
// //                   strokeWidth={2.5}
// //                 >
// //                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
// //                 </svg>
// //               </button>
// //             </div>

// //             {/* Timeline */}
// //             <div className="px-4 py-4">
// //               {TIMELINE_STEPS.map((step, index) => {
// //                 const currentIdx = STATUS_ORDER.indexOf(
// //                   order.status as typeof STATUS_ORDER[number]
// //                 );
// //                 const stepIdx = STATUS_ORDER.indexOf(step.key);
// //                 const isDone = stepIdx < currentIdx;
// //                 const isCurrent = stepIdx === currentIdx;

// //                 return (
// //                   <div key={step.key} className="flex gap-3">
// //                     {/* Dot + connector line */}
// //                     <div className="flex flex-col items-center">
// //                       <div
// //                         className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 border-2 transition-all duration-500 ${
// //                           isDone
// //                             ? 'bg-green-500 border-green-500 text-white'
// //                             : isCurrent
// //                             ? `${config.bgColor} ${config.borderColor}`
// //                             : 'bg-transparent border-gray-700 text-gray-600'
// //                         }`}
// //                       >
// //                         {isDone ? (
// //                           <svg
// //                             className="w-4 h-4 text-white"
// //                             fill="none"
// //                             viewBox="0 0 24 24"
// //                             stroke="currentColor"
// //                             strokeWidth={3}
// //                           >
// //                             <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
// //                           </svg>
// //                         ) : (
// //                           <span className={isCurrent ? 'text-sm' : 'text-xs text-gray-600'}>
// //                             {isCurrent ? step.icon : index + 1}
// //                           </span>
// //                         )}
// //                       </div>
// //                       {index < TIMELINE_STEPS.length - 1 && (
// //                         <div
// //                           className={`w-0.5 h-5 mt-1 mb-1 rounded-full transition-all duration-500 ${
// //                             isDone ? 'bg-green-500' : 'bg-gray-700/60'
// //                           }`}
// //                         />
// //                       )}
// //                     </div>

// //                     {/* Step text */}
// //                     <div className="pb-4 flex-1 min-w-0">
// //                       <p
// //                         className={`text-[13px] font-semibold leading-tight flex items-center gap-2 ${
// //                           isDone
// //                             ? 'text-green-400'
// //                             : isCurrent
// //                             ? 'text-white'
// //                             : 'text-gray-600'
// //                         }`}
// //                       >
// //                         {step.label}
// //                         {isCurrent && (
// //                           <span
// //                             className={`inline-block w-1.5 h-1.5 rounded-full ${config.pulseColor} animate-pulse`}
// //                           />
// //                         )}
// //                       </p>
// //                       <p className="text-[11px] text-gray-500 mt-0.5">{step.sub}</p>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>

// //             {/* Order Meta Cards */}
// //             <div className="px-4 pb-3">
// //               <div className="grid grid-cols-3 gap-2">
// //                 {[
// //                   { label: 'Order ID', value: `#${orderId}` },
// //                   { label: 'Table', value: order.tableNumber },
// //                   {
// //                     label: 'Total',
// //                     value: order.totalAmount ? `₹${order.totalAmount}` : '—',
// //                   },
// //                 ].map((item) => (
// //                   <div
// //                     key={item.label}
// //                     className="bg-white/5 rounded-xl p-2.5 text-center border border-white/[0.06]"
// //                   >
// //                     <span className="text-[10px] text-gray-500 uppercase tracking-wider block leading-none mb-1.5">
// //                       {item.label}
// //                     </span>
// //                     <span className="text-xs font-bold text-white font-mono">
// //                       {item.value}
// //                     </span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* CTA Buttons */}
// //             <div className="px-4 pb-4 flex gap-2">
// //               <button
// //                 onClick={navigateTo('/myorders')}
// //                 className="flex-1 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-xl py-2.5 text-xs font-bold transition-all duration-200 shadow-lg shadow-orange-500/20"
// //               >
// //                 All Orders
// //               </button>
// //               <button
// //                 onClick={navigateTo('/menu')}
// //                 className="flex-1 bg-white/10 hover:bg-white/15 active:scale-95 text-white rounded-xl py-2.5 text-xs font-bold transition-all duration-200"
// //               >
// //                 Add Items
// //               </button>
// //               <button
// //                 onClick={navigateTo('/support')}
// //                 aria-label="Help"
// //                 className="w-10 bg-white/10 hover:bg-white/15 active:scale-95 text-gray-300 rounded-xl py-2.5 text-xs font-bold transition-all duration-200 flex items-center justify-center"
// //               >
// //                 <svg
// //                   className="w-4 h-4"
// //                   fill="none"
// //                   viewBox="0 0 24 24"
// //                   stroke="currentColor"
// //                   strokeWidth={2}
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
// //                   />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ── Main Floating Pill ── */}
// //         <div
// //           onClick={toggleExpand}
// //           role="button"
// //           tabIndex={0}
// //           aria-label="View order status"
// //           onKeyDown={(e) => e.key === 'Enter' && setIsExpanded((p) => !p)}
// //           className={`
// //             relative cursor-pointer select-none overflow-hidden
// //             bg-[#12121f] border border-white/10
// //             shadow-[0_8px_32px_rgba(0,0,0,0.6),0_2px_8px_rgba(0,0,0,0.4)]
// //             transition-all duration-300 active:scale-[0.98]
// //             ${isExpanded ? 'rounded-b-2xl rounded-t-none' : 'rounded-2xl'}
// //           `}
// //         >
// //           {/* Top progress bar */}
// //           <div className="absolute top-0 left-0 right-0 h-0.75 bg-white/5 overflow-hidden">
// //             <div
// //               className={`h-full bg-linear-to-r ${config.progressColor} transition-all duration-1000 ease-out`}
// //               style={{ width: `${config.progressPercent}%` }}
// //             />
// //           </div>

// //           <div className="px-3.5 py-3 pt-4">
// //             <div className="flex items-center gap-3">

// //               {/* Animated status icon */}
// //               <div className="relative shrink-0">
// //                 <div
// //                   className={`w-11 h-11 rounded-xl ${config.bgColor} border ${config.borderColor} flex items-center justify-center`}
// //                 >
// //                   <span className="text-xl" role="img" aria-label={config.label}>
// //                     {config.icon}
// //                   </span>
// //                 </div>

// //                 {/* Live pulse indicator */}
// //                 {(order.status === 'pending' || order.status === 'preparing') && (
// //                   <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
// //                     <span
// //                       className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.pulseColor} opacity-60`}
// //                     />
// //                     <span
// //                       className={`relative inline-flex rounded-full h-3.5 w-3.5 ${config.pulseColor} border-2 border-[#12121f]`}
// //                     />
// //                   </span>
// //                 )}
// //                 {order.status === 'ready' && (
// //                   <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
// //                     <span className="animate-bounce relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-[#12121f]" />
// //                   </span>
// //                 )}
// //               </div>

// //               {/* Order info */}
// //               <div className="flex-1 min-w-0">
// //                 <div className="flex items-center gap-2">
// //                   <p className="text-white font-bold text-[13px] sm:text-sm truncate">
// //                     {config.label}
// //                   </p>
// //                   {isDelayed && (
// //                     <span className="shrink-0 text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full font-bold animate-pulse border border-red-500/20 leading-none">
// //                       LATE
// //                     </span>
// //                   )}
// //                 </div>
// //                 <p className="text-[11px] text-gray-400 mt-0.5 truncate">
// //                   <span className="font-mono font-semibold text-gray-300">
// //                     #{orderId}
// //                   </span>
// //                   <span className="text-gray-600 mx-1.5">·</span>
// //                   <span>Table {order.tableNumber}</span>
// //                   {order.items ? (
// //                     <>
// //                       <span className="text-gray-600 mx-1.5">·</span>
// //                       <span>
// //                         {order.items} item{order.items > 1 ? 's' : ''}
// //                       </span>
// //                     </>
// //                   ) : null}
// //                 </p>
// //               </div>

// //               {/* Timer + chevron */}
// //               <div className="flex items-center gap-1.5 shrink-0">
// //                 {timeLeft && order.status !== 'completed' && order.status !== 'cancelled' && (
// //                   <div
// //                     className={`rounded-xl px-3 py-2 text-center ${
// //                       isDelayed
// //                         ? 'bg-red-500/10 border border-red-500/20'
// //                         : 'bg-white/[0.06] border border-white/[0.08]'
// //                     }`}
// //                   >
// //                     <p
// //                       className={`text-[9px] uppercase tracking-widest leading-none mb-1 ${
// //                         isDelayed ? 'text-red-400' : 'text-gray-500'
// //                       }`}
// //                     >
// //                       {isDelayed ? 'Late' : 'ETA'}
// //                     </p>
// //                     <p
// //                       className={`text-sm sm:text-base font-black font-mono leading-none ${
// //                         isDelayed ? 'text-red-400' : 'text-white'
// //                       }`}
// //                     >
// //                       {timeLeft}
// //                     </p>
// //                   </div>
// //                 )}

// //                 {order.status === 'completed' && (
// //                   <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2">
// //                     <p className="text-[10px] text-green-400 font-bold uppercase tracking-wider">
// //                       Done 🎉
// //                     </p>
// //                   </div>
// //                 )}

// //                 {order.status === 'cancelled' && (
// //                   <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
// //                     <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
// //                       Cancelled
// //                     </p>
// //                   </div>
// //                 )}

// //                 {/* Chevron arrow */}
// //                 <div className="w-6 flex items-center justify-center">
// //                   <svg
// //                     className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
// //                       isExpanded ? 'rotate-0' : 'rotate-180'
// //                     }`}
// //                     fill="none"
// //                     viewBox="0 0 24 24"
// //                     stroke="currentColor"
// //                     strokeWidth={2.5}
// //                   >
// //                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
// //                   </svg>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default OrderTrackingBar;
// 'use client';

// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { doc, onSnapshot } from 'firebase/firestore';
// import { db } from '@/lib/firebase';

// interface OrderState {
//   id: string;
//   tableNumber: string;
//   status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
//   createdAt: number;
//   items: number;
//   totalAmount: number;
//   orderNumber: string;
// }

// const STATUS_CONFIG = {
//   pending: {
//     label: 'Order Placed',
//     icon: '🕒',
//     bgColor: 'bg-yellow-500/15',
//     borderColor: 'border-yellow-500/30',
//     progressColor: 'from-yellow-500 to-yellow-400',
//     progressPercent: 25,
//     pulseColor: 'bg-yellow-500',
//   },
//   preparing: {
//     label: 'Being Prepared',
//     icon: '🍳',
//     bgColor: 'bg-orange-500/15',
//     borderColor: 'border-orange-500/30',
//     progressColor: 'from-orange-500 to-orange-400',
//     progressPercent: 60,
//     pulseColor: 'bg-orange-500',
//   },
//   ready: {
//     label: 'Ready to Serve',
//     icon: '🔔',
//     bgColor: 'bg-green-500/15',
//     borderColor: 'border-green-500/30',
//     progressColor: 'from-green-500 to-green-400',
//     progressPercent: 100,
//     pulseColor: 'bg-green-500',
//   },
//   completed: {
//     label: 'Delivered',
//     icon: '🎉',
//     bgColor: 'bg-green-500/15',
//     borderColor: 'border-green-500/30',
//     progressColor: 'from-green-500 to-green-400',
//     progressPercent: 100,
//     pulseColor: 'bg-green-500',
//   },
//   cancelled: {
//     label: 'Cancelled',
//     icon: '❌',
//     bgColor: 'bg-red-500/15',
//     borderColor: 'border-red-500/30',
//     progressColor: 'from-red-500 to-red-400',
//     progressPercent: 0,
//     pulseColor: 'bg-red-500',
//   },
// } as const;

// const TIMELINE_STEPS = [
//   { key: 'pending' as const, label: 'Order Received', sub: 'Restaurant got your order', icon: '📋' },
//   { key: 'preparing' as const, label: 'Being Prepared', sub: 'Chef is cooking your food', icon: '🍳' },
//   { key: 'ready' as const, label: 'Ready to Serve', sub: 'Your order is ready!', icon: '🔔' },
//   { key: 'completed' as const, label: 'Served', sub: 'Enjoy your meal!', icon: '🎉' },
// ];

// const STATUS_ORDER = ['pending', 'preparing', 'ready', 'completed'] as const;

// // ✅ Helper to extract total amount from ANY Firestore structure
// function extractTotalAmount(data: Record<string, unknown>): number {
//   // Check all possible field names your Firestore might use
//   const possibleFields = [
//     'totalAmount',
//     'total',
//     'totalPrice',
//     'amount',
//     'grandTotal',
//     'orderTotal',
//     'price',
//     'subtotal',
//   ];

//   for (const field of possibleFields) {
//     if (data[field] !== undefined && data[field] !== null) {
//       const val = Number(data[field]);
//       if (!isNaN(val) && val > 0) return val;
//     }
//   }

//   // ✅ If total not stored directly, calculate from items array
//   if (Array.isArray(data.items)) {
//     let sum = 0;
//     for (const item of data.items) {
//       const itemData = item as Record<string, unknown>;
//       const price = Number(itemData.price || itemData.itemPrice || itemData.unitPrice || 0);
//       const qty = Number(itemData.quantity || itemData.qty || itemData.count || 1);
//       sum += price * qty;
//     }
//     if (sum > 0) return sum;
//   }

//   // Check cart items
//   if (Array.isArray(data.cartItems)) {
//     let sum = 0;
//     for (const item of data.cartItems) {
//       const itemData = item as Record<string, unknown>;
//       const price = Number(itemData.price || itemData.itemPrice || 0);
//       const qty = Number(itemData.quantity || itemData.qty || 1);
//       sum += price * qty;
//     }
//     if (sum > 0) return sum;
//   }

//   return 0;
// }

// // ✅ Helper to extract item count
// function extractItemCount(data: Record<string, unknown>): number {
//   if (Array.isArray(data.items) && data.items.length > 0) {
//     return data.items.length;
//   }
//   if (Array.isArray(data.cartItems) && data.cartItems.length > 0) {
//     return data.cartItems.length;
//   }
//   if (typeof data.itemCount === 'number') return data.itemCount;
//   if (typeof data.totalItems === 'number') return data.totalItems;
//   return 0;
// }

// // ✅ Helper to extract order number / ID for display
// function extractOrderNumber(docId: string, data: Record<string, unknown>): string {
//   // Check if there's an explicit order number field
//   const possibleFields = [
//     'orderNumber',
//     'orderNo',
//     'order_number',
//     'displayId',
//     'orderId',
//     'order_id',
//     'tokenNumber',
//     'token',
//   ];

//   for (const field of possibleFields) {
//     if (data[field] !== undefined && data[field] !== null) {
//       const val = String(data[field]);
//       if (val.length > 0) return val;
//     }
//   }

//   // ✅ Fallback: use last 5 chars of Firestore document ID
//   return docId.slice(0 , 8).toUpperCase();
// }

// function OrderTrackingBar() {
//   const [order, setOrder] = useState<OrderState | null>(null);
//   const [timeLeft, setTimeLeft] = useState('');
//   const [isDelayed, setIsDelayed] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [debugInfo, setDebugInfo] = useState('');
//   const orderRef = useRef<OrderState | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // ✅ Firebase listener
//   useEffect(() => {
//     if (!mounted) return;

//     const activeOrderId = localStorage.getItem('active_order_id');

//     if (!activeOrderId) {
//       const t = setTimeout(() => {
//         setOrder(null);
//         orderRef.current = null;
//       }, 0);
//       return () => clearTimeout(t);
//     }

//     // ✅ DEBUG: Log what order ID we're looking for
//     console.log('🔍 OrderTrackingBar: Looking for order:', activeOrderId);

//     const docRef = doc(db, 'orders', activeOrderId);

//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         if (!docSnap.exists()) {
//           console.warn('⚠️ Order document not found:', activeOrderId);
//           localStorage.removeItem('active_order_id');
//           setOrder(null);
//           orderRef.current = null;
//           return;
//         }

//         const data = docSnap.data() as Record<string, unknown>;

//         // ✅ DEBUG: Log the FULL document so you can see field names
//         console.log('📦 Order Document Data:', JSON.stringify(data, null, 2));
//         setDebugInfo(JSON.stringify(Object.keys(data)));

//         const status = (data.status as OrderState['status']) || 'pending';

//         // ✅ Resolve createdAt timestamp
//         let createdAtMs: number;
//         const createdAtField = data.createdAt as Record<string, unknown> | number | undefined;

//         if (createdAtField && typeof createdAtField === 'object' && 'toMillis' in createdAtField) {
//           createdAtMs = (createdAtField as { toMillis: () => number }).toMillis();
//         } else if (createdAtField && typeof createdAtField === 'object' && 'seconds' in createdAtField) {
//           createdAtMs = Number(createdAtField.seconds) * 1000;
//         } else if (typeof createdAtField === 'number') {
//           createdAtMs = createdAtField;
//         } else {
//           // Check alternative field names
//           const altFields = ['timestamp', 'orderDate', 'date', 'created_at', 'orderTime'];
//           let found = false;
//           for (const f of altFields) {
//             const altVal = data[f] as Record<string, unknown> | number | undefined;
//             if (altVal && typeof altVal === 'object' && 'toMillis' in altVal) {
//               createdAtMs = (altVal as { toMillis: () => number }).toMillis();
//               found = true;
//               break;
//             } else if (altVal && typeof altVal === 'object' && 'seconds' in altVal) {
//               createdAtMs = Number(altVal.seconds) * 1000;
//               found = true;
//               break;
//             } else if (typeof altVal === 'number') {
//               createdAtMs = altVal;
//               found = true;
//               break;
//             }
//           }
//           if (!found) {
//             const saved = localStorage.getItem(`order_created_${activeOrderId}`);
//             createdAtMs = saved ? parseInt(saved, 10) : Date.now();
//           }
//         }

//         // Persist for refresh survival
//         localStorage.setItem(`order_created_${activeOrderId}`, String(createdAtMs!));

//         // ✅ Extract using helpers that check ALL possible field names
//         const totalAmount = extractTotalAmount(data);
//         const itemCount = extractItemCount(data);
//         const orderNumber = extractOrderNumber(docSnap.id, data);
//         const tableNumber = String(
//           data.tableNumber || data.table || data.tableNo || data.table_number || 'Takeaway'
//         );

//         console.log('✅ Extracted:', { orderNumber, totalAmount, itemCount, tableNumber, status });

//         const newOrder: OrderState = {
//           id: docSnap.id,
//           tableNumber,
//           status,
//           createdAt: createdAtMs!,
//           items: itemCount,
//           totalAmount,
//           orderNumber,
//         };

//         setOrder(newOrder);
//         orderRef.current = newOrder;

//         if (status === 'completed' || status === 'cancelled') {
//           setTimeout(() => {
//             localStorage.removeItem('active_order_id');
//             localStorage.removeItem(`order_created_${activeOrderId}`);
//             setOrder(null);
//             orderRef.current = null;
//           }, 8000);
//         }
//       },
//       (error) => {
//         console.error('❌ OrderTrackingBar error:', error);
//       }
//     );

//     return () => unsubscribe();
//   }, [mounted]);

//   // ✅ Timer - survives refresh
//   useEffect(() => {
//     if (!order || order.status === 'completed' || order.status === 'cancelled') {
//       const t = setTimeout(() => {
//         setTimeLeft('');
//         setIsDelayed(false);
//       }, 0);
//       return () => clearTimeout(t);
//     }

//     const ESTIMATE_MS = 15 * 60 * 1000;
//     const savedCreatedAt = order.createdAt;

//     const tick = () => {
//       const remaining = ESTIMATE_MS - (Date.now() - savedCreatedAt);

//       if (remaining <= 0) {
//         const over = Math.abs(remaining);
//         setIsDelayed(true);
//         setTimeLeft(
//           `+${Math.floor(over / 60000)}:${Math.floor((over % 60000) / 1000)
//             .toString()
//             .padStart(2, '0')}`
//         );
//       } else {
//         setIsDelayed(false);
//         setTimeLeft(
//           `${Math.floor(remaining / 60000)}:${Math.floor((remaining % 60000) / 1000)
//             .toString()
//             .padStart(2, '0')}`
//         );
//       }
//     };

//     const raf = requestAnimationFrame(tick);
//     const interval = setInterval(tick, 1000);

//     return () => {
//       cancelAnimationFrame(raf);
//       clearInterval(interval);
//     };
//   }, [order?.createdAt, order?.status, order]);

//   const toggleExpand = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//     setIsExpanded((p) => !p);
//   }, []);

//   const closeExpanded = useCallback(() => setIsExpanded(false), []);

//   const navigateTo = useCallback(
//     (path: string) => (e: React.MouseEvent) => {
//       e.stopPropagation();
//       router.push(path);
//       setIsExpanded(false);
//     },
//     [router]
//   );

//   if (!mounted || !order) return null;

//   const config = STATUS_CONFIG[order.status];
//   const displayId = order.orderNumber;

//   return (
//     <>
//       {isExpanded && (
//         <div
//           className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm"
//           onClick={closeExpanded}
//         />
//       )}

//       <div className="fixed bottom-4 left-3 right-3 sm:left-4 sm:right-4 md:left-auto md:right-6 md:w-full md:max-w-sm lg:max-w-md z-[999]">

//         {/* ── Expanded Panel ── */}
//         <div
//           className={`overflow-hidden transition-all duration-300 ease-out ${
//             isExpanded ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
//           }`}
//         >
//           <div className="bg-[#0d0d1a] border border-b-0 border-white/10 rounded-t-2xl overflow-hidden">

//             {/* Header */}
//             <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-white/[0.06]">
//               <div>
//                 <p className="text-white font-bold text-sm">Live Order Tracking</p>
//                 <p className="text-gray-500 text-[11px] mt-0.5 font-mono">
//                   Order #{displayId}
//                 </p>
//               </div>
//               <button
//                 onClick={(e) => { e.stopPropagation(); closeExpanded(); }}
//                 className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
//                 aria-label="Close"
//               >
//                 <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             {/* Timeline */}
//             <div className="px-4 py-4">
//               {TIMELINE_STEPS.map((step, index) => {
//                 const currentIdx = STATUS_ORDER.indexOf(order.status as typeof STATUS_ORDER[number]);
//                 const stepIdx = STATUS_ORDER.indexOf(step.key);
//                 const isDone = stepIdx < currentIdx;
//                 const isCurrent = stepIdx === currentIdx;

//                 return (
//                   <div key={step.key} className="flex gap-3">
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 border-2 transition-all duration-500 ${
//                           isDone
//                             ? 'bg-green-500 border-green-500 text-white'
//                             : isCurrent
//                             ? `${config.bgColor} ${config.borderColor}`
//                             : 'bg-transparent border-gray-700 text-gray-600'
//                         }`}
//                       >
//                         {isDone ? (
//                           <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                           </svg>
//                         ) : (
//                           <span className={isCurrent ? 'text-sm' : 'text-xs text-gray-600'}>
//                             {isCurrent ? step.icon : index + 1}
//                           </span>
//                         )}
//                       </div>
//                       {index < TIMELINE_STEPS.length - 1 && (
//                         <div className={`w-0.5 h-5 mt-1 mb-1 rounded-full ${isDone ? 'bg-green-500' : 'bg-gray-700/60'}`} />
//                       )}
//                     </div>
//                     <div className="pb-4 flex-1 min-w-0">
//                       <p className={`text-[13px] font-semibold leading-tight flex items-center gap-2 ${
//                         isDone ? 'text-green-400' : isCurrent ? 'text-white' : 'text-gray-600'
//                       }`}>
//                         {step.label}
//                         {isCurrent && (
//                           <span className={`inline-block w-1.5 h-1.5 rounded-full ${config.pulseColor} animate-pulse`} />
//                         )}
//                       </p>
//                       <p className="text-[11px] text-gray-500 mt-0.5">{step.sub}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* ✅ Order Meta - Now shows actual values */}
//             <div className="px-4 pb-3">
//               <div className="grid grid-cols-3 gap-2">
//                 <div className="bg-white/5 rounded-xl p-3 text-center border border-white/[0.06]">
//                   <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
//                     Order ID
//                   </span>
//                   <span className="text-sm font-bold text-orange-400 font-mono">
//                     #{displayId}
//                   </span>
//                 </div>
//                 <div className="bg-white/5 rounded-xl p-3 text-center border border-white/[0.06]">
//                   <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
//                     Table
//                   </span>
//                   <span className="text-sm font-bold text-white">
//                     {order.tableNumber}
//                   </span>
//                 </div>
//                 <div className="bg-white/5 rounded-xl p-3 text-center border border-white/[0.06]">
//                   <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
//                     Total
//                   </span>
//                   <span className="text-sm font-bold text-green-400">
//                     {order.totalAmount > 0 ? `₹${order.totalAmount.toFixed(0)}` : '₹0'}
//                   </span>
//                 </div>
//               </div>

//               {/* ✅ Extra row: Items count + Time placed */}
//               <div className="grid grid-cols-2 gap-2 mt-2">
//                 <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/[0.06]">
//                   <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
//                     Items
//                   </span>
//                   <span className="text-sm font-bold text-white">
//                     {order.items > 0 ? `${order.items} item${order.items > 1 ? 's' : ''}` : '—'}
//                   </span>
//                 </div>
//                 <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/[0.06]">
//                   <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
//                     Placed At
//                   </span>
//                   <span className="text-sm font-bold text-white">
//                     {new Date(order.createdAt).toLocaleTimeString('en-IN', {
//                       hour: '2-digit',
//                       minute: '2-digit',
//                       hour12: true,
//                     })}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* CTA */}
//             <div className="px-4 pb-4 flex gap-2">
//               <button
//                 onClick={navigateTo('/myorders')}
//                 className="flex-1 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-xl py-2.5 text-xs font-bold transition-all shadow-lg shadow-orange-500/20"
//               >
//                 All Orders
//               </button>
//               <button
//                 onClick={navigateTo('/menu')}
//                 className="flex-1 bg-white/10 hover:bg-white/15 active:scale-95 text-white rounded-xl py-2.5 text-xs font-bold transition-all"
//               >
//                 Add Items
//               </button>
//               <button
//                 onClick={navigateTo('/support')}
//                 aria-label="Help"
//                 className="w-10 bg-white/10 hover:bg-white/15 active:scale-95 text-gray-300 rounded-xl py-2.5 flex items-center justify-center transition-all"
//               >
//                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ── Main Floating Pill ── */}
//         <div
//           onClick={toggleExpand}
//           role="button"
//           tabIndex={0}
//           aria-label="View order status"
//           onKeyDown={(e) => e.key === 'Enter' && setIsExpanded((p) => !p)}
//           className={`
//             relative cursor-pointer select-none overflow-hidden
//             bg-[#0d0d1a] border border-white/10
//             shadow-[0_8px_32px_rgba(0,0,0,0.6),0_2px_8px_rgba(0,0,0,0.4)]
//             transition-all duration-300 active:scale-[0.98]
//             ${isExpanded ? 'rounded-b-2xl rounded-t-none' : 'rounded-2xl'}
//           `}
//         >
//           {/* Progress bar */}
//           <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
//             <div
//               className={`h-full bg-gradient-to-r ${config.progressColor} transition-all duration-1000 ease-out`}
//               style={{ width: `${config.progressPercent}%` }}
//             />
//           </div>

//           <div className="px-3.5 py-3 pt-[18px]">
//             <div className="flex items-center gap-3">

//               {/* Icon */}
//               <div className="relative shrink-0">
//                 <div className={`w-11 h-11 rounded-xl ${config.bgColor} border ${config.borderColor} flex items-center justify-center`}>
//                   <span className="text-xl">{config.icon}</span>
//                 </div>
//                 {(order.status === 'pending' || order.status === 'preparing') && (
//                   <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
//                     <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.pulseColor} opacity-60`} />
//                     <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${config.pulseColor} border-2 border-[#0d0d1a]`} />
//                   </span>
//                 )}
//                 {order.status === 'ready' && (
//                   <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
//                     <span className="animate-bounce relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-[#0d0d1a]" />
//                   </span>
//                 )}
//               </div>

//               {/* ✅ Info - Now shows Order ID and Total properly */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-2">
//                   <p className="text-white font-bold text-[13px] sm:text-sm truncate">
//                     {config.label}
//                   </p>
//                   {isDelayed && (
//                     <span className="shrink-0 text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full font-bold animate-pulse border border-red-500/20 leading-none">
//                       LATE
//                     </span>
//                   )}
//                 </div>

//                 {/* ✅ Second line: Order ID · Table · Amount */}
//                 <div className="flex items-center gap-0 text-[11px] mt-0.5 truncate">
//                   <span className="font-mono font-bold text-orange-400">
//                     #{displayId}
//                   </span>
//                   <span className="text-gray-600 mx-1.5">·</span>
//                   <span className="text-gray-400">
//                     Table {order.tableNumber}
//                   </span>
//                   {order.totalAmount > 0 && (
//                     <>
//                       <span className="text-gray-600 mx-1.5">·</span>
//                       <span className="text-green-400 font-semibold">
//                         ₹{order.totalAmount.toFixed(0)}
//                       </span>
//                     </>
//                   )}
//                   {order.items > 0 && (
//                     <>
//                       <span className="text-gray-600 mx-1.5 hidden sm:inline">·</span>
//                       <span className="text-gray-400 hidden sm:inline">
//                         {order.items} item{order.items > 1 ? 's' : ''}
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Timer */}
//               <div className="flex items-center gap-1.5 shrink-0">
//                 {timeLeft && order.status !== 'completed' && order.status !== 'cancelled' && (
//                   <div
//                     className={`rounded-xl px-3 py-2 text-center ${
//                       isDelayed
//                         ? 'bg-red-500/10 border border-red-500/20'
//                         : 'bg-white/[0.06] border border-white/[0.08]'
//                     }`}
//                   >
//                     <p className={`text-[9px] uppercase tracking-widest leading-none mb-1 ${isDelayed ? 'text-red-400' : 'text-gray-500'}`}>
//                       {isDelayed ? 'Late' : 'ETA'}
//                     </p>
//                     <p className={`text-sm sm:text-base font-black font-mono leading-none ${isDelayed ? 'text-red-400' : 'text-white'}`}>
//                       {timeLeft}
//                     </p>
//                   </div>
//                 )}

//                 {order.status === 'completed' && (
//                   <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2">
//                     <p className="text-[10px] text-green-400 font-bold uppercase">Done 🎉</p>
//                   </div>
//                 )}

//                 {order.status === 'cancelled' && (
//                   <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
//                     <p className="text-[10px] text-red-400 font-bold uppercase">Cancelled</p>
//                   </div>
//                 )}

//                 <div className="w-5 flex items-center justify-center">
//                   <svg
//                     className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-180'}`}
//                     fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default OrderTrackingBar;
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface OrderState {
  id: string;
  tableNumber: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: number;
  items: number;
  totalAmount: number;
  orderNumber: string;
}

const STATUS_CONFIG = {
  pending: {
    label: 'Order Placed',
    icon: '🕒',
    bgColor: 'bg-yellow-500/15',
    borderColor: 'border-yellow-500/30',
    progressColor: 'from-yellow-500 to-yellow-400',
    progressPercent: 25,
    pulseColor: 'bg-yellow-500',
  },
  preparing: {
    label: 'Being Prepared',
    icon: '🍳',
    bgColor: 'bg-orange-500/15',
    borderColor: 'border-orange-500/30',
    progressColor: 'from-orange-500 to-orange-400',
    progressPercent: 60,
    pulseColor: 'bg-orange-500',
  },
  ready: {
    label: 'Ready to Serve',
    icon: '🔔',
    bgColor: 'bg-green-500/15',
    borderColor: 'border-green-500/30',
    progressColor: 'from-green-500 to-green-400',
    progressPercent: 100,
    pulseColor: 'bg-green-500',
  },
  completed: {
    label: 'Delivered',
    icon: '🎉',
    bgColor: 'bg-green-500/15',
    borderColor: 'border-green-500/30',
    progressColor: 'from-green-500 to-green-400',
    progressPercent: 100,
    pulseColor: 'bg-green-500',
  },
  cancelled: {
    label: 'Cancelled',
    icon: '❌',
    bgColor: 'bg-red-500/15',
    borderColor: 'border-red-500/30',
    progressColor: 'from-red-500 to-red-400',
    progressPercent: 0,
    pulseColor: 'bg-red-500',
  },
} as const;

const TIMELINE_STEPS = [
  { key: 'pending' as const, label: 'Order Received', sub: 'Restaurant got your order', icon: '📋' },
  { key: 'preparing' as const, label: 'Being Prepared', sub: 'Chef is cooking your food', icon: '🍳' },
  { key: 'ready' as const, label: 'Ready to Serve', sub: 'Your order is ready!', icon: '🔔' },
  { key: 'completed' as const, label: 'Served', sub: 'Enjoy your meal!', icon: '🎉' },
];

const STATUS_ORDER = ['pending', 'preparing', 'ready', 'completed'] as const;

// ✅ Helper to extract total amount from ANY Firestore structure
function extractTotalAmount(data: Record<string, unknown>): number {
  const possibleFields = [
    'totalAmount',
    'total',
    'totalPrice',
    'amount',
    'grandTotal',
    'orderTotal',
    'price',
    'subtotal',
  ];

  for (const field of possibleFields) {
    if (data[field] !== undefined && data[field] !== null) {
      const val = Number(data[field]);
      if (!isNaN(val) && val > 0) return val;
    }
  }

  // ✅ If total not stored directly, calculate from items array
  if (Array.isArray(data.items)) {
    let sum = 0;
    for (const item of data.items) {
      const itemData = item as Record<string, unknown>;
      const price = Number(itemData.price || itemData.itemPrice || itemData.unitPrice || 0);
      const qty = Number(itemData.quantity || itemData.qty || itemData.count || 1);
      sum += price * qty;
    }
    if (sum > 0) return sum;
  }

  // Check cart items
  if (Array.isArray(data.cartItems)) {
    let sum = 0;
    for (const item of data.cartItems) {
      const itemData = item as Record<string, unknown>;
      const price = Number(itemData.price || itemData.itemPrice || 0);
      const qty = Number(itemData.quantity || itemData.qty || 1);
      sum += price * qty;
    }
    if (sum > 0) return sum;
  }

  return 0;
}

// ✅ Helper to extract item count
function extractItemCount(data: Record<string, unknown>): number {
  if (Array.isArray(data.items) && data.items.length > 0) {
    return data.items.length;
  }
  if (Array.isArray(data.cartItems) && data.cartItems.length > 0) {
    return data.cartItems.length;
  }
  if (typeof data.itemCount === 'number') return data.itemCount;
  if (typeof data.totalItems === 'number') return data.totalItems;
  return 0;
}

// ✅ Helper to extract order number / ID for display
function extractOrderNumber(docId: string, data: Record<string, unknown>): string {
  const possibleFields = [
    'orderNumber',
    'orderNo',
    'order_number',
    'displayId',
    'orderId',
    'order_id',
    'tokenNumber',
    'token',
  ];

  for (const field of possibleFields) {
    if (data[field] !== undefined && data[field] !== null) {
      const val = String(data[field]);
      if (val.length > 0) return val;
    }
  }

  // ✅ Fallback: use last 5 chars of Firestore document ID
  return docId.slice(0 , 8).toUpperCase();
}

function OrderTrackingBar() {
  const [order, setOrder] = useState<OrderState | null>(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [isDelayed, setIsDelayed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const orderRef = useRef<OrderState | null>(null);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // ✅ Firebase listener
  useEffect(() => {
    if (!mounted) return;

    const activeOrderId = localStorage.getItem('active_order_id');

    if (!activeOrderId) {
      const t = setTimeout(() => {
        setOrder(null);
        orderRef.current = null;
      }, 0);
      return () => clearTimeout(t);
    }

    console.log('🔍 OrderTrackingBar: Looking for order:', activeOrderId);

    const docRef = doc(db, 'orders', activeOrderId);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (!docSnap.exists()) {
          console.warn('⚠️ Order document not found:', activeOrderId);
          localStorage.removeItem('active_order_id');
          setOrder(null);
          orderRef.current = null;
          return;
        }

        const data = docSnap.data() as Record<string, unknown>;

        console.log('📦 Order Document Data:', JSON.stringify(data, null, 2));

        const status = (data.status as OrderState['status']) || 'pending';

        // ✅ Resolve createdAt timestamp
        let createdAtMs: number;
        const createdAtField = data.createdAt as Record<string, unknown> | number | undefined;

        if (createdAtField && typeof createdAtField === 'object' && 'toMillis' in createdAtField) {
          createdAtMs = (createdAtField as { toMillis: () => number }).toMillis();
        } else if (createdAtField && typeof createdAtField === 'object' && 'seconds' in createdAtField) {
          createdAtMs = Number(createdAtField.seconds) * 1000;
        } else if (typeof createdAtField === 'number') {
          createdAtMs = createdAtField;
        } else {
          const altFields = ['timestamp', 'orderDate', 'date', 'created_at', 'orderTime'];
          let found = false;
          for (const f of altFields) {
            const altVal = data[f] as Record<string, unknown> | number | undefined;
            if (altVal && typeof altVal === 'object' && 'toMillis' in altVal) {
              createdAtMs = (altVal as { toMillis: () => number }).toMillis();
              found = true;
              break;
            } else if (altVal && typeof altVal === 'object' && 'seconds' in altVal) {
              createdAtMs = Number(altVal.seconds) * 1000;
              found = true;
              break;
            } else if (typeof altVal === 'number') {
              createdAtMs = altVal;
              found = true;
              break;
            }
          }
          if (!found) {
            const saved = localStorage.getItem(`order_created_${activeOrderId}`);
            createdAtMs = saved ? parseInt(saved, 10) : Date.now();
          }
        }

        localStorage.setItem(`order_created_${activeOrderId}`, String(createdAtMs!));

        const totalAmount = extractTotalAmount(data);
        const itemCount = extractItemCount(data);
        const orderNumber = extractOrderNumber(docSnap.id, data);
        const tableNumber = String(
          data.tableNumber || data.table || data.tableNo || data.table_number || 'Takeaway'
        );

        console.log('✅ Extracted:', { orderNumber, totalAmount, itemCount, tableNumber, status });

        const newOrder: OrderState = {
          id: docSnap.id,
          tableNumber,
          status,
          createdAt: createdAtMs!,
          items: itemCount,
          totalAmount,
          orderNumber,
        };

        setOrder(newOrder);
        orderRef.current = newOrder;

        if (status === 'completed' || status === 'cancelled') {
          setTimeout(() => {
            localStorage.removeItem('active_order_id');
            localStorage.removeItem(`order_created_${activeOrderId}`);
            setOrder(null);
            orderRef.current = null;
          }, 8000);
        }
      },
      (error) => {
        console.error('❌ OrderTrackingBar error:', error);
      }
    );

    return () => unsubscribe();
  }, [mounted]);

  // ✅ Timer - survives refresh
  useEffect(() => {
    if (!order || order.status === 'completed' || order.status === 'cancelled') {
      const t = setTimeout(() => {
        setTimeLeft('');
        setIsDelayed(false);
      }, 0);
      return () => clearTimeout(t);
    }

    const ESTIMATE_MS = 15 * 60 * 1000;
    const savedCreatedAt = order.createdAt;

    const tick = () => {
      const remaining = ESTIMATE_MS - (Date.now() - savedCreatedAt);

      if (remaining <= 0) {
        const over = Math.abs(remaining);
        setIsDelayed(true);
        setTimeLeft(
          `+${Math.floor(over / 60000)}:${Math.floor((over % 60000) / 1000)
            .toString()
            .padStart(2, '0')}`
        );
      } else {
        setIsDelayed(false);
        setTimeLeft(
          `${Math.floor(remaining / 60000)}:${Math.floor((remaining % 60000) / 1000)
            .toString()
            .padStart(2, '0')}`
        );
      }
    };

    const raf = requestAnimationFrame(tick);
    const interval = setInterval(tick, 1000);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
  }, [order?.createdAt, order?.status, order]);

  const toggleExpand = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((p) => !p);
  }, []);

  const closeExpanded = useCallback(() => setIsExpanded(false), []);

  const navigateTo = useCallback(
    (path: string) => (e: React.MouseEvent) => {
      e.stopPropagation();
      router.push(path);
      setIsExpanded(false);
    },
    [router]
  );

  if (!mounted || !order) return null;

  const config = STATUS_CONFIG[order.status];
  const displayId = order.orderNumber;

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 z-998 bg-black/40 backdrop-blur-sm"
          onClick={closeExpanded}
        />
      )}

      <div className="fixed bottom-4 left-3 right-3 sm:left-4 sm:right-4 md:left-auto md:right-6 md:w-full md:max-w-sm lg:max-w-md z-999">

        {/* ── Expanded Panel ── */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            isExpanded ? 'max-h-130 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-[#0d0d1a] border border-b-0 border-white/6 rounded-t-2xl overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-white/6">
              <div>
                <p className="text-white font-bold text-sm">Live Order Tracking</p>
                <p className="text-gray-500 text-[11px] mt-0.5 font-mono">
                  Order #{displayId}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); closeExpanded(); }}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Timeline */}
            <div className="px-4 py-4">
              {TIMELINE_STEPS.map((step, index) => {
                const currentIdx = STATUS_ORDER.indexOf(order.status as typeof STATUS_ORDER[number]);
                const stepIdx = STATUS_ORDER.indexOf(step.key);
                const isDone = stepIdx < currentIdx;
                const isCurrent = stepIdx === currentIdx;

                return (
                  <div key={step.key} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 border-2 transition-all duration-500 ${
                          isDone
                            ? 'bg-green-500 border-green-500 text-white'
                            : isCurrent
                            ? `${config.bgColor} ${config.borderColor}`
                            : 'bg-transparent border-gray-700 text-gray-600'
                        }`}
                      >
                        {isDone ? (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className={isCurrent ? 'text-sm' : 'text-xs text-gray-600'}>
                            {isCurrent ? step.icon : index + 1}
                          </span>
                        )}
                      </div>
                      {index < TIMELINE_STEPS.length - 1 && (
                        <div className={`w-0.5 h-5 mt-1 mb-1 rounded-full ${isDone ? 'bg-green-500' : 'bg-gray-700/60'}`} />
                      )}
                    </div>
                    <div className="pb-4 flex-1 min-w-0">
                      <p className={`text-[13px] font-semibold leading-tight flex items-center gap-2 ${
                        isDone ? 'text-green-400' : isCurrent ? 'text-white' : 'text-gray-600'
                      }`}>
                        {step.label}
                        {isCurrent && (
                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${config.pulseColor} animate-pulse`} />
                        )}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{step.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ✅ Order Meta - Now shows actual values */}
            <div className="px-4 pb-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/5 rounded-xl p-3 text-center border border-white/6">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
                    Order ID
                  </span>
                  <span className="text-sm font-bold text-orange-400 font-mono">
                    #{displayId}
                  </span>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center border border-white/6">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
                    Table
                  </span>
                  <span className="text-sm font-bold text-white">
                    {order.tableNumber}
                  </span>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center border border-white/6">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
                    Total
                  </span>
                  <span className="text-sm font-bold text-green-400">
                    {order.totalAmount > 0 ? `₹${order.totalAmount.toFixed(0)}` : '₹0'}
                  </span>
                </div>
              </div>

              {/* ✅ Extra row: Items count + Time placed */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/6">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
                    Items
                  </span>
                  <span className="text-sm font-bold text-white">
                    {order.items > 0 ? `${order.items} item${order.items > 1 ? 's' : ''}` : '—'}
                  </span>
                </div>
                <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/6">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
                    Placed At
                  </span>
                  <span className="text-sm font-bold text-white">
                    {new Date(order.createdAt).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="px-4 pb-4 flex gap-2">
              <button
                onClick={navigateTo('/myorders')}
                className="flex-1 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-xl py-2.5 text-xs font-bold transition-all shadow-lg shadow-orange-500/20"
              >
                All Orders
              </button>
              <button
                onClick={navigateTo('/menu')}
                className="flex-1 bg-white/10 hover:bg-white/15 active:scale-95 text-white rounded-xl py-2.5 text-xs font-bold transition-all"
              >
                Add Items
              </button>
              <button
                onClick={navigateTo('/support')}
                aria-label="Help"
                className="w-10 bg-white/10 hover:bg-white/15 active:scale-95 text-gray-300 rounded-xl py-2.5 flex items-center justify-center transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Main Floating Pill ── */}
        <div
          onClick={toggleExpand}
          role="button"
          tabIndex={0}
          aria-label="View order status"
          onKeyDown={(e) => e.key === 'Enter' && setIsExpanded((p) => !p)}
          className={`
            relative cursor-pointer select-none overflow-hidden
            bg-[#0d0d1a] border border-white/10
            shadow-[0_8px_32px_rgba(0,0,0,0.6),0_2px_8px_rgba(0,0,0,0.4)]
            transition-all duration-300 active:scale-[0.98]
            ${isExpanded ? 'rounded-b-2xl rounded-t-none' : 'rounded-2xl'}
          `}
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/5 overflow-hidden">
            <div
              className={`h-full bg-linear-to-r ${config.progressColor} transition-all duration-1000 ease-out`}
              style={{ width: `${config.progressPercent}%` }}
            />
          </div>

          <div className="px-3.5 py-3 pt-4.5">
            <div className="flex items-center gap-3">

              {/* Icon */}
              <div className="relative shrink-0">
                <div className={`w-11 h-11 rounded-xl ${config.bgColor} border ${config.borderColor} flex items-center justify-center`}>
                  <span className="text-xl">{config.icon}</span>
                </div>
                {(order.status === 'pending' || order.status === 'preparing') && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.pulseColor} opacity-60`} />
                    <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${config.pulseColor} border-2 border-[#0d0d1a]`} />
                  </span>
                )}
                {order.status === 'ready' && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-bounce relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-[#0d0d1a]" />
                  </span>
                )}
              </div>

              {/* ✅ Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-white font-bold text-[13px] sm:text-sm truncate">
                    {config.label}
                  </p>
                  {isDelayed && (
                    <span className="shrink-0 text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full font-bold animate-pulse border border-red-500/20 leading-none">
                      LATE
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-0 text-[11px] mt-0.5 truncate">
                  <span className="font-mono font-bold text-orange-400">
                    #{displayId}
                  </span>
                  <span className="text-gray-600 mx-1.5">·</span>
                  <span className="text-gray-400">
                    Table {order.tableNumber}
                  </span>
                  {order.totalAmount > 0 && (
                    <>
                      <span className="text-gray-600 mx-1.5">·</span>
                      <span className="text-green-400 font-semibold">
                        ₹{order.totalAmount.toFixed(0)}
                      </span>
                    </>
                  )}
                  {order.items > 0 && (
                    <>
                      <span className="text-gray-600 mx-1.5 hidden sm:inline">·</span>
                      <span className="text-gray-400 hidden sm:inline">
                        {order.items} item{order.items > 1 ? 's' : ''}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Timer */}
              <div className="flex items-center gap-1.5 shrink-0">
                {timeLeft && order.status !== 'completed' && order.status !== 'cancelled' && (
                  <div
                    className={`rounded-xl px-3 py-2 text-center ${
                      isDelayed
                        ? 'bg-red-500/10 border border-red-500/20'
                        : 'bg-white/6 border border-white/8'
                    }`}
                  >
                    <p className={`text-[9px] uppercase tracking-widest leading-none mb-1 ${isDelayed ? 'text-red-400' : 'text-gray-500'}`}>
                      {isDelayed ? 'Late' : 'ETA'}
                    </p>
                    <p className={`text-sm sm:text-base font-black font-mono leading-none ${isDelayed ? 'text-red-400' : 'text-white'}`}>
                      {timeLeft}
                    </p>
                  </div>
                )}

                {order.status === 'completed' && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2">
                    <p className="text-[10px] text-green-400 font-bold uppercase">Done 🎉</p>
                  </div>
                )}

                {order.status === 'cancelled' && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                    <p className="text-[10px] text-red-400 font-bold uppercase">Cancelled</p>
                  </div>
                )}

                <div className="w-5 flex items-center justify-center">
                  <svg
                    className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-180'}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderTrackingBar;