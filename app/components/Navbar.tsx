// // // // 'use client';

// // // // import { useState, useEffect, useRef } from 'react';
// // // // import Link from 'next/link';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { LogOut, User, Package, MapPin } from 'lucide-react';
// // // // import { doc, getDoc } from 'firebase/firestore';
// // // // import { db } from '@/app/lib/firebase';

// // // // import MobileMenu from './MobileMenu';
// // // // import CartSidebar from './CartSidebar';
// // // // import ThemeToggle from './ThemeToggle';

// // // // import { useAuth } from '../context/AuthContext';

// // // // const navLinks = [
// // // //   { name: 'Home', href: '/' },
// // // //   { name: 'Menu', href: '/menu' },
// // // //   { name: 'About', href: '/about' },
// // // //   { name: 'Contact', href: '/contact' },
// // // //   { name: 'Admin', href: '/admin' },
// // // // ];

// // // // export default function Navbar() {
// // // //   const { user, logout } = useAuth();

// // // //   const [isScrolled, setIsScrolled] = useState(false);
// // // //   const [profileOpen, setProfileOpen] = useState(false);
// // // //   const [userData, setUserData] = useState<any>(null);
// // // //   const [loading, setLoading] = useState(true);

// // // //   const profileRef = useRef<HTMLDivElement>(null);

// // // //   // ✅ FETCH USER DATA FROM FIRESTORE
// // // //   useEffect(() => {
// // // //     const fetchUserData = async () => {
// // // //       if (user?.uid) {
// // // //         try {
// // // //           const userDoc = await getDoc(doc(db, 'users', user.uid));
// // // //           if (userDoc.exists()) {
// // // //             setUserData(userDoc.data());
// // // //           }
// // // //         } catch (error) {
// // // //           console.error('Error fetching user data:', error);
// // // //         } finally {
// // // //           setLoading(false);
// // // //         }
// // // //       } else {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchUserData();
// // // //   }, [user]);

// // // //   // ✅ GET USER INITIALS
// // // //   const getInitials = () => {
// // // //     if (userData?.name) {
// // // //       const names = userData.name.split(' ');
// // // //       if (names.length >= 2) {
// // // //         return (names[0][0] + names[1][0]).toUpperCase();
// // // //       }
// // // //       return userData.name.substring(0, 2).toUpperCase();
// // // //     }
// // // //     return user?.email?.substring(0, 2).toUpperCase() || 'U';
// // // //   };

// // // //   // ✅ GET DISPLAY NAME
// // // //   const getDisplayName = () => {
// // // //     if (userData?.name) {
// // // //       const firstName = userData.name.split(' ')[0];
// // // //       return firstName;
// // // //     }
// // // //     return user?.email?.split('@')[0] || 'User';
// // // //   };

// // // //   useEffect(() => {
// // // //     const handleScroll = () => {
// // // //       setIsScrolled(window.scrollY > 20);
// // // //     };

// // // //     window.addEventListener('scroll', handleScroll);
// // // //     return () => window.removeEventListener('scroll', handleScroll);
// // // //   }, []);

// // // //   // CLOSE PROFILE DROPDOWN
// // // //   useEffect(() => {
// // // //     function handleClickOutside(event: MouseEvent) {
// // // //       if (
// // // //         profileRef.current &&
// // // //         !profileRef.current.contains(event.target as Node)
// // // //       ) {
// // // //         setProfileOpen(false);
// // // //       }
// // // //     }

// // // //     document.addEventListener('mousedown', handleClickOutside);
// // // //     return () =>
// // // //       document.removeEventListener('mousedown', handleClickOutside);
// // // //   }, []);

// // // //   return (
// // // //     <>
// // // //       {/* NAVBAR */}
// // // //       <motion.nav
// // // //         initial={{ y: -80 }}
// // // //         animate={{ y: 0 }}
// // // //         transition={{ duration: 0.4 }}
// // // //         className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-100 dark:border-gray-800 ${
// // // //           isScrolled
// // // //             ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-lg'
// // // //             : 'bg-white dark:bg-gray-900'
// // // //         }`}
// // // //       >
// // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
// // // //           <div className="h-16 md:h-20 flex items-center justify-between">

// // // //             {/* LEFT */}
// // // //             <div className="flex items-center gap-8 lg:gap-12">

// // // //               {/* LOGO */}
// // // //               <Link
// // // //                 href="/"
// // // //                 className="flex items-center gap-2 shrink-0 group"
// // // //               >
// // // //                 <motion.div
// // // //                   whileHover={{ rotate: -6, scale: 1.06 }}
// // // //                   className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center shadow-lg"
// // // //                 >
// // // //                   <span className="text-2xl md:text-3xl">🍕</span>
// // // //                 </motion.div>

// // // //                 <div className="leading-tight">
// // // //                   <h1 className="text-2xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
// // // //                     Tasty Bites
// // // //                   </h1>

// // // //                   <p className="hidden md:block text-xs tracking-wide text-gray-500 dark:text-gray-400 font-medium">
// // // //                     PREMIUM FOOD EXPERIENCE
// // // //                   </p>
// // // //                 </div>
// // // //               </Link>

// // // //               {/* DESKTOP NAV */}
// // // //               <div className="hidden md:flex items-center gap-7 lg:gap-10">
// // // //                 {navLinks.map((link) => (
// // // //                   <motion.div key={link.name} whileHover={{ y: -2 }}>
// // // //                     <Link
// // // //                       href={link.href}
// // // //                       className="relative text-[15px] lg:text-[16px] font-semibold text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
// // // //                     >
// // // //                       {link.name}
// // // //                     </Link>
// // // //                   </motion.div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             {/* RIGHT */}
// // // //             <div className="flex items-center gap-3 md:gap-5">

// // // //               {/* CART */}
// // // //               <motion.div
// // // //                 whileHover={{ scale: 1.08 }}
// // // //                 whileTap={{ scale: 0.95 }}
// // // //                 className="scale-[0.92] md:scale-100"
// // // //               >
// // // //                 <CartSidebar />
// // // //               </motion.div>

// // // //               {/* USER */}
// // // //               {!user ? (
// // // //                 <Link
// // // //                   href="/login"
// // // //                   className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white font-semibold shadow-lg hover:scale-105 transition-all"
// // // //                 >
// // // //                   <User className="w-4 h-4" />
// // // //                   Login
// // // //                 </Link>
// // // //               ) : (
// // // //                 <div className="relative hidden md:block" ref={profileRef}>
// // // //                   <motion.button
// // // //                     whileHover={{ scale: 1.05 }}
// // // //                     whileTap={{ scale: 0.95 }}
// // // //                     onClick={() => setProfileOpen(!profileOpen)}
// // // //                     className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 hover:shadow-lg transition-all"
// // // //                   >
// // // //                     {/* PROFILE PICTURE OR INITIALS */}
// // // //                     <div className="relative">
// // // //                       {userData?.photoURL ? (
// // // //                         <img
// // // //                           src={userData.photoURL}
// // // //                           alt={userData.name || 'User'}
// // // //                           className="w-9 h-9 rounded-full object-cover ring-2 ring-orange-500"
// // // //                         />
// // // //                       ) : (
// // // //                         <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
// // // //                           {loading ? '...' : getInitials()}
// // // //                         </div>
// // // //                       )}
// // // //                       {/* ONLINE STATUS */}
// // // //                       <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
// // // //                     </div>

// // // //                     {/* NAME */}
// // // //                     <div className="text-left hidden lg:block">
// // // //                       <p className="text-sm font-bold text-gray-800 dark:text-white">
// // // //                         {loading ? 'Loading...' : getDisplayName()}
// // // //                       </p>
// // // //                       <p className="text-xs text-gray-500 dark:text-gray-400">
// // // //                         {userData?.role === 'admin' ? 'Admin' : 'Customer'}
// // // //                       </p>
// // // //                     </div>
// // // //                   </motion.button>

// // // //                   <AnimatePresence>
// // // //                     {profileOpen && (
// // // //                       <motion.div
// // // //                         initial={{ opacity: 0, y: 12, scale: 0.95 }}
// // // //                         animate={{ opacity: 1, y: 0, scale: 1 }}
// // // //                         exit={{ opacity: 0, y: 12, scale: 0.95 }}
// // // //                         transition={{ duration: 0.2 }}
// // // //                         className="absolute right-0 top-16 w-80 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
// // // //                       >
// // // //                         {/* HEADER */}
// // // //                         <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 p-6 text-white">
// // // //                           <div className="flex items-center gap-4">
// // // //                             {userData?.photoURL ? (
// // // //                               <img
// // // //                                 src={userData.photoURL}
// // // //                                 alt={userData.name || 'User'}
// // // //                                 className="w-16 h-16 rounded-full object-cover ring-4 ring-white/30"
// // // //                               />
// // // //                             ) : (
// // // //                               <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-2xl ring-4 ring-white/30">
// // // //                                 {getInitials()}
// // // //                               </div>
// // // //                             )}
// // // //                             <div>
// // // //                               <h3 className="font-bold text-lg">
// // // //                                 {userData?.name || 'User'}
// // // //                               </h3>
// // // //                               <p className="text-sm text-white/80">
// // // //                                 {user.email}
// // // //                               </p>
// // // //                               {userData?.phone && (
// // // //                                 <p className="text-sm text-white/70 flex items-center gap-1 mt-1">
// // // //                                   📱 {userData.phone}
// // // //                                 </p>
// // // //                               )}
// // // //                             </div>
// // // //                           </div>
// // // //                         </div>

