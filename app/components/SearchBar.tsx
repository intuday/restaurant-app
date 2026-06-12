// // 'use strict';

// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { Search, X, Utensils } from 'lucide-react';
// // import { collection, getDocs } from 'firebase/firestore';
// // import { db } from '@/app/lib/firebase';
// // import { motion, AnimatePresence } from 'framer-motion';

// // // Menu Item Types Definitions
// // interface MenuItem {
// //   id: string;
// //   name: string;
// //   category?: string;
// //   price?: number;
// // }

// // export default function SearchBar() {
// //   const [queryStr, setQueryStr] = useState('');
// //   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
// //   const [filteredResults, setFilteredResults] = useState<MenuItem[]>([]);
// //   const [isOpen, setIsOpen] = useState(false);
// //   const searchRef = useRef<HTMLDivElement>(null);
// //   const router = useRouter();

// //   // 1. Fetch all menu data once on component mount for lightning-fast client-side search
// //   useEffect(() => {
// //     const fetchMenu = async () => {
// //       try {
// //         const menuSnap = await getDocs(collection(db, 'menu')); // Make sure collection name matches your firestore ("menu" or "items")
// //         const itemsList: MenuItem[] = [];
// //         menuSnap.forEach((doc) => {
// //           const data = doc.data();
// //           itemsList.push({
// //             id: doc.id,
// //             name: data.name || '',
// //             category: data.category || '',
// //             price: Number(data.price || 0),
// //           });
// //         });
// //         setMenuItems(itemsList);
// //       } catch (error) {
// //         console.error('Error loading search database indexing:', error);
// //       }
// //     };

// //     fetchMenu();
// //   }, []);

// //   // 2. Client-side filtration with debouncing logic structure
// //   useEffect(() => {
// //     if (queryStr.trim() === '') {
// //       setFilteredResults([]);
// //       return;
// //     }

// //     const cleanQuery = queryStr.toLowerCase();
// //     const matches = menuItems.filter(
// //       (item) =>
// //         item.name.toLowerCase().includes(cleanQuery) ||
// //         item.category?.toLowerCase().includes(cleanQuery)
// //     );

// //     setFilteredResults(matches.slice(0, 5)); // Limit up to top 5 real-time matching suggestions
// //   }, [queryStr, menuItems]);

// //   // 3. Handle click outside to close the autocomplete dropdown panel
// //   useEffect(() => {
// //     function handleOutsideClick(event: MouseEvent) {
// //       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
// //         setIsOpen(false);
// //       }
// //     }
// //     document.addEventListener('mousedown', handleOutsideClick);
// //     return () => document.removeEventListener('mousedown', handleOutsideClick);
// //   }, []);

// //   const handleItemRedirect = (itemId: string) => {
// //     setQueryStr('');
// //     setIsOpen(false);
// //     // Aapke menu routing structure ke hisab se change karein (e.g., /menu, /product/[id] ya direct query filter)
// //     router.push(`/menu?search=${itemId}`); 
// //   };

// //   return (
// //     <div className="relative w-full max-w-xs lg:max-w-md" ref={searchRef}>
// //       {/* INPUT CONTROLLER BOX */}
// //       <div className="relative flex items-center w-full">
// //         <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none dark:text-gray-500" />
// //         <input
// //           type="text"
// //           value={queryStr}
// //           onChange={(e) => {
// //             setQueryStr(e.target.value);
// //             setIsOpen(true);
// //           }}
// //           onFocus={() => setIsOpen(true)}
// //           placeholder="Search delicious food..."
// //           className="w-full pl-10 pr-10 py-2 text-sm font-medium rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-500 transition-all shadow-xs"
// //         />
// //         {queryStr && (
// //           <button
// //             onClick={() => {
// //               setQueryStr('');
// //               setFilteredResults([]);
// //             }}
// //             className="absolute right-3 p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all text-gray-400 dark:text-gray-500"
// //           >
// //             <X className="w-3.5 h-3.5" />
// //           </button>
// //         )}
// //       </div>

