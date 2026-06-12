// "use client";

// import { useEffect, useMemo, useState } from "react";
// import {
//   collection,
//   onSnapshot,
//   QuerySnapshot,
//   DocumentData,
//   Timestamp,
// } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// interface User {
//   id: string;
//   name?: string;
//   email?: string;
//   phone?: string;
//   tableNumber?: string | null;
//   totalOrders?: number;
//   createdAt?: Timestamp;      // ✅ Added
//   lastLoginAt?: Timestamp;    // ✅ Added
// }

// export default function AdminUsersPage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       collection(db, "users"),
//       (snapshot: QuerySnapshot<DocumentData>) => {
//         const usersData: User[] = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setUsers(usersData);
//         setLoading(false);
//       },
//       (error) => {
//         console.error("Users fetch error:", error);
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   const filteredUsers = useMemo(() => {
//     return users.filter((user) => {
//       const query = search.toLowerCase();
//       return (
//         user.name?.toLowerCase().includes(query) ||
//         user.email?.toLowerCase().includes(query) ||
//         user.phone?.toLowerCase().includes(query) ||
//         user.tableNumber?.toLowerCase().includes(query)
//       );
//     });
//   }, [users, search]);

//   // ✅ Fixed formatDate with correct Timestamp type
//   const formatDate = (timestamp?: Timestamp) => {
//     if (!timestamp) return "-";
//     try {
//       return timestamp.toDate().toLocaleDateString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       });
//     } catch {
//       return "-";
//     }
//   };

//   const totalUsers = users.length;
//   const assignedTables = users.filter(
//     (u) => u.tableNumber && u.tableNumber.trim() !== ""
//   ).length;

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-6 transition-colors">

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             👥 Users Management
//           </h1>
//           <p className="text-gray-500 dark:text-gray-400 mt-1">
//             Monitor restaurant users and QR table customers.
//           </p>
//         </div>
//         <div className="flex flex-wrap gap-2 text-sm font-semibold">
//           <span className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 px-4 py-2 rounded-xl border border-orange-200 dark:border-orange-800">
//             Total Users: {totalUsers}
//           </span>
//           <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-2 rounded-xl border border-blue-200 dark:border-blue-800">
//             Tables: {assignedTables}
//           </span>
//         </div>
//       </div>

//       {/* SEARCH BAR */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="🔍 Search by name, email, phone or table..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 text-base font-semibold shadow-sm transition"
//         />
//       </div>

//       {/* LOADING */}
//       {loading && (
//         <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow p-10 text-center">
//           <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
//             Loading users...
//           </p>
//         </div>
//       )}

//       {/* EMPTY */}
//       {!loading && filteredUsers.length === 0 && (
//         <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow p-10 text-center">
//           <p className="text-gray-500 dark:text-gray-400 font-medium">
//             No matching users found.
//           </p>
//         </div>
//       )}

//       {/* USERS DATA */}
//       {!loading && filteredUsers.length > 0 && (
//         <>
//           {/* DESKTOP TABLE */}
//           <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden border border-gray-200 dark:border-gray-700">
//             <table className= "w-full">
//               <thead className="bg-gray-50 dark:bg-gray-700">
//                 <tr className="text-gray-600 dark:text-gray-300 text-sm font-bold">
//                   <th className="text-left px-6 py-4">Name</th>
//                   <th className="text-left px-6 py-4">Email</th>
//                   <th className="text-left px-6 py-4">Phone</th>
//                   <th className="text-left px-6 py-4">Table</th>
//                   <th className="text-left px-6 py-4">Total Orders</th>
//                   <th className="text-left px-6 py-4">Joined</th>
//                   <th className="text-left px-6 py-4">Last Login</th>  {/* ✅ New */}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
//                 {filteredUsers.map((user) => (
//                   <tr
//                     key={user.id}
//                     className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
//                   >
//                     <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
//                       {user.name || "-"}
//                     </td>
//                     <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
//                       {user.email || "-"}
//                     </td>
//                     <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
//                       {user.phone || "-"}
//                     </td>
//                     <td className="px-6 py-4">
//                       {user.tableNumber ? (
//                         <span className="bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 text-xs font-bold px-2.5 py-1 rounded-lg border border-orange-200 dark:border-orange-800">
//                           Table {user.tableNumber}
//                         </span>
//                       ) : (
//                         <span className="text-gray-400 italic text-sm">Not Assigned</span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">
//                       {user.totalOrders || 0} Orders
//                     </td>
//                     <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
//                       {formatDate(user.createdAt)}   {/* ✅ Joining date */}
//                     </td>
//                     <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-medium">
//                       {formatDate(user.lastLoginAt)}  {/* ✅ Last login */}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* MOBILE CARDS */}
//           <div className="grid gap-4 lg:hidden">
//             {filteredUsers.map((user) => (
//               <div
//                 key={user.id}
//                 className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow p-5"
//               >
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h2 className="text-lg font-bold text-gray-900 dark:text-white">
//                       {user.name || "-"}
//                     </h2>
//                     <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 break-all">
//                       {user.email || "-"}
//                     </p>
//                   </div>
//                   <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold px-3 py-1 rounded-xl">
//                     {user.totalOrders || 0} Orders
//                   </div>
//                 </div>
//                 <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300 font-medium">
//                   <p>📞 Phone: {user.phone || "-"}</p>
//                   <p>
//                     🍽️ Table:{" "}
//                     {user.tableNumber ? (
//                       <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-0.5 rounded-md">
//                         {user.tableNumber}
//                       </span>
//                     ) : (
//                       <span className="text-gray-400 italic">None</span>
//                     )}
//                   </p>
//                   <p>📅 Joined: {formatDate(user.createdAt)}</p>
//                   <p>🕐 Last Login: {formatDate(user.lastLoginAt)}</p>  {/* ✅ */}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface User {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  tableNumber?: string | null;
  totalOrders?: number;
  createdAt?: Timestamp;
  lastLoginAt?: Timestamp;
}

interface Order {
  id: string;
  userId?: string;
  status?: string;
  createdAt?: Timestamp;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]); // ✅ Real-time orders
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ✅ Users real-time listener
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const usersData: User[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
        setLoading(false);
      },
      (error) => {
        console.error("Users fetch error:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // ✅ Orders real-time listener — har order track karo
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const ordersData: Order[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      },
      (error) => {
        console.error("Orders fetch error:", error);
      }
    );
    return () => unsubscribe();
  }, []);

  // ✅ Har user ke liye real-time order count nikalo
  const getUserOrderCount = (userId: string) => {
    return orders.filter((order) => order.userId === userId).length;
  };

  // ✅ Total orders across all users
  const totalOrdersCount = orders.length;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const query = search.toLowerCase();
      return (
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.phone?.toLowerCase().includes(query) ||
        user.tableNumber?.toLowerCase().includes(query)
      );
    });
  }, [users, search]);

  const formatDate = (timestamp?: Timestamp) => {
    if (!timestamp) return "-";
    try {
      return timestamp.toDate().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  const totalUsers = users.length;
  const assignedTables = users.filter(
    (u) => u.tableNumber && u.tableNumber.trim() !== ""
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-6 transition-colors">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            👥 Users Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Monitor restaurant users and QR table customers.
          </p>
        </div>

        {/* ✅ STATS BADGES — real-time counts */}
        <div className="flex flex-wrap gap-2 text-sm font-semibold">
          <span className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 px-4 py-2 rounded-xl border border-orange-200 dark:border-orange-800">
            👤 Total Users: {totalUsers}
          </span>
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-2 rounded-xl border border-blue-200 dark:border-blue-800">
            🍽️ Tables: {assignedTables}
          </span>
          {/* ✅ Real-time total orders badge */}
          <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-4 py-2 rounded-xl border border-green-200 dark:border-green-800">
            🛒 Total Orders: {totalOrdersCount}
          </span>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search by name, email, phone or table..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 text-base font-semibold shadow-sm transition"
        />
      </div>

      {/* LOADING */}
      {loading && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow p-10 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
            Loading users...
          </p>
        </div>
      )}

      {/* EMPTY */}
      {!loading && filteredUsers.length === 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow p-10 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            No matching users found.
          </p>
        </div>
      )}

      {/* USERS DATA */}
      {!loading && filteredUsers.length > 0 && (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden border border-gray-200 dark:border-gray-700">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr className="text-gray-600 dark:text-gray-300 text-sm font-bold">
                  <th className="text-left px-6 py-4">Name</th>
                  <th className="text-left px-6 py-4">Email</th>
                  <th className="text-left px-6 py-4">Phone</th>
                  <th className="text-left px-6 py-4">Table</th>
                  {/* ✅ Real-time orders column */}
                  <th className="text-left px-6 py-4">Total Orders</th>
                  <th className="text-left px-6 py-4">Joined</th>
                  <th className="text-left px-6 py-4">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredUsers.map((user) => {
                  const orderCount = getUserOrderCount(user.id); // ✅ real-time
                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                    >
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                        {user.name || "-"}
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
                        {user.email || "-"}
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
                        {user.phone || "-"}
                      </td>
                      <td className="px-6 py-4">
                        {user.tableNumber ? (
                          <span className="bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 text-xs font-bold px-2.5 py-1 rounded-lg border border-orange-200 dark:border-orange-800">
                            Table {user.tableNumber}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic text-sm">
                            Not Assigned
                          </span>
                        )}
                      </td>

                      {/* ✅ Real-time order count with badge */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border ${
                            orderCount > 0
                              ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                              : "bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600"
                          }`}
                        >
                          🛒 {orderCount} Orders
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-medium">
                        {formatDate(user.lastLoginAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="grid gap-4 lg:hidden">
            {filteredUsers.map((user) => {
              const orderCount = getUserOrderCount(user.id); // ✅ real-time
              return (
                <div
                  key={user.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow p-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {user.name || "-"}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 break-all">
                        {user.email || "-"}
                      </p>
                    </div>

                    {/* ✅ Real-time order badge on mobile */}
                    <div
                      className={`text-sm font-bold px-3 py-1 rounded-xl border ${
                        orderCount > 0
                          ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                          : "bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-700 dark:text-gray-400"
                      }`}
                    >
                      🛒 {orderCount} Orders
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300 font-medium">
                    <p>📞 Phone: {user.phone || "-"}</p>
                    <p>
                      🍽️ Table:{" "}
                      {user.tableNumber ? (
                        <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-0.5 rounded-md">
                          {user.tableNumber}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">None</span>
                      )}
                    </p>
                    <p>📅 Joined: {formatDate(user.createdAt)}</p>
                    <p>🕐 Last Login: {formatDate(user.lastLoginAt)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}