// // // //                         {/* STATS */}
// // // //                         {userData && (
// // // //                           <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 dark:bg-gray-900/50">
// // // //                             <div className="bg-white dark:bg-gray-800 p-3 rounded-xl text-center border border-gray-100 dark:border-gray-700">
// // // //                               <p className="text-2xl font-bold text-orange-600">
// // // //                                 {userData.totalOrders || 0}
// // // //                               </p>
// // // //                               <p className="text-xs text-gray-500">Orders</p>
// // // //                             </div>
// // // //                             <div className="bg-white dark:bg-gray-800 p-3 rounded-xl text-center border border-gray-100 dark:border-gray-700">
// // // //                               <p className="text-2xl font-bold text-green-600">
// // // //                                 ₹{userData.totalSpent || 0}
// // // //                               </p>
// // // //                               <p className="text-xs text-gray-500">Spent</p>
// // // //                             </div>
// // // //                           </div>
// // // //                         )}

// // // //                         {/* MENU */}
// // // //                         <div className="p-2">
// // // //                           <Link
// // // //                             href="/orders"
// // // //                             onClick={() => setProfileOpen(false)}
// // // //                             className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all font-medium"
// // // //                           >
// // // //                             <Package className="w-5 h-5 text-orange-500" />
// // // //                             My Orders
// // // //                           </Link>

// // // //                           <Link
// // // //                             href="/addresses"
// // // //                             onClick={() => setProfileOpen(false)}
// // // //                             className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all font-medium"
// // // //                           >
// // // //                             <MapPin className="w-5 h-5 text-blue-500" />
// // // //                             My Addresses
// // // //                           </Link>

// // // //                           <Link
// // // //                             href="/profile"
// // // //                             onClick={() => setProfileOpen(false)}
// // // //                             className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all font-medium"
// // // //                           >
// // // //                             <User className="w-5 h-5 text-purple-500" />
// // // //                             Profile Settings
// // // //                           </Link>

// // // //                           <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>

// // // //                           <button
// // // //                             onClick={() => {
// // // //                               logout();
// // // //                               setProfileOpen(false);
// // // //                             }}
// // // //                             className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium"
// // // //                           >
// // // //                             <LogOut className="w-5 h-5" />
// // // //                             Logout
// // // //                           </button>
// // // //                         </div>

// // // //                         {/* FOOTER */}
// // // //                         <div className="bg-gray-50 dark:bg-gray-900/50 p-3 text-center border-t border-gray-100 dark:border-gray-700">
// // // //                           <p className="text-xs text-gray-400">
// // // //                             Logged in via{' '}
// // // //                             <span className="font-semibold text-orange-500">
// // // //                               {userData?.loginMethod === 'google'
// // // //                                 ? '🔍 Google'
// // // //                                 : '✉️ Email'}
// // // //                             </span>
// // // //                           </p>
// // // //                         </div>
// // // //                       </motion.div>
// // // //                     )}
// // // //                   </AnimatePresence>
// // // //                 </div>
// // // //               )}

// // // //               <MobileMenu />
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </motion.nav>

// // // //       {/* FLOATING THEME BUTTON */}
// // // //       <div className="fixed bottom-5 right-5 z-[9999]">
// // // //         <motion.div
// // // //           whileHover={{ scale: 1.08 }}
// // // //           whileTap={{ scale: 0.92 }}
// // // //           className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-full p-2"
// // // //         >
// // // //           <ThemeToggle />
// // // //         </motion.div>
// // // //       </div>
// // // //     </>
// // // //   );
// // // // }
// // // // 'use client';

// // // // import { useState, useEffect, useRef } from 'react';
// // // // import Link from 'next/link';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { LogOut, User, Package, MapPin } from 'lucide-react';
// // // // import { doc, getDoc } from 'firebase/firestore';
// // // // import { db } from '@/app/lib/firebase';

// // // // import MobileMenu from './MobileMenu';
// // // // import CartSidebar from './CartSidebar';
// // // // import ThemeToggle from './ThemeToggle';

// // // // import { useAuth } from '../context/AuthContext';

// // // // // ✅ ORIGINAL NAV LINKS
// // // // const allNavLinks = [
// // // //   { name: 'Home', href: '/' },
// // // //   { name: 'Menu', href: '/menu' },
// // // //   { name: 'About', href: '/about' },
// // // //   { name: 'Contact', href: '/contact' },
// // // //   { name: 'Admin', href: '/admin' }, // ⚠️ This will be filtered
// // // // ];

// // // // export default function Navbar() {
// // // //   const { user, logout, isAdmin } = useAuth(); // ✅ Get isAdmin from context

// // // //   const [isScrolled, setIsScrolled] = useState(false);
// // // //   const [profileOpen, setProfileOpen] = useState(false);
// // // //   const [userData, setUserData] = useState<any>(null);
// // // //   const [loading, setLoading] = useState(true);

// // // //   const profileRef = useRef<HTMLDivElement>(null);

// // // //   // ✅ FILTER NAV LINKS BASED ON ROLE
// // // //   const navLinks = allNavLinks.filter((link) => {
// // // //     if (link.name === 'Admin') {
// // // //       return isAdmin === true; // ✅ Only show if user is admin
// // // //     }
// // // //     return true; // ✅ Show all other links
// // // //   });

// // // //   // ✅ FETCH USER DATA FROM FIRESTORE
// // // //   useEffect(() => {
// // // //     const fetchUserData = async () => {
// // // //       if (user?.uid) {
// // // //         try {
// // // //           const userDoc = await getDoc(doc(db, 'users', user.uid));
// // // //           if (userDoc.exists()) {
// // // //             setUserData(userDoc.data());
// // // //           }
// // // //         } catch (error) {
// // // //           console.error('Error fetching user data:', error);
// // // //         } finally {
// // // //           setLoading(false);
// // // //         }
// // // //       } else {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchUserData();
// // // //   }, [user]);

// // // //   // ✅ GET USER INITIALS
// // // //   const getInitials = () => {
// // // //     if (userData?.name) {
// // // //       const names = userData.name.split(' ');
// // // //       if (names.length >= 2) {
// // // //         return (names[0][0] + names[1][0]).toUpperCase();
// // // //       }
// // // //       return userData.name.substring(0, 2).toUpperCase();
// // // //     }
// // // //     return user?.email?.substring(0, 2).toUpperCase() || 'U';
// // // //   };

// // // //   // ✅ GET DISPLAY NAME
// // // //   const getDisplayName = () => {
// // // //     if (userData?.name) {
// // // //       const firstName = userData.name.split(' ')[0];
// // // //       return firstName;
// // // //     }
// // // //     return user?.email?.split('@')[0] || 'User';
// // // //   };

// // // //   useEffect(() => {
// // // //     const handleScroll = () => {
// // // //       setIsScrolled(window.scrollY > 20);
// // // //     };

// // // //     window.addEventListener('scroll', handleScroll);
// // // //     return () => window.removeEventListener('scroll', handleScroll);
// // // //   }, []);

// // // //   // CLOSE PROFILE DROPDOWN
// // // //   useEffect(() => {
// // // //     function handleClickOutside(event: MouseEvent) {
// // // //       if (
// // // //         profileRef.current &&
// // // //         !profileRef.current.contains(event.target as Node)
// // // //       ) {
// // // //         setProfileOpen(false);
// // // //       }
// // // //     }

// // // //     document.addEventListener('mousedown', handleClickOutside);
// // // //     return () =>
// // // //       document.removeEventListener('mousedown', handleClickOutside);
// // // //   }, []);

// // // //   return (
// // // //     <>
// // // //       {/* NAVBAR */}
// // // //       <motion.nav
// // // //         initial={{ y: -80 }}
// // // //         animate={{ y: 0 }}
// // // //         transition={{ duration: 0.4 }}
// // // //         className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-100 dark:border-gray-800 ${
// // // //           isScrolled
// // // //             ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-lg'
// // // //             : 'bg-white dark:bg-gray-900'
// // // //         }`}
// // // //       >
// // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
// // // //           <div className="h-16 md:h-20 flex items-center justify-between">

// // // //             {/* LEFT */}
// // // //             <div className="flex items-center gap-8 lg:gap-12">

// // // //               {/* LOGO */}
// // // //               <Link
// // // //                 href="/"
// // // //                 className="flex items-center gap-2 shrink-0 group"
// // // //               >
// // // //                 <motion.div
// // // //                   whileHover={{ rotate: -6, scale: 1.06 }}
// // // //                   className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center shadow-lg"
// // // //                 >
// // // //                   <span className="text-2xl md:text-3xl">🍕</span>
// // // //                 </motion.div>

// // // //                 <div className="leading-tight">
// // // //                   <h1 className="text-2xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
// // // //                     Tasty Bites
// // // //                   </h1>

// // // //                   <p className="hidden md:block text-xs tracking-wide text-gray-500 dark:text-gray-400 font-medium">
// // // //                     PREMIUM FOOD EXPERIENCE
// // // //                   </p>
// // // //                 </div>
// // // //               </Link>

