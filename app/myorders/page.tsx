// "use strict";

// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { 
//   collection, 
//   query, 
//   where, 
//   orderBy, 
//   onSnapshot 
// } from "firebase/firestore";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { db, auth } from "@/lib/firebase"; // Adjust this path to your Firebase config file
// import { 
//   ShoppingBag, 
//   Clock, 
//   ChevronDown, 
//   ChevronUp, 
//   Phone, 
//   Mail, 
//   Tag, 
//   Globe, 
//   HelpCircle, 
//   RefreshCw, 
//   Lock 
// } from "lucide-react";

// // --- TYPES ---
// interface OrderItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
//   category: string;
// }

// interface Order {
//   id: string; // Document ID from Firestore
//   userId: string;
//   customerName: string;
//   customerPhone: string;
//   customerEmail: string;
//   items: OrderItem[];
//   subtotal: number;
//   discount: number;
//   promoCode: string;
//   totalAmount: number;
//   status: "pending" | "preparing" | "out_for_delivery" | "completed" | "cancelled";
//   source: string;
//   createdAt: number;
// }

// export default function MyOrdersPage() {
//   const [user, setUser] = useState<User | null>(null);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [authLoading, setAuthLoading] = useState<boolean>(true);
//   const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

//   // 1. Handle Authentication State
//   useEffect(() => {
//     const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setAuthLoading(false);
//     });
//     return () => unsubscribeAuth();
//   }, []);

//   // 2. Handle Real-time Orders Listener
//   useEffect(() => {
//     if (authLoading) return;
//     if (!user) {
//       setLoading(false);
//       return;
//     }

//     setLoading(true);

//     // Construct the query: Filter by logged-in user, sort by newest first
//     const ordersRef = collection(db, "orders");
//     const q = query(
//       ordersRef,
//       where("userId", "==", user.uid),
//       orderBy("createdAt", "desc")
//     );

//     // Real-time listener using onSnapshot
//     const unsubscribeSnapshot = onSnapshot(
//       q,
//       (snapshot) => {
//         const fetchedOrders: Order[] = [];
//         snapshot.forEach((doc) => {
//           fetchedOrders.push({
//             id: doc.id,
//             ...doc.data(),
//           } as Order);
//         });
//         setOrders(fetchedOrders);
//         setLoading(false);
//       },
//       (error) => {
//         console.error("Error fetching real-time orders:", error);
//         setLoading(false);
//       }
//     );

//     return () => unsubscribeSnapshot();
//   }, [user, authLoading]);

//   // Toggle expanded details panel
//   const toggleExpand = (orderId: string) => {
//     setExpandedOrders((prev) => ({
//       ...prev,
//       [orderId]: !prev[orderId],
//     }));
//   };

//   // Action placeholder: Reorder
//   const handleReorder = (order: Order) => {
//     // TODO: Implement your reorder logic here.
//     // This typically involves mapping the order items into your global Cart Context/State
//     // and redirecting the customer to the checkout page.
//     console.log("Reorder triggered for order ID:", order.id, order.items);
//     alert(`Reordering items from order #${order.id.slice(0, 6).toUpperCase()}`);
//   };

//   // Helper: Status badge color maps
//   const getStatusStyles = (status: Order["status"]) => {
//     switch (status) {
//       case "pending":
//         return "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-900";
//       case "preparing":
//         return "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-900";
//       case "out_for_delivery":
//         return "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200 dark:border-purple-900";
//       case "completed":
//         return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900";
//       case "cancelled":
//         return "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-900";
//       default:
//         return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700";
//     }
//   };

//   const formatStatusText = (status: string) => {
//     return status.replace(/_/g, " ").toUpperCase();
//   };

//   // --- RENDERS: AUTH REQUIRED SCREEN ---
//   if (!authLoading && !user) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-200">
//         <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100 dark:border-gray-800">
//           <div className="w-16 h-16 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Lock className="w-8 h-8" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Login Required</h2>
//           <p className="text-gray-600 dark:text-gray-400 mb-6">
//             Please sign in to view your orders, track real-time deliveries, and manage your past history.
//           </p>
//           <Link 
//             href="/login" 
//             className="block w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-semibold rounded-xl tracking-wide transition shadow-lg shadow-orange-500/20"
//           >
//             Go to Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // --- RENDERS: MAIN INTERFACE ---
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200 pb-16">
//       <div className="max-w-5xl mx-auto px-4 pt-8 md:pt-12">
        
