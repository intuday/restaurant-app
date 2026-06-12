// // 'use client';

// // import Link from 'next/link';
// // import { usePathname, useRouter } from 'next/navigation';
// // import { useState, useEffect } from 'react';
// // import { useAuth } from '../context/AuthContext'; // ✅ Correct relative path

// // type NavItem = {
// //   label: string;
// //   href: string;
// //   icon: React.ReactNode;
// // };

// // const navItems: NavItem[] = [
// //   { label: 'Dashboard', href: '/admin', icon: '📊' },
// //   { label: 'Orders', href: '/admin/orders', icon: '🧾' },
// //   { label: 'Menu', href: '/admin/products', icon: '🍔' },
// //   { label: 'Categories', href: '/admin/categories', icon: '🏷️' },
// //   { label: 'Tables', href: '/admin/table', icon: '🪑' },
// //   { label: 'Reservations', href: '/admin/reservation', icon: '📅' },
// //   { label: 'Staff', href: '/admin/staff', icon: '👥' },
// //   { label: 'Promotions', href: '/admin/promotions', icon: '🎁' },
// //   { label: 'Analytics', href: '/admin/analytics', icon: '📈' },
// //   { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
// // ];

// // export default function AdminLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   const [open, setOpen] = useState(false);
// //   const [hovered, setHovered] = useState(false);

// //   const pathname = usePathname();
// //   const router = useRouter();
// //   const { user, isAdmin, loading, userData } = useAuth(); // ✅ Get auth state

// //   // ✅ PROTECT ADMIN ROUTES
// //   useEffect(() => {
// //     if (!loading) {
// //       if (!user) {
// //         // ❌ Not logged in → redirect to login
// //         router.replace('/login');
// //       } else if (isAdmin === false) {
// //         // ❌ Logged in but not admin → redirect to home
// //         alert('⚠️ Access Denied: Admin privileges required');
// //         router.replace('/');
// //       }
// //     }
// //   }, [user, isAdmin, loading, router]);

// //   // ✅ SHOW LOADING WHILE CHECKING AUTH
// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// //         <div className="text-center">
// //           <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-600 font-semibold">Verifying access...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ✅ BLOCK RENDERING IF NOT ADMIN
// //   if (!user || isAdmin !== true) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// //         <div className="text-center">
// //           <span className="text-6xl mb-4 block">🚫</span>
// //           <h2 className="text-2xl font-bold text-gray-800 mb-2">
// //             Access Denied
// //           </h2>
// //           <p className="text-gray-600">Redirecting...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const isActive = (href: string) => {
// //     if (href === '/admin') return pathname === '/admin';
// //     return pathname?.startsWith(href);
// //   };

// //   const NavLink = ({
// //     item,
// //     expanded,
// //   }: {
// //     item: NavItem;
// //     expanded: boolean;
// //   }) => {
// //     const active = isActive(item.href);

// //     return (
// //       <Link
// //         href={item.href}
// //         onClick={() => setOpen(false)}
// //         title={!expanded ? item.label : undefined}
// //         className={`
// //           group relative flex items-center
// //           gap-3 px-4 py-3 rounded-2xl
// //           transition-all duration-300

// //           ${
// //             active
// //               ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
// //               : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
// //           }
// //         `}
// //       >

// //         {/* ACTIVE BAR */}
// //         <span
// //           className={`
// //             absolute left-0 top-1/2 -translate-y-1/2
// //             h-8 w-1 rounded-r-full transition-all duration-300

// //             ${
// //               active
// //                 ? 'bg-white'
// //                 : 'bg-orange-500 opacity-0 group-hover:opacity-100'
// //             }
// //           `}
// //         />

// //         {/* ICON */}
// //         <span
// //           className={`
// //             text-lg shrink-0 transition-all duration-300
// //             ${!active ? 'group-hover:scale-110' : ''}
// //           `}
// //         >
// //           {item.icon}
// //         </span>

// //         {/* LABEL */}
// //         <span
// //           className={`
// //             whitespace-nowrap overflow-hidden
// //             transition-all duration-300 font-semibold text-sm

// //             ${
// //               expanded
// //                 ? 'opacity-100 w-auto'
// //                 : 'opacity-0 w-0'
// //             }
// //           `}
// //         >
// //           {item.label}
// //         </span>

// //       </Link>
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen flex bg-gray-50">

// //       {/* DESKTOP SIDEBAR */}
// //       <aside
// //         className={`
// //           hidden md:flex flex-col
// //           bg-white border-r border-gray-200
// //           shadow-sm
// //           transition-all duration-300 ease-in-out

// //           ${hovered ? 'w-72' : 'w-20'}
// //         `}
// //         onMouseEnter={() => setHovered(true)}
// //         onMouseLeave={() => setHovered(false)}
// //       >

// //         {/* BRAND */}
// //         <div
// //           className={`
// //             px-4 py-5 border-b border-gray-100
// //             flex items-center

// //             ${hovered ? 'justify-start gap-3' : 'justify-center'}
// //           `}
// //         >

// //           <Link href="/admin" className="flex items-center gap-3">

// //             {/* LOGO */}
// //             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-2xl shadow-lg shrink-0">
// //               🍽️
// //             </div>

// //             {/* BRAND TEXT */}
// //             <div
// //               className={`
// //                 overflow-hidden transition-all duration-300

// //                 ${
// //                   hovered
// //                     ? 'opacity-100 w-auto'
// //                     : 'opacity-0 w-0'
// //                 }
// //               `}
// //             >

// //               <h1 className="text-lg font-bold text-gray-900 whitespace-nowrap">
// //                 Restaurant Admin
// //               </h1>

// //               <p className="text-xs text-gray-500 whitespace-nowrap">
// //                 Manage your business
// //               </p>

// //             </div>

// //           </Link>

// //         </div>

// //         {/* NAVIGATION */}
// //         <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">
// //           {navItems.map((item) => (
// //             <NavLink
// //               key={item.href}
// //               item={item}
// //               expanded={hovered}
// //             />
// //           ))}
// //         </nav>

// //         {/* USER - ✅ NOW SHOWS REAL ADMIN DATA */}
// //         <div className="px-3 py-4 border-t border-gray-100">