// // // //               {/* DESKTOP NAV - ✅ NOW FILTERED */}
// // // //               <div className="hidden md:flex items-center gap-7 lg:gap-10">
// // // //                 {navLinks.map((link) => (
// // // //                   <motion.div key={link.name} whileHover={{ y: -2 }}>
// // // //                     <Link
// // // //                       href={link.href}
// // // //                       className="relative text-[15px] lg:text-[16px] font-semibold text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
// // // //                     >
// // // //                       {link.name}
// // // //                     </Link>
// // // //                   </motion.div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             {/* RIGHT */}
// // // //             <div className="flex items-center gap-3 md:gap-5">

// // // //               {/* CART */}
// // // //               <motion.div
// // // //                 whileHover={{ scale: 1.08 }}
// // // //                 whileTap={{ scale: 0.95 }}
// // // //                 className="scale-[0.92] md:scale-100"
// // // //               >
// // // //                 <CartSidebar />
// // // //               </motion.div>

// // // //               {/* USER */}
// // // //               {!user ? (
// // // //                 <Link
// // // //                   href="/login"
// // // //                   className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white font-semibold shadow-lg hover:scale-105 transition-all"
// // // //                 >
// // // //                   <User className="w-4 h-4" />
// // // //                   Login
// // // //                 </Link>
// // // //               ) : (
// // // //                 <div className="relative hidden md:block" ref={profileRef}>
// // // //                   <motion.button
// // // //                     whileHover={{ scale: 1.05 }}
// // // //                     whileTap={{ scale: 0.95 }}
// // // //                     onClick={() => setProfileOpen(!profileOpen)}
// // // //                     className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 hover:shadow-lg transition-all"
// // // //                   >
// // // //                     {/* PROFILE PICTURE OR INITIALS */}
// // // //                     <div className="relative">
// // // //                       {userData?.photoURL ? (
// // // //                         <img
// // // //                           src={userData.photoURL}
// // // //                           alt={userData.name || 'User'}
// // // //                           className="w-9 h-9 rounded-full object-cover ring-2 ring-orange-500"
// // // //                         />
// // // //                       ) : (
// // // //                         <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
// // // //                           {loading ? '...' : getInitials()}
// // // //                         </div>
// // // //                       )}
// // // //                       {/* ONLINE STATUS */}
// // // //                       <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
// // // //                     </div>

// // // //                     {/* NAME */}
// // // //                     <div className="text-left hidden lg:block">
// // // //                       <p className="text-sm font-bold text-gray-800 dark:text-white">
// // // //                         {loading ? 'Loading...' : getDisplayName()}
// // // //                       </p>
// // // //                       <p className="text-xs text-gray-500 dark:text-gray-400">
// // // //                         {userData?.role === 'admin' ? 'Admin' : 'Customer'}
// // // //                       </p>
// // // //                     </div>
// // // //                   </motion.button>

// // // //                   <AnimatePresence>
// // // //                     {profileOpen && (
// // // //                       <motion.div
// // // //                         initial={{ opacity: 0, y: 12, scale: 1 }}
// // // //                         animate={{ opacity: 1, y: 0, scale: 1 }}
// // // //                         exit={{ opacity: 0, y: 12, scale: 0.95 }}
// // // //                         transition={{ duration: 0.2 }}
// // // //                         className="absolute right-0 top-16 w-80 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
// // // //                       >
// // // //                         {/* HEADER */}
// // // //                         <div className="bg-linear-to-r from-orange-500 via-red-500 to-orange-600 p-6 text-white">
// // // //                           <div className="flex items-center gap-4">
// // // //                             {userData?.photoURL ? (
// // // //                               <img
// // // //                                 src={userData.photoURL}
// // // //                                 alt={userData.name || 'User'}
// // // //                                 className="w-16 h-16 rounded-full object-cover ring-4 ring-white/30"
// // // //                               />
// // // //                             ) : (
// // // //                               <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-2xl ring-4 ring-white/30">
// // // //                                 {getInitials()}
// // // //                               </div>
// // // //                             )}
// // // //                             <div>
// // // //                               <h3 className="font-bold text-lg">
// // // //                                 {userData?.name || 'User'}
// // // //                               </h3>
// // // //                               <p className="text-sm text-white/80">
// // // //                                 {user.email}
// // // //                               </p>
// // // //                               {userData?.phone && (
// // // //                                 <p className="text-sm text-white/70 flex items-center gap-1 mt-1">
// // // //                                   📱 {userData.phone}
// // // //                                 </p>
// // // //                               )}
// // // //                             </div>
// // // //                           </div>
// // // //                         </div>

// // // //                         {/* STATS */}
// // // //                         {userData && (
// // // //                           <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 dark:bg-gray-900/50">
// // // //                             <div className="bg-white dark:bg-gray-800 p-3 rounded-xl text-center border border-gray-100 dark:border-gray-700">
// // // //                               <p className="text-2xl font-bold text-orange-600">
// // // //                                 {userData.totalOrders || 0}
// // // //                               </p>
// // // //                               <p className="text-xs text-gray-500">Orders</p>
// // // //                             </div>
// // // //                             <div className="bg-white dark:bg-gray-800 p-3 rounded-xl text-center border border-gray-100 dark:border-gray-700">
// // // //                               <p className="text-2xl font-bold text-green-600">
// // // //                                 ₹{userData.totalSpent || 0}
// // // //                               </p>
// // // //                               <p className="text-xs text-gray-500">Spent</p>
// // // //                             </div>
// // // //                           </div>
// // // //                         )}

// // // //                         {/* MENU */}
// // // //                         <div className="p-2">
// // // //                           <Link
// // // //                             href="/myorders"
// // // //                             onClick={() => setProfileOpen(false)}
// // // //                             className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all font-medium"
// // // //                           >
// // // //                             <Package className="w-5 h-5 text-orange-500" />
// // // //                             My Orders
// // // //                           </Link>

// // // //                           {/* <Link
// // // //                             href="/addresses"
// // // //                             onClick={() => setProfileOpen(false)}
// // // //                             className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all font-medium"
// // // //                           >
// // // //                             <MapPin className="w-5 h-5 text-blue-500" />
// // // //                             My Addresses
// // // //                           </Link> */}

// // // //                           <Link
// // // //                             href="/profile"
// // // //                             onClick={() => setProfileOpen(false)}
// // // //                             className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all font-medium"
// // // //                           >
// // // //                             <User className="w-5 h-5 text-purple-500" />
// // // //                             Profile Settings
// // // //                           </Link>

// // // //                           <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>

// // // //                           <button
// // // //                             onClick={() => {
// // // //                               logout();
// // // //                               setProfileOpen(false);
// // // //                             }}
// // // //                             className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium"
// // // //                           >
// // // //                             <LogOut className="w-5 h-5" />
// // // //                             Logout
// // // //                           </button>
// // // //                         </div>

// // // //                         {/* FOOTER */}
// // // //                         <div className="bg-gray-50 dark:bg-gray-900/50 p-3 text-center border-t border-gray-100 dark:border-gray-700">
// // // //                           <p className="text-xs text-gray-400">
// // // //                             Logged in via{' '}
// // // //                             <span className="font-semibold text-orange-500">
// // // //                               {userData?.loginMethod === 'google'
// // // //                                 ? '🔍 Google'
// // // //                                 : '✉️ Email'}
// // // //                             </span>
// // // //                           </p>
// // // //                         </div>
// // // //                       </motion.div>
// // // //                     )}
// // // //                   </AnimatePresence>
// // // //                 </div>
// // // //               )}

// // // //               <MobileMenu />
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </motion.nav>

// // // //       {/* FLOATING THEME BUTTON */}
// // // //       <div className="fixed bottom-12 right-5 z-[9999]">
// // // //         <motion.div
// // // //           whileHover={{ scale: 1.08 }}
// // // //           whileTap={{ scale: 0.92 }}
// // // //           className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-full p-2"
// // // //         >
// // // //           <ThemeToggle />
// // // //         </motion.div>
// // // //       </div>
// // // //     </>
// // // //   );
// // // // }
// // 'use strict';

// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import Link from 'next/link';
// // import Image from 'next/image';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { LogOut, User, Package } from 'lucide-react';
// // import { doc, onSnapshot, collection, query, where } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';

// // import MobileMenu from './MobileMenu';
// // import CartSidebar from './CartSidebar';
// // import ThemeToggle from './ThemeToggle';
// // import SearchBar from './SearchBar';
// // import { useAuth } from '../context/AuthContext';


// // // Explicit strict typing interfaces for component safety
// // interface UserDataState {
// //   name?: string;
// //   email?: string;
// //   photoURL?: string;
// //   role?: string;
// //   phone?: string;
// //   loginMethod?: string;
// // }

// // interface UserLiveStats {
// //   totalOrders: number;
// //   totalSpent: number;
// // }

// // // ORIGINAL NAV LINKS
// // const allNavLinks = [
// //   { name: 'Home', href: '/' },
// //   { name: 'Menu', href: '/menu' },
// //   { name: 'About', href: '/about' },
// //   { name: 'Contact', href: '/contact' },
// //   { name: 'Admin', href: '/admin' },
// // ];