// //       {/* FLOATING REALTIME DROPDOWN LIST */}
// //       <AnimatePresence>
// //         {isOpen && queryStr && (
// //           <motion.div
// //             initial={{ opacity: 0, y: 10 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: 10 }}
// //             transition={{ duration: 0.15 }}
// //             className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden z-999"
// //           >
// //             {filteredResults.length > 0 ? (
// //               <div className="p-2 flex flex-col gap-1">
// //                 {filteredResults.map((item) => (
// //                   <button
// //                     key={item.id}
// //                     onClick={() => handleItemRedirect(item.id)}
// //                     className="w-full flex items-center justify-between px-4 py-3 text-left rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950/30 text-gray-700 dark:text-gray-200 transition-all font-medium group"
// //                   >
// //                     <div className="flex items-center gap-3">
// //                       <Utensils className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
// //                       <div>
// //                         <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{item.name}</p>
// //                         {item.category && (
// //                           <p className="text-[11px] text-gray-400 dark:text-gray-500 capitalize">{item.category}</p>
// //                         )}
// //                       </div>
// //                     </div>
// //                     {item.price && (
// //                       <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-100/60 dark:bg-orange-950/60 px-2 py-0.5 rounded-lg">
// //                         ₹{item.price}
// //                       </span>
// //                     )}
// //                   </button>
// //                 ))}
// //               </div>
// //             ) : (
// //               <div className="p-6 text-center text-gray-400 dark:text-gray-500">
// //                 <p className="text-sm">No dishes found for &quot;<span className="font-semibold text-orange-500">{queryStr}</span>&quot;</p>
// //                 <p className="text-xs mt-0.5">Try searching Pizza, Burger or Pasta!</p>
// //               </div>
// //             )}
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }
// 'use strict';

// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { Search, X, Utensils } from 'lucide-react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '@/app/lib/firebase';
// import { motion, AnimatePresence } from 'framer-motion';

// // Menu Item Types Definitions
// interface MenuItem {
//   id: string;
//   name: string;
//   category?: string;
//   price?: number;
// }

