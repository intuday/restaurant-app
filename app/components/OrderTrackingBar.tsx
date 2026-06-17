// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { doc, onSnapshot } from 'firebase/firestore';
// import { db } from '@/lib/firebase';

// interface OrderState {
//   id: string;
//   tableNumber: string;
//   status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
//   createdAt: number; // timestamp ms
// }

// export default function OrderTrackingBar() {
//   const [order, setOrder] = useState<OrderState | null>(null);
//   const [timeLeft, setTimeLeft] = useState<string>('15:00');
//   const [isDelayed, setIsDelayed] = useState<boolean>(false);
//   const router = useRouter();

//   useEffect(() => {
//     // 1. Fetch active order ID from local storage
//     const activeOrderId = localStorage.getItem('active_order_id');
//     if (!activeOrderId) return;

//     // 2. Real-time Firebase Listener attachment
//     const docRef = doc(db, 'orders', activeOrderId);
//     const unsubscribe = onSnapshot(docRef, (docSnap) => {
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         const status = data.status;

//         // Auto-hide structural guard if order resolves
//         if (status === 'completed' || status === 'cancelled') {
//           localStorage.removeItem('active_order_id');
//           setOrder(null);
//         } else {
//           setOrder({
//             id: docSnap.id,
//             tableNumber: data.tableNumber || 'Takeaway',
//             status: status,
//             createdAt: data.createdAt?.toMillis() || Date.now(),
//           });
//         }
//       } else {
//         setOrder(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // 3. Absolute Synchronized Countdown Timer Engine
//   useEffect(() => {
//     if (!order) return;

//     const interval = setInterval(() => {
//       const now = Date.now();
//       const orderTime = order.createdAt;
//       const fifteenMinutesInMs = 15 * 60 * 1000;
//       const elapsedTime = now - orderTime;
//       const remainingTime = fifteenMinutesInMs - elapsedTime;

//       if (remainingTime <= 0) {
//         setIsDelayed(true);
//         setTimeLeft('00:00');
//         clearInterval(interval);
//       } else {
//         setIsDelayed(false);
//         const minutes = Math.floor(remainingTime / 60 / 1000);
//         const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
//         setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [order]);

//   if (!order) return null;

//   // Status badging mapping dictionary
//   const statusLabels = {
//     pending: '🕒 Order Received',
//     preparing: '👨‍🍳 Cooking in Progress',
//     ready: '🔔 Ready to Serve',
//   };

//   return (
//     <div 
//       onClick={() => router.push('/myorders')}
//       className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-[0_-8px_30px_rgb(0,0,0,0.3)] border-t border-orange-500/30 p-4 cursor-pointer backdrop-blur-md transition-all duration-300 transform translate-y-0 hover:bg-gray-800"
//     >
//       <div className="max-w-6xl mx-auto flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="bg-orange-600 p-2 rounded-full animate-pulse">
//             <span className="text-xl">🍕</span>
//           </div>
//           <div>
//             <h4 className="font-bold text-sm md:text-base text-orange-500">
//               Active Order #{order.id.slice(-4).toUpperCase()}
//             </h4>
//             <p className="text-xs text-gray-400 font-medium">
//               Table {order.tableNumber} • {isDelayed ? <span className="text-red-400 font-bold">Delayed</span> : statusLabels[order.status as keyof typeof statusLabels]}
//             </p>
//           </div>
//         </div>

//         <div className="text-right">
//           {isDelayed ? (
//             <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-bold border border-red-500/30 animate-pulse">
//               ⚠️ Delayed
//             </span>
//           ) : (
//             <div>
//               <span className="text-xs text-gray-400 block uppercase tracking-wider">Estimated Time</span>
//               <span className="text-base md:text-lg font-black text-white font-mono">{timeLeft} min</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface OrderState {
  id: string;
  tableNumber: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: number; // timestamp ms
}

export default function OrderTrackingBar() {
  const [order, setOrder] = useState<OrderState | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('15:00');
  const [isDelayed, setIsDelayed] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 1. Fetch active order ID from local storage
    const activeOrderId = localStorage.getItem('active_order_id');
    if (!activeOrderId) return;

    // 2. Real-time Firebase Listener attachment
    const docRef = doc(db, 'orders', activeOrderId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const status = data.status;

        // Auto-hide ONLY when admin marks order as completed or cancelled
        if (status === 'completed' || status === 'cancelled') {
          localStorage.removeItem('active_order_id');
          setOrder(null);
        } else {
          setOrder({
            id: docSnap.id,
            tableNumber: data.tableNumber || 'Takeaway',
            status: status,
            // Fallback to current system timestamp safely if Firestore value hasn't resolved on server yet
            createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now(),
          });
        }
      } else {
        setOrder(null);
      }
    }, (error) => {
      console.error("Tracking dynamic listener failed:", error);
    });

    return () => unsubscribe();
  }, []);

  // 3. Absolute Synchronized Countdown Timer Engine
  useEffect(() => {
    if (!order) return;

    const runTimerLogic = () => {
      const now = Date.now();
      const orderTime = order.createdAt;
      const fifteenMinutesInMs = 15 * 60 * 1000;
      const elapsedTime = now - orderTime;
      const remainingTime = fifteenMinutesInMs - elapsedTime;

      if (remainingTime <= 0) {
        setIsDelayed(true);
        setTimeLeft('00:00');
      } else {
        setIsDelayed(false);
        const minutes = Math.floor(remainingTime / 60 / 1000);
        const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
        setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    };

    runTimerLogic(); // Execute immediately once on mounted interval lifecycle
    const interval = setInterval(runTimerLogic, 1000);

    return () => clearInterval(interval);
  }, [order]);

  // If there's no active order, or if the customer is already on the dedicated /myorders route, hide the tracking bar.
  if (!order || pathname === '/myorders') return null;

  // Status badging mapping dictionary
  const statusLabels = {
    pending: '🕒 Order Received',
    preparing: '👨‍🍳 Cooking in Progress',
    ready: '🔔 Ready to Serve',
  };

  return (
    <div 
      onClick={() => router.push('/myorders')}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 text-white shadow-[0_-8px_30px_rgb(0,0,0,0.5)] border-t border-orange-500/40 p-4 cursor-pointer backdrop-blur-md transition-all duration-300 transform translate-y-0 hover:bg-gray-800 select-none"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-orange-600 p-2 rounded-full animate-pulse">
            <span className="text-xl">🛒</span>
          </div>
          <div>
            <h4 className="font-bold text-sm md:text-base text-orange-500">
              Active Order #{order.id.slice(-4).toUpperCase()}
            </h4>
            <p className="text-xs text-gray-400 font-medium">
              Table {order.tableNumber} • {isDelayed ? <span className="text-red-400 font-bold">⚠️ Order Delayed</span> : statusLabels[order.status as keyof typeof statusLabels]}
            </p>
          </div>
        </div>

        <div className="text-right">
          {isDelayed ? (
            <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-bold border border-red-500/30 animate-pulse uppercase tracking-wider text-[10px]">
              Exceeded 15 Mins
            </span>
          ) : (
            <div>
              <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Estimated Time</span>
              <span className="text-sm md:text-base font-black text-white font-mono">{timeLeft} remaining</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}