//         {/* Top Header Section */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6 mb-8">
//           <div>
//             <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
//               My Orders
//             </h1>
//             {!authLoading && user && !loading && (
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                 You have placed a total of <span className="font-semibold text-orange-500">{orders.length}</span> orders
//               </p>
//             )}
//           </div>
//           <Link 
//             href="/menu" 
//             className="inline-flex items-center justify-center px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-semibold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-200 transition"
//           >
//             Continue Shopping
//           </Link>
//         </div>

//         {/* LOADING SKELETON STATE */}
//         {(authLoading || loading) && (
//           <div className="space-y-6">
//             {[1, 2].map((n) => (
//               <div key={n} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 animate-pulse space-y-4">
//                 <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800">
//                   <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
//                   <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-24" />
//                 </div>
//                 <div className="flex space-x-4 py-2">
//                   <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-lg" />
//                   <div className="flex-1 space-y-2 py-1">
//                     <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
//                     <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
//                   </div>
//                 </div>
//                 <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full mt-4" />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* EMPTY STATE */}
//         {!authLoading && !loading && orders.length === 0 && (
//           <div className="flex flex-col items-center justify-center text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm max-w-2xl mx-auto px-6 mt-8">
//             <div className="w-20 h-20 bg-orange-50 dark:bg-orange-950/30 text-orange-500 rounded-full flex items-center justify-center mb-6">
//               <ShoppingBag className="w-10 h-10" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Orders Yet</h3>
//             <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
//               You haven't placed any orders yet. Discover delicious choices around you and start your first treat!
//             </p>
//             <Link 
//               href="/menu" 
//               className="px-6 py-3 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-semibold rounded-xl shadow-md transition duration-150"
//             >
//               Browse Menu
//             </Link>
//           </div>
//         )}

//         {/* ORDER LIST CARDS */}
//         {!authLoading && !loading && orders.length > 0 && (
//           <div className="space-y-6">
//             {orders.map((order) => {
//               const orderDate = new Date(order.createdAt);
//               const formattedDate = orderDate.toLocaleDateString("en-US", { 
//                 month: "short", 
//                 day: "numeric", 
//                 year: "numeric" 
//               });
//               const formattedTime = orderDate.toLocaleTimeString("en-US", { 
//                 hour: "2-digit", 
//                 minute: "2-digit" 
//               });
//               const isExpanded = !!expandedOrders[order.id];

//               return (
//                 <div 
//                   key={order.id}
//                   className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden transition duration-200 hover:shadow-md"
//                 >
                  