// // export default function Navbar() {
// //   const { user, logout, isAdmin } = useAuth();

// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [profileOpen, setProfileOpen] = useState(false);
// //   const [userData, setUserData] = useState<UserDataState | null>(null);
// //   const [liveStats, setLiveStats] = useState<UserLiveStats>({ totalOrders: 0, totalSpent: 0 });
// //   const [loading, setLoading] = useState(true);

// //   const profileRef = useRef<HTMLDivElement>(null);

// //   // 6 Premium FamPay-Style AI Avatars List Matching Logic
// //   const aiAvatars = [
// //     "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
// //     "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80",
// //     "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
// //     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
// //     "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80",
// //     "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&h=150&q=80"
// //   ];

// //   const getAutoAvatar = (uid: string): string => {
// //     if (!uid) return aiAvatars[0];
// //     let hash = 0;
// //     for (let i = 0; i < uid.length; i++) {
// //       hash = uid.charCodeAt(i) + ((hash << 5) - hash);
// //     }
// //     const index = Math.abs(hash) % aiAvatars.length;
// //     return aiAvatars[index];
// //   };

// //   // FILTER NAV LINKS BASED ON ROLE
// //   const navLinks = allNavLinks.filter((link) => {
// //     if (link.name === 'Admin') {
// //       return isAdmin === true;
// //     }
// //     return true;
// //   });

// //   // REAL-TIME FIRESTORE PROFILE STREAM + LIVE STATS REALTIME SYNC
// //   useEffect(() => {
// //     if (!user?.uid) {
// //       setUserData(null);
// //       setLiveStats({ totalOrders: 0, totalSpent: 0 });
// //       setLoading(false);
// //       return;
// //     }

// //     const userDocRef = doc(db, 'users', user.uid);
// //     const ordersRef = collection(db, 'orders');
// //     const ordersQuery = query(ordersRef, where('userId', '==', user.uid));

// //     // Stream 1: User Profile Document Live Subscriptions
// //     const unsubscribeUser = onSnapshot(userDocRef, (docSnapshot) => {
// //       if (docSnapshot.exists()) {
// //         setUserData(docSnapshot.data() as UserDataState);
// //       }
// //       setLoading(false);
// //     }, (error) => {
// //       console.error('Error listening to user profile changes:', error);
// //       setLoading(false);
// //     });

// //     // Stream 2: Dynamic Live Order & Amount Calculation Streams
// //     const unsubscribeOrders = onSnapshot(ordersQuery, (querySnapshot) => {
// //       const totalCount = querySnapshot.size;
// //       let computedSpentSum = 0;

// //       querySnapshot.forEach((orderDoc) => {
// //         const data = orderDoc.data();
// //         const cashValue = Number(data.totalAmount || data.total || data.amount || 0);
// //         computedSpentSum += cashValue;
// //       });

// //       setLiveStats({
// //         totalOrders: totalCount,
// //         totalSpent: computedSpentSum
// //       });
// //     }, (error) => {
// //       console.error('Error listening to orders snapshot stream:', error);
// //     });

// //     return () => {
// //       unsubscribeUser();
// //       unsubscribeOrders();
// //     };
// //   }, [user]);

// //   // GET USER INITIALS
// //   const getInitials = () => {
// //     if (userData?.name) {
// //       const names = userData.name.split(' ');
// //       if (names.length >= 2) {
// //         return (names[0][0] + names[1][0]).toUpperCase();
// //       }
// //       return userData.name.substring(0, 2).toUpperCase();
// //     }
// //     return user?.email?.substring(0, 2).toUpperCase() || 'U';
// //   };

// //   // GET DISPLAY NAME
// //   const getDisplayName = () => {
// //     if (userData?.name) {
// //       return userData.name.split(' ')[0];
// //     }
// //     return user?.email?.split('@')[0] || 'User';
// //   };

// //   // SCROLL TRIGGER DETECTOR
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setIsScrolled(window.scrollY > 20);
// //     };
// //     window.addEventListener('scroll', handleScroll);
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   // CLOSE PROFILE DROPDOWN OUTSIDE HANDLER
// //   useEffect(() => {
// //     function handleClickOutside(event: MouseEvent) {
// //       if (
// //         profileRef.current &&
// //         !profileRef.current.contains(event.target as Node)
// //       ) {
// //         setProfileOpen(false);
// //       }
// //     }
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, []);

// //   const profileAvatarUrl = user?.uid ? getAutoAvatar(user.uid) : aiAvatars[0];

// //   return (
// //     <>
// //       {/* NAVBAR */}
// //       <motion.nav
// //         initial={{ y: -80 }}
// //         animate={{ y: 0 }}
// //         transition={{ duration: 0.4 }}
// //         className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-100 dark:border-gray-800 ${
// //           isScrolled
// //             ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-lg'
// //             : 'bg-white dark:bg-gray-900'
// //         }`}
// //       >
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
// //           <div className="h-16 md:h-20 flex items-center justify-between">

// //             {/* LEFT SIDE */}
// //             <div className="flex items-center gap-8 lg:gap-12">
// //               {/* LOGO */}
// //               <Link href="/" className="flex items-center gap-2 shrink-0 group">
// //                 <motion.div
// //                   whileHover={{ rotate: -6, scale: 1.06 }}
// //                   className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-linear-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center shadow-lg"
// //                 >
// //                   <span className="text-2xl md:text-3xl">🍕</span>
// //                 </motion.div>

// //                 <div className="leading-tight">
// //                   <h1 className="text-2xl md:text-4xl font-black tracking-tight bg-linear-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
// //                     Tasty Bites
// //                   </h1>
// //                   <p className="hidden md:block text-xs tracking-wide text-gray-500 dark:text-gray-400 font-medium">
// //                     PREMIUM FOOD EXPERIENCE
// //                   </p>
// //                 </div>
// //               </Link>

// //               {/* DESKTOP NAV LINKS */}
// //               <div className="hidden md:flex items-center gap-4 lg:gap-12">
// //                 {navLinks.map((link) => (
// //                   <motion.div key={link.name} whileHover={{ y: -2 }}>
// //                     <Link
// //                       href={link.href}
// //                       className="relative text-[15px] lg:text-[16px] font-semibold text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
// //                     >
// //                       {link.name}
// //                     </Link>
// //                   </motion.div>
// //                 ))}
// //               </div>
// //             </div>
// //             {/* AUTO-SHRINKING COMPACT SEARCH BAR */}
// //             {/* max-w adapts dynamically based on screen width changes, no more huge blocks on small screens */}
// //             <div className="flex-2 min-w-30 max-w-40 sm:max-w-55 md:max-w-70 lg:max-w-85 mx-9">
// //               <SearchBar />
// //             </div>
            

// //             {/* RIGHT SIDE */}
// //             <div className="flex items-center gap- md:gap-5">
// //               {/* CART IDEBAR TRIGGER */}
// //               <motion.div
// //                 whileHover={{ scale: 1.08 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="scale-[0.92] md:scale-100"
// //               >
// //                 <CartSidebar />
// //               </motion.div>

// //               {/* AUTH TRACKING CONTAINER ACCORDS */}
// //               {!user ? (
// //                 <Link
// //                   href="/login"
// //                   className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-linear-to-r from-orange-500 via-red-500 to-orange-600 text-white font-semibold shadow-lg hover:scale-105 transition-all"
// //                 >
// //                   <User className="w-4 h-4" />
// //                   Login
// //                 </Link>
// //               ) : (
// //                 <div className="relative hidden md:block" ref={profileRef}>
// //                   <motion.button
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                     onClick={() => setProfileOpen(!profileOpen)}
// //                     className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-linear-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-500 dark:border-orange-800 hover:shadow-lg transition-all"
// //                   >
// //                     <div className="relative">
// //                       {profileAvatarUrl ? (
// //                         <Image
// //                           src={profileAvatarUrl}
// //                           alt={userData?.name || 'User Profile Image'}
// //                           width={36}
// //                           height={36}
// //                           className="w-9 h-9 rounded-full object-cover ring-2 ring-orange-500"
// //                           unoptimized
// //                         />
// //                       ) : (
// //                         <div className="w-9 h-9 rounded-full bg-linear-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
// //                           {loading ? '...' : getInitials()}
// //                         </div>
// //                       )}
// //                       <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
// //                     </div>

// //                     <div className="text-left hidden lg:block">
// //                       <p className="text-sm font-bold text-gray-800 dark:text-white">
// //                         {loading ? 'Loading...' : getDisplayName()}
// //                       </p>
// //                       <p className="text-xs text-gray-500 dark:text-gray-400">
// //                         {userData?.role === 'admin' ? 'Admin' : 'Customer'}
// //                       </p>
// //                     </div>
// //                   </motion.button>

