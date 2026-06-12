// // // // // // 'use client';

// // // // // // import { useEffect, useState } from 'react';
// // // // // // import { db } from '@/app/lib/firebase';
// // // // // // import { collection, getDocs } from 'firebase/firestore';
// // // // // // import Link from 'next/link';

// // // // // // type Product = {
// // // // // //   id: string;
// // // // // //   price: number;
// // // // // // };

// // // // // // type Order = {
// // // // // //   totalAmount?: number;
// // // // // //   status?: string;
// // // // // // };

// // // // // // export default function AdminDashboard() {
// // // // // //   const [products, setProducts] = useState<Product[]>([]);
// // // // // //   const [ordersCount, setOrdersCount] = useState(0);
// // // // // //   const [revenue, setRevenue] = useState(0);
// // // // // //   const [loading, setLoading] = useState(true);

// // // // // //   useEffect(() => {
// // // // // //     const fetchData = async () => {
// // // // // //       // PRODUCTS
// // // // // //       const productSnap = await getDocs(collection(db, 'products'));
// // // // // //       const productData = productSnap.docs.map((d) => ({
// // // // // //         id: d.id,
// // // // // //         ...(d.data() as any),
// // // // // //       }));

// // // // // //       setProducts(productData);

// // // // // //       // ORDERS
// // // // // //       const orderSnap = await getDocs(collection(db, 'orders'));
// // // // // //       const orders: Order[] = orderSnap.docs.map((d) => d.data() as any);

// // // // // //       setOrdersCount(orders.length);

// // // // // //       // ✅ FIXED REVENUE LOGIC
// // // // // //       const totalRevenue = orders
// // // // // //         .filter((o) => o.status === 'completed')
// // // // // //         .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

// // // // // //       setRevenue(totalRevenue);

// // // // // //       setLoading(false);
// // // // // //     };

// // // // // //     fetchData();
// // // // // //   }, []);

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="h-screen flex items-center justify-center">
// // // // // //         Loading Admin Panel...
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="p-6 bg-gray-50 min-h-screen">

// // // // // //       <h1 className="text-3xl font-bold text-orange-600 mb-6">
// // // // // //         Admin Dashboard 🍕
// // // // // //       </h1>

// // // // // //       {/* NAV */}
// // // // // //       <div className="flex gap-4 mb-6">

// // // // // //         {/* <Link
// // // // // //           href="/admin/add-product"
// // // // // //           className="bg-orange-600 text-white px-4 py-2 rounded"
// // // // // //         >
// // // // // //           + Add Food
// // // // // //         </Link> */}

// // // // // //         {/* <Link
// // // // // //           href="/admin/orders"
// // // // // //           className="bg-blue-600 text-white px-4 py-2 rounded"
// // // // // //         >
// // // // // //           View Orders
// // // // // //         </Link> */}

// // // // // //       </div>

// // // // // //       {/* STATS */}
// // // // // //       <div className="grid md:grid-cols-3 gap-4 mb-6">

// // // // // //         <div className="bg-white p-4 rounded shadow">
// // // // // //           <h2>Total Products</h2>
// // // // // //           <p className="text-2xl font-bold">{products.length}</p>
// // // // // //         </div>

// // // // // //         <div className="bg-white p-4 rounded shadow">
// // // // // //           <h2>Total Orders</h2>
// // // // // //           <p className="text-2xl font-bold">{ordersCount}</p>
// // // // // //         </div>

// // // // // //         <div className="bg-white p-4 rounded shadow">
// // // // // //           <h2>Total Revenue</h2>
// // // // // //           <p className="text-2xl font-bold text-green-600">
// // // // // //             ₹{revenue}
// // // // // //           </p>
// // // // // //         </div>

// // // // // //       </div>

// // // // // //       {/* NOTE */}
// // // // // //       <div className="bg-yellow-100 p-4 rounded">
// // // // // //         <p className="text-sm">
// // // // // //           Future: analytics, kitchen display, POS system, live notifications
// // // // // //         </p>
// // // // // //       </div>

// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // // app/admin/page.tsx
// // // // // 'use client';

// // // // // import { useEffect, useState } from 'react';
// // // // // import { db } from '../../lib/firebase';
// // // // // import { collection, getDocs } from 'firebase/firestore';
// // // // // import Link from 'next/link';

// // // // // type Product = {
// // // // //   id: string;
// // // // //   name: string;
// // // // //   price: number;
// // // // //   available: boolean;
// // // // //   featured: boolean;
// // // // //   stock: number;
// // // // //   category: string;
// // // // // };

// // // // // type OrderItem = {
// // // // //   name: string;
// // // // //   price: number;
// // // // //   quantity: number;
// // // // // };

// // // // // type Order = {
// // // // //   id: string;
// // // // //   customerName: string;
// // // // //   totalAmount: number;
// // // // //   status: string;
// // // // //   items: OrderItem[];
// // // // //   createdAt: string;
// // // // // };

// // // // // export default function AdminDashboard() {
// // // // //   const [products, setProducts] = useState<Product[]>([]);
// // // // //   const [orders, setOrders] = useState<Order[]>([]);
// // // // //   const [revenue, setRevenue] = useState(0);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   // Stats
// // // // //   const [availableProducts, setAvailableProducts] = useState(0);
// // // // //   const [outOfStock, setOutOfStock] = useState(0);
// // // // //   const [featuredCount, setFeaturedCount] = useState(0);
// // // // //   const [pendingOrders, setPendingOrders] = useState(0);
// // // // //   const [completedOrders, setCompletedOrders] = useState(0);

// // // // //   useEffect(() => {
// // // // //     const fetchData = async () => {
// // // // //       try {
// // // // //         // ✅ FETCH PRODUCTS - proper type casting
// // // // //         const productSnap = await getDocs(collection(db, 'products'));
// // // // //         const productData: Product[] = productSnap.docs.map((docSnap) => {
// // // // //           const d = docSnap.data();
// // // // //           return {
// // // // //             id: docSnap.id,
// // // // //             name: (d.name as string) || '',
// // // // //             price: (d.price as number) || 0,
// // // // //             available: (d.available as boolean) ?? true,
// // // // //             featured: (d.featured as boolean) ?? false,
// // // // //             stock: (d.stock as number) || 0,
// // // // //             category: (d.category as string) || '',
// // // // //           };
// // // // //         });

// // // // //         setProducts(productData);
// // // // //         setAvailableProducts(productData.filter((p) => p.available).length);
// // // // //         setOutOfStock(productData.filter((p) => !p.available).length);
// // // // //         setFeaturedCount(productData.filter((p) => p.featured).length);

// // // // //         // ✅ FETCH ORDERS - proper type casting
// // // // //         const orderSnap = await getDocs(collection(db, 'orders'));
// // // // //         const orderData: Order[] = orderSnap.docs.map((docSnap) => {
// // // // //           const d = docSnap.data();
// // // // //           return {
// // // // //             id: docSnap.id,
// // // // //             customerName: (d.customerName as string) || (d.name as string) || 'Unknown',
// // // // //             totalAmount: (d.totalAmount as number) || (d.total as number) || 0,
// // // // //             status: (d.status as string) || 'pending',
// // // // //             items: (d.items as OrderItem[]) || [],
// // // // //             createdAt: (d.createdAt as string) || '',
// // // // //           };
// // // // //         });

// // // // //         setOrders(orderData);

// // // // //         // ✅ REVENUE - all orders ka total (not just completed)
// // // // //         const totalRevenue = orderData.reduce(
// // // // //           (sum, o) => sum + (o.totalAmount || 0),
// // // // //           0
// // // // //         );
// // // // //         setRevenue(totalRevenue);

// // // // //         // ✅ COMPLETED REVENUE (optional)
// // // // //         const completedRevenue = orderData
// // // // //           .filter((o) => o.status === 'completed' || o.status === 'delivered')
// // // // //           .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

// // // // //         // Order stats
// // // // //         setPendingOrders(
// // // // //           orderData.filter(
// // // // //             (o) => o.status === 'pending' || o.status === 'processing'
// // // // //           ).length
// // // // //         );
// // // // //         setCompletedOrders(
// // // // //           orderData.filter(
// // // // //             (o) => o.status === 'completed' || o.status === 'delivered'
// // // // //           ).length
// // // // //         );

// // // // //         console.log('📦 Products loaded:', productData.length);
// // // // //         console.log('🛒 Orders loaded:', orderData.length);
// // // // //         console.log('💰 Total Revenue:', totalRevenue);
// // // // //         console.log('✅ Completed Revenue:', completedRevenue);
// // // // //       } catch (error) {
// // // // //         console.error('❌ Error fetching data:', error);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchData();
// // // // //   }, []);

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
// // // // //         <div className="inline-block w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
// // // // //         <p className="text-gray-500 mt-4 text-lg">Loading Admin Panel...</p>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

// // // // //       {/* HEADER */}
// // // // //       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
// // // // //         <div>
// // // // //           <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
// // // // //             🍕 Admin Dashboard
// // // // //           </h1>
// // // // //           <p className="text-gray-500 mt-1">
// // // // //             Manage your restaurant from here
// // // // //           </p>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* QUICK LINKS */}
// // // // //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// // // // //         <Link
// // // // //           href="/admin/products"
// // // // //           className="bg-orange-600 text-white p-4 rounded-2xl text-center hover:bg-orange-700 transition font-semibold shadow-lg"
// // // // //         >
// // // // //           🍔 Products
// // // // //         </Link>

// // // // //         <Link
// // // // //           href="/admin/orders"
// // // // //           className="bg-blue-600 text-white p-4 rounded-2xl text-center hover:bg-blue-700 transition font-semibold shadow-lg"
// // // // //         >
// // // // //           📦 Orders
// // // // //         </Link>

// // // // //         <Link
// // // // //           href="/admin/categories"
// // // // //           className="bg-purple-600 text-white p-4 rounded-2xl text-center hover:bg-purple-700 transition font-semibold shadow-lg"
// // // // //         >
// // // // //           📂 Categories
// // // // //         </Link>

// // // // //         <Link
// // // // //           href="/admin/users"
// // // // //           className="bg-green-600 text-white p-4 rounded-2xl text-center hover:bg-green-700 transition font-semibold shadow-lg"
// // // // //         >
// // // // //           👥 Users
// // // // //         </Link>
// // // // //       </div>

// // // // //       {/* MAIN STATS */}
// // // // //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

// // // // //         {/* Total Products */}
// // // // //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-orange-500">
// // // // //           <div className="flex items-center justify-between">
// // // // //             <div>
// // // // //               <p className="text-gray-500 text-sm font-medium">Total Products</p>
// // // // //               <p className="text-3xl font-bold text-gray-800 mt-1">
// // // // //                 {products.length}
// // // // //               </p>
// // // // //             </div>
// // // // //             <span className="text-4xl">🍔</span>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Total Orders */}
// // // // //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-blue-500">
// // // // //           <div className="flex items-center justify-between">
// // // // //             <div>
// // // // //               <p className="text-gray-500 text-sm font-medium">Total Orders</p>
// // // // //               <p className="text-3xl font-bold text-gray-800 mt-1">
// // // // //                 {orders.length}
// // // // //               </p>
// // // // //             </div>
// // // // //             <span className="text-4xl">📦</span>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Total Revenue */}
// // // // //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-green-500">
// // // // //           <div className="flex items-center justify-between">
// // // // //             <div>
// // // // //               <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
// // // // //               <p className="text-3xl font-bold text-green-600 mt-1">
// // // // //                 ₹{revenue.toLocaleString()}
// // // // //               </p>
// // // // //             </div>
// // // // //             <span className="text-4xl">💰</span>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Pending Orders */}
// // // // //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-yellow-500">
// // // // //           <div className="flex items-center justify-between">
// // // // //             <div>
// // // // //               <p className="text-gray-500 text-sm font-medium">Pending Orders</p>
// // // // //               <p className="text-3xl font-bold text-yellow-600 mt-1">
// // // // //                 {pendingOrders}
// // // // //               </p>
// // // // //             </div>
// // // // //             <span className="text-4xl">⏳</span>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* DETAILED STATS */}
// // // // //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

// // // // //         <div className="bg-white p-4 rounded-2xl shadow-md">
// // // // //           <p className="text-gray-500 text-sm">Available Products</p>
// // // // //           <p className="text-2xl font-bold text-green-600">{availableProducts}</p>
// // // // //         </div>

// // // // //         <div className="bg-white p-4 rounded-2xl shadow-md">
// // // // //           <p className="text-gray-500 text-sm">Out of Stock</p>
// // // // //           <p className="text-2xl font-bold text-red-600">{outOfStock}</p>
// // // // //         </div>

// // // // //         <div className="bg-white p-4 rounded-2xl shadow-md">
// // // // //           <p className="text-gray-500 text-sm">Featured Items</p>
// // // // //           <p className="text-2xl font-bold text-orange-600">{featuredCount}</p>
// // // // //         </div>

// // // // //         <div className="bg-white p-4 rounded-2xl shadow-md">
// // // // //           <p className="text-gray-500 text-sm">Completed Orders</p>
// // // // //           <p className="text-2xl font-bold text-blue-600">{completedOrders}</p>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* RECENT ORDERS */}
// // // // //       <div className="bg-white rounded-2xl shadow-md p-5 mb-8">
// // // // //         <div className="flex items-center justify-between mb-4">
// // // // //           <h2 className="text-xl font-bold text-gray-800">📦 Recent Orders</h2>
// // // // //           <Link
// // // // //             href="/admin/orders"
// // // // //             className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
// // // // //           >
// // // // //             View All →
// // // // //           </Link>
// // // // //         </div>

