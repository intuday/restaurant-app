// // 'use client';

// // import { useState } from 'react';
// // import Link from 'next/link';

// // import {
// //   Menu,
// //   // Search,
// //   User,
// // } from 'lucide-react';

// // import {
// //   Sheet,
// //   SheetContent,
// //   SheetDescription,
// //   SheetHeader,
// //   SheetTitle,
// //   SheetTrigger,
// // } from '@/components/ui/sheet';

// // import { Button } from '@/components/ui/button';

// // import { useAuth } from '../context/AuthContext';

// // interface MobileMenuProps {
// //   onSearchOpen?: () => void;
// // }

// // export default function MobileMenu({
// //   // onSearchOpen,
// // }: MobileMenuProps) {
// //   const [isOpen, setIsOpen] = useState(false);

// //   const { user, logout } = useAuth();

// //   const menuItems = [
// //     {
// //       name: 'Home',
// //       href: '/',
// //     },
// //     {
// //       name: 'Menu',
// //       href: '/menu',
// //     },
// //     {
// //       name: 'About',
// //       href: '/about',
// //     },
// //     {
// //       name: 'Contact',
// //       href: '/contact',
// //     },
// //     {
// //       name: 'Admin',
// //       href: '/admin',
// //     },
// //   ];

// //   return (
// //     <Sheet open={isOpen} onOpenChange={setIsOpen}>
// //       {/* MENU BUTTON */}
// //       <SheetTrigger asChild>
// //         <Button
// //           variant="outline"
// //           size="icon"
// //           className="md:hidden h-10 w-10 rounded-xl border-gray-200 dark:border-gray-700"
// //         >
// //           <Menu className="w-5 h-5" />
// //         </Button>
// //       </SheetTrigger>

// //       {/* SIDEBAR */}
// //       <SheetContent
// //         side="left"
// //         className="w-[85%] max-w-[320px] h-full p-0 flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
// //       >
// //         {/* HEADER */}
// //         <SheetHeader className="px-5 py-5 border-b border-gray-100 dark:border-gray-800">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               {/* LOGO */}
// //               <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-orange-500 via-red-500 to-orange-600 flex items-center justify-center shadow-lg">
// //                 <span className="text-xl">
// //                   🍕
// //                 </span>
// //               </div>

// //               {/* BRAND */}
// //               <div className="text-left">
// //                 <SheetTitle className="text-xl font-black tracking-tight bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
// //                   Tasty Bites
// //                 </SheetTitle>

// //                 <SheetDescription className="text-xs text-gray-500 dark:text-gray-400">
// //                   Premium Food Experience
// //                 </SheetDescription>
// //               </div>
// //             </div>
// //           </div>
// //         </SheetHeader>

// //         {/* CONTENT */}
// //         <div className="flex-1 overflow-y-auto px-3 py-4">
// //           {/* SEARCH BUTTON */}
// //           {/* <button
// //             onClick={() => {
// //               onSearchOpen?.();
// //               setIsOpen(false);
// //             }}
// //             className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-orange-50 dark:bg-gray-800 text-orange-600 font-semibold mb-5 hover:bg-orange-100 dark:hover:bg-gray-700 transition-all"
// //           >
// //             <Search className="w-5 h-5" />
// //             Search Foods
// //           </button> */}

// //           {/* MAIN MENU */}
// //           <div className="space-y-1">
// //             <p className="px-3 mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
// //               Navigation
// //             </p>

// //             {menuItems.map((item) => (
// //               <Link
// //                 key={item.name}
// //                 href={item.href}
// //                 onClick={() => setIsOpen(false)}
// //                 className="
// //                   group
// //                   relative
// //                   flex
// //                   items-center
// //                   px-4
// //                   py-3
// //                   rounded-2xl
// //                   text-[15px]
// //                   font-semibold
// //                   text-gray-700
// //                   dark:text-gray-200
// //                   transition-all
// //                   duration-300
// //                   hover:bg-orange-50
// //                   dark:hover:bg-gray-800
// //                   hover:text-orange-600
// //                 "
// //               >
// //                 <span className="
// //                   absolute
// //                   left-0
// //                   top-1/2
// //                   -translate-y-1/2
// //                   h-6
// //                   w-1
// //                   rounded-r-full
// //                   bg-orange-500
// //                   opacity-0
// //                   group-hover:opacity-100
// //                   transition-all
// //                 " />

// //                 {item.name}
// //               </Link>
// //             ))}
// //           </div>

// //           {/* USER SECTION */}
// //           <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-5 px-2">
// //             {!user ? (
// //               <Link
// //                 href="/login"
// //                 onClick={() => setIsOpen(false)}
// //                 className="
// //                   flex
// //                   items-center
// //                   justify-center
// //                   gap-2
// //                   w-full
// //                   py-3
// //                   rounded-2xl
// //                   bg-gradient-to-red
// //                   from-orange-500
// //                   to-red-500
// //                   text-white
// //                   font-semibold
// //                   shadow-lg
// //                 "
// //               >
// //                 <User className="w-4 h-4" />
// //                 Login
// //               </Link>
// //             ) : (
// //               <div className="space-y-4">
// //                 {/* USER INFO */}
// //                 <div className="flex items-center gap-3">
// //                   <div className="w-11 h-11 rounded-full bg-gradient-to-bred from-orange-500 to-red-500 flex items-center justify-center text-white font-bold uppercase">
// //                     {user.email?.charAt(0)}
// //                   </div>