// //                   <AnimatePresence>
// //                     {profileOpen && (
// //                       <motion.div
// //                         initial={{ opacity: 0, y: 12, scale: 1 }}
// //                         animate={{ opacity: 1, y: 0, scale: 1 }}
// //                         exit={{ opacity: 0, y: 12, scale: 0.95 }}
// //                         transition={{ duration: 0.2 }}
// //                         className="absolute right-0 top-16 w-80 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
// //                       >
// //                         {/* PROFILE HEADER PANEL */}
// //                         <div className="bg-linear-to-r from-orange-500 via-red-500 to-orange-600 p-6 text-white">
// //                           <div className="flex items-center gap-4">
// //                             {profileAvatarUrl ? (
// //                               <Image
// //                                 src={profileAvatarUrl}
// //                                 alt={userData?.name || 'Profile User Info Thumbnail'}
// //                                 width={64}
// //                                 height={64}
// //                                 className="w-16 h-16 rounded-full object-cover ring-4 ring-white/30"
// //                                 unoptimized
// //                               />
// //                             ) : (
// //                               <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-2xl ring-4 ring-white/30">
// //                                 {getInitials()}
// //                               </div>
// //                             )}
// //                             <div>
// //                               <h3 className="font-bold text-lg truncate max-w-40">
// //                                 {userData?.name || 'User'}
// //                               </h3>
// //                               <p className="text-sm text-white/80 truncate max-w-40">
// //                                 {user?.email}
// //                               </p>
// //                               {userData?.phone && (
// //                                 <p className="text-sm text-white/70 flex items-center gap-1 mt-1">
// //                                   📱 {userData.phone}
// //                                 </p>
// //                               )}
// //                             </div>
// //                           </div>
// //                         </div>

// //                         {/* REAL-TIME ACCELERATED LIVE STATS */}
// //                         <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 dark:bg-gray-900/50">
// //                           <div className="bg-white dark:bg-gray-800 p-3 rounded-xl text-center border border-gray-100 dark:border-gray-700 shadow-xs">
// //                             <p className="text-2xl font-bold text-orange-600 font-mono">
// //                               {liveStats.totalOrders}
// //                             </p>
// //                             <p className="text-xs text-gray-500 font-medium">Orders</p>
// //                           </div>
// //                           <div className="bg-white dark:bg-gray-800 p-3 rounded-xl text-center border border-gray-100 dark:border-gray-700 shadow-xs">
// //                             <p className="text-2xl font-bold text-green-600 font-mono truncate">
// //                               ₹{liveStats.totalSpent.toLocaleString('en-IN')}
// //                             </p>
// //                             <p className="text-xs text-gray-500 font-medium">Spent</p>
// //                           </div>
// //                         </div>

// //                         {/* NAV LINKS DROPDOWN ITEMS LIST */}
// //                         <div className="p-2">
// //                           <Link
// //                             href="/myorders"
// //                             onClick={() => setProfileOpen(false)}
// //                             className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all font-medium"
// //                           >
// //                             <Package className="w-5 h-5 text-orange-500" />
// //                             My Orders
// //                           </Link>

// //                           <Link
// //                             href="/profile"
// //                             onClick={() => setProfileOpen(false)}
// //                             className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all font-medium"
// //                           >
// //                             <User className="w-5 h-5 text-purple-500" />
// //                             Profile Settings
// //                           </Link>

// //                           <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>

// //                           <button
// //                             onClick={() => {
// //                               logout();
// //                               setProfileOpen(false);
// //                             }}
// //                             className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium"
// //                           >
// //                             <LogOut className="w-5 h-5" />
// //                             Logout
// //                           </button>
// //                         </div>

// //                         {/* PANEL FOOTER DETAILED METADATA */}
// //                         <div className="bg-gray-50 dark:bg-gray-900/50 p-3 text-center border-t border-gray-100 dark:border-gray-700">
// //                           <p className="text-xs text-gray-400">
// //                             Logged in via{' '}
// //                             <span className="font-semibold text-orange-500">
// //                               {userData?.loginMethod === 'google' ? '🔍 Google' : '✉️ Email'}
// //                             </span>
// //                           </p>
// //                         </div>
// //                       </motion.div>
// //                     )}
// //                   </AnimatePresence>
// //                 </div>
// //               )}

// //               <MobileMenu />
// //             </div>
// //           </div>
// //         </div>
// //       </motion.nav>

// //       {/* FLOATING THEME TOGGLER */}
// //       <div className="fixed bottom-12 right-5 z-9999">
// //         <motion.div
// //           whileHover={{ scale: 1.08 }}
// //           whileTap={{ scale: 0.92 }}
// //           className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-full p-2"
// //         >
// //           <ThemeToggle />
// //         </motion.div>
// //       </div>
// //     </>
// //   );
// // }
// // // 'use strict';

// // // 'use client';

// // // import { useState, useEffect, useRef } from 'react';
// // // import Link from 'next/link';
// // // import Image from 'next/image';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { LogOut, User, Package } from 'lucide-react';
// // // import { doc, onSnapshot, collection, query, where } from 'firebase/firestore';
// // // import { db } from '@/app/lib/firebase';

// // // import MobileMenu from './MobileMenu';
// // // import CartSidebar from './CartSidebar';
// // // import ThemeToggle from './ThemeToggle';
// // // import SearchBar from './SearchBar'; 
// // // import { useAuth } from '../context/AuthContext';

// // // interface UserDataState {
// // //   name?: string;
// // //   email?: string;
// // //   photoURL?: string;
// // //   role?: string;
// // //   phone?: string;
// // //   loginMethod?: string;
// // // }

// // // interface UserLiveStats {
// // //   totalOrders: number;
// // //   totalSpent: number;
// // // }

// // // const allNavLinks = [
// // //   { name: 'Home', href: '/' },
// // //   { name: 'Menu', href: '/menu' },
// // //   { name: 'About', href: '/about' },
// // //   { name: 'Contact', href: '/contact' },
// // //   { name: 'Admin', href: '/admin' },
// // // ];

// // // export default function Navbar() {
// // //   const { user, logout, isAdmin } = useAuth();

// // //   const [isScrolled, setIsScrolled] = useState(false);
// // //   const [profileOpen, setProfileOpen] = useState(false);
// // //   const [userData, setUserData] = useState<UserDataState | null>(null);
// // //   const [liveStats, setLiveStats] = useState<UserLiveStats>({ totalOrders: 0, totalSpent: 0 });
// // //   const [loading, setLoading] = useState(true);

// // //   const profileRef = useRef<HTMLDivElement>(null);

// // //   const aiAvatars = [
// // //     "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
// // //     "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80",
// // //     "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
// // //   ];

// // //   const getAutoAvatar = (uid: string): string => {
// // //     if (!uid) return aiAvatars[0];
// // //     let hash = 0;
// // //     for (let i = 0; i < uid.length; i++) {
// // //       hash = uid.charCodeAt(i) + ((hash << 5) - hash);
// // //     }
// // //     const index = Math.abs(hash) % aiAvatars.length;
// // //     return aiAvatars[index];
// // //   };

// // //   const navLinks = allNavLinks.filter((link) => {
// // //     if (link.name === 'Admin') {
// // //       return isAdmin === true;
// // //     }
// // //     return true;
// // //   });

// // //   useEffect(() => {
// // //     if (!user?.uid) {
// // //       setUserData(null);
// // //       setLiveStats({ totalOrders: 0, totalSpent: 0 });
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     const userDocRef = doc(db, 'users', user.uid);
// // //     const ordersRef = collection(db, 'orders');
// // //     const ordersQuery = query(ordersRef, where('userId', '==', user.uid));

// // //     const unsubscribeUser = onSnapshot(userDocRef, (docSnapshot) => {
// // //       if (docSnapshot.exists()) {
// // //         setUserData(docSnapshot.data() as UserDataState);
// // //       }
// // //       setLoading(false);
// // //     }, (error) => {
// // //       console.error(error);
// // //       setLoading(false);
// // //     });

// // //     const unsubscribeOrders = onSnapshot(ordersQuery, (querySnapshot) => {
// // //       const totalCount = querySnapshot.size;
// // //       let computedSpentSum = 0;
// // //       querySnapshot.forEach((orderDoc) => {
// // //         const data = orderDoc.data();
// // //         computedSpentSum += Number(data.totalAmount || data.total || 0);
// // //       });
// // //       setLiveStats({ totalOrders: totalCount, totalSpent: computedSpentSum });
// // //     }, (error) => {
// // //       console.error(error);
// // //     });

// // //     return () => {
// // //       unsubscribeUser();
// // //       unsubscribeOrders();
// // //     };
// // //   }, [user]);

// // //   useEffect(() => {
// // //     const handleScroll = () => setIsScrolled(window.scrollY > 20);
// // //     window.addEventListener('scroll', handleScroll);
// // //     return () => window.removeEventListener('scroll', handleScroll);
// // //   }, []);

// // //   useEffect(() => {
// // //     function handleClickOutside(event: MouseEvent) {
// // //       if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
// // //         setProfileOpen(false);
// // //       }
// // //     }
// // //     document.addEventListener('mousedown', handleClickOutside);
// // //     return () => document.removeEventListener('mousedown', handleClickOutside);
// // //   }, []);

// // //   const profileAvatarUrl = user?.uid ? getAutoAvatar(user.uid) : aiAvatars[0];

// // //   return (
// // //     <>
// // //       <motion.nav
// // //         initial={{ y: -80 }}
// // //         animate={{ y: 0 }}
// // //         transition={{ duration: 0.4 }}
// // //         className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-100 dark:border-gray-800 ${
// // //           isScrolled
// // //             ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-sm'
// // //             : 'bg-white dark:bg-gray-900'
// // //         }`}
// // //       >
// // //         <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 xl:px-16 transition-all">
// // //           {/* MAIN FLEX BOX */}
// // //           <div className="h-16 md:h-20 flex items-center justify-between gap-2 sm:gap-4 md:gap-6">

