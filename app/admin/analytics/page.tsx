// 'use client';

// import { useEffect, useState } from 'react';

// import {
//   collection,
//   getDocs,
// } from 'firebase/firestore';

// import { db } from '@/app/lib/firebase';

// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
// } from 'recharts';

// type Order = {
//   id: string;
//   total?: number;
//   status?: string;
// };

// type Product = {
//   id: string;
//   category?: string;
// };

// type User = {
//   id: string;
// };

// export default function AnalyticsPage() {

//   const [orders, setOrders] = useState<Order[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [users, setUsers] = useState<User[]>([]);

//   const [loading, setLoading] = useState(true);

//   // FETCH DATA
//   const fetchAnalytics = async () => {
//     try {

//       // ORDERS
//       const ordersSnapshot = await getDocs(
//         collection(db, 'orders')
//       );

//       const ordersData = ordersSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Order[];

//       setOrders(ordersData);

//       // PRODUCTS
//       const productsSnapshot = await getDocs(
//         collection(db, 'products')
//       );

//       const productsData = productsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Product[];

//       setProducts(productsData);

//       // USERS
//       const usersSnapshot = await getDocs(
//         collection(db, 'users')
//       );

//       const usersData = usersSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as User[];

//       setUsers(usersData);

//     } catch (error: unknown) {

//       if (error instanceof Error) {
//         console.error(error.message);
//       }

//     } finally {
//       setLoading(false);
//     }
//   };

//   // LOAD
//   useEffect(() => {

//     const loadData = async () => {
//       await fetchAnalytics();
//     };

//     loadData();

//   }, []);

//   // TOTAL SALES
//   const totalSales = orders.reduce(
//     (acc, item) => acc + (item.total || 0),
//     0
//   );

//   // TOTAL ORDERS
//   const totalOrders = orders.length;

//   // TOTAL USERS
//   const totalUsers = users.length;

//   // AVG ORDER VALUE
//   const avgOrderValue =
//     totalOrders > 0
//       ? Math.round(totalSales / totalOrders)
//       : 0;

//   // ORDER STATUS
//   const orderStatusData = [
//     {
//       name: 'Completed',
//       value: orders.filter(
//         (o) => o.status === 'completed'
//       ).length,
//     },

//     {
//       name: 'Pending',
//       value: orders.filter(
//         (o) => o.status === 'pending'
//       ).length,
//     },

//     {
//       name: 'Cancelled',
//       value: orders.filter(
//         (o) => o.status === 'cancelled'
//       ).length,
//     },
//   ];

//   // CATEGORY DATA
//   const categoryMap: Record<string, number> = {};

//   products.forEach((product) => {

//     const category =
//       product.category || 'Other';

//     categoryMap[category] =
//       (categoryMap[category] || 0) + 1;
//   });

//   const categoryData = Object.entries(categoryMap).map(
//     ([name, value]) => ({
//       name,
//       value,
//     })
//   );

//   // SALES CHART
//   const salesData = [
//     { day: 'Mon', sales: 4000 },
//     { day: 'Tue', sales: 3000 },
//     { day: 'Wed', sales: 5000 },
//     { day: 'Thu', sales: 4500 },
//     { day: 'Fri', sales: 7000 },
//     { day: 'Sat', sales: 8200 },
//     { day: 'Sun', sales: 9200 },
//   ];

//   const COLORS = [
//     '#22c55e',
//     '#3b82f6',
//     '#ef4444',
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         Loading analytics...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-6">

//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900">
//           📈 Analytics Dashboard
//         </h1>

//         <p className="text-gray-500 mt-1">
//           Restaurant performance overview
//         </p>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

//         <div className="bg-white rounded-2xl shadow p-5">
//           <p className="text-sm text-gray-500">
//             Total Sales
//           </p>

//           <h2 className="text-3xl font-bold text-green-600 mt-2">
//             ₹{totalSales.toLocaleString()}
//           </h2>
//         </div>

//         <div className="bg-white rounded-2xl shadow p-5">
//           <p className="text-sm text-gray-500">
//             Total Orders
//           </p>

//           <h2 className="text-3xl font-bold text-blue-600 mt-2">
//             {totalOrders}
//           </h2>
//         </div>

//         <div className="bg-white rounded-2xl shadow p-5">
//           <p className="text-sm text-gray-500">
//             Customers
//           </p>

//           <h2 className="text-3xl font-bold text-purple-600 mt-2">
//             {totalUsers}
//           </h2>
//         </div>