// // // // //         {orders.length === 0 ? (
// // // // //           <div className="text-center py-8">
// // // // //             <p className="text-gray-400 text-lg">No orders yet</p>
// // // // //             <p className="text-gray-400 text-sm mt-1">
// // // // //               Orders will appear here when customers place them
// // // // //             </p>
// // // // //           </div>
// // // // //         ) : (
// // // // //           <div className="overflow-x-auto">
// // // // //             <table className="w-full">
// // // // //               <thead className="bg-gray-50">
// // // // //                 <tr>
// // // // //                   <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// // // // //                     Order ID
// // // // //                   </th>
// // // // //                   <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// // // // //                     Customer
// // // // //                   </th>
// // // // //                   <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// // // // //                     Amount
// // // // //                   </th>
// // // // //                   <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// // // // //                     Status
// // // // //                   </th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody>
// // // // //                 {orders.slice(0, 5).map((order) => (
// // // // //                   <tr
// // // // //                     key={order.id}
// // // // //                     className="border-t hover:bg-gray-50 transition"
// // // // //                   >
// // // // //                     <td className="px-4 py-3 text-sm text-gray-500">
// // // // //                       #{order.id.slice(0, 8)}
// // // // //                     </td>
// // // // //                     <td className="px-4 py-3 font-medium text-gray-800">
// // // // //                       {order.customerName}
// // // // //                     </td>
// // // // //                     <td className="px-4 py-3 font-semibold text-green-600">
// // // // //                       ₹{order.totalAmount}
// // // // //                     </td>
// // // // //                     <td className="px-4 py-3">
// // // // //                       <span
// // // // //                         className={`px-3 py-1 rounded-full text-xs font-semibold ${
// // // // //                           order.status === 'completed' ||
// // // // //                           order.status === 'delivered'
// // // // //                             ? 'bg-green-100 text-green-700'
// // // // //                             : order.status === 'processing' ||
// // // // //                               order.status === 'preparing'
// // // // //                             ? 'bg-blue-100 text-blue-700'
// // // // //                             : order.status === 'cancelled'
// // // // //                             ? 'bg-red-100 text-red-700'
// // // // //                             : 'bg-yellow-100 text-yellow-700'
// // // // //                         }`}
// // // // //                       >
// // // // //                         {order.status}
// // // // //                       </span>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 ))}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       {/* LOW STOCK ALERT */}
// // // // //       {products.filter((p) => p.stock < 10 && p.available).length > 0 && (
// // // // //         <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
// // // // //           <h2 className="text-lg font-bold text-red-700 mb-3">
// // // // //             ⚠️ Low Stock Alert
// // // // //           </h2>
// // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
// // // // //             {products
// // // // //               .filter((p) => p.stock < 10 && p.available)
// // // // //               .map((product) => (
// // // // //                 <div
// // // // //                   key={product.id}
// // // // //                   className="bg-white p-3 rounded-xl flex items-center justify-between"
// // // // //                 >
// // // // //                   <span className="font-medium text-gray-800">
// // // // //                     {product.name}
// // // // //                   </span>
// // // // //                   <span className="text-red-600 font-bold text-sm">
// // // // //                     Stock: {product.stock}
// // // // //                   </span>
// // // // //                 </div>
// // // // //               ))}
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* CATEGORIES OVERVIEW */}
// // // // //       <div className="bg-white rounded-2xl shadow-md p-5">
// // // // //         <h2 className="text-xl font-bold text-gray-800 mb-4">
// // // // //           📂 Products by Category
// // // // //         </h2>
// // // // //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
// // // // //           {Array.from(
// // // // //             new Set(products.map((p) => p.category).filter(Boolean))
// // // // //           ).map((cat) => (
// // // // //             <div
// // // // //               key={cat}
// // // // //               className="bg-gray-50 p-3 rounded-xl text-center"
// // // // //             >
// // // // //               <p className="text-2xl font-bold text-orange-600">
// // // // //                 {products.filter((p) => p.category === cat).length}
// // // // //               </p>
// // // // //               <p className="text-xs text-gray-500 font-medium mt-1">{cat}</p>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // // app/admin/page.tsx
// // // // 'use client';

// // // // import { useEffect, useState } from 'react';
// // // // import { db } from '../../lib/firebase';
// // // // import { collection, getDocs, onSnapshot } from 'firebase/firestore';
// // // // import Link from 'next/link';

// // // // type Product = {
// // // //   id: string;
// // // //   name: string;
// // // //   price: number;
// // // //   available: boolean;
// // // //   featured: boolean;
// // // //   stock: number;
// // // //   category: string;
// // // // };

// // // // type OrderItem = {
// // // //   name: string;
// // // //   price: number;
// // // //   quantity: number;
// // // // };

// // // // type Order = {
// // // //   id: string;
// // // //   customerName: string;
// // // //   totalAmount: number;
// // // //   status: string;
// // // //   items: OrderItem[];
// // // //   createdAt: string;
// // // // };

// // // // export default function AdminDashboard() {
// // // //   const [products, setProducts] = useState<Product[]>([]);
// // // //   const [orders, setOrders] = useState<Order[]>([]);
// // // //   const [revenue, setRevenue] = useState(0);
// // // //   const [loading, setLoading] = useState(true);

// // // //   // Stats
// // // //   const [availableProducts, setAvailableProducts] = useState(0);
// // // //   const [outOfStock, setOutOfStock] = useState(0);
// // // //   const [featuredCount, setFeaturedCount] = useState(0);
// // // //   const [pendingOrders, setPendingOrders] = useState(0);
// // // //   const [completedOrders, setCompletedOrders] = useState(0);
// // // //   const [preparingOrders, setPreparingOrders] = useState(0);

// // // //   useEffect(() => {
// // // //     // ✅ FETCH PRODUCTS (one time)
// // // //     const fetchProducts = async () => {
// // // //       try {
// // // //         const productSnap = await getDocs(collection(db, 'products'));
// // // //         const productData: Product[] = productSnap.docs.map((docSnap) => {
// // // //           const d = docSnap.data();
// // // //           return {
// // // //             id: docSnap.id,
// // // //             name: (d.name as string) || '',
// // // //             price: (d.price as number) || 0,
// // // //             available: (d.available as boolean) ?? true,
// // // //             featured: (d.featured as boolean) ?? false,
// // // //             stock: (d.stock as number) || 0,
// // // //             category: (d.category as string) || '',
// // // //           };
// // // //         });

// // // //         setProducts(productData);
// // // //         setAvailableProducts(productData.filter((p) => p.available).length);
// // // //         setOutOfStock(productData.filter((p) => !p.available).length);
// // // //         setFeaturedCount(productData.filter((p) => p.featured).length);
// // // //       } catch (error) {
// // // //         console.error('❌ Error fetching products:', error);
// // // //       }
// // // //     };

// // // //     fetchProducts();

// // // //     // ✅ REAL-TIME ORDERS LISTENER - ye automatically update hoga
// // // //     const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
// // // //       const orderData: Order[] = snapshot.docs.map((docSnap) => {
// // // //         const d = docSnap.data();
// // // //         return {
// // // //           id: docSnap.id,
// // // //           customerName:
// // // //             (d.customerName as string) ||
// // // //             (d.name as string) ||
// // // //             (d.userName as string) ||
// // // //             'Unknown',
// // // //           totalAmount:
// // // //             (d.totalAmount as number) ||
// // // //             (d.total as number) ||
// // // //             (d.amount as number) ||
// // // //             0,
// // // //           status: (d.status as string) || 'pending',
// // // //           items: (d.items as OrderItem[]) || [],
// // // //           createdAt: (d.createdAt as string) || '',
// // // //         };
// // // //       });

// // // //       setOrders(orderData);

// // // //       // ✅ REVENUE - automatically updates
// // // //       const totalRevenue = orderData.reduce(
// // // //         (sum, o) => sum + (o.totalAmount || 0),
// // // //         0
// // // //       );
// // // //       setRevenue(totalRevenue);

// // // //       // ✅ ORDER STATS - automatically updates
// // // //       setPendingOrders(
// // // //         orderData.filter((o) => o.status === 'pending').length
// // // //       );

// // // //       setPreparingOrders(
// // // //         orderData.filter(
// // // //           (o) => o.status === 'preparing' || o.status === 'processing'
// // // //         ).length
// // // //       );

// // // //       setCompletedOrders(
// // // //         orderData.filter(
// // // //           (o) => o.status === 'completed' || o.status === 'delivered'
// // // //         ).length
// // // //       );

// // // //       console.log('🔄 Orders updated in real-time!');
// // // //       console.log('📦 Total Orders:', orderData.length);
// // // //       console.log('⏳ Pending:', orderData.filter((o) => o.status === 'pending').length);
// // // //       console.log('🍳 Preparing:', orderData.filter((o) => o.status === 'preparing' || o.status === 'processing').length);
// // // //       console.log('✅ Completed:', orderData.filter((o) => o.status === 'completed' || o.status === 'delivered').length);
// // // //       console.log('💰 Revenue:', totalRevenue);

// // // //       setLoading(false);
// // // //     });

// // // //     // ✅ Cleanup listener when page closes
// // // //     return () => unsubscribe();
// // // //   }, []);

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
// // // //         <div className="inline-block w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
// // // //         <p className="text-gray-500 mt-4 text-lg">Loading Admin Panel...</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

// // // //       {/* HEADER */}
// // // //       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
// // // //         <div>
// // // //           <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
// // // //             🍕 Admin Dashboard
// // // //           </h1>
// // // //           <p className="text-gray-500 mt-1">
// // // //             Manage your restaurant from here
// // // //           </p>
// // // //         </div>

// // // //         {/* LIVE INDICATOR */}
// // // //         <div className="flex items-center gap-2 mt-2 md:mt-0">
// // // //           <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
// // // //           <span className="text-green-600 text-sm font-medium">Live Updates</span>
// // // //         </div>
// // // //       </div>

// // // //       {/* QUICK LINKS */}
// // // //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// // // //         <Link
// // // //           href="/admin/products"
// // // //           className="bg-orange-600 text-white p-4 rounded-2xl text-center hover:bg-orange-700 transition font-semibold shadow-lg"
// // // //         >
// // // //           🍔 Products
// // // //         </Link>

// // // //         <Link
// // // //           href="/admin/orders"
// // // //           className="bg-blue-600 text-white p-4 rounded-2xl text-center hover:bg-blue-700 transition font-semibold shadow-lg relative"
// // // //         >
// // // //           📦 Orders
// // // //           {pendingOrders > 0 && (
// // // //             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-bounce">
// // // //               {pendingOrders}
// // // //             </span>
// // // //           )}
// // // //         </Link>

// // // //         <Link
// // // //           href="/admin/categories"
// // // //           className="bg-purple-600 text-white p-4 rounded-2xl text-center hover:bg-purple-700 transition font-semibold shadow-lg"
// // // //         >
// // // //           📂 Categories
// // // //         </Link>

// // // //         <Link
// // // //           href="/admin/users"
// // // //           className="bg-green-600 text-white p-4 rounded-2xl text-center hover:bg-green-700 transition font-semibold shadow-lg"
// // // //         >
// // // //           👥 Users
// // // //         </Link>
// // // //       </div>

// // // //       {/* MAIN STATS */}
// // // //       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

// // // //         {/* Total Products */}
// // // //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-orange-500">
// // // //           <div className="flex items-center justify-between">
// // // //             <div>
// // // //               <p className="text-gray-500 text-sm font-medium">Total Products</p>
// // // //               <p className="text-3xl font-bold text-gray-800 mt-1">
// // // //                 {products.length}
// // // //               </p>
// // // //             </div>
// // // //             <span className="text-3xl">🍔</span>
// // // //           </div>
// // // //         </div>

// // // //         {/* Total Orders */}
// // // //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-blue-500">
// // // //           <div className="flex items-center justify-between">
// // // //             <div>
// // // //               <p className="text-gray-500 text-sm font-medium">Total Orders</p>
// // // //               <p className="text-3xl font-bold text-gray-800 mt-1">
// // // //                 {orders.length}
// // // //               </p>
// // // //             </div>
// // // //             <span className="text-3xl">📦</span>
// // // //           </div>
// // // //         </div>

// // // //         {/* Pending Orders */}
// // // //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-yellow-500">
// // // //           <div className="flex items-center justify-between">
// // // //             <div>
// // // //               <p className="text-gray-500 text-sm font-medium">Pending</p>
// // // //               <p className="text-3xl font-bold text-yellow-600 mt-1">
// // // //                 {pendingOrders}
// // // //               </p>
// // // //             </div>
// // // //             <span className="text-3xl">⏳</span>
// // // //           </div>
// // // //         </div>

// // // //         {/* Preparing Orders */}
// // // //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-purple-500">
// // // //           <div className="flex items-center justify-between">
// // // //             <div>
// // // //               <p className="text-gray-500 text-sm font-medium">Preparing</p>
// // // //               <p className="text-3xl font-bold text-purple-600 mt-1">
// // // //                 {preparingOrders}
// // // //               </p>
// // // //             </div>
// // // //             <span className="text-3xl">🍳</span>
// // // //           </div>
// // // //         </div>

// // // //         {/* Total Revenue */}
// // // //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-green-500">
// // // //           <div className="flex items-center justify-between">
// // // //             <div>
// // // //               <p className="text-gray-500 text-sm font-medium">Revenue</p>
// // // //               <p className="text-3xl font-bold text-green-600 mt-1">
// // // //                 ₹{revenue.toLocaleString()}
// // // //               </p>
// // // //             </div>
// // // //             <span className="text-3xl">💰</span>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* DETAILED STATS */}
// // // //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

// // // //         <div className="bg-white p-4 rounded-2xl shadow-md">
// // // //           <p className="text-gray-500 text-sm">Available Products</p>
// // // //           <p className="text-2xl font-bold text-green-600">{availableProducts}</p>
// // // //         </div>

// // // //         <div className="bg-white p-4 rounded-2xl shadow-md">
// // // //           <p className="text-gray-500 text-sm">Out of Stock</p>
// // // //           <p className="text-2xl font-bold text-red-600">{outOfStock}</p>
// // // //         </div>

// // // //         <div className="bg-white p-4 rounded-2xl shadow-md">
// // // //           <p className="text-gray-500 text-sm">Featured Items</p>
// // // //           <p className="text-2xl font-bold text-orange-600">{featuredCount}</p>
// // // //         </div>

// // // //         <div className="bg-white p-4 rounded-2xl shadow-md">
// // // //           <p className="text-gray-500 text-sm">Completed Orders</p>
// // // //           <p className="text-2xl font-bold text-blue-600">{completedOrders}</p>
// // // //         </div>
// // // //       </div>

// // // //       {/* RECENT ORDERS */}
// // // //       <div className="bg-white rounded-2xl shadow-md p-5 mb-8">
// // // //         <div className="flex items-center justify-between mb-4">
// // // //           <h2 className="text-xl font-bold text-gray-800">📦 Recent Orders</h2>
// // // //           <Link
// // // //             href="/admin/orders"
// // // //             className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
// // // //           >
// // // //             View All →
// // // //           </Link>
// // // //         </div>