// //                   <div className="overflow-hidden">
// //                     <p className="font-semibold text-gray-800 dark:text-white">
// //                       Welcome Back 👋
// //                     </p>

// //                     <p className="text-sm text-gray-500 truncate">
// //                       {user.email}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {/* LOGOUT */}
// //                 <button
// //                   onClick={() => {
// //                     logout();
// //                     setIsOpen(false);
// //                   }}
// //                   className="
// //                     w-full
// //                     py-3
// //                     rounded-2xl
// //                     bg-red-500
// //                     hover:bg-red-600
// //                     text-white
// //                     font-semibold
// //                     transition-all
// //                   "
// //                 >
// //                   Logout
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* FOOTER */}
// //         <div className="border-t border-gray-100 dark:border-gray-800 px-5 py-4 text-xs text-gray-500 dark:text-gray-400">
// //           © 2026 Tasty Bites
// //         </div>
// //       </SheetContent>
// //     </Sheet>
// //   );
// // }
// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// import {
//   Menu,
//   User,
// } from 'lucide-react';

// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from '@/components/ui/sheet';

// import { Button } from '@/components/ui/button';

// import { useAuth } from '../context/AuthContext';

// interface MobileMenuProps {
//   onSearchOpen?: () => void;
// }

// // ✅ ALL MENU ITEMS
// const allMenuItems = [
//   { name: 'Home', href: '/' },
//   { name: 'Menu', href: '/menu' },
//   {name: 'My Orders', href: '/myorders' },
//   { name: 'About', href: '/about' },
//   { name: 'Contact', href: '/contact' },
//   { name: 'Admin', href: '/admin' },
//    {name: 'Profile', href: '/profile' },
// ];

// export default function MobileMenu({}: MobileMenuProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   const { user, logout, isAdmin } = useAuth(); // ✅ Get isAdmin

//   // ✅ FILTER MENU ITEMS BASED ON ROLE
//   const menuItems = allMenuItems.filter((item) => {
//     if (item.name === 'Admin') {
//       return isAdmin === true; // ✅ Only show to admins
//     }
//     return true; // ✅ Show all other items
//   });

//   return (
//     <Sheet open={isOpen} onOpenChange={setIsOpen}>
//       {/* MENU BUTTON */}
//       <SheetTrigger asChild>
//         <Button
//           variant="outline"
//           size="icon"
//           className="md:hidden h-10 w-10 rounded-xl border-gray-200 dark:border-gray-700"
//         >
//           <Menu className="w-5 h-5" />
//         </Button>
//       </SheetTrigger>

//       {/* SIDEBAR */}
//       <SheetContent
//         side="left"
//         className="w-[85%] max-w-[320px] h-full p-0 flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
//       >
//         {/* HEADER */}
//         <SheetHeader className="px-5 py-5 border-b border-gray-100 dark:border-gray-800">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               {/* LOGO */}
//               <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-orange-500 via-red-500 to-orange-600 flex items-center justify-center shadow-lg">
//                 <span className="text-xl">
//                   🍕
//                 </span>
//               </div>

//               {/* BRAND */}
//               <div className="text-left">
//                 <SheetTitle className="text-xl font-black tracking-tight bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
//                   Tasty Bites
//                 </SheetTitle>

//                 <SheetDescription className="text-xs text-gray-500 dark:text-gray-400">
//                   Premium Food Experience
//                 </SheetDescription>
//               </div>
//             </div>
//           </div>
//         </SheetHeader>

//         {/* CONTENT */}
//         <div className="flex-1 overflow-y-auto px-3 py-4">
//           {/* MAIN MENU - ✅ NOW FILTERED */}
//           <div className="space-y-1">
//             <p className="px-3 mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
//               Navigation
//             </p>

//             {menuItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 onClick={() => setIsOpen(false)}
//                 className="
//                   group
//                   relative
//                   flex
//                   items-center
//                   px-4
//                   py-3
//                   rounded-2xl
//                   text-[15px]
//                   font-semibold
//                   text-gray-700
//                   dark:text-gray-200
//                   transition-all
//                   duration-300
//                   hover:bg-orange-50
//                   dark:hover:bg-gray-800
//                   hover:text-orange-600
//                 "
//               >
//                 <span className="
//                   absolute
//                   left-0
//                   top-1/2
//                   -translate-y-1/2
//                   h-6
//                   w-1
//                   rounded-r-full
//                   bg-orange-500
//                   opacity-0
//                   group-hover:opacity-100
//                   transition-all
//                 " />

//                 {item.name}
//               </Link>
//             ))}
//           </div>