// //           <div
// //             className={`
// //               flex items-center rounded-2xl
// //               bg-gray-50 p-3 transition-all duration-300

// //               ${hovered ? 'gap-3' : 'justify-center'}
// //             `}
// //           >

// //             {/* AVATAR */}
// //             {userData?.photoURL ? (
// //               <img
// //                 src={userData.photoURL}
// //                 alt={userData.name || 'Admin'}
// //                 className="h-10 w-10 rounded-full object-cover shadow-md shrink-0"
// //               />
// //             ) : (
// //               <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold shadow-md shrink-0">
// //                 {userData?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'A'}
// //               </div>
// //             )}

// //             {/* USER INFO */}
// //             <div
// //               className={`
// //                 overflow-hidden transition-all duration-300

// //                 ${
// //                   hovered
// //                     ? 'opacity-100 w-auto'
// //                     : 'opacity-0 w-0'
// //                 }
// //               `}
// //             >

// //               <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
// //                 {userData?.name || 'Admin User'}
// //               </p>

// //               <p className="text-xs text-gray-500 whitespace-nowrap">
// //                 {user?.email || 'admin@restaurant.com'}
// //               </p>

// //             </div>

// //             {/* SETTINGS */}
// //             <Link
// //               href="/admin/settings"
// //               className={`
// //                 text-gray-400 hover:text-orange-500
// //                 transition-all duration-300 shrink-0

// //                 ${
// //                   hovered
// //                     ? 'opacity-100'
// //                     : 'opacity-0 w-0 overflow-hidden'
// //                 }
// //               `}
// //             >
// //               ⚙️
// //             </Link>

// //           </div>

// //         </div>

// //       </aside>

// //       {/* MOBILE TOP BAR */}
// //       <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3">

// //         <button
// //           onClick={() => setOpen(true)}
// //           className="text-2xl text-gray-700 p-1"
// //         >
// //           ☰
// //         </button>

// //         <Link href="/admin" className="flex items-center gap-2">

// //           <span className="text-xl">🍽️</span>

// //           <span className="font-bold text-gray-900">
// //             Admin
// //           </span>

// //         </Link>

// //         <div className="w-8" />

// //       </div>

// //       {/* MOBILE SIDEBAR */}
// //       {open && (
// //         <div className="fixed inset-0 z-50 md:hidden">

// //           {/* BACKDROP */}
// //           <div
// //             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
// //             onClick={() => setOpen(false)}
// //           />

// //           {/* SIDEBAR */}
// //           <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl flex flex-col">

// //             {/* HEADER */}
// //             <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

// //               <Link
// //                 href="/admin"
// //                 onClick={() => setOpen(false)}
// //                 className="flex items-center gap-3"
// //               >

// //                 <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xl">
// //                   🍽️
// //                 </div>

// //                 <div>

// //                   <h1 className="text-lg font-bold text-gray-900">
// //                     Restaurant Admin
// //                   </h1>

// //                   <p className="text-xs text-gray-500">
// //                     Manage your business
// //                   </p>

// //                 </div>

// //               </Link>

// //               <button
// //                 onClick={() => setOpen(false)}
// //                 className="text-xl text-gray-500 hover:text-gray-700"
// //               >
// //                 ✕
// //               </button>

// //             </div>

// //             {/* NAVIGATION */}
// //             <nav className="flex-1 px-4 py-5 space-y-2 overflow-y-auto">
// //               {navItems.map((item) => (
// //                 <NavLink
// //                   key={item.href}
// //                   item={item}
// //                   expanded={true}
// //                 />
// //               ))}
// //             </nav>

// //             {/* USER - ✅ NOW SHOWS REAL ADMIN DATA */}
// //             <div className="px-4 py-4 border-t border-gray-100">

// //               <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">

// //                 {userData?.photoURL ? (
// //                   <img
// //                     src={userData.photoURL}
// //                     alt={userData.name || 'Admin'}
// //                     className="h-10 w-10 rounded-full object-cover shadow-md"
// //                   />
// //                 ) : (
// //                   <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
// //                     {userData?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'A'}
// //                   </div>
// //                 )}

// //                 <div className="flex-1 min-w-0">

// //                   <p className="text-sm font-semibold text-gray-900 truncate">
// //                     {userData?.name || 'Admin User'}
// //                   </p>

// //                   <p className="text-xs text-gray-500 truncate">
// //                     {user?.email || 'admin@restaurant.com'}
// //                   </p>

// //                 </div>

// //                 <Link
// //                   href="/admin/settings"
// //                   onClick={() => setOpen(false)}
// //                   className="text-gray-400 hover:text-orange-500 transition"
// //                 >
// //                   ⚙️
// //                 </Link>

// //               </div>

// //             </div>

// //           </div>

// //         </div>
// //       )}

// //       {/* MAIN CONTENT */}
// //       <main className="flex-1 min-w-0">

// //         <div className="md:hidden h-16" />

// //         <div className="p-4 md:p-8">
// //           {children}
// //         </div>

// //       </main>

// //     </div>
// //   );
// // }
// // // 'use client';

// // // import Link from 'next/link';
// // // import { usePathname } from 'next/navigation';
// // // import { useState } from 'react';

// // // type NavItem = {
// // //   label: string;
// // //   href: string;
// // //   icon: React.ReactNode;
// // // };

// // // const navItems: NavItem[] = [
// // //   { label: 'Dashboard', href: '/admin', icon: '📊' },
// // //   { label: 'Orders', href: '/admin/orders', icon: '🧾' },
// // //   { label: 'Menu', href: '/admin/products', icon: '🍔' },
// // //   { label: 'Categories', href: '/admin/categories', icon: '🏷️' },
// // //   { label: 'Tables', href: '/admin/table', icon: '🪑' },
// // //   { label: 'Reservations', href: '/admin/reservation', icon: '📅' },
// // //   { label: 'Staff', href: '/admin/staff', icon: '👥' },
// // //   { label: 'Promotions', href: '/admin/promotions', icon: '🎁' },
// // //   { label: 'Analytics', href: '/admin/analytics', icon: '📈' },
// // //   { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
// // // ];

// // // export default function AdminLayout({
// // //   children,
// // // }: {
// // //   children: React.ReactNode;
// // // }) {
// // //   const [open, setOpen] = useState(false);
// // //   const [hovered, setHovered] = useState(false);