// // // //         {orders.length === 0 ? (
// // // //           <div className="text-center py-8">
// // // //             <p className="text-gray-400 text-lg">No orders yet</p>
// // // //             <p className="text-gray-400 text-sm mt-1">
// // // //               Orders will appear here when customers place them
// // // //             </p>
// // // //           </div>
// // // //         ) : (
// // // //           <div className="overflow-x-auto">
// // // //             <table className="w-full">
// // // //               <thead className="bg-gray-50">
// // // //                 <tr>
// // // //                   <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// // // //                     Order ID
// // // //                   </th>
// // // //                   <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// // // //                     Customer
// // // //                   </th>
// // // //                   <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// // // //                     Amount
// // // //                   </th>
// // // //                   <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// // // //                     Status
// // // //                   </th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody>
// // // //                 {orders.slice(0, 5).map((order) => (
// // // //                   <tr
// // // //                     key={order.id}
// // // //                     className="border-t hover:bg-gray-50 transition"
// // // //                   >
// // // //                     <td className="px-4 py-3 text-sm text-gray-500">
// // // //                       #{order.id.slice(0, 8)}
// // // //                     </td>
// // // //                     <td className="px-4 py-3 font-medium text-gray-800">
// // // //                       {order.customerName}
// // // //                     </td>
// // // //                     <td className="px-4 py-3 font-semibold text-green-600">
// // // //                       ₹{order.totalAmount}
// // // //                     </td>
// // // //                     <td className="px-4 py-3">
// // // //                       <span
// // // //                         className={`px-3 py-1 rounded-full text-xs font-semibold ${
// // // //                           order.status === 'completed' ||
// // // //                           order.status === 'delivered'
// // // //                             ? 'bg-green-100 text-green-700'
// // // //                             : order.status === 'preparing' ||
// // // //                               order.status === 'processing'
// // // //                             ? 'bg-purple-100 text-purple-700'
// // // //                             : order.status === 'cancelled'
// // // //                             ? 'bg-red-100 text-red-700'
// // // //                             : 'bg-yellow-100 text-yellow-700'
// // // //                         }`}
// // // //                       >
// // // //                         {order.status === 'pending' && '⏳ '}
// // // //                         {order.status === 'preparing' && '🍳 '}
// // // //                         {order.status === 'processing' && '🍳 '}
// // // //                         {order.status === 'completed' && '✅ '}
// // // //                         {order.status === 'delivered' && '✅ '}
// // // //                         {order.status === 'cancelled' && '❌ '}
// // // //                         {order.status}
// // // //                       </span>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ))}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {/* LOW STOCK ALERT */}
// // // //       {products.filter((p) => p.stock < 10 && p.available).length > 0 && (
// // // //         <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
// // // //           <h2 className="text-lg font-bold text-red-700 mb-3">
// // // //             ⚠️ Low Stock Alert
// // // //           </h2>
// // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
// // // //             {products
// // // //               .filter((p) => p.stock < 10 && p.available)
// // // //               .map((product) => (
// // // //                 <div
// // // //                   key={product.id}
// // // //                   className="bg-white p-3 rounded-xl flex items-center justify-between"
// // // //                 >
// // // //                   <span className="font-medium text-gray-800">
// // // //                     {product.name}
// // // //                   </span>
// // // //                   <span className="text-red-600 font-bold text-sm">
// // // //                     Stock: {product.stock}
// // // //                   </span>
// // // //                 </div>
// // // //               ))}
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* CATEGORIES OVERVIEW */}
// // // //       <div className="bg-white rounded-2xl shadow-md p-5">
// // // //         <h2 className="text-xl font-bold text-gray-800 mb-4">
// // // //           📂 Products by Category
// // // //         </h2>
// // // //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
// // // //           {Array.from(
// // // //             new Set(products.map((p) => p.category).filter(Boolean))
// // // //           ).map((cat) => (
// // // //             <div key={cat} className="bg-gray-50 p-3 rounded-xl text-center">
// // // //               <p className="text-2xl font-bold text-orange-600">
// // // //                 {products.filter((p) => p.category === cat).length}
// // // //               </p>
// // // //               <p className="text-xs text-gray-500 font-medium mt-1">{cat}</p>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // // app/admin/page.tsx

// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { db } from '../../lib/firebase';
// // // import { collection, getDocs, onSnapshot } from 'firebase/firestore';
// // // import Link from 'next/link';

// // // type Product = {
// // //   id: string;
// // //   name: string;
// // //   price: number;
// // //   available: boolean;
// // //   featured: boolean;
// // //   stock: number;
// // //   category: string;
// // // };

// // // type OrderItem = {
// // //   name: string;
// // //   price: number;
// // //   quantity: number;
// // // };

// // // type Order = {
// // //   id: string;
// // //   customerName: string;
// // //   totalAmount: number;
// // //   status: string;
// // //   items: OrderItem[];
// // //   createdAt: number | string | { seconds: number; nanoseconds: number } | null;
// // // };

// // // export default function AdminDashboard() {
// // //   const [products, setProducts] = useState<Product[]>([]);
// // //   const [orders, setOrders] = useState<Order[]>([]);
// // //   const [revenue, setRevenue] = useState(0);
// // //   const [todayRevenue, setTodayRevenue] = useState(0);
// // //   const [loading, setLoading] = useState(true);

// // //   // Stats
// // //   const [availableProducts, setAvailableProducts] = useState(0);
// // //   const [outOfStock, setOutOfStock] = useState(0);
// // //   const [featuredCount, setFeaturedCount] = useState(0);
// // //   const [pendingOrders, setPendingOrders] = useState(0);
// // //   const [completedOrders, setCompletedOrders] = useState(0);
// // //   const [preparingOrders, setPreparingOrders] = useState(0);
// // //   const [todayOrders, setTodayOrders] = useState(0);

// // //   // ✅ CONVERT FIREBASE TIMESTAMP TO DATE
// // //   const getDateFromTimestamp = (
// // //     timestamp: number | string | { seconds: number; nanoseconds: number } | null | undefined
// // //   ): Date => {
// // //     if (!timestamp) return new Date();

// // //     // Firebase Timestamp object { seconds, nanoseconds }
// // //     if (typeof timestamp === 'object' && 'seconds' in timestamp) {
// // //       return new Date(timestamp.seconds * 1000);
// // //     }

// // //     // Number (milliseconds)
// // //     if (typeof timestamp === 'number') {
// // //       return new Date(timestamp);
// // //     }

// // //     // String
// // //     if (typeof timestamp === 'string') {
// // //       return new Date(timestamp);
// // //     }

// // //     return new Date();
// // //   };

// // //   // ✅ FORMAT DATE & TIME
// // //   const formatDateTime = (
// // //     timestamp: number | string | { seconds: number; nanoseconds: number } | null | undefined
// // //   ): string => {
// // //     const date = getDateFromTimestamp(timestamp);
// // //     return date.toLocaleString('en-IN', {
// // //       day: '2-digit',
// // //       month: 'short',
// // //       year: 'numeric',
// // //       hour: '2-digit',
// // //       minute: '2-digit',
// // //       hour12: true,
// // //     });
// // //   };

// // //   // ✅ FORMAT TIME ONLY
// // //   const formatTime = (
// // //     timestamp: number | string | { seconds: number; nanoseconds: number } | null | undefined
// // //   ): string => {
// // //     const date = getDateFromTimestamp(timestamp);
// // //     return date.toLocaleString('en-IN', {
// // //       hour: '2-digit',
// // //       minute: '2-digit',
// // //       hour12: true,
// // //     });
// // //   };

// // //   // ✅ FORMAT DATE ONLY
// // //   const formatDate = (
// // //     timestamp: number | string | { seconds: number; nanoseconds: number } | null | undefined
// // //   ): string => {
// // //     const date = getDateFromTimestamp(timestamp);
// // //     return date.toLocaleString('en-IN', {
// // //       day: '2-digit',
// // //       month: 'short',
// // //       year: 'numeric',
// // //     });
// // //   };

// // //   // ✅ CHECK IF TODAY
// // //   const isToday = (
// // //     timestamp: number | string | { seconds: number; nanoseconds: number } | null | undefined
// // //   ): boolean => {
// // //     const date = getDateFromTimestamp(timestamp);
// // //     const today = new Date();
// // //     return (
// // //       date.getDate() === today.getDate() &&
// // //       date.getMonth() === today.getMonth() &&
// // //       date.getFullYear() === today.getFullYear()
// // //     );
// // //   };

// // //   // ✅ TIME AGO
// // //   const timeAgo = (
// // //     timestamp: number | string | { seconds: number; nanoseconds: number } | null | undefined
// // //   ): string => {
// // //     const date = getDateFromTimestamp(timestamp);
// // //     const now = new Date();
// // //     const diffMs = now.getTime() - date.getTime();
// // //     const diffMins = Math.floor(diffMs / 60000);
// // //     const diffHours = Math.floor(diffMs / 3600000);
// // //     const diffDays = Math.floor(diffMs / 86400000);

// // //     if (diffMins < 1) return 'Just now';
// // //     if (diffMins < 60) return `${diffMins} min ago`;
// // //     if (diffHours < 24) return `${diffHours} hr ago`;
// // //     if (diffDays < 7) return `${diffDays} days ago`;
// // //     return formatDate(timestamp);
// // //   };

// // //   useEffect(() => {
// // //     // ✅ FETCH PRODUCTS
// // //     const fetchProducts = async () => {
// // //       try {
// // //         const productSnap = await getDocs(collection(db, 'products'));
// // //         const productData: Product[] = productSnap.docs.map((docSnap) => {
// // //           const d = docSnap.data();
// // //           return {
// // //             id: docSnap.id,
// // //             name: (d.name as string) || '',
// // //             price: (d.price as number) || 0,
// // //             available: (d.available as boolean) ?? true,
// // //             featured: (d.featured as boolean) ?? false,
// // //             stock: (d.stock as number) || 0,
// // //             category: (d.category as string) || '',
// // //           };
// // //         });

// // //         setProducts(productData);
// // //         setAvailableProducts(productData.filter((p) => p.available).length);
// // //         setOutOfStock(productData.filter((p) => !p.available).length);
// // //         setFeaturedCount(productData.filter((p) => p.featured).length);
// // //       } catch (error) {
// // //         console.error('❌ Error fetching products:', error);
// // //       }
// // //     };

// // //     fetchProducts();

// // //     // ✅ REAL-TIME ORDERS LISTENER
// // //     const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
// // //       const orderData: Order[] = snapshot.docs.map((docSnap) => {
// // //         const d = docSnap.data();
// // //         return {
// // //           id: docSnap.id,
// // //           customerName:
// // //             (d.customerName as string) ||
// // //             (d.name as string) ||
// // //             (d.userName as string) ||
// // //             (d.customer as string) ||
// // //             (d.email as string) ||
// // //             'Unknown Customer',
// // //           totalAmount:
// // //             (d.totalAmount as number) ||
// // //             (d.total as number) ||
// // //             (d.amount as number) ||
// // //             (d.orderTotal as number) ||
// // //             0,
// // //           status: (d.status as string) || 'pending',
// // //           items: (d.items as OrderItem[]) || [],
// // //           createdAt: d.createdAt || d.orderDate || d.date || d.timestamp || null,
// // //         };
// // //       });

// // //       // ✅ SORT BY DATE (newest first)
// // //       orderData.sort((a, b) => {
// // //         const dateA = getDateFromTimestamp(a.createdAt);
// // //         const dateB = getDateFromTimestamp(b.createdAt);
// // //         return dateB.getTime() - dateA.getTime();
// // //       });

// // //       setOrders(orderData);

// // //       // ✅ TODAY'S ORDERS
// // //       const todayOrdersList = orderData.filter((o) => isToday(o.createdAt));
// // //       setTodayOrders(todayOrdersList.length);

// // //       // ✅ TODAY'S REVENUE
// // //       const todayRev = todayOrdersList.reduce(
// // //         (sum, o) => sum + (o.totalAmount || 0),
// // //         0
// // //       );
// // //       setTodayRevenue(todayRev);

// // //       // ✅ TOTAL REVENUE
// // //       const totalRevenue = orderData.reduce(
// // //         (sum, o) => sum + (o.totalAmount || 0),
// // //         0
// // //       );
// // //       setRevenue(totalRevenue);

// // //       // ✅ ORDER STATS
// // //       setPendingOrders(
// // //         orderData.filter((o) => o.status === 'pending').length
// // //       );

// // //       setPreparingOrders(
// // //         orderData.filter(
// // //           (o) => o.status === 'preparing' || o.status === 'processing'
// // //         ).length
// // //       );

// // //       setCompletedOrders(
// // //         orderData.filter(
// // //           (o) => o.status === 'completed' || o.status === 'delivered'
// // //         ).length
// // //       );

// // //       setLoading(false);
// // //     });

// // //     return () => unsubscribe();
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, []);

// // //   // ✅ TODAY'S DATE
// // //   const todayDate = new Date().toLocaleString('en-IN', {
// // //     weekday: 'long',
// // //     day: '2-digit',
// // //     month: 'long',
// // //     year: 'numeric',
// // //   });

// // //   if (loading) {
// // //     return (
// // //       <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
// // //         <div className="inline-block w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
// // //         <p className="text-gray-500 mt-4 text-lg">Loading Admin Panel...</p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

// // //       {/* HEADER */}
// // //       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
// // //         <div>
// // //           <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
// // //             🍕 Admin Dashboard
// // //           </h1>
// // //           <p className="text-gray-500 mt-1">📅 {todayDate}</p>
// // //         </div>

// // //         {/* LIVE INDICATOR */}
// // //         <div className="flex items-center gap-2 mt-2 md:mt-0">
// // //           <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
// // //           <span className="text-green-600 text-sm font-medium">Live Updates</span>
// // //         </div>
// // //       </div>

// // //       {/* QUICK LINKS */}
// // //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// // //         <Link
// // //           href="/admin/products"
// // //           className="bg-orange-600 text-white p-4 rounded-2xl text-center hover:bg-orange-700 transition font-semibold shadow-lg"
// // //         >
// // //           🍔 Products
// // //         </Link>

