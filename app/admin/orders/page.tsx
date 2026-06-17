// // // // 'use client';

// // // // import { useEffect, useState } from 'react';
// // // // import { db } from '@/app/lib/firebase';
// // // // import {
// // // //   collection,
// // // //   onSnapshot,
// // // //   doc,
// // // //   updateDoc,
// // // // } from 'firebase/firestore';

// // // // type Order = {
// // // //   id: string;
// // // //   userId: string;
// // // //   items: any[];
// // // //   totalAmount: number;
// // // //   status: string;
// // // //   createdAt: number;
// // // // };

// // // // export default function AdminOrdersPage() {
// // // //   const [orders, setOrders] = useState<Order[]>([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     const unsub = onSnapshot(collection(db, 'orders'), (snapshot) => {
// // // //       const data: Order[] = snapshot.docs.map((doc) => ({
// // // //         id: doc.id,
// // // //         ...(doc.data() as Omit<Order, 'id'>),
// // // //       }));

// // // //       console.log('🔥 ADMIN ORDERS:', data);

// // // //       // safe sort (latest first)
// // // //       data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

// // // //       setOrders(data);
// // // //       setLoading(false);
// // // //     });

// // // //     return () => unsub();
// // // //   }, []);

// // // //   const updateStatus = async (orderId: string, status: string) => {
// // // //     await updateDoc(doc(db, 'orders', orderId), {
// // // //       status,
// // // //     });
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="p-10 text-center text-gray-500">
// // // //         Loading orders...
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="p-6">

// // // //       <h1 className="text-3xl font-bold mb-6">
// // // //         🔥 Admin Orders Dashboard
// // // //       </h1>

// // // //       {orders.length === 0 ? (
// // // //         <p className="text-gray-500">No orders yet</p>
// // // //       ) : (
// // // //         <div className="space-y-4">

// // // //           {orders.map((order) => (
// // // //             <div
// // // //               key={order.id}
// // // //               className="border rounded-lg p-4 shadow-sm bg-white"
// // // //             >

// // // //               {/* HEADER */}
// // // //               <div className="flex justify-between items-center">
// // // //                 <p className="font-semibold">
// // // //                   Order ID: {order.id}
// // // //                 </p>

// // // //                 <span
// // // //                   className={`px-3 py-1 rounded text-sm font-bold ${
// // // //                     order.status === 'pending'
// // // //                       ? 'bg-yellow-100 text-yellow-700'
// // // //                       : order.status === 'completed'
// // // //                       ? 'bg-green-100 text-green-700'
// // // //                       : order.status === 'cancelled'
// // // //                       ? 'bg-red-100 text-red-700'
// // // //                       : 'bg-gray-100 text-gray-700'
// // // //                   }`}
// // // //                 >
// // // //                   {order.status}
// // // //                 </span>
// // // //               </div>

// // // //               {/* TOTAL */}
// // // //               <p className="text-gray-600 mt-2">
// // // //                 Total: ₹{order.totalAmount}
// // // //               </p>

// // // //               {/* ITEMS (SAFE CHECK) */}
// // // //               <div className="mt-3 text-sm text-gray-700">
// // // //                 {(order.items || []).map((item, index) => (
// // // //                   <p key={index}>
// // // //                     • {item.name} × {item.quantity}
// // // //                   </p>
// // // //                 ))}
// // // //               </div>

// // // //               {/* ACTION BUTTONS */}
// // // //               <div className="flex gap-2 mt-4">

// // // //                 <button
// // // //                   onClick={() => updateStatus(order.id, 'completed')}
// // // //                   className="px-3 py-1 bg-green-600 text-white rounded"
// // // //                 >
// // // //                   Mark Done
// // // //                 </button>

// // // //                 <button
// // // //                   onClick={() => updateStatus(order.id, 'cancelled')}
// // // //                   className="px-3 py-1 bg-red-600 text-white rounded"
// // // //                 >
// // // //                   Cancel
// // // //                 </button>

// // // //                 <button
// // // //                   onClick={() => updateStatus(order.id, 'preparing')}
// // // //                   className="px-3 py-1 bg-blue-600 text-white rounded"
// // // //                 >
// // // //                   Preparing
// // // //                 </button>

// // // //               </div>

// // // //             </div>
// // // //           ))}

// // // //         </div>
// // // //       )}

// // // //     </div>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { db } from '@/app/lib/firebase';
// // // import {
// // //   collection,
// // //   onSnapshot,
// // //   doc,
// // //   updateDoc,
// // // } from 'firebase/firestore';