// // //   const pathname = usePathname();

// // //   const isActive = (href: string) => {
// // //     if (href === '/admin') return pathname === '/admin';
// // //     return pathname?.startsWith(href);
// // //   };

// // //   const NavLink = ({
// // //     item,
// // //     expanded,
// // //   }: {
// // //     item: NavItem;
// // //     expanded: boolean;
// // //   }) => {
// // //     const active = isActive(item.href);

// // //     return (
// // //       <Link
// // //         href={item.href}
// // //         onClick={() => setOpen(false)}
// // //         title={!expanded ? item.label : undefined}
// // //         className={`
// // //           group relative flex items-center
// // //           gap-3 px-4 py-3 rounded-2xl
// // //           transition-all duration-300

// // //           ${
// // //             active
// // //               ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
// // //               : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
// // //           }
// // //         `}
// // //       >

// // //         {/* ACTIVE BAR */}
// // //         <span
// // //           className={`
// // //             absolute left-0 top-1/2 -translate-y-1/2
// // //             h-8 w-1 rounded-r-full transition-all duration-300

// // //             ${
// // //               active
// // //                 ? 'bg-white'
// // //                 : 'bg-orange-500 opacity-0 group-hover:opacity-100'
// // //             }
// // //           `}
// // //         />

// // //         {/* ICON */}
// // //         <span
// // //           className={`
// // //             text-lg shrink-0 transition-all duration-300
// // //             ${!active ? 'group-hover:scale-110' : ''}
// // //           `}
// // //         >
// // //           {item.icon}
// // //         </span>

// // //         {/* LABEL */}
// // //         <span
// // //           className={`
// // //             whitespace-nowrap overflow-hidden
// // //             transition-all duration-300 font-semibold text-sm

// // //             ${
// // //               expanded
// // //                 ? 'opacity-100 w-auto'
// // //                 : 'opacity-0 w-0'
// // //             }
// // //           `}
// // //         >
// // //           {item.label}
// // //         </span>

// // //       </Link>
// // //     );
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex bg-gray-50">

// // //       {/* DESKTOP SIDEBAR */}
// // //       <aside
// // //         className={`
// // //           hidden md:flex flex-col
// // //           bg-white border-r border-gray-200
// // //           shadow-sm
// // //           transition-all duration-300 ease-in-out

// // //           ${hovered ? 'w-72' : 'w-20'}
// // //         `}
// // //         onMouseEnter={() => setHovered(true)}
// // //         onMouseLeave={() => setHovered(false)}
// // //       >

// // //         {/* BRAND */}
// // //         <div
// // //           className={`
// // //             px-4 py-5 border-b border-gray-100
// // //             flex items-center

// // //             ${hovered ? 'justify-start gap-3' : 'justify-center'}
// // //           `}
// // //         >

// // //           <Link href="/admin" className="flex items-center gap-3">

// // //             {/* LOGO */}
// // //             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-red-950black-500 flex items-center justify-center text-white text-2xl shadow-lg shrink-0">
// // //               🍽️
// // //             </div>

// // //             {/* BRAND TEXT */}
// // //             <div
// // //               className={`
// // //                 overflow-hidden transition-all duration-300

// // //                 ${
// // //                   hovered
// // //                     ? 'opacity-100 w-auto'
// // //                     : 'opacity-0 w-0'
// // //                 }
// // //               `}
// // //             >

// // //               <h1 className="text-lg font-bold text-gray-900 whitespace-nowrap">
// // //                 Restaurant Admin
// // //               </h1>

// // //               <p className="text-xs text-gray-500 whitespace-nowrap">
// // //                 Manage your business
// // //               </p>

// // //             </div>

// // //           </Link>

// // //         </div>

// // //         {/* NAVIGATION */}
// // //         <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">
// // //           {navItems.map((item) => (
// // //             <NavLink
// // //               key={item.href}
// // //               item={item}
// // //               expanded={hovered}
// // //             />
// // //           ))}
// // //         </nav>

// // //         {/* USER */}
// // //         <div className="px-3 py-4 border-t border-gray-100">

// // //           <div
// // //             className={`
// // //               flex items-center rounded-2xl
// // //               bg-gray-50 p-3 transition-all duration-300

// // //               ${hovered ? 'gap-3' : 'justify-center'}
// // //             `}
// // //           >

// // //             {/* AVATAR */}
// // //             <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold shadow-md shrink-0">
// // //               A
// // //             </div>

// // //             {/* USER INFO */}
// // //             <div
// // //               className={`
// // //                 overflow-hidden transition-all duration-300

// // //                 ${
// // //                   hovered
// // //                     ? 'opacity-100 w-auto'
// // //                     : 'opacity-0 w-0'
// // //                 }
// // //               `}
// // //             >

// // //               <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
// // //                 Admin User
// // //               </p>

// // //               <p className="text-xs text-gray-500 whitespace-nowrap">
// // //                 admin@restaurant.com
// // //               </p>

// // //             </div>

// // //             {/* SETTINGS */}
// // //             <Link
// // //               href="/admin/settings"
// // //               className={`
// // //                 text-gray-400 hover:text-orange-500
// // //                 transition-all duration-300 shrink-0

// // //                 ${
// // //                   hovered
// // //                     ? 'opacity-100'
// // //                     : 'opacity-0 w-0 overflow-hidden'
// // //                 }
// // //               `}
// // //             >
// // //               ⚙️
// // //             </Link>

// // //           </div>

// // //         </div>

// // //       </aside>

// // //       {/* MOBILE TOP BAR */}
// // //       <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3">

// // //         <button
// // //           onClick={() => setOpen(true)}
// // //           className="text-2xl text-gray-700 p-1"
// // //         >
// // //           ☰
// // //         </button>

// // //         <Link href="/admin" className="flex items-center gap-2">

// // //           <span className="text-xl">🍽️</span>

// // //           <span className="font-bold text-gray-900">
// // //             Admin
// // //           </span>

// // //         </Link>

// // //         <div className="w-8" />

// // //       </div>

// // //       {/* MOBILE SIDEBAR */}
// // //       {open && (
// // //         <div className="fixed inset-0 z-50 md:hidden">