//           {/* USER SECTION */}
//           <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-5 px-2">
//             {!user ? (
//               <Link
//                 href="/login"
//                 onClick={() => setIsOpen(false)}
//                 className="
//                   flex
//                   items-center
//                   justify-center
//                   gap-2
//                   w-full
//                   py-3
//                   rounded-2xl
//                   bg-gradient-to-r
//                   from-orange-500
//                   to-red-500
//                   text-white
//                   font-semibold
//                   shadow-lg
//                 "
//               >
//                 <User className="w-4 h-4" />
//                 Login
//               </Link>
//             ) : (
//               <div className="space-y-4">
//                 {/* USER INFO */}
//                 <div className="flex items-center gap-3">
//                   <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold uppercase">
//                     {user.email?.charAt(0)}
//                   </div>

//                   <div className="overflow-hidden">
//                     <p className="font-semibold text-gray-800 dark:text-white">
//                       Welcome 👋
//                     </p>

//                     <p className="text-sm text-gray-500 truncate">
//                       {user.email}
//                     </p>
//                   </div>
//                 </div>

//                 {/* LOGOUT */}
//                 <button
//                   onClick={() => {
//                     logout();
//                     setIsOpen(false);
//                   }}
//                   className="
//                     w-full
//                     py-3
//                     rounded-2xl
//                     bg-red-500
//                     hover:bg-red-600
//                     text-white
//                     font-semibold
//                     transition-all
//                   "
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* FOOTER */}
//         <div className="border-t border-gray-100 dark:border-gray-800 px-5 py-4 text-xs text-gray-500 dark:text-gray-400">
//           © 2026 Tasty Bites
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }
'use strict';

'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
  Menu,
  User,
} from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar'; // Added SearchBar Import Injection

interface MobileMenuProps {
  onSearchOpen?: () => void;
}

// ✅ ALL MENU ITEMS
const allMenuItems = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'My Orders', href: '/myorders' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Admin', href: '/admin' },
  { name: 'Profile', href: '/profile' },
];

export default function MobileMenu({}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth(); // ✅ Get isAdmin

  // ✅ FILTER MENU ITEMS BASED ON ROLE
  const menuItems = allMenuItems.filter((item) => {
    if (item.name === 'Admin') {
      return isAdmin === true; // ✅ Only show to admins
    }
    return true; // ✅ Show all other items
  });

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* MENU BUTTON */}
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden h-10 w-10 rounded-xl border-gray-200 dark:border-gray-700"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      {/* SIDEBAR */}
      <SheetContent
        side="left"
        className="w-[85%] max-w-[320px] h-full p-0 flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-9999"
      >
        {/* HEADER */}
        <SheetHeader className="px-5 py-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* LOGO */}
              <div className="w-11 h-11 rounded-2xl bg-linear-to-b from-orange-500 via-red-500 to-orange-600 flex items-center justify-center shadow-lg">
                <span className="text-xl">🍕</span>
              </div>

              {/* BRAND */}
              <div className="text-left">
                <SheetTitle className="text-xl font-black tracking-tight bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Tasty Bites
                </SheetTitle>

                <SheetDescription className="text-xs text-gray-500 dark:text-gray-400">
                  Premium Food Experience
                </SheetDescription>
              </div>
            </div>
          </div>
        </SheetHeader>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          
          {/* SEARCH INNER PANEL WRAPPER - Added inside mobile menu drawer */}
          {/* <div className="px-2">
            <p className="px-1 mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              Quick Search
            </p>
            {/* Direct injection closing modal on choosing suggestion */}
            
  

          {/* MAIN MENU */}
          <div className="space-y-1">
            <p className="px-3 mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              Navigation
            </p>

            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="
                  group
                  relative
                  flex
                  items-center
                  px-4
                  py-3
                  rounded-2xl
                  text-[15px]
                  font-semibold
                  text-gray-700
                  dark:text-gray-200
                  transition-all
                  duration-300
                  hover:bg-orange-50
                  dark:hover:bg-gray-800
                  hover:text-orange-600
                "
              >
                <span className="
                  absolute
                  left-0
                  top-1/2
                  -translate-y-1/2
                  h-6
                  w-1
                  rounded-r-full
                  bg-orange-500
                  opacity-0
                  group-hover:opacity-100
                  transition-all
                " />
                {item.name}
              </Link>
            ))}
          </div>

          {/* USER SECTION */}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-5 px-2">
            {!user ? (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  w-full
                  py-3
                  rounded-2xl
                  bg-linear-to-r
                  from-orange-500
                  to-red-500
                  text-white
                  font-semibold
                  shadow-lg
                "
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            ) : (
              <div className="space-y-4">
                {/* USER INFO */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold uppercase">
                    {user.email?.charAt(0)}
                  </div>

                  <div className="overflow-hidden">
                    <p className="font-semibold text-gray-800 dark:text-white">
                      Welcome 👋
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* LOGOUT */}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="
                    w-full
                    py-3
                    rounded-2xl
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    font-semibold
                    transition-all
                  "
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-100 dark:border-gray-800 px-5 py-4 text-xs text-gray-500 dark:text-gray-400">
          © 2026 Tasty Bites
        </div>
      </SheetContent>
    </Sheet>
  );
}