// // // type Order = {
// // //   id: string;
// // //   userId: string;
// // //   items: Order[];
// // //    name: string;
// // //   quantity: number;
// // //   totalAmount: number;
// // //   status: string;
// // //   createdAt: number;
// // // };

// // // /* ✅ 8-digit order id generator */
// // // const getShortOrderId = (id: string) => {
// // //   let hash = 0;
// // //   for (let i = 0; i < id.length; i++) {
// // //     hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
// // //   }
// // //   return String(hash).slice(0, 8).padStart(8, '0');
// // // };

// // // /* ✅ Time formatter */
// // // const formatTime = (timestamp: number) => {
// // //   if (!timestamp) return 'Unknown time';

// // //   return new Date(timestamp).toLocaleString('en-IN', {
// // //     dateStyle: 'medium',
// // //     timeStyle: 'short',
// // //   });
// // // };

// // // export default function AdminOrdersPage() {
// // //   const [orders, setOrders] = useState<Order[]>([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const unsub = onSnapshot(collection(db, 'orders'), (snapshot) => {
// // //       const data: Order[] = snapshot.docs.map((doc) => ({
// // //         id: doc.id,
// // //         ...(doc.data() as Omit<Order, 'id'>),
// // //       }));

// // //       console.log('🔥 ADMIN ORDERS:', data);

// // //       data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

// // //       setOrders(data);
// // //       setLoading(false);
// // //     });

// // //     return () => unsub();
// // //   }, []);

// // //   const updateStatus = async (orderId: string, status: string) => {
// // //     await updateDoc(doc(db, 'orders', orderId), {
// // //       status,
// // //     });
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="p-10 text-center text-gray-500">
// // //         Loading orders...
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="p-6">

// // //       <h1 className="text-3xl font-bold mb-6">
// // //         🔥 Admin Orders Dashboard
// // //       </h1>

// // //       {orders.length === 0 ? (
// // //         <p className="text-gray-500">No orders yet</p>
// // //       ) : (
// // //         <div className="space-y-4">

// // //           {orders.map((order) => (
// // //             <div
// // //               key={order.id}
// // //               className="border rounded-lg p-4 shadow-sm bg-white"
// // //             >

// // //               {/* HEADER */}
// // //               <div className="flex justify-between items-center">
// // //                 <div>
// // //                   <p className="font-semibold">
// // //                     Order ID: {getShortOrderId(order.id)}
// // //                   </p>

// // //                   <p className="text-gray-500 text-sm">
// // //                     Placed at: {formatTime(order.createdAt)}
// // //                   </p>
// // //                 </div>

// // //                 <span
// // //                   className={`px-3 py-1 rounded text-sm font-bold ${
// // //                     order.status === 'pending'
// // //                       ? 'bg-yellow-100 text-yellow-700'
// // //                       : order.status === 'completed'
// // //                       ? 'bg-green-100 text-green-700'
// // //                       : order.status === 'cancelled'
// // //                       ? 'bg-red-100 text-red-700'
// // //                       : 'bg-gray-100 text-gray-700'
// // //                   }`}
// // //                 >
// // //                   {order.status}
// // //                 </span>
// // //               </div>

// // //               {/* TOTAL */}
// // //               <p className="text-gray-600 mt-2">
// // //                 Total: ₹{order.totalAmount}
// // //               </p>
                  
// // //               {/* ITEMS */}
              
// // //               <div className="mt-3 text-sm text-gray-700">
// // //                 {(order.items || []).map((item, index) => (
// // //                   <p key={index}>
// // //                     • {item.name} × {item.quantity}
// // //                   </p>
// // //                 ))}
// // //               </div>

// // //               {/* ACTION BUTTONS */}
// // //               <div className="flex gap-2 mt-4">

// // //                 <button
// // //                   onClick={() => updateStatus(order.id, 'delivered')}
// // //                   className="px-3 py-1 bg-green-600 text-white rounded"
// // //                 >
// // //                   Mark Done
// // //                 </button>

// // //                 <button
// // //                   onClick={() => updateStatus(order.id, 'cancelled')}
// // //                   className="px-3 py-1 bg-red-600 text-white rounded"
// // //                 >
// // //                   Cancel
// // //                 </button>

// // //                 <button
// // //                   onClick={() => updateStatus(order.id, 'preparing')}
// // //                   className="px-3 py-1 bg-blue-600 text-white rounded"
// // //                 >
// // //                   Preparing
// // //                 </button>

// // //               </div>

// // //             </div>
// // //           ))}

// // //         </div>
// // //       )}

// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { db } from '@/lib/firebase';
// // import {
// //   collection,
// //   onSnapshot,
// //   doc,
// //   updateDoc,
// // } from 'firebase/firestore';