// // //           {/* BACKDROP */}
// // //           <div
// // //             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
// // //             onClick={() => setOpen(false)}
// // //           />

// // //           {/* SIDEBAR */}
// // //           <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl flex flex-col">

// // //             {/* HEADER */}
// // //             <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

// // //               <Link
// // //                 href="/admin"
// // //                 onClick={() => setOpen(false)}
// // //                 className="flex items-center gap-3"
// // //               >

// // //                 <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-500 flex items-center justify-center text-white text-xl">
// // //                   🍽️
// // //                 </div>

// // //                 <div>

// // //                   <h1 className="text-lg font-bold text-gray-900">
// // //                     Restaurant Admin
// // //                   </h1>

// // //                   <p className="text-xs text-gray-500">
// // //                     Manage your business
// // //                   </p>

// // //                 </div>

// // //               </Link>

// // //               <button
// // //                 onClick={() => setOpen(false)}
// // //                 className="text-xl text-gray-500 hover:text-gray-700"
// // //               >
// // //                 ✕
// // //               </button>

// // //             </div>

// // //             {/* NAVIGATION */}
// // //             <nav className="flex-1 px-4 py-5 space-y-2 overflow-y-auto">
// // //               {navItems.map((item) => (
// // //                 <NavLink
// // //                   key={item.href}
// // //                   item={item}
// // //                   expanded={true}
// // //                 />
// // //               ))}
// // //             </nav>

// // //             {/* USER */}
// // //             <div className="px-4 py-4 border-t border-gray-100">

// // //               <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">

// // //                 <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
// // //                   A
// // //                 </div>

// // //                 <div className="flex-1 min-w-0">

// // //                   <p className="text-sm font-semibold text-gray-900 truncate">
// // //                     Admin User
// // //                   </p>

// // //                   <p className="text-xs text-gray-500 truncate">
// // //                     admin@restaurant.com
// // //                   </p>

// // //                 </div>

// // //                 <Link
// // //                   href="/admin/settings"
// // //                   onClick={() => setOpen(false)}
// // //                   className="text-gray-400 hover:text-orange-500 transition"
// // //                 >
// // //                   ⚙️
// // //                 </Link>

// // //               </div>

// // //             </div>

// // //           </div>

// // //         </div>
// // //       )}

// // //       {/* MAIN CONTENT */}
// // //       <main className="flex-1 min-w-0">

// // //         <div className="md:hidden h-16" />

// // //         <div className="p-4 md:p-8">
// // //           {children}
// // //         </div>

// // //       </main>

// // //     </div>
// // //   );
// // // }
// // // // 'use client';

// // // // import Link from 'next/link';
// // // // import { useState } from 'react';

// // // // export default function AdminLayout({
// // // //   children,
// // // // }: {
// // // //   children: React.ReactNode;
// // // // }) {
// // // //   const [open, setOpen] = useState(false);

// // // //   return (
// // // //     <div className="min-h-screen flex bg-gray-100">

// // // //       {/* DESKTOP SIDEBAR */}
// // // //       <aside className="hidden md:flex w-64 bg-white shadow-lg flex-col p-5">
// // // //         <h1 className="text-xl font-bold text-orange-600 mb-6">
// // // //           🍕 Admin Panel
// // // //         </h1>

// // // //         <nav className="space-y-3 text-sm">
// // // //           <Link className="block p-2 rounded hover:bg-orange-50" href="/admin">
// // // //             Dashboard
// // // //           </Link>

// // // //           <Link className="block p-2 rounded hover:bg-orange-50" href="/admin/orders">
// // // //             Orders
// // // //           </Link>

// // // //           <Link className="block p-2 rounded hover:bg-orange-50" href="/admin/add-product">
// // // //             Add Product
// // // //           </Link>
// // // //         </nav>
// // // //       </aside>

// // // //       {/* MOBILE TOP BAR */}
// // // //       <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow flex items-center justify-between p-4">
// // // //         <button onClick={() => setOpen(true)} className="text-2xl">
// // // //           ☰
// // // //         </button>

// // // //         <span className="font-bold text-orange-600">Admin</span>
// // // //       </div>

// // // //       {/* MOBILE OVERLAY + SIDEBAR */}
// // // //       {open && (
// // // //         <div className="fixed inset-0 z-50 md:hidden">
          
// // // //           {/* BACKDROP */}
// // // //           <div
// // // //             className="absolute inset-0 bg-black/50"
// // // //             onClick={() => setOpen(false)}
// // // //           />

// // // //           {/* SIDEBAR */}
// // // //           <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg p-5">
            
// // // //             <h1 className="text-xl font-bold text-orange-600 mb-6">
// // // //               🍕 Admin Panel
// // // //             </h1>

// // // //             <nav className="space-y-3 text-sm">
// // // //               <Link
// // // //                 href="/admin"
// // // //                 onClick={() => setOpen(false)}
// // // //                 className="block p-2 rounded hover:bg-orange-50"
// // // //               >
// // // //                 Dashboard
// // // //               </Link>

// // // //               <Link
// // // //                 href="/admin/orders"
// // // //                 onClick={() => setOpen(false)}
// // // //                 className="block p-2 rounded hover:bg-orange-50"
// // // //               >
// // // //                 Orders
// // // //               </Link>

// // // //               <Link
// // // //                 href="/admin/add-product"
// // // //                 onClick={() => setOpen(false)}
// // // //                 className="block p-2 rounded hover:bg-orange-50"
// // // //               >
// // // //                 Add Product
// // // //               </Link>
// // // //             </nav>

// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* MAIN CONTENT */}
// // // //       <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
// // // //         {children}
// // // //       </main>

// // // //     </div>
// // // //   );
// // // // }  
// // // // 'use client';

// // // // import Link from 'next/link';
// // // // import { usePathname } from 'next/navigation';
// // // // import { useState } from 'react';