//                   {/* Card Header Info */}
//                   <div className="p-5 sm:p-6 bg-gray-50/70 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                     <div className="space-y-1">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                           Order
//                         </span>
//                         <span className="text-sm font-bold font-mono text-gray-900 dark:text-white uppercase">
//                           #{order.id.slice(0, 8)}
//                         </span>
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusStyles(order.status)}`}>
//                           {formatStatusText(order.status)}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
//                         <Clock className="w-3.5 h-3.5 text-gray-400" />
//                         <span>{formattedDate}</span>
//                         <span>•</span>
//                         <span>{formattedTime}</span>
//                       </div>
//                     </div>

//                     <div className="sm:text-right">
//                       <span className="text-xs font-medium text-gray-400 block mb-0.5">Payment</span>
//                       <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400">
//                         Paid Online
//                       </span>
//                     </div>
//                   </div>

//                   {/* Card Main Body */}
//                   <div className="p-5 sm:p-6 space-y-6">
                    
//                     {/* Customer Identity Info */}
//                     <div className="text-xs text-gray-500 dark:text-gray-400">
//                       Customer Name: <span className="font-semibold text-gray-800 dark:text-gray-200">{order.customerName}</span>
//                     </div>

//                     {/* Ordered Items Section */}
//                     <div>
//                       <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Items Ordered</h4>
//                       <div className="divide-y divide-gray-100 dark:divide-gray-800">
//                         {order.items.map((item) => (
//                           <div key={item.id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
//                             <div className="flex items-center gap-3">
//                               <div className="relative w-14 h-14 rounded-lg bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden">
//                                 {item.img ? (
//                                   <img
//                                     src={item.image}
//                                     alt={item.name}
//                                     fill
//                                     sizes="56px"
//                                     className="object-cover"
//                                   />
//                                 ) : (
//                                   <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
//                                     Food
//                                   </div>
//                                 )}
//                               </div>
//                               <div>
//                                 <h5 className="font-semibold text-sm text-gray-900 dark:text-white">{item.name}</h5>
//                                 <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
//                                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 sm:hidden">
//                                   ${item.price.toFixed(2)} × {item.quantity}
//                                 </p>
//                               </div>
//                             </div>

//                             <div className="text-right hidden sm:block">
//                               <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                                 ${item.price.toFixed(2)} × {item.quantity}
//                               </span>
//                             </div>

//                             <div className="text-right">
//                               <span className="text-sm font-bold text-gray-900 dark:text-white">
//                                 ${(item.price * item.quantity).toFixed(2)}
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Pricing Breakdown Section
//                     <div className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-xl space-y-2 border border-gray-100 dark:border-gray-800/80">
//                       <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
//                         <span>Subtotal</span>
//                         <span>${order.subtotal.toFixed(2)}</span>
//                       </div>
//                       {order.discount > 0 && (
//                         <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400 font-medium">
//                           <span className="flex items-center gap-1">
//                             Discount {order.promoCode && `(${order.promoCode})`}
//                           </span>
//                           <span>-${order.discount.toFixed(2)}</span>
//                         </div>
//                       )}
//                       <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-800">
//                         <span>Total Amount</span>
//                         <span className="text-orange-500 dark:text-orange-400">${order.totalAmount.toFixed(2)}</span>
//                       </div>
//                     </div> */}
//                     {/* Pricing Breakdown Section - Fixed & Crash Proof */}
//                     <div className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-xl space-y-2 border border-gray-100 dark:border-gray-800/80">
//                       <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
//                         <span>Subtotal</span>
//                         <span>${Number(order?.subtotal || 0).toFixed(2)}</span>
//                       </div>
//                       {Number(order?.discount || 0) > 0 && (
//                         <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400 font-medium">
//                           <span className="flex items-center gap-1">
//                             Discount {order?.promoCode && `(${order.promoCode})`}
//                           </span>
//                           <span>-${Number(order?.discount || 0).toFixed(2)}</span>
//                         </div>
//                       )}
//                       <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-800">
//                         <span>Total Amount</span>
//                         <span className="text-orange-500 dark:text-orange-400">${Number(order?.totalAmount || 0).toFixed(2)}</span>
//                       </div>
//                     </div>

//                     {/* Expandable Order Details Section */}
//                     {isExpanded && (
//                       <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-4 text-sm animate-fadeIn">
//                         <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Extended Order Information</h4>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-900/30 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
//                           <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
//                             <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                             <span className="font-medium text-gray-900 dark:text-white">{order.customerPhone}</span>
//                           </div>
//                           <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
//                             <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                             <span className="font-medium text-gray-900 dark:text-white truncate">{order.customerEmail}</span>
//                           </div>
//                           <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
//                             <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                             <span>Promo: </span>
//                             <span className="font-medium text-gray-900 dark:text-white">
//                               {order.promoCode ? order.promoCode : "None Applied"}
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
//                             <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
//                             <span>Channel: </span>
//                             <span className="font-medium text-gray-900 dark:text-white capitalize">{order.source}</span>
//                           </div>
//                         </div>

//                         {/* Complete Breakdown Log */}
//                         <div>
//                           <p className="text-xs text-gray-400 mb-1">System tracking ID: {order.id}</p>
//                           <p className="text-xs text-gray-400">Database Timestamp Epoch: {order.createdAt}</p>
//                         </div>
//                       </div>
//                     )}

//                     {/* Action Triggers Bar */}
//                     <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      
//                       {/* Expand / Collapse Button */}
//                       <button
//                         onClick={() => toggleExpand(order.id)}
//                         className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition py-2"
//                       >
//                         {isExpanded ? (
//                           <>
//                             Hide Details <ChevronUp className="w-4 h-4" />
//                           </>
//                         ) : (
//                           <>
//                             View Details <ChevronDown className="w-4 h-4" />
//                           </>
//                         )}
//                       </button>

//                       {/* Action Links & Triggers */}
//                       <div className="flex items-center gap-2 flex-col sm:flex-row w-full sm:w-auto">
//                         <Link
//                           href="/contact"
//                           className="inline-flex items-center justify-center gap-1.5 px-4 py-2 w-full sm:w-auto border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition text-center"
//                         >
//                           <HelpCircle className="w-3.5 h-3.5" />
//                           Contact Support
//                         </Link>
                        
//                         <button
//                           onClick={() => handleReorder(order)}
//                           className="inline-flex items-center justify-center gap-1.5 px-4 py-2 w-full sm:w-auto bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white text-xs font-semibold rounded-xl transition shadow-sm"
//                         >
//                           <RefreshCw className="w-3.5 h-3.5" />
//                           Reorder
//                         </button>
//                       </div>

//                     </div>

//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }
"use strict";

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  collection, 
  query, 
  where, 
  onSnapshot 
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { db, auth } from "@/lib/firebase"; 
import { 
  ShoppingBag, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  Tag, 
  Globe, 
  HelpCircle, 
  RefreshCw, 
  Lock 
} from "lucide-react";

// --- TYPES ---
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface Order {
  id: string; 
  userId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  promoCode: string;
  total?: number;
  totalAmount?: number;
  status?: string;
  orderStatus?: string;
  createdAt: unknown;
  paymentMethod?: string;
  paymentStatus?: string;
  source?: string;
}

interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

function isFirestoreTimestamp(val: unknown): val is FirestoreTimestamp {
  return typeof val === "object" && val !== null && "seconds" in val;
}

export default function MyOrdersPage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

  const fallbackImage = "https://images.unsplash.com/photo-1561047029-3000c68339ca";

  // 1. Handle Authentication State & Cleanup Synchronous UI Triggers Cleanly
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        // Agar user logged in nahi hai, toh यहीं par saari loading aur state flush kar do
        setOrders([]);
        setLoading(false);
      }
      setAuthLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  // 2. Real-time Subscription - Only runs if user exists (No synchronous setState in block body)
  useEffect(() => {
    if (authLoading || !user) return;

    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("userId", "==", user.uid));

    const unsubscribeSnapshot = onSnapshot(
      q,
      (snapshot) => {
        const fetchedOrders: Order[] = [];
        snapshot.forEach((doc) => {
          fetchedOrders.push({
            id: doc.id,
            ...doc.data(),
          } as Order);
        });

        // Safe Client-side Descending Sorting
        fetchedOrders.sort((a, b) => {
          const parseToMs = (dateValue: unknown): number => {
            if (!dateValue) return 0;
            if (isFirestoreTimestamp(dateValue)) {
              return dateValue.seconds * 1000;
            }
            if (typeof dateValue === "string") {
              const parsed = Date.parse(dateValue);
              return isNaN(parsed) ? (Number(dateValue) || 0) : parsed;
            }
            if (typeof dateValue === "number") {
              return dateValue;
            }
            return 0;
          };

          return parseToMs(b.createdAt) - parseToMs(a.createdAt);
        });

        setOrders(fetchedOrders);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching real-time orders:", error);
        setLoading(false);
      }
    );

    return () => unsubscribeSnapshot();
  }, [user, authLoading]);

  const toggleExpand = (orderId: string) => {
    setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const handleReorder = (order: Order) => {
    alert(`Reordering items from order #${order.id.slice(0, 6).toUpperCase()}`);
  };

  const getStatusStyles = (order: Order) => {
    const currentStatus = (order.status || order.orderStatus || "pending").toLowerCase();
    switch (currentStatus) {
      case "pending":
      case "confirmed":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-900";
      case "preparing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-900";
      case "out_for_delivery":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200 dark:border-purple-900";
      case "completed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900";
      case "cancelled":
        return "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-900";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  const formatStatusText = (order: Order) => {
    const text = order.status || order.orderStatus || "pending";
    return text.replace(/_/g, " ").toUpperCase();
  };

  if (!authLoading && !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100 dark:border-gray-800">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Login Required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Please sign in to view your orders history.</p>
          <Link href="/login" className="block w-full py-3 px-4 bg-orange-500 text-white font-semibold rounded-xl text-center">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 pb-16">
      <div className="max-w-5xl mx-auto px-4 pt-8 md:pt-12">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">My Orders</h1>
            {!authLoading && user && !loading && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                You have placed a total of <span className="font-semibold text-orange-500">{orders.length}</span> orders
              </p>
            )}
          </div>
          <Link href="/menu" className="inline-flex items-center justify-center px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200">
            Continue Shopping
          </Link>
        </div>

        {/* LOADING SKELETON */}
        {(authLoading || loading) && (
          <div className="space-y-6">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 animate-pulse space-y-4">
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
                <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!authLoading && !loading && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 max-w-2xl mx-auto px-6 mt-8">
            <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Orders Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">You haven&apos;t placed any orders yet.</p>
            <Link href="/menu" className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl">Browse Menu</Link>
          </div>
        )}

        {/* LIST CARDS */}
        {!authLoading && !loading && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => {
              let orderDate = new Date();
              if (order.createdAt) {
                if (isFirestoreTimestamp(order.createdAt)) {
                  orderDate = new Date(order.createdAt.seconds * 1000);
                } else if (typeof order.createdAt === "string" && isNaN(Number(order.createdAt))) {
                  orderDate = new Date(order.createdAt);
                } else {
                  orderDate = new Date(Number(order.createdAt));
                }
              }
              
              const formattedDate = orderDate.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
              const formattedTime = orderDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
              
              const isExpanded = !!expandedOrders[order.id];
              const validItems = Array.isArray(order.items) ? order.items : [];
              const finalDisplayTotal = Number(order.totalAmount || order.total || 0);

              return (
                <div key={order.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden transition duration-200">
                  
                  {/* Card Header */}
                  <div className="p-5 sm:p-6 bg-gray-50/70 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Order</span>
                        <span className="text-sm font-bold font-mono text-gray-900 dark:text-white uppercase">#{order.id.slice(0, 8)}</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusStyles(order)}`}>
                          {formatStatusText(order)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{formattedDate}</span>
                        <span>•</span>
                        <span>{formattedTime}</span>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <span className="text-xs font-medium text-gray-400 block mb-0.5">Method</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        order.paymentMethod === 'CASH_ON_TABLE' 
                          ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400' 
                          : 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400'
                      }`}>
                        {order.paymentMethod === 'CASH_ON_TABLE' ? 'Cash On Table' : `Paid Online`}
                      </span>
                    </div>
                  </div>

                  {/* Main Body */}
                  <div className="p-5 sm:p-6 space-y-6">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Customer Name: <span className="font-semibold text-gray-800 dark:text-gray-200">{order.customerName || "N/A"}</span>
                    </div>

                    {/* Items loop */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Items Ordered</h4>
                      <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {validItems.length === 0 ? (
                          <p className="text-sm text-gray-400 italic py-2">No items found in this order record.</p>
                        ) : (
                          validItems.map((item, index) => (
                            <div key={item?.id || index} className="py-3 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0 overflow-hidden relative">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={item?.image && item.image.trim() !== "" ? item.image : fallbackImage}
                                    alt={item?.name || "Food Item"}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                                  />
                                </div>
                                <div>
                                  <h5 className="font-semibold text-sm text-gray-900 dark:text-white">{item?.name || "Delicious Item"}</h5>
                                  <p className="text-xs text-gray-400 mt-0.5">{item?.category || "Food"}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 sm:hidden">
                                    ₹{(item?.price || 0).toFixed(2)} × {item?.quantity || 1}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right hidden sm:block">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                  ₹{(item?.price || 0).toFixed(2)} × {item?.quantity || 1}
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-bold text-gray-900 dark:text-white">
                                  ₹{((item?.price || 0) * (item?.quantity || 1)).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Breakdown totals */}
                    <div className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-xl space-y-2 border border-gray-100 dark:border-gray-800/80">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Subtotal</span>
                        <span>₹{Number(order?.subtotal || 0).toFixed(2)}</span>
                      </div>
                      {Number(order?.discount || 0) > 0 && (
                        <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                          <span>Discount {order?.promoCode && `(${order.promoCode})`}</span>
                          <span>-₹{Number(order?.discount || 0).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-800">
                        <span>Total Amount</span>
                        <span className="text-orange-500 dark:text-orange-400">₹{finalDisplayTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Expandable Extended Section */}
                    {isExpanded && (
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-4 text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-900/30 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                            <span className="font-medium text-gray-900 dark:text-white">{order.customerPhone || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                            <span className="font-medium text-gray-900 dark:text-white truncate">{order.customerEmail || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Tag className="w-4 h-4 text-gray-400 shrink-0" />
                            <span>Promo: <span className="font-medium text-gray-900 dark:text-white">{order.promoCode ? order.promoCode : "None Applied"}</span></span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Globe className="w-4 h-4 text-gray-400 shrink-0" />
                            <span>Channel: <span className="font-medium text-gray-900 dark:text-white capitalize">{order.source || "Web"}</span></span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions Panel */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition py-2"
                      >
                        {isExpanded ? <>Hide Details <ChevronUp className="w-4 h-4" /></> : <>View Details <ChevronDown className="w-4 h-4" /></>}
                      </button>

                      <div className="flex items-center gap-2 flex-col sm:flex-row w-full sm:w-auto">
                        <Link href="/contact" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 w-full sm:w-auto border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition text-center">
                          <HelpCircle className="w-3.5 h-3.5" /> Contact Support
                        </Link>
                        <button onClick={() => handleReorder(order)} className="inline-flex items-center justify-center gap-1.5 px-4 py-2 w-full sm:w-auto bg-orange-500 text-white text-xs font-semibold rounded-xl transition shadow-sm">
                          <RefreshCw className="w-3.5 h-3.5" /> Reorder
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}