// // type Order = {
// //   id: string;
// //   userId: string;
// //   items: { name: string; quantity: number }[]; // Corrected type for items
// //   totalAmount: number;
// //   status: string;
// //   createdAt: number;
// // };

// // /* ✅ Time formatter */
// // const formatTime = (timestamp: number) => {
// //   if (!timestamp) return 'Unknown time';
// //   return new Date(timestamp).toLocaleString('en-IN', {
// //     dateStyle: 'medium',
// //     timeStyle: 'short',
// //   });
// // };

// // export default function AdminOrdersPage() {
// //   const [orders, setOrders] = useState<Order[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const unsub = onSnapshot(collection(db, 'orders'), (snapshot) => {
// //       const data: Order[] = snapshot.docs.map((doc) => ({
// //         id: doc.id,
// //         ...(doc.data() as Omit<Order, 'id'>),
// //       }));

// //       data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
// //       setOrders(data);
// //       setLoading(false);
// //     });

// //     return () => unsub();
// //   }, []);

// //   const updateStatus = async (orderId: string, status: string) => {
// //     try {
// //       await updateDoc(doc(db, 'orders', orderId), { status });
// //     } catch (error) {
// //       console.error("Error updating status:", error);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
// //         <p className="text-gray-500 dark:text-gray-400">Loading orders...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
// //       <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
// //         🔥 Admin Orders Dashboard
// //       </h1>

// //       {orders.length === 0 ? (
// //         <p className="text-gray-500 dark:text-gray-400 text-center py-20">No orders yet</p>
// //       ) : (
// //         <div className="space-y-4">
// //           {orders.map((order) => (
// //             <div
// //               key={order.id}
// //               className="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm bg-white dark:bg-gray-900 transition-colors duration-300"
// //             >
// //               {/* HEADER */}
// //               <div className="flex justify-between items-start">
// //                 <div>
// //                   <p className="font-semibold text-gray-800 dark:text-white uppercase font-mono">
// //                     Order ID: #{order.id.slice(0, 8)}
// //                   </p>
// //                   <p className="text-gray-500 dark:text-gray-400 text-sm">
// //                     Placed at: {formatTime(order.createdAt)}
// //                   </p>
// //                 </div>

// //                 <span
// //                   className={`px-3 py-1 rounded-full text-xs font-bold ${
// //                     order.status === 'pending'
// //                       ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
// //                       : order.status === 'completed'
// //                       ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
// //                       : order.status === 'cancelled'
// //                       ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
// //                       : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
// //                   }`}
// //                 >
// //                   {order?.status?.toUpperCase()|| 'PENDING' }
// //                 </span>
// //               </div>

// //               {/* TOTAL */}
// //               <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
// //                 Total: ₹{order.totalAmount}
// //               </p>

// //               {/* ITEMS */}
// //               <div className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-1">
// //                 {(order.items || []).map((item, index) => (
// //                   <p key={index} className="flex gap-2">
// //                     <span className="opacity-70">•</span>
// //                     {item.name} <span className="font-semibold">× {item.quantity}</span>
// //                   </p>
// //                 ))}
// //               </div>

// //               {/* ACTION BUTTONS */}
// //               <div className="flex gap-2 mt-5">
// //                 <button
// //                   onClick={() => updateStatus(order.id, 'delivered')}
// //                   className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition"
// //                 >
// //                   Mark Done
// //                 </button>
// //                 <button
// //                   onClick={() => updateStatus(order.id, 'preparing')}
// //                   className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition"
// //                 >
// //                   Preparing
// //                 </button>
// //                 <button
// //                   onClick={() => updateStatus(order.id, 'cancelled')}
// //                   className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition"
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// 'use client';

// import { useEffect, useState } from 'react';
// import { db } from '@/lib/firebase';
// import {
//   collection,
//   onSnapshot,
//   doc,
//   updateDoc,
//   deleteDoc, // Added deleteDoc
//   query,
//   orderBy,
// } from 'firebase/firestore';

// /* ─────────────────────────────────────────
//    Types & Helpers
// ───────────────────────────────────────── */

// interface FirestoreTimestamp {
//   toMillis(): number;
// }

// interface FirestoreOrder {
//   userId?: string;
//   items?: { name: string; quantity: number }[];
//   totalAmount?: number;
//   total?: number;
//   status?: string;
//   orderStatus?: string;
//   createdAt?: FirestoreTimestamp | number | null;
//   serverCreatedAt?: FirestoreTimestamp | number | null;
// }

// type Order = {
//   id: string;
//   userId: string;
//   items: { name: string; quantity: number }[];
//   totalAmount: number;
//   status: string;
//   createdAt: number;
// };