// // // // // ---- MENU CONFIG (easy to extend) ----
// // // // const navItems = [
// // // //   { href: '/admin', label: 'Dashboard', icon: '📊' },
// // // //   { href: '/admin/orders', label: 'Orders', icon: '🧾', badge: 5 },
// // // //   { href: '/admin/menu', label: 'Menu Items', icon: '🍕' },
// // // //   { href: '/admin/add-product', label: 'Add Product', icon: '➕' },
// // // //   { href: '/admin/categories', label: 'Categories', icon: '🗂️' },
// // // //   { href: '/admin/customers', label: 'Customers', icon: '👥' },
// // // //   { href: '/admin/reservations', label: 'Reservations', icon: '📅', badge: 2 },
// // // //   { href: '/admin/reviews', label: 'Reviews', icon: '⭐' },
// // // //   { href: '/admin/coupons', label: 'Coupons', icon: '🎟️' },
// // // //   { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
// // // //   { href: '/admin/staff', label: 'Staff', icon: '👨‍🍳' },
// // // //   { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
// // // // ];

// // // // export default function AdminLayout({
// // // //   children,
// // // // }: {
// // // //   children: React.ReactNode;
// // // // }) {
// // // //   const [open, setOpen] = useState(false);
// // // //   const [notifOpen, setNotifOpen] = useState(false);
// // // //   const pathname = usePathname();

// // // //   // ---- Reusable Nav List ----
// // // //   const NavLinks = ({ onClick }: { onClick?: () => void }) => (
// // // //     <nav className="space-y-1 text-sm">
// // // //       {navItems.map((item) => {
// // // //         const active = pathname === item.href;
// // // //         return (
// // // //           <Link
// // // //             key={item.href}
// // // //             href={item.href}
// // // //             onClick={onClick}
// // // //             className={`flex items-center justify-between p-2.5 rounded-lg transition-colors ${
// // // //               active
// // // //                 ? 'bg-orange-600 text-white shadow'
// // // //                 : 'text-gray-700 hover:bg-orange-50'
// // // //             }`}
// // // //           >
// // // //             <span className="flex items-center gap-3">
// // // //               <span className="text-base">{item.icon}</span>
// // // //               {item.label}
// // // //             </span>
// // // //             {item.badge && (
// // // //               <span
// // // //                 className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
// // // //                   active ? 'bg-white text-orange-600' : 'bg-orange-600 text-white'
// // // //                 }`}
// // // //               >
// // // //                 {item.badge}
// // // //               </span>
// // // //             )}
// // // //           </Link>
// // // //         );
// // // //       })}
// // // //     </nav>
// // // //   );

// // // //   // ---- Sidebar Header (logo) ----
// // // //   const SidebarHeader = () => (
// // // //     <div className="mb-6">
// // // //       <h1 className="text-xl font-bold text-orange-600 flex items-center gap-2">
// // // //         🍕 <span>Restaurant Admin</span>
// // // //       </h1>
// // // //       <p className="text-xs text-gray-400 mt-1">Manage your restaurant</p>
// // // //     </div>
// // // //   );

// // // //   // ---- Profile / Logout footer ----
// // // //   const SidebarFooter = () => (
// // // //     <div className="mt-auto pt-4 border-t">
// // // //       <div className="flex items-center gap-3 mb-3">
// // // //         <div className="w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">
// // // //           A
// // // //         </div>
// // // //         <div className="text-sm">
// // // //           <p className="font-semibold text-gray-800">Admin User</p>
// // // //           <p className="text-xs text-gray-400">admin@resto.com</p>
// // // //         </div>
// // // //       </div>
// // // //       <button
// // // //         onClick={() => alert('Logging out...')}
// // // //         className="w-full flex items-center gap-2 p-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
// // // //       >
// // // //         🚪 Logout
// // // //       </button>
// // // //     </div>
// // // //   );

// // // //   return (
// // // //     <div className="min-h-screen flex bg-gray-100">
// // // //       {/* DESKTOP SIDEBAR */}
// // // //       <aside className="hidden md:flex w-64 bg-white shadow-lg flex-col p-5 sticky top-0 h-screen overflow-y-auto">
// // // //         <SidebarHeader />
// // // //         <NavLinks />
// // // //         <SidebarFooter />
// // // //       </aside>

// // // //       {/* TOP BAR (mobile + desktop) */}
// // // //       <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white shadow flex items-center justify-between p-4">
// // // //         <button onClick={() => setOpen(true)} className="text-2xl">
// // // //           ☰
// // // //         </button>
// // // //         <span className="font-bold text-orange-600">🍕 Admin</span>
// // // //         <button
// // // //           onClick={() => setNotifOpen((p) => !p)}
// // // //           className="relative text-xl"
// // // //         >
// // // //           🔔
// // // //           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
// // // //             7
// // // //           </span>
// // // //         </button>
// // // //       </div>

// // // //       {/* MOBILE OVERLAY + SIDEBAR */}
// // // //       {open && (
// // // //         <div className="fixed inset-0 z-50 md:hidden">
// // // //           {/* BACKDROP */}
// // // //           <div
// // // //             className="absolute inset-0 bg-black/50 animate-fadeIn"
// // // //             onClick={() => setOpen(false)}
// // // //           />

// // // //           {/* SIDEBAR */}
// // // //           <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg p-5 flex flex-col animate-slideIn overflow-y-auto">
// // // //             <div className="flex items-center justify-between mb-4">
// // // //               <SidebarHeader />
// // // //               <button
// // // //                 onClick={() => setOpen(false)}
// // // //                 className="text-2xl text-gray-400 hover:text-gray-700"
// // // //               >
// // // //                 ×
// // // //               </button>
// // // //             </div>
// // // //             <NavLinks onClick={() => setOpen(false)} />
// // // //             <SidebarFooter />
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* MAIN CONTENT */}
// // // //       <div className="flex-1 flex flex-col">
// // // //         {/* DESKTOP TOP HEADER */}
// // // //         <header className="hidden md:flex items-center justify-between bg-white shadow-sm px-8 py-4 sticky top-0 z-30">
// // // //           <div>
// // // //             <h2 className="text-lg font-semibold text-gray-800 capitalize">
// // // //               {pathname === '/admin'
// // // //                 ? 'Dashboard'
// // // //                 : pathname.split('/').pop()?.replace('-', ' ')}
// // // //             </h2>
// // // //             <p className="text-xs text-gray-400">Welcome back, Admin 👋</p>
// // // //           </div>