// export default function SearchBar() {
//   const [queryStr, setQueryStr] = useState('');
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [filteredResults, setFilteredResults] = useState<MenuItem[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const searchRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   // 1. Fetch all menu data once on component mount for lightning-fast client-side search
//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const menuSnap = await getDocs(collection(db, 'menu')); // Make sure collection name matches your firestore ("menu" or "items")
//         const itemsList: MenuItem[] = [];
//         menuSnap.forEach((doc) => {
//           const data = doc.data();
//           itemsList.push({
//             id: doc.id,
//             name: data.name || '',
//             category: data.category || '',
//             price: Number(data.price || 0),
//           });
//         });
//         setMenuItems(itemsList);
//       } catch (error) {
//         console.error('Error loading search database indexing:', error);
//       }
//     };

//     fetchMenu();
//   }, []);

//   // 2. Client-side filtration with debouncing logic structure
//   useEffect(() => {
//     if (queryStr.trim() === '') {
//       setFilteredResults([]);
//       return;
//     }

//     const cleanQuery = queryStr.toLowerCase();
//     const matches = menuItems.filter(
//       (item) =>
//         item.name.toLowerCase().includes(cleanQuery) ||
//         item.category?.toLowerCase().includes(cleanQuery)
//     );

//     setFilteredResults(matches.slice(0, 5)); // Limit up to top 5 real-time matching suggestions
//   }, [queryStr, menuItems]);

//   // 3. Handle click outside to close the autocomplete dropdown panel
//   useEffect(() => {
//     function handleOutsideClick(event: MouseEvent) {
//       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleOutsideClick);
//     return () => document.removeEventListener('mousedown', handleOutsideClick);
//   }, []);

//   const handleItemRedirect = (itemId: string) => {
//     setQueryStr('');
//     setIsOpen(false);
//     // Aapke menu routing structure ke hisab se change karein (e.g., /menu, /product/[id] ya direct query filter)
//     router.push(`/menu?search=${itemId}`); 
//   };

//   return (
//     <div className="relative w-full max-w-xs lg:max-w-md" ref={searchRef}>
//       {/* INPUT CONTROLLER BOX */}
//       <div className="relative flex items-center w-full">
//         <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none dark:text-gray-500" />
//         <input
//           type="text"
//           value={queryStr}
//           onChange={(e) => {
//             setQueryStr(e.target.value);
//             setIsOpen(true);
//           }}
//           onFocus={() => setIsOpen(true)}
//           placeholder="Search delicious food..."
//           className="w-full pl-10 pr-10 py-2 text-sm font-medium rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-500 transition-all shadow-xs"
//         />
//         {queryStr && (
//           <button
//             onClick={() => {
//               setQueryStr('');
//               setFilteredResults([]);
//             }}
//             className="absolute right-3 p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all text-gray-400 dark:text-gray-500"
//           >
//             <X className="w-3.5 h-3.5" />
//           </button>
//         )}
//       </div>

//       {/* FLOATING REALTIME DROPDOWN LIST */}
//       <AnimatePresence>
//         {isOpen && queryStr && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//             transition={{ duration: 0.15 }}
//             className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden z-999"
//           >
//             {filteredResults.length > 0 ? (
//               <div className="p-2 flex flex-col gap-1">
//                 {filteredResults.map((item) => (
//                   <button
//                     key={item.id}
//                     onClick={() => handleItemRedirect(item.id)}
//                     className="w-full flex items-center justify-between px-4 py-3 text-left rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950/30 text-gray-700 dark:text-gray-200 transition-all font-medium group"
//                   >
//                     <div className="flex items-center gap-3">
//                       <Utensils className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
//                       <div>
//                         <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{item.name}</p>
//                         {item.category && (
//                           <p className="text-[11px] text-gray-400 dark:text-gray-500 capitalize">{item.category}</p>
//                         )}
//                       </div>
//                     </div>
//                     {item.price && (
//                       <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-100/60 dark:bg-orange-950/60 px-2 py-0.5 rounded-lg">
//                         ₹{item.price}
//                       </span>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <div className="p-6 text-center text-gray-400 dark:text-gray-500">
//                 <p className="text-sm">No dishes found for &quot;<span className="font-semibold text-orange-500">{queryStr}</span>&quot;</p>
//                 <p className="text-xs mt-0.5">Try searching Pizza, Burger or Pasta!</p>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Utensils, ArrowRight } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  id: string;
  name: string;
  category?: string;
  price?: number;
}