// // //         <Link
// // //           href="/admin/orders"
// // //           className="bg-blue-600 text-white p-4 rounded-2xl text-center hover:bg-blue-700 transition font-semibold shadow-lg relative"
// // //         >
// // //           📦 Orders
// // //           {pendingOrders > 0 && (
// // //             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-bounce">
// // //               {pendingOrders}
// // //             </span>
// // //           )}
// // //         </Link>

// // //         <Link
// // //           href="/admin/categories"
// // //           className="bg-purple-600 text-white p-4 rounded-2xl text-center hover:bg-purple-700 transition font-semibold shadow-lg"
// // //         >
// // //           📂 Categories
// // //         </Link>

// // //         <Link
// // //           href="/admin/users"
// // //           className="bg-green-600 text-white p-4 rounded-2xl text-center hover:bg-green-700 transition font-semibold shadow-lg"
// // //         >
// // //           👥 Users
// // //         </Link>
// // //       </div>

// // //       {/* ✅ TODAY'S STATS (HIGHLIGHTED) */}
// // //       <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
// // //         <h2 className="text-lg font-semibold mb-4 opacity-90">📊 Today&apos;s Overview</h2>
// // //         <div className="grid grid-cols-3 gap-4">
// // //           <div className="text-center">
// // //             <p className="text-4xl font-bold">{todayOrders}</p>
// // //             <p className="text-sm opacity-80 mt-1">Orders Today</p>
// // //           </div>
// // //           <div className="text-center">
// // //             <p className="text-4xl font-bold">₹{todayRevenue.toLocaleString()}</p>
// // //             <p className="text-sm opacity-80 mt-1">Revenue Today</p>
// // //           </div>
// // //           <div className="text-center">
// // //             <p className="text-4xl font-bold">{pendingOrders + preparingOrders}</p>
// // //             <p className="text-sm opacity-80 mt-1">Active Orders</p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* ALL TIME STATS */}
// // //       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

// // //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-orange-500">
// // //           <p className="text-gray-500 text-sm font-medium">Total Products</p>
// // //           <p className="text-3xl font-bold text-gray-800 mt-1">{products.length}</p>
// // //           <p className="text-xs text-gray-400 mt-1">All time</p>
// // //         </div>

// // //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-blue-500">
// // //           <p className="text-gray-500 text-sm font-medium">Total Orders</p>
// // //           <p className="text-3xl font-bold text-gray-800 mt-1">{orders.length}</p>
// // //           <p className="text-xs text-gray-400 mt-1">All time</p>
// // //         </div>

// // //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-yellow-500">
// // //           <p className="text-gray-500 text-sm font-medium">Pending</p>
// // //           <p className="text-3xl font-bold text-yellow-600 mt-1">{pendingOrders}</p>
// // //           <p className="text-xs text-yellow-500 mt-1">⏳ Waiting</p>
// // //         </div>

// // //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-purple-500">
// // //           <p className="text-gray-500 text-sm font-medium">Preparing</p>
// // //           <p className="text-3xl font-bold text-purple-600 mt-1">{preparingOrders}</p>
// // //           <p className="text-xs text-purple-500 mt-1">🍳 In Kitchen</p>
// // //         </div>

// // //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-green-500">
// // //           <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
// // //           <p className="text-3xl font-bold text-green-600 mt-1">₹{revenue.toLocaleString()}</p>
// // //           <p className="text-xs text-gray-400 mt-1">All time</p>
// // //         </div>
// // //       </div>

// // //       {/* DETAILED STATS */}
// // //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// // //         <div className="bg-white p-4 rounded-2xl shadow-md">
// // //           <p className="text-gray-500 text-sm">Available Products</p>
// // //           <p className="text-2xl font-bold text-green-600">{availableProducts}</p>
// // //         </div>
// // //         <div className="bg-white p-4 rounded-2xl shadow-md">
// // //           <p className="text-gray-500 text-sm">Out of Stock</p>
// // //           <p className="text-2xl font-bold text-red-600">{outOfStock}</p>
// // //         </div>
// // //         <div className="bg-white p-4 rounded-2xl shadow-md">
// // //           <p className="text-gray-500 text-sm">Featured Items</p>
// // //           <p className="text-2xl font-bold text-orange-600">{featuredCount}</p>
// // //         </div>
// // //         <div className="bg-white p-4 rounded-2xl shadow-md">
// // //           <p className="text-gray-500 text-sm">Completed Orders</p>
// // //           <p className="text-2xl font-bold text-blue-600">{completedOrders}</p>
// // //         </div>
// // //       </div>

// // //       {/* ✅ RECENT ORDERS - FULLY LINKED WITH TIME */}
// // //       <div className="bg-white rounded-2xl shadow-md p-5 mb-8">
// // //         <div className="flex items-center justify-between mb-4">
// // //           <div>
// // //             <h2 className="text-xl font-bold text-gray-800">📦 Recent Orders</h2>
// // //             <p className="text-gray-400 text-sm mt-1">
// // //               Latest {Math.min(orders.length, 10)} of {orders.length} orders
// // //             </p>
// // //           </div>
// // //           <Link
// // //             href="/admin/orders"
// // //             className="bg-orange-600 text-white px-4 py-2 rounded-xl hover:bg-orange-700 transition font-semibold text-sm"
// // //           >
// // //             View All Orders →
// // //           </Link>
// // //         </div>

// // //         {orders.length === 0 ? (
// // //           <div className="text-center py-12">
// // //             <span className="text-5xl">📦</span>
// // //             <p className="text-gray-400 text-lg mt-4">No orders yet</p>
// // //             <p className="text-gray-400 text-sm mt-1">
// // //               Orders will appear here when customers place them
// // //             </p>
// // //           </div>
// // //         ) : (
// // //           <>
// // //             {/* DESKTOP TABLE */}
// // //             <div className="hidden md:block overflow-x-auto">
// // //               <table className="w-full">
// // //                 <thead className="bg-gray-50">
// // //                   <tr>
// // //                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// // //                       Order ID
// // //                     </th>
// // //                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// // //                       Customer
// // //                     </th>
// // //                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// // //                       Items
// // //                     </th>
// // //                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// // //                       Amount
// // //                     </th>
// // //                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// // //                       Status
// // //                     </th>
// // //                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// // //                       Date & Time
// // //                     </th>
// // //                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// // //                       Action
// // //                     </th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   {orders.slice(0, 10).map((order) => (
// // //                     <tr
// // //                       key={order.id}
// // //                       className={`border-t hover:bg-gray-50 transition ${
// // //                         isToday(order.createdAt) ? 'bg-orange-50/30' : ''
// // //                       }`}
// // //                     >
// // //                       <td className="px-4 py-3">
// // //                         <span className="text-sm font-mono text-gray-500">
// // //                           #{order.id.slice(0, 8)}
// // //                         </span>
// // //                         {isToday(order.createdAt) && (
// // //                           <span className="ml-2 bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-semibold">
// // //                             Today
// // //                           </span>
// // //                         )}
// // //                       </td>
// // //                       <td className="px-4 py-3 font-medium text-gray-800">
// // //                         {order.customerName}
// // //                       </td>
// // //                       <td className="px-4 py-3 text-sm text-gray-500">
// // //                         {order.items.length > 0
// // //                           ? order.items.map((i) => i.name).join(', ').slice(0, 30) +
// // //                             (order.items.map((i) => i.name).join(', ').length > 30 ? '...' : '')
// // //                           : 'N/A'}
// // //                       </td>
// // //                       <td className="px-4 py-3 font-semibold text-green-600">
// // //                         ₹{order.totalAmount.toLocaleString()}
// // //                       </td>
// // //                       <td className="px-4 py-3">
// // //                         <span
// // //                           className={`px-3 py-1 rounded-full text-xs font-semibold ${
// // //                             order.status === 'completed' || order.status === 'delivered'
// // //                               ? 'bg-green-100 text-green-700'
// // //                               : order.status === 'preparing' || order.status === 'processing'
// // //                               ? 'bg-purple-100 text-purple-700'
// // //                               : order.status === 'cancelled'
// // //                               ? 'bg-red-100 text-red-700'
// // //                               : 'bg-yellow-100 text-yellow-700'
// // //                           }`}
// // //                         >
// // //                           {order.status === 'pending' && '⏳ '}
// // //                           {order.status === 'preparing' && '🍳 '}
// // //                           {order.status === 'processing' && '🍳 '}
// // //                           {order.status === 'completed' && '✅ '}
// // //                           {order.status === 'delivered' && '🚀 '}
// // //                           {order.status === 'cancelled' && '❌ '}
// // //                           {order.status}
// // //                         </span>
// // //                       </td>
// // //                       <td className="px-4 py-3">
// // //                         <div>
// // //                           <p className="text-sm text-gray-700">
// // //                             {formatDateTime(order.createdAt)}
// // //                           </p>
// // //                           <p className="text-xs text-gray-400">
// // //                             {timeAgo(order.createdAt)}
// // //                           </p>
// // //                         </div>
// // //                       </td>
// // //                       <td className="px-4 py-3">
// // //                         <Link
// // //                           href="/admin/orders"
// // //                           className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
// // //                         >
// // //                           View →
// // //                         </Link>
// // //                       </td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>

// // //             {/* MOBILE CARDS */}
// // //             <div className="grid gap-3 md:hidden">
// // //               {orders.slice(0, 10).map((order) => (
// // //                 <div
// // //                   key={order.id}
// // //                   className={`border rounded-xl p-4 ${
// // //                     isToday(order.createdAt)
// // //                       ? 'border-orange-200 bg-orange-50/50'
// // //                       : 'border-gray-200'
// // //                   }`}
// // //                 >
// // //                   {/* Top Row */}
// // //                   <div className="flex items-center justify-between mb-2">
// // //                     <div className="flex items-center gap-2">
// // //                       <span className="text-xs font-mono text-gray-500">
// // //                         #{order.id.slice(0, 8)}
// // //                       </span>
// // //                       {isToday(order.createdAt) && (
// // //                         <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-semibold">
// // //                           Today
// // //                         </span>
// // //                       )}
// // //                     </div>
// // //                     <span
// // //                       className={`px-2 py-1 rounded-full text-xs font-semibold ${
// // //                         order.status === 'completed' || order.status === 'delivered'
// // //                           ? 'bg-green-100 text-green-700'
// // //                           : order.status === 'preparing' || order.status === 'processing'
// // //                           ? 'bg-purple-100 text-purple-700'
// // //                           : order.status === 'cancelled'
// // //                           ? 'bg-red-100 text-red-700'
// // //                           : 'bg-yellow-100 text-yellow-700'
// // //                       }`}
// // //                     >
// // //                       {order.status}
// // //                     </span>
// // //                   </div>

// // //                   {/* Customer & Amount */}
// // //                   <div className="flex items-center justify-between mb-2">
// // //                     <p className="font-semibold text-gray-800">
// // //                       {order.customerName}
// // //                     </p>
// // //                     <p className="font-bold text-green-600">
// // //                       ₹{order.totalAmount.toLocaleString()}
// // //                     </p>
// // //                   </div>

// // //                   {/* Items */}
// // //                   {order.items.length > 0 && (
// // //                     <p className="text-xs text-gray-500 mb-2">
// // //                       🍽️ {order.items.map((i) => `${i.name} x${i.quantity}`).join(', ')}
// // //                     </p>
// // //                   )}

// // //                   {/* Time */}
// // //                   <div className="flex items-center justify-between">
// // //                     <p className="text-xs text-gray-400">
// // //                       🕐 {formatDateTime(order.createdAt)}
// // //                     </p>
// // //                     <p className="text-xs text-orange-500 font-medium">
// // //                       {timeAgo(order.createdAt)}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             {/* VIEW ALL BUTTON */}
// // //             {orders.length > 10 && (
// // //               <div className="text-center mt-4">
// // //                 <Link
// // //                   href="/admin/orders"
// // //                   className="inline-block bg-orange-600 text-white px-6 py-2.5 rounded-xl hover:bg-orange-700 transition font-semibold text-sm"
// // //                 >
// // //                   View All {orders.length} Orders →
// // //                 </Link>
// // //               </div>
// // //             )}
// // //           </>
// // //         )}
// // //       </div>

// // //       {/* LOW STOCK ALERT */}
// // //       {products.filter((p) => p.stock < 10 && p.available).length > 0 && (
// // //         <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
// // //           <h2 className="text-lg font-bold text-red-700 mb-3">
// // //             ⚠️ Low Stock Alert
// // //           </h2>
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
// // //             {products
// // //               .filter((p) => p.stock < 10 && p.available)
// // //               .map((product) => (
// // //                 <div
// // //                   key={product.id}
// // //                   className="bg-white p-3 rounded-xl flex items-center justify-between"
// // //                 >
// // //                   <span className="font-medium text-gray-800">{product.name}</span>
// // //                   <span className="text-red-600 font-bold text-sm">
// // //                     Stock: {product.stock}
// // //                   </span>
// // //                 </div>
// // //               ))}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* CATEGORIES OVERVIEW */}
// // //       <div className="bg-white rounded-2xl shadow-md p-5">
// // //         <h2 className="text-xl font-bold text-gray-800 mb-4">
// // //           📂 Products by Category
// // //         </h2>
// // //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
// // //           {Array.from(
// // //             new Set(products.map((p) => p.category).filter(Boolean))
// // //           ).map((cat) => (
// // //             <div key={cat} className="bg-gray-50 p-3 rounded-xl text-center">
// // //               <p className="text-2xl font-bold text-orange-600">
// // //                 {products.filter((p) => p.category === cat).length}
// // //               </p>
// // //               <p className="text-xs text-gray-500 font-medium mt-1">{cat}</p>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { db } from '../../lib/firebase';
// // import { collection, getDocs, onSnapshot } from 'firebase/firestore';
// // import Link from 'next/link';

// // type Product = {
// //   id: string;
// //   name: string;
// //   price: number;
// //   available: boolean;
// //   featured: boolean;
// //   stock: number;
// //   category: string;
// // };

// // type OrderItem = {
// //   name: string;
// //   price: number;
// //   quantity: number;
// // };

// // type Order = {
// //   id: string;
// //   customerName: string;
// //   totalAmount: number;
// //   status: string;
// //   items: OrderItem[];
// //   createdAt: number | string | { seconds: number; nanoseconds: number } | null;
// // };