// // //             {/* LEFT CONTAINER: LOGO + NAV LINKS */}
// // //             <div className="flex items-center gap-3 sm:gap-5 md:gap-6 shrink-0">
// // //               {/* LOGO */}
// // //               <Link href="/" className="flex items-center gap-2 shrink-0 group">
// // //                 <motion.div
// // //                   whileHover={{ rotate: -6, scale: 1.06 }}
// // //                   className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-linear-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center shadow-md"
// // //                 >
// // //                   <span className="text-xl md:text-2xl">🍕</span>
// // //                 </motion.div>

// // //                 {/* Brand Name text responsive controls */}
// // //                 <div className="leading-tight hidden sm:block">
// // //                   <h1 className="text-md md:text-lg lg:text-xl font-black tracking-tight bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
// // //                     Tasty Bites
// // //                   </h1>
// // //                 </div>
// // //               </Link>

// // //               {/* NAV LINKS: Changed from 'xl:flex' to 'md:flex' so they stay visible down to tablet/half screen sizes */}
// // //               <div className="hidden md:flex items-center gap-7 lg:gap-7">
// // //                 {navLinks.map((link) => (
// // //                   <motion.div key={link.name} whileHover={{ y: -1 }}>
// // //                     <Link
// // //                       href={link.href}
// // //                       className="relative text-[18px] lg:text-[18px] font-bold text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 transition-all duration-300"
// // //                     >
// // //                       {link.name}
// // //                     </Link>
// // //                   </motion.div>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             {/* AUTO-SHRINKING COMPACT SEARCH BAR */}
// // //             {/* max-w adapts dynamically based on screen width changes, no more huge blocks on small screens */}
// // //             <div className="flex-1 min-w-40 max-w-40 sm:max-w-55 md:max-w-70 lg:max-w-85 mx-2">
// // //               <SearchBar />
// // //             </div>

// // //             {/* RIGHT SIDE CONTAINER */}
// // //             <div className="flex items-center gap-2 md:gap-4 shrink-0">
              
// // //               {/* CART SIDEBAR */}
// // //               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
// // //                 <CartSidebar />
// // //               </motion.div>

// // //               {/* PROFILE CONTROL / LOGIN */}
// // //               {!user ? (
// // //                 <Link
// // //                   href="/login"
// // //                   className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white font-semibold shadow-sm hover:scale-102 transition-all text-xs md:text-sm"
// // //                 >
// // //                   <User className="w-3.5 h-3.5" />
// // //                   Login
// // //                 </Link>
// // //               ) : (
// // //                 <div className="relative hidden sm:block" ref={profileRef}>
// // //                   <motion.button
// // //                     whileHover={{ scale: 1.02 }}
// // //                     whileTap={{ scale: 0.98 }}
// // //                     onClick={() => setProfileOpen(!profileOpen)}
// // //                     className="flex items-center gap-2 p-1.5 md:px-3 md:py-2 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 border border-orange-100 dark:border-orange-900/50 hover:shadow-xs transition-all"
// // //                   >
// // //                     <div className="relative shrink-0">
// // //                       <Image
// // //                         src={profileAvatarUrl}
// // //                         alt="User Avatar"
// // //                         width={28}
// // //                         height={28}
// // //                         className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover ring-2 ring-orange-500"
// // //                         unoptimized
// // //                       />
// // //                     </div>
// // //                     <div className="text-left hidden lg:block">
// // //                       <p className="text-xs font-bold text-gray-800 dark:text-white max-w-[65px] truncate">
// // //                         {loading ? '...' : (userData?.name?.split(' ')[0] || user?.email?.split('@')[0])}
// // //                       </p>
// // //                     </div>
// // //                   </motion.button>

// // //                   <AnimatePresence>
// // //                     {profileOpen && (
// // //                       <motion.div
// // //                         initial={{ opacity: 0, y: 12 }}
// // //                         animate={{ opacity: 1, y: 0 }}
// // //                         exit={{ opacity: 0, y: 12 }}
// // //                           transition={{ duration: 0.2 }}
// // //                         className="absolute right-0 top-16 w-80 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
// // //                       >
// // //                         <div className="bg-linear-to-r from-orange-500 to-red-500 p-4 text-white">
// // //                           <h3 className="font-bold truncate">{userData?.name || 'User'}</h3>
// // //                           <p className="text-xs text-white/80 truncate">{user?.email}</p>
// // //                         </div>

// // //                         <div className="p-3 bg-gray-50 dark:bg-gray-900/50 grid grid-cols-2 gap-2 text-center text-xs border-b border-gray-100 dark:border-gray-800">
// // //                           <div>
// // //                             <p className="font-bold text-orange-600">{liveStats.totalOrders}</p>
// // //                             <p className="text-[10px] text-gray-400">Orders</p>
// // //                           </div>
// // //                           <div>
// // //                             <p className="font-bold text-green-600 truncate">₹{liveStats.totalSpent}</p>
// // //                             <p className="text-[10px] text-gray-400">Spent</p>
// // //                           </div>
// // //                         </div>

// // //                         <div className="p-1.5">
// // //                           <Link href="/myorders" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
// // //                             <Package className="w-4 h-4 text-orange-500" /> My Orders
// // //                           </Link>
// // //                           <Link href="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
// // //                             <User className="w-4 h-4 text-purple-500" /> Profile
// // //                           </Link>
// // //                           <button onClick={() => { logout(); setProfileOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 text-left">
// // //                             <LogOut className="w-4 h-4" /> Logout
// // //                           </button>
// // //                         </div>
// // //                       </motion.div>
// // //                     )}
// // //                   </AnimatePresence>
// // //                 </div>
// // //               )}

// // //               {/* MOBILE MENU HAMBURGER: Displays automatically below 'md' (768px) breakpoint */}
// // //               <div className="md:hidden">
// // //                 <MobileMenu />
// // //               </div>

// // //             </div>
// // //           </div>
// // //         </div>
// // //       </motion.nav>
    
// // //    {/* FLOATING THEME TOGGLER */}
// // //       <div className="fixed bottom-12 right-5 z-9999">
// // //         <motion.div
// // //           whileHover={{ scale: 1.08 }}
// // //           whileTap={{ scale: 0.92 }}
// // //           className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-full p-2"
// // //         >
// // //           <ThemeToggle />
// // //         </motion.div>
// // //       </div>
// // //     </>
// // //   );
// // // }
// 'use strict';

// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { LogOut, User, Package } from 'lucide-react';
// import { doc, onSnapshot, collection, query, where } from 'firebase/firestore';
// import { db } from '@/lib/firebase';

// import MobileMenu from './MobileMenu';
// import CartSidebar from './CartSidebar';
// import ThemeToggle from './ThemeToggle';
// import SearchBar from './SearchBar';
// import { useAuth } from '../context/AuthContext';

// // Explicit strict typing interfaces for component safety
// interface UserDataState {
//   name?: string;
//   email?: string;
//   photoURL?: string;
//   role?: string;
//   phone?: string;
//   loginMethod?: string;
// }

// interface UserLiveStats {
//   totalOrders: number;
//   totalSpent: number;
// }

// // ORIGINAL NAV LINKS
// const allNavLinks = [
//   { name: 'Home', href: '/' },
//   { name: 'Menu', href: '/menu' },
//   { name: 'About', href: '/about' },
//   { name: 'Contact', href: '/contact' },
//   { name: 'Admin', href: '/admin' },
// ];

// export default function Navbar() {
//   const { user, logout, isAdmin } = useAuth();

//   const [isScrolled, setIsScrolled] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [userData, setUserData] = useState<UserDataState | null>(null);
//   const [liveStats, setLiveStats] = useState<UserLiveStats>({ totalOrders: 0, totalSpent: 0 });
//   const [loading, setLoading] = useState(true);

//   const profileRef = useRef<HTMLDivElement>(null);

//   // 6 Premium FamPay-Style AI Avatars List Matching Logic
//   const aiAvatars = [
//     "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
//     "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80",
//     "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
//     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
//     "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80",
//     "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&h=150&q=80"
//   ];

//   const getAutoAvatar = (uid: string): string => {
//     if (!uid) return aiAvatars[0];
//     let hash = 0;
//     for (let i = 0; i < uid.length; i++) {
//       hash = uid.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     const index = Math.abs(hash) % aiAvatars.length;
//     return aiAvatars[index];
//   };

//   // FILTER NAV LINKS BASED ON ROLE
//   const navLinks = allNavLinks.filter((link) => {
//     if (link.name === 'Admin') {
//       return isAdmin === true;
//     }
//     return true;
//   });

//   // REAL-TIME FIRESTORE PROFILE STREAM + LIVE STATS REALTIME SYNC
//   useEffect(() => {
//     if (!user?.uid) {
//       setUserData(null);
//       setLiveStats({ totalOrders: 0, totalSpent: 0 });
//       setLoading(false);
//       return;
//     }

//     const userDocRef = doc(db, 'users', user.uid);
//     const ordersRef = collection(db, 'orders');
//     const ordersQuery = query(ordersRef, where('userId', '==', user.uid));