// // // //           <div className="flex items-center gap-4">
// // // //             {/* Search */}
// // // //             <input
// // // //               type="text"
// // // //               placeholder="🔍 Search..."
// // // //               className="px-3 py-2 border rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-orange-400"
// // // //             />

// // // //             {/* Notification */}
// // // //             <div className="relative">
// // // //               <button
// // // //                 onClick={() => setNotifOpen((p) => !p)}
// // // //                 className="relative text-xl"
// // // //               >
// // // //                 🔔
// // // //                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
// // // //                   7
// // // //                 </span>
// // // //               </button>

// // // //               {notifOpen && (
// // // //                 <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border p-3 z-50">
// // // //                   <p className="font-semibold text-sm mb-2">Notifications</p>
// // // //                   <ul className="space-y-2 text-sm text-gray-600">
// // // //                     <li className="p-2 hover:bg-gray-50 rounded">🧾 New order #1023</li>
// // // //                     <li className="p-2 hover:bg-gray-50 rounded">📅 New reservation</li>
// // // //                     <li className="p-2 hover:bg-gray-50 rounded">⭐ New 5-star review</li>
// // // //                   </ul>
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             {/* Profile */}
// // // //             <div className="w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">
// // // //               A
// // // //             </div>
// // // //           </div>
// // // //         </header>

// // // //         {/* PAGE CONTENT */}
// // // //         <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8">{children}</main>
// // // //       </div>

// // // //       {/* Simple animations */}
// // // //       <style jsx global>{`
// // // //         @keyframes slideIn {
// // // //           from { transform: translateX(-100%); }
// // // //           to { transform: translateX(0); }
// // // //         }
// // // //         @keyframes fadeIn {
// // // //           from { opacity: 0; }
// // // //           to { opacity: 1; }
// // // //         }
// // // //         .animate-slideIn { animation: slideIn 0.25s ease-out; }
// // // //         .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // }

// 'use client';

// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext'; // ✅ Correct relative path

// type NavItem = {
//   label: string;
//   href: string;
//   icon: React.ReactNode;
// };

// const navItems: NavItem[] = [
//   { label: 'Dashboard', href: '/admin', icon: '📊' },
//   { label: 'Orders', href: '/admin/orders', icon: '🧾' },
//   { label: 'Menu', href: '/admin/products', icon: '🍔' },
//   { label: 'Categories', href: '/admin/categories', icon: '🏷️' },
//   { label: 'Tables', href: '/admin/table', icon: '🪑' },
//   { label: 'Reservations', href: '/admin/reservation', icon: '📅' },
//   { label: 'Staff', href: '/admin/staff', icon: '👥' },
//   { label: 'Promotions', href: '/admin/promotions', icon: '🎁' },
//   { label: 'Analytics', href: '/admin/analytics', icon: '📈' },
//   { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
// ];

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [open, setOpen] = useState(false);
//   const [hovered, setHovered] = useState(false);

//   const pathname = usePathname();
//   const router = useRouter();
//   const { user, isAdmin, loading, userData } = useAuth(); // ✅ Get auth state

//   // ✅ PROTECT ADMIN ROUTES
//   useEffect(() => {
//     if (!loading) {
//       if (!user) {
//         // ❌ Not logged in → redirect to login
//         router.replace('/login');
//       } else if (isAdmin === false) {
//         // ❌ Logged in but not admin → redirect to home
//         alert('⚠️ Access Denied: Admin privileges required');
//         router.replace('/');
//       }
//     }
//   }, [user, isAdmin, loading, router]);

//   // ✅ SHOW LOADING WHILE CHECKING AUTH
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 dark:text-gray-400 font-semibold">Verifying access...</p>
//         </div>
//       </div>
//     );
//   }

//   // ✅ BLOCK RENDERING IF NOT ADMIN
//   if (!user || isAdmin !== true) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="text-center">
//           <span className="text-6xl mb-4 block">🚫</span>
//           <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
//             Access Denied
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400">Redirecting...</p>
//         </div>
//       </div>
//     );
//   }

//   const isActive = (href: string) => {
//     if (href === '/admin') return pathname === '/admin';
//     return pathname?.startsWith(href);
//   };

//   const NavLink = ({
//     item,
//     expanded,
//   }: {
//     item: NavItem;
//     expanded: boolean;
//   }) => {
//     const active = isActive(item.href);

//     return (
//       <Link
//         href={item.href}
//         onClick={() => setOpen(false)}
//         title={!expanded ? item.label : undefined}
//         className={`
//           group relative flex items-center
//           gap-3 px-4 py-3 rounded-2xl
//           transition-all duration-300

//           ${
//             active
//               ? 'bg-orange-500 dark:bg-orange-600 text-white shadow-lg shadow-orange-500/20 dark:shadow-orange-600/20'
//               : 'text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400'
//           }
//         `}
//       >

//         {/* ACTIVE BAR */}
//         <span
//           className={`
//             absolute left-0 top-1/2 -translate-y-1/2
//             h-8 w-1 rounded-r-full transition-all duration-300

//             ${
//               active
//                 ? 'bg-white dark:bg-orange-300'
//                 : 'bg-orange-500 dark:bg-orange-400 opacity-0 group-hover:opacity-100'
//             }
//           `}
//         />

//         {/* ICON */}
//         <span
//           className={`
//             text-lg shrink-0 transition-all duration-300
//             ${!active ? 'group-hover:scale-110' : ''}
//           `}
//         >
//           {item.icon}
//         </span>

//         {/* LABEL */}
//         <span
//           className={`
//             whitespace-nowrap overflow-hidden
//             transition-all duration-300 font-semibold text-sm

//             ${
//               expanded
//                 ? 'opacity-100 w-auto'
//                 : 'opacity-0 w-0'
//             }
//           `}
//         >
//           {item.label}
//         </span>

//       </Link>
//     );
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">

//       {/* DESKTOP SIDEBAR */}
//       <aside
//         className={`
//           hidden md:flex flex-col
//           bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
//           shadow-sm
//           transition-all duration-300 ease-in-out

//           ${hovered ? 'w-72' : 'w-20'}
//         `}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >

//         {/* BRAND */}
//         <div
//           className={`
//             px-4 py-5 border-b border-gray-100 dark:border-gray-700
//             flex items-center