export default function SearchBar() {
  const [queryStr, setQueryStr] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredResults, setFilteredResults] = useState<MenuItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // ✅ FIX 1: Changed 'menu' → 'products' + filter only available items
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsFetching(true);
        const snapshot = await getDocs(collection(db, 'products')); // ✅ FIXED
        const itemsList: MenuItem[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          // ✅ Only show available products in search
          if (data.available === true) {
            itemsList.push({
              id: doc.id,
              name: data.name || '',
              category: data.category || '',
              price: Number(data.price || 0),
            });
          }
        });

        setMenuItems(itemsList);
      } catch (error) {
        console.error('Error loading search:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchMenu();
  }, []);

  // ✅ Filter logic - searches name and category
  useEffect(() => {
    if (queryStr.trim() === '') {
      setFilteredResults([]);
      return;
    }

    const cleanQuery = queryStr.toLowerCase().trim();
    const matches = menuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(cleanQuery) ||
        item.category?.toLowerCase().includes(cleanQuery)
    );

    setFilteredResults(matches.slice(0, 6));
  }, [queryStr, menuItems]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // ✅ FIX 2: Pass item.name (not item.id) so MenuPage can match it
  const handleItemClick = (itemName: string) => {
    setQueryStr('');
    setFilteredResults([]);
    setIsOpen(false);
    router.push(`/menu?search=${encodeURIComponent(itemName)}`); // ✅ FIXED
  };

  // ✅ Full search on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && queryStr.trim()) {
      setIsOpen(false);
      router.push(`/menu?search=${encodeURIComponent(queryStr.trim())}`);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQueryStr('');
    }
  };

  const clearSearch = () => {
    setQueryStr('');
    setFilteredResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const showDropdown = isOpen && queryStr.trim().length > 0;

  return (
    <div className="relative w-full max-w-xs lg:max-w-md" ref={searchRef}>

      {/* ── INPUT BOX ── */}
      <div className="relative flex items-center w-full">

        {/* Search / Loading icon */}
        <div className="absolute left-3 z-10 pointer-events-none">
          {isFetching ? (
            <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={queryStr}
          onChange={(e) => {
            setQueryStr(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (queryStr.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search delicious food..."
          className={`w-full pl-10 pr-10 py-2.5 text-sm font-medium border
            bg-gray-50 dark:bg-gray-800
            text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-orange-500
            focus:border-orange-500 transition-all
            ${showDropdown
              ? 'rounded-t-2xl rounded-b-none border-orange-400 dark:border-orange-500'
              : 'rounded-2xl border-gray-200 dark:border-gray-700'
            }`}
        />

        {/* Clear button */}
        {queryStr && (
          <button
            onClick={clearSearch}
            className="absolute right-3 p-0.5 rounded-full
              hover:bg-gray-200 dark:hover:bg-gray-700
              text-gray-400 dark:text-gray-500 transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* ── DROPDOWN ── */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 right-0 'z-999'
              bg-white dark:bg-gray-800
              border border-t-0 border-orange-400 dark:border-orange-500
              rounded-b-2xl shadow-2xl overflow-hidden"
          >
            {filteredResults.length > 0 ? (
              <>
                {/* Result rows */}
                <div className="p-2 flex flex-col gap-0.5 max-h-72 overflow-y-auto">
                  {filteredResults.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      onClick={() => handleItemClick(item.name)} // ✅ passes name
                      className="w-full flex items-center justify-between
                        px-3 py-2.5 text-left rounded-xl
                        hover:bg-orange-50 dark:hover:bg-orange-950/30
                        transition-all group cursor-pointer"
                    >
                      {/* Left */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl
                          bg-orange-100 dark:bg-orange-900/40
                          flex items-center justify-center flex-shrink-0
                          group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50
                          transition-colors">
                          <Utensils className="w-4 h-4 text-orange-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-tight">
                            {highlightMatch(item.name, queryStr)}
                          </p>
                          {item.category && (
                            <p className="text-[11px] text-gray-400 dark:text-gray-500 capitalize mt-0.5">
                              {item.category}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {item.price !== undefined && item.price > 0 && (
                          <span className="text-xs font-bold
                            text-orange-600 dark:text-orange-400
                            bg-orange-100/80 dark:bg-orange-950/60
                            px-2 py-0.5 rounded-lg">
                            ₹{item.price}
                          </span>
                        )}
                        <ArrowRight className="w-3.5 h-3.5
                          text-gray-300 dark:text-gray-600
                          group-hover:text-orange-500
                          group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Footer — see all */}
                <div className="border-t border-gray-100 dark:border-gray-700 px-3 py-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      router.push(`/menu?search=${encodeURIComponent(queryStr.trim())}`);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2
                      text-xs font-bold
                      text-orange-600 dark:text-orange-400
                      hover:text-orange-700 dark:hover:text-orange-300
                      rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/20
                      transition-colors"
                  >
                    <Search className="w-3.5 h-3.5" />
                    See all results for &ldquo;{queryStr}&rdquo;
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              /* No results */
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700
                  rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                  No results for{' '}
                  <span className="text-orange-500">&ldquo;{queryStr}&rdquo;</span>
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Try &ldquo;Burger&rdquo;, &ldquo;Pizza&rdquo; or &ldquo;Coffee&rdquo;
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Highlight matching text in orange ──
function highlightMatch(text: string, query: string) {
  if (!query.trim()) return <span>{text}</span>;
  const index = text.toLowerCase().indexOf(query.toLowerCase().trim());
  if (index === -1) return <span>{text}</span>;
  return (
    <>
      <span>{text.slice(0, index)}</span>
      <span className="text-orange-500 dark:text-orange-400 font-extrabold">
        {text.slice(index, index + query.trim().length)}
      </span>
      <span>{text.slice(index + query.trim().length)}</span>
    </>
  );
}