//     // Stream 1: User Profile Document Live Subscriptions
//     const unsubscribeUser = onSnapshot(userDocRef, (docSnapshot) => {
//       if (docSnapshot.exists()) {
//         setUserData(docSnapshot.data() as UserDataState);
//       }
//       setLoading(false);
//     }, (error) => {
//       console.error('Error listening to user profile changes:', error);
//       setLoading(false);
//     });

//     // Stream 2: Dynamic Live Order & Amount Calculation Streams
//     const unsubscribeOrders = onSnapshot(ordersQuery, (querySnapshot) => {
//       const totalCount = querySnapshot.size;
//       let computedSpentSum = 0;

//       querySnapshot.forEach((orderDoc) => {
//         const data = orderDoc.data();
//         const cashValue = Number(data.totalAmount || data.total || data.amount || 0);
//         computedSpentSum += cashValue;
//       });

//       setLiveStats({
//         totalOrders: totalCount,
//         totalSpent: computedSpentSum
//       });
//     }, (error) => {
//       console.error('Error listening to orders snapshot stream:', error);
//     });

//     return () => {
//       unsubscribeUser();
//       unsubscribeOrders();
//     };
//   }, [user]);

//   // GET USER INITIALS
//   const getInitials = () => {
//     if (userData?.name) {
//       const names = userData.name.split(' ');
//       if (names.length >= 2) {
//         return (names[0][0] + names[1][0]).toUpperCase();
//       }
//       return userData.name.substring(0, 2).toUpperCase();
//     }
//     return user?.email?.substring(0, 2).toUpperCase() || 'U';
//   };

//   // GET DISPLAY NAME
//   const getDisplayName = () => {
//     if (userData?.name) {
//       return userData.name.split(' ')[0];
//     }
//     return user?.email?.split('@')[0] || 'User';
//   };

//   // SCROLL TRIGGER DETECTOR
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // CLOSE PROFILE DROPDOWN OUTSIDE HANDLER
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         profileRef.current &&
//         !profileRef.current.contains(event.target as Node)
//       ) {
//         setProfileOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const profileAvatarUrl = user?.uid ? getAutoAvatar(user.uid) : aiAvatars[0];

//   return (
//     <>
//       {/* NAVBAR */}
//       <motion.nav
//         initial={{ y: -80 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.4 }}
//         className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-100 dark:border-gray-800 ${
//           isScrolled
//             ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-lg'
//             : 'bg-white dark:bg-gray-900'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="h-16 md:h-20 flex items-center justify-between gap-4">

//             {/* LEFT SIDE: LOGO & DESKTOP NAV */}
//             <div className="flex items-center gap-6 lg:gap-8 shrink-0">
//               {/* LOGO */}
//               <Link href="/" className="flex items-center gap-2 group">
//                 <motion.div
//                   whileHover={{ rotate: -6, scale: 1.06 }}
//                   className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-linear-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center shadow-lg shrink-0"
//                 >
//                   <span className="text-xl md:text-2xl">🍕</span>
//                 </motion.div>

//                 <div className="leading-tight hidden sm:block">
//                   <h1 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight bg-linear-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
//                     Tasty Bites
//                   </h1>
//                   <p className="hidden md:block text-[10px] tracking-wide text-gray-500 dark:text-gray-400 font-medium">
//                     PREMIUM FOOD EXPERIENCE
//                   </p>
//                 </div>
//               </Link>

//               {/* DESKTOP NAV LINKS */}
//               <div className="hidden md:flex items-center gap-6 lg:gap-8">
//                 {navLinks.map((link) => (
//                   <motion.div key={link.name} whileHover={{ y: -2 }}>
//                     <Link
//                       href={link.href}
//                       className="relative text-[15px] lg:text-[16px] font-semibold text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
//                     >
//                       {link.name}
//                     </Link>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* MIDDLE: AUTO-SHRINKING COMPACT SEARCH BAR */}
//             <div className="flex-1 max-w-xs md:max-w-md mx-2 sm:mx-4">
//               <SearchBar />
//             </div>

//             {/* RIGHT SIDE: CART, PROFILE & MOBILE MENU */}
//             <div className="flex items-center gap-2 sm:gap-4 shrink-0">
//               {/* CART SIDEBAR TRIGGER */}
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="flex items-center justify-center"
//               >
//                 <CartSidebar />
//               </motion.div>

//               {/* AUTH TRACKING CONTAINER */}
//               {!user ? (
//                 <Link
//                   href="/login"
//                   className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-orange-500 via-red-500 to-orange-600 text-white font-semibold shadow-lg hover:scale-105 transition-all text-sm"
//                 >
//                   <User className="w-4 h-4" />
//                   Login
//                 </Link>
//               ) : (
//                 <div className="relative hidden md:block" ref={profileRef}>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setProfileOpen(!profileOpen)}
//                     className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-linear-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800/50 hover:shadow-md transition-all"
//                   >
//                     <div className="relative shrink-0">
//                       {profileAvatarUrl ? (
//                         <Image
//                           src={profileAvatarUrl}
//                           alt={userData?.name || 'User Profile Image'}
//                           width={32}
//                           height={32}
//                           className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-500"
//                           unoptimized
//                         />
//                       ) : (
//                         <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
//                           {loading ? '...' : getInitials()}
//                         </div>
//                       )}
//                       <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
//                     </div>

//                     <div className="text-left hidden lg:block max-w-25">
//                       <p className="text-xs font-bold text-gray-800 dark:text-white truncate">
//                         {loading ? 'Loading...' : getDisplayName()}
//                       </p>
//                       <p className="text-[10px] text-gray-500 dark:text-gray-400 capitalize">
//                         {userData?.role === 'admin' ? 'Admin' : 'Customer'}
//                       </p>
//                     </div>
//                   </motion.button>

//                   <AnimatePresence>
//                     {profileOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 12, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: 12, scale: 0.95 }}
//                         transition={{ duration: 0.2 }}
//                         className="absolute right-0 top-14 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
//                       >
//                         {/* PROFILE HEADER PANEL */}
//                         <div className="bg-linear-to-r from-orange-500 via-red-500 to-orange-600 p-5 text-white">
//                           <div className="flex items-center gap-3">
//                             {profileAvatarUrl ? (
//                               <Image
//                                 src={profileAvatarUrl}
//                                 alt={userData?.name || 'Profile User Info Thumbnail'}
//                                 width={56}
//                                 height={56}
//                                 className="w-14 h-14 rounded-full object-cover ring-4 ring-white/30 shrink-0"
//                                 unoptimized
//                               />
//                             ) : (
//                               <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl ring-4 ring-white/30 shrink-0">
//                                 {getInitials()}
//                               </div>
//                             )}
//                             <div className="overflow-hidden">
//                               <h3 className="font-bold text-base truncate">
//                                 {userData?.name || 'User'}
//                               </h3>
//                               <p className="text-xs text-white/80 truncate">
//                                 {user?.email}
//                               </p>
//                               {userData?.phone && (
//                                 <p className="text-xs text-white/70 flex items-center gap-1 mt-0.5">
//                                   📱 {userData.phone}
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         </div>

//                         {/* REAL-TIME ACCELERATED LIVE STATS */}
//                         <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 dark:bg-gray-900/50">
//                           <div className="bg-white dark:bg-gray-800 p-2 rounded-xl text-center border border-gray-100 dark:border-gray-700 shadow-xs">
//                             <p className="text-xl font-bold text-orange-600 font-mono">
//                               {liveStats.totalOrders}
//                             </p>
//                             <p className="text-[10px] text-gray-500 font-medium">Orders</p>
//                           </div>
//                           <div className="bg-white dark:bg-gray-800 p-2 rounded-xl text-center border border-gray-100 dark:border-gray-700 shadow-xs overflow-hidden">
//                             <p className="text-xl font-bold text-green-600 font-mono truncate">
//                               ₹{liveStats.totalSpent.toLocaleString('en-IN')}
//                             </p>
//                             <p className="text-[10px] text-gray-500 font-medium">Spent</p>
//                           </div>
//                         </div>

//                         {/* NAV LINKS DROPDOWN ITEMS LIST */}
//                         <div className="p-1.5">
//                           <Link
//                             key="myorders-link"
//                             href="/myorders"
//                             onClick={() => setProfileOpen(false)}
//                             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all font-medium"
//                           >
//                             <Package className="w-4 h-4 text-orange-500" />
//                             My Orders
//                           </Link>

//                           <Link
//                             key="profile-settings-link"
//                             href="/profile"
//                             onClick={() => setProfileOpen(false)}
//                             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all font-medium"
//                           >
//                             <User className="w-4 h-4 text-purple-500" />
//                             Profile Settings
//                           </Link>

//                           <div className="border-t border-gray-100 dark:border-gray-700 my-1.5"></div>

//                           <button
//                             onClick={() => {
//                               logout();
//                               setProfileOpen(false);
//                             }}
//                             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium"
//                           >
//                             <LogOut className="w-4 h-4" />
//                             Logout
//                           </button>
//                         </div>