//             ${hovered ? 'justify-start gap-3' : 'justify-center'}
//           `}
//         >

//           <Link href="/admin" className="flex items-center gap-3">

//             {/* LOGO */}
//             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-2xl shadow-lg shrink-0">
//               🍽️
//             </div>

//             {/* BRAND TEXT */}
//             <div
//               className={`
//                 overflow-hidden transition-all duration-300

//                 ${
//                   hovered
//                     ? 'opacity-100 w-auto'
//                     : 'opacity-0 w-0'
//                 }
//               `}
//             >

//               <h1 className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">
//                 Restaurant Admin
//               </h1>

//               <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
//                 Manage your business
//               </p>

//             </div>

//           </Link>

//         </div>

//         {/* NAVIGATION */}
//         <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.href}
//               item={item}
//               expanded={hovered}
//             />
//           ))}
//         </nav>

//         {/* USER - ✅ NOW SHOWS REAL ADMIN DATA */}
//         <div className="px-3 py-4 border-t border-gray-100 dark:border-gray-700">

//           <div
//             className={`
//               flex items-center rounded-2xl
//               bg-gray-50 dark:bg-gray-700/50 p-3 transition-all duration-300

//               ${hovered ? 'gap-3' : 'justify-center'}
//             `}
//           >

//             {/* AVATAR */}
//             {userData?.photoURL ? (
//               <img
//                 src={userData.photoURL}
//                 alt={userData.name || 'Admin'}
//                 className="h-10 w-10 rounded-full object-cover shadow-md shrink-0"
//               />
//             ) : (
//               <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold shadow-md shrink-0">
//                 {userData?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'A'}
//               </div>
//             )}

//             {/* USER INFO */}
//             <div
//               className={`
//                 overflow-hidden transition-all duration-300

//                 ${
//                   hovered
//                     ? 'opacity-100 w-auto'
//                     : 'opacity-0 w-0'
//                 }
//               `}
//             >

//               <p className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
//                 {userData?.name || 'Admin User'}
//               </p>

//               <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
//                 {user?.email || 'admin@restaurant.com'}
//               </p>

//             </div>

//             {/* SETTINGS */}
//             <Link
//               href="/admin/settings"
//               className={`
//                 text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400
//                 transition-all duration-300 shrink-0

//                 ${
//                   hovered
//                     ? 'opacity-100'
//                     : 'opacity-0 w-0 overflow-hidden'
//                 }
//               `}
//             >
//               ⚙️
//             </Link>

//           </div>

//         </div>

//       </aside>

//       {/* MOBILE TOP BAR */}
//       <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 py-3">

//         <button
//           onClick={() => setOpen(true)}
//           className="text-2xl text-gray-700 dark:text-gray-300 p-1"
//         >
//           ☰
//         </button>

//         <Link href="/admin" className="flex items-center gap-2">

//           <span className="text-xl">🍽️</span>

//           <span className="font-bold text-gray-900 dark:text-white">
//             Admin
//           </span>

//         </Link>

//         <div className="w-8" />

//       </div>

//       {/* MOBILE SIDEBAR */}
//       {open && (
//         <div className="fixed inset-0 z-50 md:hidden">

//           {/* BACKDROP */}
//           <div
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={() => setOpen(false)}
//           />

//           {/* SIDEBAR */}
//           <div className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-gray-800 shadow-2xl flex flex-col">

//             {/* HEADER */}
//             <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">

//               <Link
//                 href="/admin"
//                 onClick={() => setOpen(false)}
//                 className="flex items-center gap-3"
//               >

//                 <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xl">
//                   🍽️
//                 </div>

//                 <div>

//                   <h1 className="text-lg font-bold text-gray-900 dark:text-white">
//                     Restaurant Admin
//                   </h1>

//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     Manage your business
//                   </p>

//                 </div>

//               </Link>

//               <button
//                 onClick={() => setOpen(false)}
//                 className="text-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
//               >
//                 ✕
//               </button>

//             </div>

//             {/* NAVIGATION */}
//             <nav className="flex-1 px-4 py-5 space-y-2 overflow-y-auto">
//               {navItems.map((item) => (
//                 <NavLink
//                   key={item.href}
//                   item={item}
//                   expanded={true}
//                 />
//               ))}
//             </nav>

//             {/* USER - ✅ NOW SHOWS REAL ADMIN DATA */}
//             <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-700">

//               <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/50">

//                 {userData?.photoURL ? (
//                   <img
//                     src={userData.photoURL}
//                     alt={userData.name || 'Admin'}
//                     className="h-10 w-10 rounded-full object-cover shadow-md"
//                   />
//                 ) : (
//                   <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
//                     {userData?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'A'}
//                   </div>
//                 )}

//                 <div className="flex-1 min-w-0">

//                   <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
//                     {userData?.name || 'Admin User'}
//                   </p>

//                   <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                     {user?.email || 'admin@restaurant.com'}
//                   </p>

//                 </div>

//                 <Link
//                   href="/admin/settings"
//                   onClick={() => setOpen(false)}
//                   className="text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition"
//                 >
//                   ⚙️
//                 </Link>

//               </div>

//             </div>

//           </div>

//         </div>
//       )}

//       {/* MAIN CONTENT */}
//       <main className="flex-1 min-w-0">

//         <div className="md:hidden h-16" />

//         <div className="p-4 md:p-8">
//           {children}
//         </div>

//       </main>