// // export default function AdminDashboard() {
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [orders, setOrders] = useState<Order[]>([]);
// //   const [revenue, setRevenue] = useState(0);
// //   const [todayRevenue, setTodayRevenue] = useState(0);
// //   const [loading, setLoading] = useState(true);

// //   // Stats
// //   const [availableProducts, setAvailableProducts] = useState(0);
// //   const [outOfStock, setOutOfStock] = useState(0);
// //   const [featuredCount, setFeaturedCount] = useState(0);
// //   const [pendingOrders, setPendingOrders] = useState(0);
// //   const [completedOrders, setCompletedOrders] = useState(0);
// //   const [preparingOrders, setPreparingOrders] = useState(0);
// //   const [todayOrders, setTodayOrders] = useState(0);

// //   // ✅ CONVERT FIREBASE TIMESTAMP TO DATE
// //   const getDateFromTimestamp = (
// //     timestamp:
// //       | number
// //       | string
// //       | { seconds: number; nanoseconds: number }
// //       | null
// //       | undefined
// //   ): Date => {
// //     if (!timestamp) return new Date();
// //     if (typeof timestamp === 'object' && 'seconds' in timestamp) {
// //       return new Date(timestamp.seconds * 1000);
// //     }
// //     if (typeof timestamp === 'number') return new Date(timestamp);
// //     if (typeof timestamp === 'string') return new Date(timestamp);
// //     return new Date();
// //   };

// //   // ✅ FORMAT DATE & TIME
// //   const formatDateTime = (
// //     timestamp:
// //       | number
// //       | string
// //       | { seconds: number; nanoseconds: number }
// //       | null
// //       | undefined
// //   ): string => {
// //     const date = getDateFromTimestamp(timestamp);
// //     return date.toLocaleString('en-IN', {
// //       day: '2-digit',
// //       month: 'short',
// //       year: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit',
// //       hour12: true,
// //     });
// //   };

// //   // ✅ FORMAT DATE ONLY
// //   const formatDate = (
// //     timestamp:
// //       | number
// //       | string
// //       | { seconds: number; nanoseconds: number }
// //       | null
// //       | undefined
// //   ): string => {
// //     const date = getDateFromTimestamp(timestamp);
// //     return date.toLocaleString('en-IN', {
// //       day: '2-digit',
// //       month: 'short',
// //       year: 'numeric',
// //     });
// //   };

// //   // ✅ CHECK IF TODAY
// //   const isToday = (
// //     timestamp:
// //       | number
// //       | string
// //       | { seconds: number; nanoseconds: number }
// //       | null
// //       | undefined
// //   ): boolean => {
// //     const date = getDateFromTimestamp(timestamp);
// //     const today = new Date();
// //     return (
// //       date.getDate() === today.getDate() &&
// //       date.getMonth() === today.getMonth() &&
// //       date.getFullYear() === today.getFullYear()
// //     );
// //   };

// //   // ✅ TIME AGO
// //   const timeAgo = (
// //     timestamp:
// //       | number
// //       | string
// //       | { seconds: number; nanoseconds: number }
// //       | null
// //       | undefined
// //   ): string => {
// //     const date = getDateFromTimestamp(timestamp);
// //     const now = new Date();
// //     const diffMs = now.getTime() - date.getTime();
// //     const diffMins = Math.floor(diffMs / 60000);
// //     const diffHours = Math.floor(diffMs / 3600000);
// //     const diffDays = Math.floor(diffMs / 86400000);

// //     if (diffMins < 1) return 'Just now';
// //     if (diffMins < 60) return `${diffMins} min ago`;
// //     if (diffHours < 24) return `${diffHours} hr ago`;
// //     if (diffDays < 7) return `${diffDays} days ago`;
// //     return formatDate(timestamp);
// //   };

// //   // ✅ STATUS BADGE COLOR
// //   const getStatusStyle = (status: string): string => {
// //     switch (status) {
// //       case 'completed':
// //       case 'delivered':
// //         return 'bg-green-100 text-green-700';
// //       case 'preparing':
// //       case 'processing':
// //         return 'bg-purple-100 text-purple-700';
// //       case 'cancelled':
// //         return 'bg-red-100 text-red-700';
// //       default:
// //         return 'bg-yellow-100 text-yellow-700';
// //     }
// //   };

// //   // ✅ STATUS EMOJI
// //   const getStatusEmoji = (status: string): string => {
// //     switch (status) {
// //       case 'pending': return '⏳';
// //       case 'preparing': return '🍳';
// //       case 'processing': return '🍳';
// //       case 'completed': return '✅';
// //       case 'delivered': return '🚀';
// //       case 'cancelled': return '❌';
// //       default: return '📦';
// //     }
// //   };

// //   useEffect(() => {
// //     // ✅ FETCH PRODUCTS
// //     const fetchProducts = async () => {
// //       try {
// //         const productSnap = await getDocs(collection(db, 'products'));
// //         const productData: Product[] = productSnap.docs.map((docSnap) => {
// //           const d = docSnap.data();
// //           return {
// //             id: docSnap.id,
// //             name: (d.name as string) || '',
// //             price: (d.price as number) || 0,
// //             available: (d.available as boolean) ?? true,
// //             featured: (d.featured as boolean) ?? false,
// //             stock: (d.stock as number) || 0,
// //             category: (d.category as string) || '',
// //           };
// //         });

// //         setProducts(productData);
// //         setAvailableProducts(productData.filter((p) => p.available).length);
// //         setOutOfStock(productData.filter((p) => !p.available).length);
// //         setFeaturedCount(productData.filter((p) => p.featured).length);
// //       } catch (error) {
// //         console.error('❌ Error fetching products:', error);
// //       }
// //     };

// //     fetchProducts();

// //     // ✅ REAL-TIME ORDERS LISTENER
// //     const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
// //       const orderData: Order[] = snapshot.docs.map((docSnap) => {
// //         const d = docSnap.data();
// //         return {
// //           id: docSnap.id,  // ✅ Full Firebase Document ID
// //           customerName:
// //             (d.customerName as string) ||
// //             (d.name as string) ||
// //             (d.userName as string) ||
// //             (d.customer as string) ||
// //             (d.email as string) ||
// //             'Unknown Customer',
// //           totalAmount:
// //             (d.totalAmount as number) ||
// //             (d.total as number) ||
// //             (d.amount as number) ||
// //             (d.orderTotal as number) ||
// //             0,
// //           status: (d.status as string) || 'pending',
// //           items: (d.items as OrderItem[]) || [],
// //           createdAt:
// //             d.createdAt || d.orderDate || d.date || d.timestamp || null,
// //         };
// //       });

// //       // ✅ SORT BY DATE (newest first)
// //       orderData.sort((a, b) => {
// //         const dateA = getDateFromTimestamp(a.createdAt);
// //         const dateB = getDateFromTimestamp(b.createdAt);
// //         return dateB.getTime() - dateA.getTime();
// //       });

// //       setOrders(orderData);

// //       // ✅ TODAY'S ORDERS
// //       const todayOrdersList = orderData.filter((o) => isToday(o.createdAt));
// //       setTodayOrders(todayOrdersList.length);

// //       // ✅ TODAY'S REVENUE
// //       const todayRev = todayOrdersList.reduce(
// //         (sum, o) => sum + (o.totalAmount || 0),
// //         0
// //       );
// //       setTodayRevenue(todayRev);

// //       // ✅ TOTAL REVENUE
// //       const totalRevenue = orderData.reduce(
// //         (sum, o) => sum + (o.totalAmount || 0),
// //         0
// //       );
// //       setRevenue(totalRevenue);

// //       // ✅ ORDER STATS
// //       setPendingOrders(orderData.filter((o) => o.status === 'pending').length);
// //       setPreparingOrders(
// //         orderData.filter(
// //           (o) => o.status === 'preparing' || o.status === 'processing'
// //         ).length
// //       );
// //       setCompletedOrders(
// //         orderData.filter(
// //           (o) => o.status === 'completed' || o.status === 'delivered'
// //         ).length
// //       );

// //       setLoading(false);
// //     });

// //     return () => unsubscribe();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   // ✅ TODAY'S DATE
// //   const todayDate = new Date().toLocaleString('en-IN', {
// //     weekday: 'long',
// //     day: '2-digit',
// //     month: 'long',
// //     year: 'numeric',
// //   });

// //   if (loading) {
// //     return (
// //       <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
// //         <div className="inline-block w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
// //         <p className="text-gray-500 mt-4 text-lg">Loading Admin Panel...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

// //       {/* HEADER */}
// //       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
// //         <div>
// //           <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
// //             🍕 Admin Dashboard
// //           </h1>
// //           <p className="text-gray-500 mt-1">📅 {todayDate}</p>
// //         </div>
// //         <div className="flex items-center gap-2 mt-2 md:mt-0">
// //           <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
// //           <span className="text-green-600 text-sm font-medium">Live Updates</span>
// //         </div>
// //       </div>

// //       {/* QUICK LINKS */}
// //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// //         <Link
// //           href="/admin/products"
// //           className="bg-orange-600 text-white p-4 rounded-2xl text-center hover:bg-orange-700 transition font-semibold shadow-lg"
// //         >
// //           🍔 Products
// //         </Link>

// //         <Link
// //           href="/admin/orders"
// //           className="bg-blue-600 text-white p-4 rounded-2xl text-center hover:bg-blue-700 transition font-semibold shadow-lg relative"
// //         >
// //           📦 Orders
// //           {pendingOrders > 0 && (
// //             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-bounce">
// //               {pendingOrders}
// //             </span>
// //           )}
// //         </Link>

// //         <Link
// //           href="/admin/categories"
// //           className="bg-purple-600 text-white p-4 rounded-2xl text-center hover:bg-purple-700 transition font-semibold shadow-lg"
// //         >
// //           📂 Categories
// //         </Link>

// //         <Link
// //           href="/admin/users"
// //           className="bg-green-600 text-white p-4 rounded-2xl text-center hover:bg-green-700 transition font-semibold shadow-lg"
// //         >
// //           👥 Users
// //         </Link>
// //       </div>

// //       {/* TODAY'S STATS */}
// //       <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
// //         <h2 className="text-lg font-semibold mb-4 opacity-90">
// //           📊 Today&apos;s Overview
// //         </h2>
// //         <div className="grid grid-cols-3 gap-4">
// //           <div className="text-center">
// //             <p className="text-4xl font-bold">{todayOrders}</p>
// //             <p className="text-sm opacity-80 mt-1">Orders Today</p>
// //           </div>
// //           <div className="text-center">
// //             <p className="text-4xl font-bold">
// //               ₹{todayRevenue.toLocaleString()}
// //             </p>
// //             <p className="text-sm opacity-80 mt-1">Revenue Today</p>
// //           </div>
// //           <div className="text-center">
// //             <p className="text-4xl font-bold">
// //               {pendingOrders + preparingOrders}
// //             </p>
// //             <p className="text-sm opacity-80 mt-1">Active Orders</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ALL TIME STATS */}
// //       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
// //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-orange-500">
// //           <p className="text-gray-500 text-sm font-medium">Total Products</p>
// //           <p className="text-3xl font-bold text-gray-800 mt-1">
// //             {products.length}
// //           </p>
// //           <p className="text-xs text-gray-400 mt-1">All time</p>
// //         </div>

// //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-blue-500">
// //           <p className="text-gray-500 text-sm font-medium">Total Orders</p>
// //           <p className="text-3xl font-bold text-gray-800 mt-1">
// //             {orders.length}
// //           </p>
// //           <p className="text-xs text-gray-400 mt-1">All time</p>
// //         </div>

// //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-yellow-500">
// //           <p className="text-gray-500 text-sm font-medium">Pending</p>
// //           <p className="text-3xl font-bold text-yellow-600 mt-1">
// //             {pendingOrders}
// //           </p>
// //           <p className="text-xs text-yellow-500 mt-1">⏳ Waiting</p>
// //         </div>

// //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-purple-500">
// //           <p className="text-gray-500 text-sm font-medium">Preparing</p>
// //           <p className="text-3xl font-bold text-purple-600 mt-1">
// //             {preparingOrders}
// //           </p>
// //           <p className="text-xs text-purple-500 mt-1">🍳 In Kitchen</p>
// //         </div>

// //         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-green-500">
// //           <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
// //           <p className="text-3xl font-bold text-green-600 mt-1">
// //             ₹{revenue.toLocaleString()}
// //           </p>
// //           <p className="text-xs text-gray-400 mt-1">All time</p>
// //         </div>
// //       </div>

// //       {/* DETAILED STATS */}
// //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// //         <div className="bg-white p-4 rounded-2xl shadow-md">
// //           <p className="text-gray-500 text-sm">Available Products</p>
// //           <p className="text-2xl font-bold text-green-600">{availableProducts}</p>
// //         </div>
// //         <div className="bg-white p-4 rounded-2xl shadow-md">
// //           <p className="text-gray-500 text-sm">Out of Stock</p>
// //           <p className="text-2xl font-bold text-red-600">{outOfStock}</p>
// //         </div>
// //         <div className="bg-white p-4 rounded-2xl shadow-md">
// //           <p className="text-gray-500 text-sm">Featured Items</p>
// //           <p className="text-2xl font-bold text-orange-600">{featuredCount}</p>
// //         </div>
// //         <div className="bg-white p-4 rounded-2xl shadow-md">
// //           <p className="text-gray-500 text-sm">Completed Orders</p>
// //           <p className="text-2xl font-bold text-blue-600">{completedOrders}</p>
// //         </div>
// //       </div>

// //       {/* ✅ RECENT ORDERS - FULL ORDER ID */}
// //       <div className="bg-white rounded-2xl shadow-md p-5 mb-8">
// //         <div className="flex items-center justify-between mb-4">
// //           <div>
// //             <h2 className="text-xl font-bold text-gray-800">
// //               📦 Recent Orders
// //             </h2>
// //             <p className="text-gray-400 text-sm mt-1">
// //               Latest {Math.min(orders.length, 10)} of {orders.length} orders
// //             </p>
// //           </div>
// //           <Link
// //             href="/admin/orders"
// //             className="bg-orange-600 text-white px-4 py-2 rounded-xl hover:bg-orange-700 transition font-semibold text-sm"
// //           >
// //             View All Orders →
// //           </Link>
// //         </div>