//                         {/* PANEL FOOTER DETAILED METADATA */}
//                         <div className="bg-gray-50 dark:bg-gray-900/50 p-2 text-center border-t border-gray-100 dark:border-gray-700">
//                           <p className="text-[10px] text-gray-400">
//                             Logged in via{' '}
//                             <span className="font-semibold text-orange-500">
//                               {userData?.loginMethod === 'google' ? '🔍 Google' : '✉️ Email'}
//                             </span>
//                           </p>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               )}

//               {/* MOBILE MENU TRIGGER */}
//               <div className="md:hidden flex items-center">
//                 <MobileMenu />
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.nav>

//       {/* FLOATING THEME TOGGLER */}
//       <div className="fixed bottom-12 right-5 z-50">
//         <motion.div
//           whileHover={{ scale: 1.08 }}
//           whileTap={{ scale: 0.92 }}
//           className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-full p-2"
//         >
//           <ThemeToggle />
//         </motion.div>
//       </div>
//     </>
//   );
// }
'use strict';

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, Package } from 'lucide-react';
import { doc, onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

import MobileMenu from './MobileMenu';
import CartSidebar from './CartSidebar';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import { useAuth } from '../context/AuthContext';

interface UserDataState {
  name?: string;
  email?: string;
  photoURL?: string;
  role?: string;
  phone?: string;
  loginMethod?: string;
}

interface UserLiveStats {
  totalOrders: number;
  totalSpent: number;
}

const allNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Admin', href: '/admin' },
];

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userData, setUserData] = useState<UserDataState | null>(null);
  const [liveStats, setLiveStats] = useState<UserLiveStats>({ totalOrders: 0, totalSpent: 0 });
  const [loading, setLoading] = useState(true);

  const profileRef = useRef<HTMLDivElement>(null);

  const aiAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80",
    "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&h=150&q=80"
  ];

  const getAutoAvatar = (uid: string): string => {
    if (!uid) return aiAvatars[0];
    let hash = 0;
    for (let i = 0; i < uid.length; i++) {
      hash = uid.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % aiAvatars.length;
    return aiAvatars[index];
  };

  const navLinks = allNavLinks.filter((link) => {
    if (link.name === 'Admin') {
      return isAdmin === true;
    }
    return true;
  });

  // 🌟 FIX: Defer state updates out of the main rendering thread execution path
  useEffect(() => {
    if (!user) {
      const resetTimer = setTimeout(() => {
        setUserData(null);
        setLiveStats({ totalOrders: 0, totalSpent: 0 });
        setLoading(false);
      }, 0);

      return () => clearTimeout(resetTimer);
    }
  }, [user]);

  // 🌟 EFFECT 2: REAL-TIME FIRESTORE PROFILE STREAM + LIVE STATS
  useEffect(() => {
    if (!user?.uid) return;

    const userDocRef = doc(db, 'users', user.uid);
    const ordersRef = collection(db, 'orders');
    const ordersQuery = query(ordersRef, where('userId', '==', user.uid));

    const unsubscribeUser = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setUserData(docSnapshot.data() as UserDataState);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error listening to user profile changes:', error);
      setLoading(false);
    });

    const unsubscribeOrders = onSnapshot(ordersQuery, (querySnapshot) => {
      const totalCount = querySnapshot.size;
      let computedSpentSum = 0;

      querySnapshot.forEach((orderDoc) => {
        const data = orderDoc.data();
        const cashValue = Number(data.totalAmount || data.total || data.amount || 0);
        computedSpentSum += cashValue;
      });

      setLiveStats({
        totalOrders: totalCount,
        totalSpent: computedSpentSum
      });
    }, (error) => {
      console.error('Error listening to orders snapshot stream:', error);
    });

    return () => {
      unsubscribeUser();
      unsubscribeOrders();
    };
  }, [user?.uid]);

  const getInitials = () => {
    if (userData?.name) {
      const names = userData.name.split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[1][0]).toUpperCase();
      }
      return userData.name.substring(0, 2).toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'U';
  };

  const getDisplayName = () => {
    if (userData?.name) {
      return userData.name.split(' ')[0];
    }
    return user?.email?.split('@')[0] || 'User';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const profileAvatarUrl = user?.uid ? getAutoAvatar(user.uid) : aiAvatars[0];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-100 dark:border-gray-800 ${
          isScrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-lg'
            : 'bg-white dark:bg-gray-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 md:h-20 flex items-center justify-between gap-4">

            {/* LOGO AREA */}
            <div className="flex items-center gap-6 lg:gap-8 shrink-0">
              <Link href="/" className="flex items-center gap-2 group">
                <motion.div
                  whileHover={{ rotate: -6, scale: 1.06 }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-linear-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center shadow-lg shrink-0"
                >
                  <span className="text-xl md:text-2xl">🍕</span>
                </motion.div>
                <div className="leading-tight hidden sm:block">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight bg-linear-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
                     Tasty Bites
                  </h1>
                  <p className="hidden md:block text-[10px] tracking-wide text-gray-500 dark:text-gray-400 font-medium">
                    PREMIUM FOOD EXPERIENCE
                  </p>
                </div>
              </Link>

              {/* NAV MENU */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                {navLinks.map((link) => (
                  <motion.div key={link.name} whileHover={{ y: -2 }}>
                    <Link
                      href={link.href}
                      className="relative text-[15px] lg:text-[16px] font-semibold text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* SEARCH */}
            <div className="flex-1 max-w-xs md:max-w-md mx-2 sm:mx-4">
              <SearchBar />
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <CartSidebar />
              </motion.div>

              {!user ? (
                <Link
                  href="/login"
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-orange-500 via-red-500 to-orange-600 text-white font-semibold shadow-lg hover:scale-105 transition-all text-sm"
                >
                  <User className="w-4 h-4" />
                  Login
                </Link>
              ) : (
                <div className="relative hidden md:block" ref={profileRef}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-linear-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800/50 hover:shadow-md transition-all"
                  >
                    <div className="relative shrink-0">
                      {profileAvatarUrl ? (
                        <Image
                          src={profileAvatarUrl}
                          alt={userData?.name || 'User Profile'}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-500"
                          unoptimized
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                          {loading ? '...' : getInitials()}
                        </div>
                      )}
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                    </div>
                    <div className="text-left hidden lg:block max-w-25">
                      <p className="text-xs font-bold text-gray-800 dark:text-white truncate">
                        {loading ? 'Loading...' : getDisplayName()}
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 capitalize">
                        {userData?.role === 'admin' ? 'Admin' : 'Customer'}
                      </p>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-14 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                      >
                        <div className="bg-linear-to-r from-orange-500 via-red-500 to-orange-600 p-5 text-white">
                          <div className="flex items-center gap-3">
                            {profileAvatarUrl ? (
                              <Image
                                src={profileAvatarUrl}
                                alt={userData?.name || 'Profile Thumbnail'}
                                width={56}
                                height={56}
                                className="w-14 h-14 rounded-full object-cover ring-4 ring-white/30 shrink-0"
                                unoptimized
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl ring-4 ring-white/30 shrink-0">
                                {getInitials()}
                              </div>
                            )}
                            <div className="overflow-hidden">
                              <h3 className="font-bold text-base truncate">
                                {userData?.name || 'User'}
                              </h3>
                              <p className="text-xs text-white/80 truncate">
                                {user?.email}
                              </p>
                              {userData?.phone && (
                                <p className="text-xs text-white/70 flex items-center gap-1 mt-0.5">
                                  📱 {userData.phone}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* LIVE METRICS */}
                        <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 dark:bg-gray-900/50">
                          <div className="bg-white dark:bg-gray-800 p-2 rounded-xl text-center border border-gray-100 dark:border-gray-700 shadow-xs">
                            <p className="text-xl font-bold text-orange-600 font-mono">
                              {liveStats.totalOrders}
                            </p>
                            <p className="text-[10px] text-gray-500 font-medium">Orders</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-2 rounded-xl text-center border border-gray-100 dark:border-gray-700 shadow-xs overflow-hidden">
                            <p className="text-xl font-bold text-green-600 font-mono truncate">
                              ₹{liveStats.totalSpent.toLocaleString('en-IN')}
                            </p>
                            <p className="text-[10px] text-gray-500 font-medium">Spent</p>
                          </div>
                        </div>

                        {/* PANEL OPTIONS */}
                        <div className="p-1.5">
                          <Link
                            href="/myorders"
                            onClick={() => setProfileOpen(false)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all font-medium"
                          >
                            <Package className="w-4 h-4 text-orange-500" />
                            My Orders
                          </Link>

                          <Link
                            href="/profile"
                            onClick={() => setProfileOpen(false)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all font-medium"
                          >
                            <User className="w-4 h-4 text-purple-500" />
                            Profile Settings
                          </Link>

                          <div className="border-t border-gray-100 dark:border-gray-700 my-1.5"></div>

                          <button
                            onClick={() => {
                              logout();
                              setProfileOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900/50 p-2 text-center border-t border-gray-100 dark:border-gray-700">
                          <p className="text-[10px] text-gray-400">
                            Logged in via{' '}
                            <span className="font-semibold text-orange-500">
                              {userData?.loginMethod === 'google' ? '🔍 Google' : '✉️ Email'}
                            </span>
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div className="md:hidden flex items-center">
                <MobileMenu />
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="fixed bottom-12 right-5 z-50">
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-full p-2"
        >
          <ThemeToggle />
        </motion.div>
      </div>
    </>
  );
}