// function resolveTimestamp(value: any): number {
//   if (!value) return Date.now(); // Fallback to now instead of 0 for better sorting
//   if (typeof value === 'number') return value;
//   if (typeof value.toMillis === 'function') return value.toMillis();
//   return Date.now();
// }

// function normalizeOrder(id: string, raw: FirestoreOrder): Order {
//   return {
//     id,
//     userId: raw.userId ?? 'Anonymous',
//     items: Array.isArray(raw.items) ? raw.items : [],
//     totalAmount: raw.totalAmount ?? raw.total ?? 0,
//     // Fix: Using || instead of ?? to catch null or empty strings
//     status: (raw.status || raw.orderStatus || 'pending').toLowerCase(),
//     createdAt: resolveTimestamp(raw.createdAt ?? raw.serverCreatedAt),
//   };
// }

// const formatTime = (timestamp: number): string => {
//   return new Date(timestamp).toLocaleString('en-IN', {
//     dateStyle: 'medium',
//     timeStyle: 'short',
//   });
// };

// function statusBadgeClass(status: string): string {
//   switch (status) {
//     case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
//     case 'completed':
//     case 'delivered': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
//     case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
//     case 'preparing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
//     default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
//   }
// }

// /* ─────────────────────────────────────────
//    Main Component
// ───────────────────────────────────────── */

// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));

//     const unsub = onSnapshot(ordersQuery, (snapshot) => {
//       const normalized: Order[] = snapshot.docs.map((document) =>
//         normalizeOrder(document.id, document.data() as FirestoreOrder)
//       );
//       setOrders(normalized);
//       setLoading(false);
//     });

//     return () => unsub();
//   }, []);