// //         {orders.length === 0 ? (
// //           <div className="text-center py-12">
// //             <span className="text-5xl">📦</span>
// //             <p className="text-gray-400 text-lg mt-4">No orders yet</p>
// //             <p className="text-gray-400 text-sm mt-1">
// //               Orders will appear here when customers place them
// //             </p>
// //           </div>
// //         ) : (
// //           <>
// //             {/* DESKTOP TABLE */}
// //             <div className="hidden md:block overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// //                       Order ID
// //                     </th>
// //                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// //                       Customer
// //                     </th>
// //                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// //                       Items
// //                     </th>
// //                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// //                       Amount
// //                     </th>
// //                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// //                       Status
// //                     </th>
// //                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// //                       Date & Time
// //                     </th>
// //                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
// //                       Action
// //                     </th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {orders.slice(0, 10).map((order) => (
// //                     <tr
// //                       key={order.id}
// //                       className={`border-t hover:bg-gray-50 transition ${
// //                         isToday(order.createdAt) ? 'bg-orange-50/30' : ''
// //                       }`}
// //                     >
// //                       {/* ✅ FULL ORDER ID - same as admin/orders page */}
// //                       <td className="px-4 py-3">
// //                         <div className="flex flex-col gap-1">
// //                           <span className="text-sm font-mono font-semibold text-gray-700">
// //                             #{order.id}
// //                           </span>
// //                           {isToday(order.createdAt) && (
// //                             <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-semibold w-fit">
// //                               Today
// //                             </span>
// //                           )}
// //                         </div>
// //                       </td>

// //                       <td className="px-4 py-3 font-medium text-gray-800">
// //                         {order.customerName}
// //                       </td>

// //                       <td className="px-4 py-3 text-sm text-gray-500 max-w-40">
// //                         <span className="truncate block">
// //                           {order.items.length > 0
// //                             ? order.items
// //                                 .map((i) => `${i.name} x${i.quantity}`)
// //                                 .join(', ')
// //                             : 'N/A'}
// //                         </span>
// //                       </td>

// //                       <td className="px-4 py-3 font-semibold text-green-600">
// //                         ₹{order.totalAmount.toLocaleString()}
// //                       </td>

// //                       <td className="px-4 py-3">
// //                         <span
// //                           className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
// //                             order.status
// //                           )}`}
// //                         >
// //                           {getStatusEmoji(order.status)} {order.status}
// //                         </span>
// //                       </td>

// //                       <td className="px-4 py-3">
// //                         <p className="text-sm text-gray-700">
// //                           {formatDateTime(order.createdAt)}
// //                         </p>
// //                         <p className="text-xs text-gray-400 mt-0.5">
// //                           {timeAgo(order.createdAt)}
// //                         </p>
// //                       </td>

// //                       <td className="px-4 py-3">
// //                         <Link
// //                           href="/admin/orders"
// //                           className="bg-gray-100 hover:bg-orange-100 text-orange-600 hover:text-orange-700 font-semibold text-sm px-3 py-1.5 rounded-lg transition"
// //                         >
// //                           View →
// //                         </Link>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>

// //             {/* MOBILE CARDS */}
// //             <div className="grid gap-3 md:hidden">
// //               {orders.slice(0, 10).map((order) => (
// //                 <div
// //                   key={order.id}
// //                   className={`border rounded-xl p-4 ${
// //                     isToday(order.createdAt)
// //                       ? 'border-orange-200 bg-orange-50/50'
// //                       : 'border-gray-200'
// //                   }`}
// //                 >
// //                   {/* Top Row - Full Order ID */}
// //                   <div className="flex items-start justify-between mb-2 gap-2">
// //                     <div className="flex flex-col gap-1">
// //                       {/* ✅ FULL ORDER ID - Mobile */}
// //                       <span className="text-xs font-mono font-semibold text-gray-700 break-all">
// //                         #{order.id}
// //                       </span>
// //                       {isToday(order.createdAt) && (
// //                         <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-semibold w-fit">
// //                           Today
// //                         </span>
// //                       )}
// //                     </div>
// //                     <span
// //                       className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(
// //                         order.status
// //                       )}`}
// //                     >
// //                       {getStatusEmoji(order.status)} {order.status}
// //                     </span>
// //                   </div>

// //                   {/* Customer & Amount */}
// //                   <div className="flex items-center justify-between mb-2">
// //                     <p className="font-semibold text-gray-800">
// //                       {order.customerName}
// //                     </p>
// //                     <p className="font-bold text-green-600">
// //                       ₹{order.totalAmount.toLocaleString()}
// //                     </p>
// //                   </div>

// //                   {/* Items */}
// //                   {order.items.length > 0 && (
// //                     <p className="text-xs text-gray-500 mb-2">
// //                       🍽️{' '}
// //                       {order.items
// //                         .map((i) => `${i.name} x${i.quantity}`)
// //                         .join(', ')}
// //                     </p>
// //                   )}

// //                   {/* Time & View Button */}
// //                   <div className="flex items-center justify-between mt-2">
// //                     <div>
// //                       <p className="text-xs text-gray-400">
// //                         🕐 {formatDateTime(order.createdAt)}
// //                       </p>
// //                       <p className="text-xs text-orange-500 font-medium">
// //                         {timeAgo(order.createdAt)}
// //                       </p>
// //                     </div>
// //                     <Link
// //                       href="/admin/orders"
// //                       className="bg-orange-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-orange-700 transition font-semibold"
// //                     >
// //                       View →
// //                     </Link>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* VIEW ALL BUTTON */}
// //             {orders.length > 10 && (
// //               <div className="text-center mt-6">
// //                 <Link
// //                   href="/admin/orders"
// //                   className="inline-block bg-orange-600 text-white px-6 py-2.5 rounded-xl hover:bg-orange-700 transition font-semibold text-sm"
// //                 >
// //                   View All {orders.length} Orders →
// //                 </Link>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </div>

// //       {/* LOW STOCK ALERT */}
// //       {products.filter((p) => p.stock < 10 && p.available).length > 0 && (
// //         <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
// //           <h2 className="text-lg font-bold text-red-700 mb-3">
// //             ⚠️ Low Stock Alert
// //           </h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
// //             {products
// //               .filter((p) => p.stock < 10 && p.available)
// //               .map((product) => (
// //                 <div
// //                   key={product.id}
// //                   className="bg-white p-3 rounded-xl flex items-center justify-between"
// //                 >
// //                   <span className="font-medium text-gray-800">
// //                     {product.name}
// //                   </span>
// //                   <span className="text-red-600 font-bold text-sm">
// //                     Stock: {product.stock}
// //                   </span>
// //                 </div>
// //               ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* CATEGORIES OVERVIEW */}
// //       <div className="bg-white rounded-2xl shadow-md p-5">
// //         <h2 className="text-xl font-bold text-gray-800 mb-4">
// //           📂 Products by Category
// //         </h2>
// //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
// //           {Array.from(
// //             new Set(products.map((p) => p.category).filter(Boolean))
// //           ).map((cat) => (
// //             <div key={cat} className="bg-gray-50 p-3 rounded-xl text-center">
// //               <p className="text-2xl font-bold text-orange-600">
// //                 {products.filter((p) => p.category === cat).length}
// //               </p>
// //               <p className="text-xs text-gray-500 font-medium mt-1">{cat}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useEffect, useState } from 'react';
// import { db } from '../../lib/firebase';
// import { collection, getDocs, onSnapshot } from 'firebase/firestore';
// import Link from 'next/link';

// type Product = {
//   id: string;
//   name: string;
//   price: number;
//   available: boolean;
//   featured: boolean;
//   stock: number;
//   category: string;
// };

// type OrderItem = {
//   name: string;
//   price: number;
//   quantity: number;
// };

// type Order = {
//   id: string;
//   customerName: string;
//   customerPhone: string;  // ✅ Added
//   customerEmail: string;  // ✅ Added
//   totalAmount: number;
//   status: string;
//   items: OrderItem[];
//   createdAt: number | string | { seconds: number; nanoseconds: number } | null;
// };

// export default function AdminDashboard() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [revenue, setRevenue] = useState(0);
//   const [todayRevenue, setTodayRevenue] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Stats
//   const [availableProducts, setAvailableProducts] = useState(0);
//   const [outOfStock, setOutOfStock] = useState(0);
//   const [featuredCount, setFeaturedCount] = useState(0);
//   const [pendingOrders, setPendingOrders] = useState(0);
//   const [completedOrders, setCompletedOrders] = useState(0);
//   const [preparingOrders, setPreparingOrders] = useState(0);
//   const [todayOrders, setTodayOrders] = useState(0);

//   // ✅ CONVERT FIREBASE TIMESTAMP TO DATE
//   const getDateFromTimestamp = (
//     timestamp:
//       | number
//       | string
//       | { seconds: number; nanoseconds: number }
//       | null
//       | undefined
//   ): Date => {
//     if (!timestamp) return new Date();
//     if (typeof timestamp === 'object' && 'seconds' in timestamp) {
//       return new Date(timestamp.seconds * 1000);
//     }
//     if (typeof timestamp === 'number') return new Date(timestamp);
//     if (typeof timestamp === 'string') return new Date(timestamp);
//     return new Date();
//   };

//   // ✅ FORMAT DATE & TIME
//   const formatDateTime = (
//     timestamp:
//       | number
//       | string
//       | { seconds: number; nanoseconds: number }
//       | null
//       | undefined
//   ): string => {
//     const date = getDateFromTimestamp(timestamp);
//     return date.toLocaleString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//     });
//   };

//   // ✅ FORMAT DATE ONLY
//   const formatDate = (
//     timestamp:
//       | number
//       | string
//       | { seconds: number; nanoseconds: number }
//       | null
//       | undefined
//   ): string => {
//     const date = getDateFromTimestamp(timestamp);
//     return date.toLocaleString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });
//   };

//   // ✅ CHECK IF TODAY
//   const isToday = (
//     timestamp:
//       | number
//       | string
//       | { seconds: number; nanoseconds: number }
//       | null
//       | undefined
//   ): boolean => {
//     const date = getDateFromTimestamp(timestamp);
//     const today = new Date();
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };

//   // ✅ TIME AGO
//   const timeAgo = (
//     timestamp:
//       | number
//       | string
//       | { seconds: number; nanoseconds: number }
//       | null
//       | undefined
//   ): string => {
//     const date = getDateFromTimestamp(timestamp);
//     const now = new Date();
//     const diffMs = now.getTime() - date.getTime();
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);
//     const diffDays = Math.floor(diffMs / 86400000);

//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins} min ago`;
//     if (diffHours < 24) return `${diffHours} hr ago`;
//     if (diffDays < 7) return `${diffDays} days ago`;
//     return formatDate(timestamp);
//   };

//   // ✅ STATUS BADGE COLOR
//   const getStatusStyle = (status: string): string => {
//     switch (status) {
//       case 'completed':
//       case 'delivered':
//         return 'bg-green-100 text-green-700';
//       case 'preparing':
//       case 'processing':
//         return 'bg-purple-100 text-purple-700';
//       case 'cancelled':
//         return 'bg-red-100 text-red-700';
//       default:
//         return 'bg-yellow-100 text-yellow-700';
//     }
//   };

//   // ✅ STATUS EMOJI
//   const getStatusEmoji = (status: string): string => {
//     switch (status) {
//       case 'pending': return '⏳';
//       case 'preparing': return '🍳';
//       case 'processing': return '🍳';
//       case 'completed': return '✅';
//       case 'delivered': return '🚀';
//       case 'cancelled': return '❌';
//       default: return '📦';
//     }
//   };

//   // ✅ SAME ORDER ID AS /admin/orders
//   const getShortOrderId = (id: string) => {
//     let hash = 0;

//     for (let i = 0; i < id.length; i++) {
//       hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
//     }

//     return String(hash).slice(0, 8).padStart(8, '0');
//   };

//   useEffect(() => {
//     // ✅ FETCH PRODUCTS
//     const fetchProducts = async () => {
//       try {
//         const productSnap = await getDocs(collection(db, 'products'));
//         const productData: Product[] = productSnap.docs.map((docSnap) => {
//           const d = docSnap.data();
//           return {
//             id: docSnap.id,
//             name: (d.name as string) || '',
//             price: (d.price as number) || 0,
//             available: (d.available as boolean) ?? true,
//             featured: (d.featured as boolean) ?? false,
//             stock: (d.stock as number) || 0,
//             category: (d.category as string) || '',
//           };
//         });

//         setProducts(productData);
//         setAvailableProducts(productData.filter((p) => p.available).length);
//         setOutOfStock(productData.filter((p) => !p.available).length);
//         setFeaturedCount(productData.filter((p) => p.featured).length);
//       } catch (error) {
//         console.error('❌ Error fetching products:', error);
//       }
//     };

//     fetchProducts();

//     // ✅ REAL-TIME ORDERS LISTENER
//     const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
//       const orderData: Order[] = snapshot.docs.map((docSnap) => {
//         const d = docSnap.data();
//         return {
//           id: docSnap.id,

//           // ✅ Customer Name - multiple field names check
//           customerName:
//             (d.customerName as string) ||
//             (d.name as string) ||
//             (d.userName as string) ||
//             (d.customer as string) ||
//             'Unknown Customer',

//           // ✅ Customer Phone - multiple field names check
//           customerPhone:
//             (d.customerPhone as string) ||
//             (d.phone as string) ||
//             (d.mobile as string) ||
//             (d.phoneNumber as string) ||
//             '',

//           // ✅ Customer Email
//           customerEmail:
//             (d.customerEmail as string) ||
//             (d.email as string) ||
//             '',

//           totalAmount:
//             (d.totalAmount as number) ||
//             (d.total as number) ||
//             (d.amount as number) ||
//             (d.orderTotal as number) ||
//             0,

//           status: (d.status as string) || 'pending',
//           items: (d.items as OrderItem[]) || [],
//           createdAt:
//             d.createdAt || d.orderDate || d.date || d.timestamp || null,
//         };
//       });

//       // ✅ SORT BY DATE (newest first)
//       orderData.sort((a, b) => {
//         const dateA = getDateFromTimestamp(a.createdAt);
//         const dateB = getDateFromTimestamp(b.createdAt);
//         return dateB.getTime() - dateA.getTime();
//       });