//         <div className="bg-white rounded-2xl shadow p-5">
//           <p className="text-sm text-gray-500">
//             Avg Order Value
//           </p>

//           <h2 className="text-3xl font-bold text-orange-600 mt-2">
//             ₹{avgOrderValue}
//           </h2>
//         </div>
//       </div>

//       {/* CHARTS */}
//       <div className="grid lg:grid-cols-2 gap-6">

//         {/* SALES */}
//         <div className="bg-white rounded-2xl shadow p-5">

//           <h2 className="font-bold text-lg mb-4">
//             Weekly Sales
//           </h2>

//           <div className="h-[300px]">

//             <ResponsiveContainer
//               width="100%"
//               height="100%"
//             >

//               <LineChart data={salesData}>

//                 <CartesianGrid strokeDasharray="3 3" />

//                 <XAxis dataKey="day" />

//                 <YAxis />

//                 <Tooltip />

//                 <Line
//                   type="monotone"
//                   dataKey="sales"
//                   stroke="#3b82f6"
//                   strokeWidth={3}
//                 />

//               </LineChart>

//             </ResponsiveContainer>

//           </div>
//         </div>

//         {/* ORDER STATUS */}
//         <div className="bg-white rounded-2xl shadow p-5">

//           <h2 className="font-bold text-lg mb-4">
//             Order Status
//           </h2>

//           <div className="h-[300px]">

//             <ResponsiveContainer
//               width="100%"
//               height="100%"
//             >

//               <PieChart>

//                 <Pie
//                   data={orderStatusData}
//                   dataKey="value"
//                   outerRadius={100}
//                   label
//                 >

//                   {orderStatusData.map(
//                     (_, index) => (
//                       <Cell
//                         key={index}
//                         fill={COLORS[index]}
//                       />
//                     )
//                   )}

//                 </Pie>

//                 <Tooltip />

//               </PieChart>

//             </ResponsiveContainer>

//           </div>
//         </div>
//       </div>

//       {/* CATEGORY */}
//       <div className="bg-white rounded-2xl shadow p-5 mt-6">

//         <h2 className="font-bold text-lg mb-4">
//           Products By Category
//         </h2>

//         <div className="h-[350px]">

//           <ResponsiveContainer
//             width="100%"
//             height="100%"
//           >

//             <BarChart data={categoryData}>

//               <CartesianGrid strokeDasharray="3 3" />

//               <XAxis dataKey="name" />

//               <YAxis />

//               <Tooltip />

//               <Bar
//                 dataKey="value"
//                 fill="#8b5cf6"
//                 radius={[10, 10, 0, 0]}
//               />

//             </BarChart>

//           </ResponsiveContainer>

//         </div>
//       </div>

//       {/* EXTRA CARDS */}
//       <div className="grid md:grid-cols-3 gap-4 mt-6">

//         <div className="bg-white rounded-2xl shadow p-5">
//           <p className="text-gray-500 text-sm">
//             Completed Orders
//           </p>

//           <h2 className="text-3xl font-bold text-green-600 mt-2">
//             {
//               orders.filter(
//                 (o) => o.status === 'completed'
//               ).length
//             }
//           </h2>
//         </div>

//         <div className="bg-white rounded-2xl shadow p-5">
//           <p className="text-gray-500 text-sm">
//             Pending Orders
//           </p>

//           <h2 className="text-3xl font-bold text-yellow-500 mt-2">
//             {
//               orders.filter(
//                 (o) => o.status === 'pending'
//               ).length
//             }
//           </h2>
//         </div>

//         <div className="bg-white rounded-2xl shadow p-5">
//           <p className="text-gray-500 text-sm">
//             Cancelled Orders
//           </p>

//           <h2 className="text-3xl font-bold text-red-500 mt-2">
//             {
//               orders.filter(
//                 (o) => o.status === 'cancelled'
//               ).length
//             }
//           </h2>
//         </div>

//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';

import {
  collection,
  getDocs,
} from 'firebase/firestore';

import { db } from '@/lib/firebase';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

type Order = {
  id: string;
  total?: number;
  status?: string;
};

type Product = {
  id: string;
  category?: string;
};

type User = {
  id: string;
};