//   const updateStatus = async (orderId: string, status: string) => {
//     try {
//       await updateDoc(doc(db, 'orders', orderId), { status });
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   const deleteOrder = async (orderId: string) => {
//     if (!confirm('Are you sure you want to delete this order forever?')) return;
//     try {
//       await deleteDoc(doc(db, 'orders', orderId));
//     } catch (error) {
//       console.error('Error deleting order:', error);
//       alert('Failed to delete order.');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
//         <p className="animate-pulse text-gray-500">Loading orders...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
//           🔥 Admin Orders Dashboard
//         </h1>
//         <span className="text-sm font-medium bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-lg dark:text-gray-300">
//           {orders.length} Orders
//         </span>
//       </div>

//       {orders.length === 0 ? (
//         <div className="text-center py-20 border-2 border-dashed rounded-3xl border-gray-200 dark:border-gray-800">
//           <p className="text-gray-500">No orders found in the database.</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div
//               key={order.id}
//               className="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm bg-white dark:bg-gray-900 transition-all hover:shadow-md"
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="font-semibold text-gray-800 dark:text-white uppercase font-mono">
//                     ID: #{order.id.slice(0, 8)}
//                   </p>
//                   <p className="text-gray-500 dark:text-gray-400 text-sm">
//                     {formatTime(order.createdAt)}
//                   </p>
//                 </div>

//                 <div className="flex flex-col items-end gap-2">
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusBadgeClass(order.status)}`}>
//                     {/* Defensive fix: Optional chaining + fallback */}
//                     {(order.status || 'PENDING').toUpperCase()}
//                   </span>
//                   <button 
//                     onClick={() => deleteOrder(order.id)}
//                     className="text-xs text-red-500 hover:underline"
//                   >
//                     Delete Record
//                   </button>
//                 </div>
//               </div>

//               <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
//                 Total: ₹{order.totalAmount}
//               </p>

//               <div className="mt-3 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
//                 {order.items.map((item, index) => (
//                   <p key={index} className="flex justify-between">
//                     <span>{item.name}</span>
//                     <span className="font-mono font-bold">×{item.quantity}</span>
//                   </p>
//                 ))}
//               </div>

//               <div className="flex gap-2 mt-5 flex-wrap">
//                 <button
//                   onClick={() => updateStatus(order.id, 'delivered')}
//                   className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition"
//                 >
//                   Mark Done
//                 </button>
//                 <button
//                   onClick={() => updateStatus(order.id, 'preparing')}
//                   className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition"
//                 >
//                   Preparing
//                 </button>
//                 <button
//                   onClick={() => updateStatus(order.id, 'cancelled')}
//                   className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20 rounded-xl text-sm font-semibold transition"
//                 >
//                   Cancel Order
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { Utensils } from 'lucide-react';

interface FirestoreTimestamp {
  toMillis(): number;
}

interface FirestoreOrder {
  userId?: string;
  items?: { name: string; quantity: number }[];
  totalAmount?: number;
  total?: number;
  status?: string;
  orderStatus?: string;
  createdAt?: FirestoreTimestamp | number | null;
  serverCreatedAt?: FirestoreTimestamp | number | null;
  tableNumber?: string | number;
}

type Order = {
  id: string;
  userId: string;
  items: { name: string; quantity: number }[];
  totalAmount: number;
  status: string;
  createdAt: number;
  tableNumber: string;
};

// 🛠️ FIX: 'any' type ko hatakar strict 'unknown' verification type use kiya hai safely
function resolveTimestamp(value: unknown): number {
  if (!value) return Date.now();
  if (typeof value === 'number') return value;
  
  // Custom structural verification loop to bypass explicit any checks
  if (value && typeof value === 'object' && 'toMillis' in value) {
    const obj = value as { toMillis: unknown };
    if (typeof obj.toMillis === 'function') {
      return obj.toMillis();
    }
  }
  return Date.now();
}

function normalizeOrder(id: string, raw: FirestoreOrder): Order {
  return {
    id,
    userId: raw.userId ?? 'Anonymous',
    items: Array.isArray(raw.items) ? raw.items : [],
    totalAmount: raw.totalAmount ?? raw.total ?? 0,
    status: (raw.status || raw.orderStatus || 'pending').toLowerCase(),
    createdAt: resolveTimestamp(raw.createdAt ?? raw.serverCreatedAt),
    tableNumber: raw.tableNumber ? raw.tableNumber.toString() : '',
  };
}

const formatTime = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

function statusBadgeClass(status: string): string {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'completed':
    case 'delivered': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    case 'preparing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTableFilter, setSelectedTableFilter] = useState<string>('all');

  useEffect(() => {
    const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));

    const unsub = onSnapshot(ordersQuery, (snapshot) => {
      const normalized: Order[] = snapshot.docs.map((document) =>
        normalizeOrder(document.id, document.data() as FirestoreOrder)
      );
      setOrders(normalized);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order forever?')) return;
    try {
      await deleteDoc(doc(db, 'orders', orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order.');
    }
  };

  const uniqueTables = Array.from(
    new Set(orders.map((o) => o.tableNumber).filter((t) => t !== ''))
  ).sort();

  const filteredOrders = selectedTableFilter === 'all' 
    ? orders 
    : orders.filter((o) => o.tableNumber === selectedTableFilter);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="animate-pulse text-gray-500">Loading orders dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            🔥 Admin Orders Dashboard
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Real-time QR Table-service integration active.</p>
        </div>
        <span className="text-sm font-medium bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-lg dark:text-gray-300 self-start sm:self-center">
          {filteredOrders.length} Orders Shown
        </span>
      </div>

      {uniqueTables.length > 0 && (
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedTableFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition ${
              selectedTableFilter === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            All Tables
          </button>
          {uniqueTables.map((table) => (
            <button
              key={table}
              onClick={() => setSelectedTableFilter(table)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 flex items-center gap-1 transition ${
                selectedTableFilter === table
                  ? 'bg-orange-500 text-white'
                  : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Utensils className="w-3 h-3" /> Table {table}
            </button>
          ))}
        </div>
      )}

      {filteredOrders.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-3xl border-gray-200 dark:border-gray-800">
          <p className="text-gray-500">No active orders matching filters found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm bg-white dark:bg-gray-900 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-800 dark:text-white uppercase font-mono">
                      ID: #{order.id.slice(0, 8)}
                    </p>
                    
                    {order.tableNumber && (
                      <span className="inline-flex items-center gap-1 bg-orange-500 text-white text-xs font-black px-2 py-0.5 rounded shadow-sm">
                        TABLE {order.tableNumber}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                    {formatTime(order.createdAt)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusBadgeClass(order.status)}`}>
                    {(order.status || 'PENDING').toUpperCase()}
                  </span>
                  <button 
                    onClick={() => deleteOrder(order.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Delete Record
                  </button>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
                Total Amount: ₹{order.totalAmount}
              </p>

              <div className="mt-3 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                {order.items.map((item, index) => (
                  <p key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="font-mono font-bold">×{item.quantity}</span>
                  </p>
                ))}
              </div>

              <div className="flex gap-2 mt-5 flex-wrap">
                <button
                  onClick={() => updateStatus(order.id, 'completed')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition"
                >
                  Mark Done
                </button>
                <button
                  onClick={() => updateStatus(order.id, 'preparing')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition"
                >
                  Preparing
                </button>
                <button
                  onClick={() => updateStatus(order.id, 'cancelled')}
                  className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20 rounded-xl text-sm font-semibold transition"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}