//       setOrders(orderData);

//       // ✅ TODAY'S ORDERS
//       const todayOrdersList = orderData.filter((o) => isToday(o.createdAt));
//       setTodayOrders(todayOrdersList.length);

//       // ✅ TODAY'S REVENUE
//       const todayRev = todayOrdersList.reduce(
//         (sum, o) => sum + (o.totalAmount || 0),
//         0
//       );
//       setTodayRevenue(todayRev);

//       // ✅ TOTAL REVENUE
//       const totalRevenue = orderData.reduce(
//         (sum, o) => sum + (o.totalAmount || 0),
//         0
//       );
//       setRevenue(totalRevenue);

//       // ✅ ORDER STATS
//       setPendingOrders(
//         orderData.filter((o) => o.status === 'pending').length
//       );
//       setPreparingOrders(
//         orderData.filter(
//           (o) => o.status === 'preparing' || o.status === 'processing'
//         ).length
//       );
//       setCompletedOrders(
//         orderData.filter(
//           (o) => o.status === 'completed' || o.status === 'delivered'
//         ).length
//       );

//       setLoading(false);
//     });

//     return () => unsubscribe();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // ✅ TODAY'S DATE
//   const todayDate = new Date().toLocaleString('en-IN', {
//     weekday: 'long',
//     day: '2-digit',
//     month: 'long',
//     year: 'numeric',
//   });

//   if (loading) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
//         <div className="inline-block w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
//         <p className="text-gray-500 mt-4 text-lg">Loading Admin Panel...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//         <div>
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
//             🍕 Admin Dashboard
//           </h1>
//           <p className="text-gray-500 mt-1">📅 {todayDate}</p>
//         </div>
//         <div className="flex items-center gap-2 mt-2 md:mt-0">
//           <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
//           <span className="text-green-600 text-sm font-medium">
//             Live Updates
//           </span>
//         </div>
//       </div>

//       {/* QUICK LINKS */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         <Link
//           href="/admin/products"
//           className="bg-orange-600 text-white p-4 rounded-2xl text-center hover:bg-orange-700 transition font-semibold shadow-lg"
//         >
//           🍔 Products
//         </Link>

//         <Link
//           href="/admin/orders"
//           className="bg-blue-600 text-white p-4 rounded-2xl text-center hover:bg-blue-700 transition font-semibold shadow-lg relative"
//         >
//           📦 Orders
//           {pendingOrders > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-bounce">
//               {pendingOrders}
//             </span>
//           )}
//         </Link>

//         <Link
//           href="/admin/categories"
//           className="bg-purple-600 text-white p-4 rounded-2xl text-center hover:bg-purple-700 transition font-semibold shadow-lg"
//         >
//           📂 Categories
//         </Link>

//         <Link
//           href="/admin/users"
//           className="bg-green-600 text-white p-4 rounded-2xl text-center hover:bg-green-700 transition font-semibold shadow-lg"
//         >
//           👥 Users
//         </Link>
//       </div>

//       {/* TODAY'S STATS */}
//       <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
//         <h2 className="text-lg font-semibold mb-4 opacity-90">
//           📊 Today&apos;s Overview
//         </h2>
//         <div className="grid grid-cols-3 gap-4">
//           <div className="text-center">
//             <p className="text-4xl font-bold">{todayOrders}</p>
//             <p className="text-sm opacity-80 mt-1">Orders Today</p>
//           </div>
//           <div className="text-center">
//             <p className="text-4xl font-bold">
//               ₹{todayRevenue.toLocaleString()}
//             </p>
//             <p className="text-sm opacity-80 mt-1">Revenue Today</p>
//           </div>
//           <div className="text-center">
//             <p className="text-4xl font-bold">
//               {pendingOrders + preparingOrders}
//             </p>
//             <p className="text-sm opacity-80 mt-1">Active Orders</p>
//           </div>
//         </div>
//       </div>

//       {/* ALL TIME STATS */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
//         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-orange-500">
//           <p className="text-gray-500 text-sm font-medium">Total Products</p>
//           <p className="text-3xl font-bold text-gray-800 mt-1">
//             {products.length}
//           </p>
//           <p className="text-xs text-gray-400 mt-1">All time</p>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-blue-500">
//           <p className="text-gray-500 text-sm font-medium">Total Orders</p>
//           <p className="text-3xl font-bold text-gray-800 mt-1">
//             {orders.length}
//           </p>
//           <p className="text-xs text-gray-400 mt-1">All time</p>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-yellow-500">
//           <p className="text-gray-500 text-sm font-medium">Pending</p>
//           <p className="text-3xl font-bold text-yellow-600 mt-1">
//             {pendingOrders}
//           </p>
//           <p className="text-xs text-yellow-500 mt-1">⏳ Waiting</p>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-purple-500">
//           <p className="text-gray-500 text-sm font-medium">Preparing</p>
//           <p className="text-3xl font-bold text-purple-600 mt-1">
//             {preparingOrders}
//           </p>
//           <p className="text-xs text-purple-500 mt-1">🍳 In Kitchen</p>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-green-500">
//           <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
//           <p className="text-3xl font-bold text-green-600 mt-1">
//             ₹{revenue.toLocaleString()}
//           </p>
//           <p className="text-xs text-gray-400 mt-1">All time</p>
//         </div>
//       </div>

//       {/* DETAILED STATS */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white p-4 rounded-2xl shadow-md">
//           <p className="text-gray-500 text-sm">Available Products</p>
//           <p className="text-2xl font-bold text-green-600">
//             {availableProducts}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-2xl shadow-md">
//           <p className="text-gray-500 text-sm">Out of Stock</p>
//           <p className="text-2xl font-bold text-red-600">{outOfStock}</p>
//         </div>
//         <div className="bg-white p-4 rounded-2xl shadow-md">
//           <p className="text-gray-500 text-sm">Featured Items</p>
//           <p className="text-2xl font-bold text-orange-600">{featuredCount}</p>
//         </div>
//         <div className="bg-white p-4 rounded-2xl shadow-md">
//           <p className="text-gray-500 text-sm">Completed Orders</p>
//           <p className="text-2xl font-bold text-blue-600">{completedOrders}</p>
//         </div>
//       </div>

//       {/* ✅ RECENT ORDERS - FULL ORDER ID + PHONE */}
//       <div className="bg-white rounded-2xl shadow-md p-5 mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h2 className="text-xl font-bold text-gray-800">
//               📦 Recent Orders
//             </h2>
//             <p className="text-gray-400 text-sm mt-1">
//               Latest {Math.min(orders.length, 10)} of {orders.length} orders
//             </p>
//           </div>
//           <Link
//             href="/admin/orders"
//             className="bg-orange-600 text-white px-4 py-2 rounded-xl hover:bg-orange-700 transition font-semibold text-sm"
//           >
//             View All Orders →
//           </Link>
//         </div>

//         {orders.length === 0 ? (
//           <div className="text-center py-12">
//             <span className="text-5xl">📦</span>
//             <p className="text-gray-400 text-lg mt-4">No orders yet</p>
//             <p className="text-gray-400 text-sm mt-1">
//               Orders will appear here when customers place them
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* DESKTOP TABLE */}
//             <div className="hidden md:block overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
//                       Order ID
//                     </th>
//                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
//                       Customer
//                     </th>
//                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
//                       Items
//                     </th>
//                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
//                       Amount
//                     </th>
//                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
//                       Status
//                     </th>
//                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
//                       Date & Time
//                     </th>
//                     <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.slice(0, 10).map((order) => (
//                     <tr
//                       key={order.id}
//                       className={`border-t hover:bg-gray-50 transition ${
//                         isToday(order.createdAt) ? 'bg-orange-50/30' : ''
//                       }`}
//                     >
//                       {/* ✅ SHORT ORDER ID */}
//                       <td className="px-4 py-3">
//                         <div className="flex flex-col gap-1">
//                           <span className="text-sm font-mono font-semibold text-gray-700">
//                             #{getShortOrderId(order.id)}
//                           </span>
//                           {isToday(order.createdAt) && (
//                             <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-semibold w-fit">
//                               Today
//                             </span>
//                           )}
//                         </div>
//                       </td>

//                       {/* ✅ CUSTOMER NAME + PHONE + EMAIL */}
//                       <td className="px-4 py-3">
//                         <p className="font-semibold text-gray-800">
//                           {order.customerName}
//                         </p>
//                         {order.customerPhone && (
//                           <p className="text-xs text-gray-500 mt-0.5">
//                             📞 {order.customerPhone}
//                           </p>
//                         )}
//                         {order.customerEmail && (
//                           <p className="text-xs text-gray-400 mt-0.5">
//                             ✉️ {order.customerEmail}
//                           </p>
//                         )}
//                       </td>

//                       <td className="px-4 py-3 text-sm text-gray-500 max-w-40">
//                         <span className="truncate block">
//                           {order.items.length > 0
//                             ? order.items
//                                 .map((i) => `${i.name} x${i.quantity}`)
//                                 .join(', ')
//                             : 'N/A'}
//                         </span>
//                       </td>

//                       <td className="px-4 py-3 font-semibold text-green-600">
//                         ₹{order.totalAmount.toLocaleString()}
//                       </td>

//                       <td className="px-4 py-3">
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
//                             order.status
//                           )}`}
//                         >
//                           {getStatusEmoji(order.status)} {order.status}
//                         </span>
//                       </td>

//                       <td className="px-4 py-3">
//                         <p className="text-sm text-gray-700">
//                           {formatDateTime(order.createdAt)}
//                         </p>
//                         <p className="text-xs text-gray-400 mt-0.5">
//                           {timeAgo(order.createdAt)}
//                         </p>
//                       </td>

//                       <td className="px-4 py-3">
//                         <Link
//                           href="/admin/orders"
//                           className="bg-gray-100 hover:bg-orange-100 text-orange-600 hover:text-orange-700 font-semibold text-sm px-3 py-1.5 rounded-lg transition"
//                         >
//                           View →
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* MOBILE CARDS */}
//             <div className="grid gap-3 md:hidden">
//               {orders.slice(0, 10).map((order) => (
//                 <div
//                   key={order.id}
//                   className={`border rounded-xl p-4 ${
//                     isToday(order.createdAt)
//                       ? 'border-orange-200 bg-orange-50/50'
//                       : 'border-gray-200'
//                   }`}
//                 >
//                   {/* Top Row */}
//                   <div className="flex items-start justify-between mb-2 gap-2">
//                     <div className="flex flex-col gap-1">
//                       {/* ✅ SHORT ORDER ID */}
//                       <span className="text-xs font-mono font-semibold text-gray-700">
//                         #{getShortOrderId(order.id)}
//                       </span>
//                       {isToday(order.createdAt) && (
//                         <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-semibold w-fit">
//                           Today
//                         </span>
//                       )}
//                     </div>
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(
//                         order.status
//                       )}`}
//                     >
//                       {getStatusEmoji(order.status)} {order.status}
//                     </span>
//                   </div>

//                   {/* ✅ Customer Name + Phone + Email */}
//                   <div className="flex items-start justify-between mb-2">
//                     <div>
//                       <p className="font-semibold text-gray-800">
//                         {order.customerName}
//                       </p>
//                       {order.customerPhone && (
//                         <p className="text-xs text-gray-500 mt-0.5">
//                           📞 {order.customerPhone}
//                         </p>
//                       )}
//                       {order.customerEmail && (
//                         <p className="text-xs text-gray-400 mt-0.5">
//                           ✉️ {order.customerEmail}
//                         </p>
//                       )}
//                     </div>
//                     <p className="font-bold text-green-600">
//                       ₹{order.totalAmount.toLocaleString()}
//                     </p>
//                   </div>

//                   {/* Items */}
//                   {order.items.length > 0 && (
//                     <p className="text-xs text-gray-500 mb-2">
//                       🍽️{' '}
//                       {order.items
//                         .map((i) => `${i.name} x${i.quantity}`)
//                         .join(', ')}
//                     </p>
//                   )}

//                   {/* Time & View Button */}
//                   <div className="flex items-center justify-between mt-2">
//                     <div>
//                       <p className="text-xs text-gray-400">
//                         🕐 {formatDateTime(order.createdAt)}
//                       </p>
//                       <p className="text-xs text-orange-500 font-medium">
//                         {timeAgo(order.createdAt)}
//                       </p>
//                     </div>
//                     <Link
//                       href="/admin/orders"
//                       className="bg-orange-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-orange-700 transition font-semibold"
//                     >
//                       View →
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* VIEW ALL BUTTON */}
//             {orders.length > 10 && (
//               <div className="text-center mt-6">
//                 <Link
//                   href="/admin/orders"
//                   className="inline-block bg-orange-600 text-white px-6 py-2.5 rounded-xl hover:bg-orange-700 transition font-semibold text-sm"
//                 >
//                   View All {orders.length} Orders →
//                 </Link>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* LOW STOCK ALERT */}
//       {products.filter((p) => p.stock < 10 && p.available).length > 0 && (
//         <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
//           <h2 className="text-lg font-bold text-red-700 mb-3">
//             ⚠️ Low Stock Alert
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//             {products
//               .filter((p) => p.stock < 10 && p.available)
//               .map((product) => (
//                 <div
//                   key={product.id}
//                   className="bg-white p-3 rounded-xl flex items-center justify-between"
//                 >
//                   <span className="font-medium text-gray-800">
//                     {product.name}
//                   </span>
//                   <span className="text-red-600 font-bold text-sm">
//                     Stock: {product.stock}
//                   </span>
//                 </div>
//               ))}
//           </div>
//         </div>
//       )}

//       {/* CATEGORIES OVERVIEW */}
//       <div className="bg-white rounded-2xl shadow-md p-5">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">
//           📂 Products by Category
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
//           {Array.from(
//             new Set(products.map((p) => p.category).filter(Boolean))
//           ).map((cat) => (
//             <div
//               key={cat}
//               className="bg-gray-50 p-3 rounded-xl text-center"
//             >
//               <p className="text-2xl font-bold text-orange-600">
//                 {products.filter((p) => p.category === cat).length}
//               </p>
//               <p className="text-xs text-gray-500 font-medium mt-1">
//                 {cat}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';