export default function AnalyticsPage() {

  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  // FETCH DATA
  const fetchAnalytics = async () => {
    try {

      // ORDERS
      const ordersSnapshot = await getDocs(
        collection(db, 'orders')
      );

      const ordersData = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];

      setOrders(ordersData);

      // PRODUCTS
      const productsSnapshot = await getDocs(
        collection(db, 'products')
      );

      const productsData = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      setProducts(productsData);

      // USERS
      const usersSnapshot = await getDocs(
        collection(db, 'users')
      );

      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];

      setUsers(usersData);

    } catch (error: unknown) {

      if (error instanceof Error) {
        console.error(error.message);
      }

    } finally {
      setLoading(false);
    }
  };

  // LOAD
  useEffect(() => {

    const loadData = async () => {
      await fetchAnalytics();
    };

    loadData();

  }, []);

  // TOTAL SALES
  const totalrevanue = orders.reduce(
    (acc, item) => acc + (item.total || 0),
    0
  );

  // TOTAL ORDERS
  const totalOrders = orders.length;

  // TOTAL USERS
  const totalUsers = users.length;

  // AVG ORDER VALUE
  const avgOrderValue =
    totalOrders > 0
      ? Math.round(totalrevanue / totalOrders)
      : 0;

  // ORDER STATUS
  const orderStatusData = [
    {
      name: 'Completed',
      value: orders.filter(
        (o) => o.status === 'completed'
      ).length,
    },

    {
      name: 'Pending',
      value: orders.filter(
        (o) => o.status === 'pending'
      ).length,
    },

    {
      name: 'Cancelled',
      value: orders.filter(
        (o) => o.status === 'cancelled'
      ).length,
    },
  ];

  // CATEGORY DATA
  const categoryMap: Record<string, number> = {};

  products.forEach((product) => {

    const category =
      product.category || 'Other';

    categoryMap[category] =
      (categoryMap[category] || 0) + 1;
  });

  const categoryData = Object.entries(categoryMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // SALES CHART
  const salesData = [
    { day: 'Mon', sales: 4000 },
    { day: 'Tue', sales: 3000 },
    { day: 'Wed', sales: 5000 },
    { day: 'Thu', sales: 4500 },
    { day: 'Fri', sales: 7000 },
    { day: 'Sat', sales: 8200 },
    { day: 'Sun', sales: 9200 },
  ];

  const COLORS = [
    '#22c55e',
    '#3b82f6',
    '#ef4444',
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-6 transition-colors">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          📈 Analytics Dashboard
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Restaurant performance overview
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Sales
          </p>

          <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
            ₹{totalrevanue.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Orders
          </p>

          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            {totalOrders}
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Customers
          </p>

          <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">
            {totalUsers}
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Avg Order Value
          </p>

          <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">
            ₹{avgOrderValue}
          </h2>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* SALES */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 border border-gray-200 dark:border-gray-700">

          <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
            Weekly Sales
          </h2>

          <div className="h-75 w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={salesData}>

                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

                <XAxis dataKey="day" stroke="#9ca3af" />

                <YAxis stroke="#9ca3af" />

                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} itemStyle={{ color: '#fff' }} />

                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>
        </div>

        {/* ORDER STATUS */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 border border-gray-200 dark:border-gray-700">

          <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
            Order Status
          </h2>

          <div className="h-87.5 w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >

                  {orderStatusData.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    )
                  )}

                </Pie>

                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} itemStyle={{ color: '#fff' }} />

              </PieChart>

            </ResponsiveContainer>

          </div>
        </div>
      </div>

      {/* CATEGORY */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 mt-6 border border-gray-200 dark:border-gray-700">

        <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
          Products By Category
        </h2>

        <div className="h-87.5 w-full">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart data={categoryData}>

              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

              <XAxis dataKey="name" stroke="#9ca3af" />

              <YAxis stroke="#9ca3af" />

              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} itemStyle={{ color: '#fff' }} />

              <Bar
                dataKey="value"
                fill="#8b5cf6"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>
      </div>

      {/* EXTRA CARDS */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Completed Orders
          </p>

          <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
            {
              orders.filter(
                (o) => o.status === 'completed'
              ).length
            }
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Pending Orders
          </p>

          <h2 className="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mt-2">
            {
              orders.filter(
                (o) => o.status === 'pending'
              ).length
            }
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Cancelled Orders
          </p>

          <h2 className="text-3xl font-bold text-red-500 dark:text-red-400 mt-2">
            {
              orders.filter(
                (o) => o.status === 'cancelled'
              ).length
            }
          </h2>
        </div>

      </div>
    </div>
  );
}