//     </div>
//   );
// }
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Orders', href: '/admin/orders', icon: '🧾' },
  { label: 'Menu', href: '/admin/products', icon: '🍔' },
  // { label: 'Categories', href: '/admin/categories', icon: '🏷️' },
  { label: 'Table', href: '/admin/Table', icon: '🪑' },
  { label: 'Reservations', href: '/admin/reservation', icon: '📅' },
  { label: 'Staff', href: '/admin/staff', icon: '👥' },
  { label: 'Promotions', href: '/admin/promotions', icon: '🎁' },
  { label: 'Analytics', href: '/admin/analytics', icon: '📈' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, loading, userData } = useAuth();

  // ✅ PROTECT ADMIN ROUTES
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login');
      } else if (isAdmin === false) {
        alert('⚠️ Access Denied: Admin privileges required');
        router.replace('/');
      }
    }
  }, [user, isAdmin, loading, router]);

  // ✅ SHOW LOADING WHILE CHECKING AUTH
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-semibold">Verifying access...</p>
        </div>
      </div>
    );
  }

  // ✅ BLOCK RENDERING IF NOT ADMIN
  if (!user || isAdmin !== true) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🚫</span>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Redirecting...</p>
        </div>
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname?.startsWith(href);
  };

  const NavLink = ({
    item,
    expanded,
  }: {
    item: NavItem;
    expanded: boolean;
  }) => {
    const active = isActive(item.href);

    return (
      <Link
        href={item.href}
        onClick={() => setOpen(false)}
        title={!expanded ? item.label : undefined}
        className={`
          group relative flex items-center
          gap-3 px-4 py-3 rounded-2xl
          transition-all duration-300

          ${
            active
              ? 'bg-orange-500 dark:bg-orange-600 text-white shadow-lg shadow-orange-500/20 dark:shadow-orange-600/20'
              : 'text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400'
          }
        `}
      >
        {/* ACTIVE BAR */}
        <span
          className={`
            absolute left-0 top-1/2 -translate-y-1/2
            h-8 w-1 rounded-r-full transition-all duration-300

            ${
              active
                ? 'bg-white dark:bg-orange-300'
                : 'bg-orange-500 dark:bg-orange-400 opacity-0 group-hover:opacity-100'
            }
          `}
        />

        {/* ICON */}
        <span
          className={`
            text-lg shrink-0 transition-all duration-300
            ${!active ? 'group-hover:scale-110' : ''}
          `}
        >
          {item.icon}
        </span>

        {/* LABEL */}
        <span
          className={`
            whitespace-nowrap overflow-hidden
            transition-all duration-300 font-semibold text-sm

            ${
              expanded
                ? 'opacity-100 w-auto'
                : 'opacity-0 w-0'
            }
          `}
        >
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">

      {/* ========================================
          DESKTOP SIDEBAR
      ======================================== */}
      <aside
        className={`
          hidden md:flex flex-col
          bg-white dark:bg-gray-800 
          border-r border-gray-200 dark:border-gray-700
          shadow-sm
          transition-all duration-300 ease-in-out

          ${hovered ? 'w-72' : 'w-20'}
        `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* BRAND */}
        <div
          className={`
            px-4 py-5 border-b border-gray-100 dark:border-gray-700
            flex items-center

            ${hovered ? 'justify-start gap-3' : 'justify-center'}
          `}
        >
          <Link href="/admin" className="flex items-center gap-3">
            {/* LOGO */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-2xl shadow-lg shrink-0">
              🍽️
            </div>

            {/* BRAND TEXT */}
            <div
              className={`
                overflow-hidden transition-all duration-300

                ${
                  hovered
                    ? 'opacity-100 w-auto'
                    : 'opacity-0 w-0'
                }
              `}
            >
              <h1 className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">
                Restaurant Admin
              </h1>

              <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Manage your business
              </p>
            </div>
          </Link>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              expanded={hovered}
            />
          ))}
        </nav>

        {/* USER */}
        <div className="px-3 py-4 border-t border-gray-100 dark:border-gray-700">
          <div
            className={`
              flex items-center rounded-2xl
              bg-gray-50 dark:bg-gray-700/50 p-3 transition-all duration-300

              ${hovered ? 'gap-3' : 'justify-center'}
            `}
          >
            {/* AVATAR */}
            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                alt={userData.name || 'Admin'}
                className="h-10 w-10 rounded-full object-cover shadow-md shrink-0 ring-2 ring-orange-500"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold shadow-md shrink-0">
                {userData?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
            )}

            {/* USER INFO */}
            <div
              className={`
                overflow-hidden transition-all duration-300

                ${
                  hovered
                    ? 'opacity-100 w-auto'
                    : 'opacity-0 w-0'
                }
              `}
            >
              <p className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                {userData?.name || 'Admin User'}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {user?.email || 'admin@restaurant.com'}
              </p>
            </div>

            {/* SETTINGS */}
            <Link
              href="/admin/settings"
              className={`
                text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400
                transition-all duration-300 shrink-0

                ${
                  hovered
                    ? 'opacity-100'
                    : 'opacity-0 w-0 overflow-hidden'
                }
              `}
            >
              ⚙️
            </Link>
          </div>
        </div>
      </aside>

      {/* ========================================
          MOBILE TOP BAR
      ======================================== */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 py-3 shadow-sm">
        <button
          onClick={() => setOpen(true)}
          className="text-2xl text-gray-700 dark:text-gray-300 p-1 hover:text-orange-500 dark:hover:text-orange-400 transition"
        >
          ☰
        </button>

        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-xl">🍽️</span>
          <span className="font-bold text-gray-900 dark:text-white">
            Admin
          </span>
        </Link>

        <div className="w-8" />
      </div>

      {/* ========================================
          MOBILE SIDEBAR
      ======================================== */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* SIDEBAR */}
          <div className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
            {/* HEADER */}
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xl shadow-lg">
                  🍽️
                </div>

                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                    Restaurant Admin
                  </h1>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Manage your business
                  </p>
                </div>
              </Link>

              <button
                onClick={() => setOpen(false)}
                className="text-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition"
              >
                ✕
              </button>
            </div>

            {/* NAVIGATION */}
            <nav className="flex-1 px-4 py-5 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  expanded={true}
                />
              ))}
            </nav>

            {/* USER */}
            <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/50">
                {userData?.photoURL ? (
                  <img
                    src={userData.photoURL}
                    alt={userData.name || 'Admin'}
                    className="h-10 w-10 rounded-full object-cover shadow-md ring-2 ring-orange-500"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                    {userData?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'A'}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {userData?.name || 'Admin User'}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || 'admin@restaurant.com'}
                  </p>
                </div>

                <Link
                  href="/admin/settings"
                  onClick={() => setOpen(false)}
                  className="text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition"
                >
                  ⚙️
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================
          MAIN CONTENT AREA
      ======================================== */}
      <main className="flex-1 min-w-0 bg-gray-50 dark:bg-gray-900">
        <div className="md:hidden h-16" />
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>

    </div>
  );
}