type Product = {
  id: string;
  name: string;
  price: number;
  available: boolean;
  featured: boolean;
  stock: number;
  category: string;
};

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
  createdAt: number | string | { seconds: number; nanoseconds: number } | null;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [revenue, setRevenue] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  // Stats
  const [availableProducts, setAvailableProducts] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const [featuredCount, setFeaturedCount] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [preparingOrders, setPreparingOrders] = useState(0);
  const [todayOrders, setTodayOrders] = useState(0);

  // ✅ CONVERT FIREBASE TIMESTAMP TO DATE
  const getDateFromTimestamp = (
    timestamp:
      | number
      | string
      | { seconds: number; nanoseconds: number }
      | null
      | undefined
  ): Date => {
    if (!timestamp) return new Date();
    if (typeof timestamp === 'object' && 'seconds' in timestamp) {
      return new Date(timestamp.seconds * 1000);
    }
    if (typeof timestamp === 'number') return new Date(timestamp);
    if (typeof timestamp === 'string') return new Date(timestamp);
    return new Date();
  };

  // ✅ FORMAT DATE & TIME
  const formatDateTime = (
    timestamp:
      | number
      | string
      | { seconds: number; nanoseconds: number }
      | null
      | undefined
  ): string => {
    const date = getDateFromTimestamp(timestamp);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // ✅ FORMAT DATE ONLY
  const formatDate = (
    timestamp:
      | number
      | string
      | { seconds: number; nanoseconds: number }
      | null
      | undefined
  ): string => {
    const date = getDateFromTimestamp(timestamp);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // ✅ CHECK IF TODAY
  const isToday = (
    timestamp:
      | number
      | string
      | { seconds: number; nanoseconds: number }
      | null
      | undefined
  ): boolean => {
    const date = getDateFromTimestamp(timestamp);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // ✅ TIME AGO
  const timeAgo = (
    timestamp:
      | number
      | string
      | { seconds: number; nanoseconds: number }
      | null
      | undefined
  ): string => {
    const date = getDateFromTimestamp(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(timestamp);
  };

  // ✅ STATUS BADGE COLOR
  const getStatusStyle = (status: string): string => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'preparing':
      case 'processing':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'cancelled':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  // ✅ STATUS EMOJI
  const getStatusEmoji = (status: string): string => {
    switch (status) {
      case 'pending': return '';
      case 'preparing': return '🍳';
      case 'processing': return '🍳';
      case 'completed': return '✅';
      case 'delivered': return '🚀';
      case 'cancelled': return '❌';
      default: return '📦';
    }
  };

  // ✅ SAME ORDER ID AS /admin/orders
  const getShortOrderId = (id: string) => {
    let hash = 0;

    for (let i = 0; i < id.length; i++) {
      hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    }

    return String(hash).slice(0, 8).padStart(8, '0');
  };

  useEffect(() => {
    // ✅ FETCH PRODUCTS
    const fetchProducts = async () => {
      try {
        const productSnap = await getDocs(collection(db, 'products'));
        const productData: Product[] = productSnap.docs.map((docSnap) => {
          const d = docSnap.data();
          return {
            id: docSnap.id,
            name: (d.name as string) || '',
            price: (d.price as number) || 0,
            available: (d.available as boolean) ?? true,
            featured: (d.featured as boolean) ?? false,
            stock: (d.stock as number) || 0,
            category: (d.category as string) || '',
          };
        });

        setProducts(productData);
        setAvailableProducts(productData.filter((p) => p.available).length);
        setOutOfStock(productData.filter((p) => !p.available).length);
        setFeaturedCount(productData.filter((p) => p.featured).length);
      } catch (error) {
        console.error('❌ Error fetching products:', error);
      }
    };

    fetchProducts();

    // ✅ REAL-TIME ORDERS LISTENER
    const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const orderData: Order[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,

          // ✅ Customer Name - multiple field names check
          customerName:
            (d.customerName as string) ||
            (d.name as string) ||
            (d.userName as string) ||
            (d.customer as string) ||
            'Unknown Customer',

          // ✅ Customer Phone - multiple field names check
          customerPhone:
            (d.customerPhone as string) ||
            (d.phone as string) ||
            (d.mobile as string) ||
            (d.phoneNumber as string) ||
            '',

          // ✅ Customer Email
          customerEmail:
            (d.customerEmail as string) ||
            (d.email as string) ||
            '',

          totalAmount:
            (d.totalAmount as number) ||
            (d.total as number) ||
            (d.amount as number) ||
            (d.orderTotal as number) ||
            0,

          status: (d.status as string) || 'pending',
          items: (d.items as OrderItem[]) || [],
          createdAt:
            d.createdAt || d.orderDate || d.date || d.timestamp || null,
        };
      });

      // ✅ SORT BY DATE (newest first)
      orderData.sort((a, b) => {
        const dateA = getDateFromTimestamp(a.createdAt);
        const dateB = getDateFromTimestamp(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      setOrders(orderData);

      // ✅ TODAY'S ORDERS
      const todayOrdersList = orderData.filter((o) => isToday(o.createdAt));
      setTodayOrders(todayOrdersList.length);

      // ✅ TODAY'S REVENUE
      const todayRev = todayOrdersList.reduce(
        (sum, o) => sum + (o.totalAmount || 0),
        0
      );
      setTodayRevenue(todayRev);

      // ✅ TOTAL REVENUE
      const totalRevenue = orderData.reduce(
        (sum, o) => sum + (o.totalAmount || 0),
        0
      );
      setRevenue(totalRevenue);

      // ✅ ORDER STATS
      setPendingOrders(
        orderData.filter((o) => o.status === 'pending').length
      );
      setPreparingOrders(
        orderData.filter(
          (o) => o.status === 'preparing' || o.status === 'processing'
        ).length
      );
      setCompletedOrders(
        orderData.filter(
          (o) => o.status === 'completed' || o.status === 'delivered'
        ).length
      );

      setLoading(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ TODAY'S DATE
  const todayDate = new Date().toLocaleString('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="inline-block w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">Loading Admin Panel...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            🍕 Admin Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">📅 {todayDate}</p>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-600 dark:text-green-400 text-sm font-medium">
            Live Updates
          </span>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link
          href="/admin/products"
          className="bg-orange-600 dark:bg-orange-700 text-white p-4 rounded-2xl text-center hover:bg-orange-700 dark:hover:bg-orange-600 transition font-semibold shadow-lg"
        >
          🍔 Products
        </Link>

        <Link
          href="/admin/orders"
          className="bg-blue-600 dark:bg-blue-700 text-white p-4 rounded-2xl text-center hover:bg-blue-700 dark:hover:bg-blue-600 transition font-semibold shadow-lg relative"
        >
          📦 Orders
          {pendingOrders > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-bounce">
              {pendingOrders}
            </span>
          )}
        </Link>

        <Link
          href="/admin/categories"
          className="bg-purple-600 dark:bg-purple-700 text-white p-4 rounded-2xl text-center hover:bg-purple-700 dark:hover:bg-purple-600 transition font-semibold shadow-lg"
        >
          📂 Categories
        </Link>

        <Link
          href="/admin/user"
          className="bg-green-600 dark:bg-green-700 text-white p-4 rounded-2xl text-center hover:bg-green-700 dark:hover:bg-green-600 transition font-semibold shadow-lg"
        >
          👥 Users
        </Link>
      </div>

      {/* TODAY'S STATS */}
      <div className="bg-linear-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-2xl p-6 mb-8 text-white shadow-lg">
        <h2 className="text-lg font-semibold mb-4 opacity-90">
          📊 Today&apos;s Overview
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-4xl font-bold">{todayOrders}</p>
            <p className="text-sm opacity-80 mt-1">Orders Today</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">
              ₹{todayRevenue.toLocaleString()}
            </p>
            <p className="text-sm opacity-80 mt-1">Revenue Today</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">
              {pendingOrders + preparingOrders}
            </p>
            <p className="text-sm opacity-80 mt-1">Active Orders</p>
          </div>
        </div>
      </div>

      {/* ALL TIME STATS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border-l-4 border-orange-500 dark:border-orange-600">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Products</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
            {products.length}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">All time</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border-l-4 border-blue-500 dark:border-blue-600">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Orders</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
            {orders.length}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">All time</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border-l-4 border-yellow-500 dark:border-yellow-600">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending</p>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
            {pendingOrders}
          </p>
          <p className="text-xs text-yellow-500 dark:text-yellow-400 mt-1">⏳ Waiting</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border-l-4 border-purple-500 dark:border-purple-600">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Preparing</p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1">
            {preparingOrders}
          </p>
          <p className="text-xs text-purple-500 dark:text-purple-400 mt-1">🍳 In Kitchen</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border-l-4 border-green-500 dark:border-green-600">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Revenue</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
            ₹{revenue.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">All time</p>
        </div>
      </div>

      {/* DETAILED STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Available Products</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {availableProducts}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{outOfStock}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Featured Items</p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{featuredCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Completed Orders</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{completedOrders}</p>
        </div>
      </div>

      {/* ✅ RECENT ORDERS - FULL ORDER ID + PHONE */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              📦 Recent Orders
            </h2>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
              Latest {Math.min(orders.length, 10)} of {orders.length} orders
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="bg-orange-600 dark:bg-orange-700 text-white px-4 py-2 rounded-xl hover:bg-orange-700 dark:hover:bg-orange-600 transition font-semibold text-sm"
          >
            View All Orders →
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-5xl">📦</span>
            <p className="text-gray-400 dark:text-gray-500 text-lg mt-4">No orders yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
              Orders will appear here when customers place them
            </p>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                      Order ID
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                      Customer
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                      Items
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                      Amount
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                      Date & Time
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 10).map((order) => (
                    <tr
                      key={order.id}
                      className={`border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition ${
                        isToday(order.createdAt) ? 'bg-orange-50/30 dark:bg-orange-900/10' : ''
                      }`}
                    >
                      {/* ✅ SHORT ORDER ID */}
                      <td className="px-4 py-3">
  <div className="flex flex-col gap-1">
    <span className="text-sm font-mono font-semibold text-gray-700 dark:text-gray-300 uppercase">
      #{order.id.slice(0, 8)}
    </span>
    {isToday(order.createdAt) && (
      <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs px-2 py-0.5 rounded-full font-semibold w-fit">
        Today
      </span>
    )}
  </div>
</td>

                      {/* ✅ CUSTOMER NAME + PHONE + EMAIL */}
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">
                          {order.customerName}
                        </p>
                        {order.customerPhone && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            📞 {order.customerPhone}
                          </p>
                        )}
                        {order.customerEmail && (
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                            ✉️ {order.customerEmail}
                          </p>
                        )}
                      </td>

                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 max-w-40">
                        <span className="truncate block">
                          {order.items.length > 0
                            ? order.items
                                .map((i) => `${i.name} x${i.quantity}`)
                                .join(', ')
                            : 'N/A'}
                        </span>
                      </td>

                      <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400">
                        ₹{order.totalAmount.toLocaleString()}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {getStatusEmoji(order.status)} {order.status}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {formatDateTime(order.createdAt)}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                          {timeAgo(order.createdAt)}
                        </p>
                      </td>

                      <td className="px-4 py-3">
                        <Link
                          href="/admin/orders"
                          className="bg-gray-100 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold text-sm px-3 py-1.5 rounded-lg transition"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="grid gap-3 md:hidden">
              {orders.slice(0, 10).map((order) => (
                <div
                  key={order.id}
                  className={`border rounded-xl p-4 ${
                    isToday(order.createdAt)
                      ? 'border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-900/10'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                  }`}
                >
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <div className="flex flex-col gap-1">
                      {/* ✅ SHORT ORDER ID */}
                      <span className="text-xs font-mono font-semibold text-gray-700 dark:text-gray-300">
                        #{getShortOrderId(order.id)}
                      </span>
                      {isToday(order.createdAt) && (
                        <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs px-2 py-0.5 rounded-full font-semibold w-fit">
                          Today
                        </span>
                      )}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {getStatusEmoji(order.status)} {order.status}
                    </span>
                  </div>

                  {/* ✅ Customer Name + Phone + Email */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        {order.customerName}
                      </p>
                      {order.customerPhone && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          📞 {order.customerPhone}
                        </p>
                      )}
                      {order.customerEmail && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                          ✉️ {order.customerEmail}
                        </p>
                      )}
                    </div>
                    <p className="font-bold text-green-600 dark:text-green-400">
                      ₹{order.totalAmount.toLocaleString()}
                    </p>
                  </div>

                  {/* Items */}
                  {order.items.length > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      🍽️{' '}
                      {order.items
                        .map((i) => `${i.name} x${i.quantity}`)
                        .join(', ')}
                    </p>
                  )}

                  {/* Time & View Button */}
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        🕐 {formatDateTime(order.createdAt)}
                      </p>
                      <p className="text-xs text-orange-500 dark:text-orange-400 font-medium">
                        {timeAgo(order.createdAt)}
                      </p>
                    </div>
                    <Link
                      href="/admin/orders"
                      className="bg-orange-600 dark:bg-orange-700 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 transition font-semibold"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* VIEW ALL BUTTON */}
            {orders.length > 10 && (
              <div className="text-center mt-6">
                <Link
                  href="/admin/orders"
                  className="inline-block bg-orange-600 dark:bg-orange-700 text-white px-6 py-2.5 rounded-xl hover:bg-orange-700 dark:hover:bg-orange-600 transition font-semibold text-sm"
                >
                  View All {orders.length} Orders →
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {/* LOW STOCK ALERT */}
      {products.filter((p) => p.stock < 10 && p.available).length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-5 mb-8">
          <h2 className="text-lg font-bold text-red-700 dark:text-red-400 mb-3">
            ⚠️ Low Stock Alert
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {products
              .filter((p) => p.stock < 10 && p.available)
              .map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 p-3 rounded-xl flex items-center justify-between border border-gray-200 dark:border-gray-700"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {product.name}
                  </span>
                  <span className="text-red-600 dark:text-red-400 font-bold text-sm">
                    Stock: {product.stock}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* CATEGORIES OVERVIEW */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          📂 Products by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from(
            new Set(products.map((p) => p.category).filter(Boolean))
          ).map((cat) => (
            <div
              key={cat}
              className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl text-center border border-gray-200 dark:border-gray-600"
            >
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {products.filter((p) => p.category === cat).length}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                {cat}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}