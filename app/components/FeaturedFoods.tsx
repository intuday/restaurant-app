// // // app/components/FeaturedFoods.tsx
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { db } from '../../lib/firebase';
// // import { collection, getDocs } from 'firebase/firestore';
// // import AnimatedSection from './AnimatedSection';
// // import { motion } from 'framer-motion';
// // import FoodCard from './FoodCard';

// // type Product = {
// //   id: string;
// //   name: string;
// //   description: string;
// //   price: number;
// //   image: string;
// //   category: string;
// //   available: boolean;
// //   featured: boolean;
// // };

// // export default function FeaturedFoods() {
// //   const [featuredItems, setFeaturedItems] = useState<Product[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   // 🔥 FETCH FEATURED PRODUCTS FROM FIREBASE
// //   useEffect(() => {
// //     const fetchFeatured = async () => {
// //       try {
// //         const snapshot = await getDocs(collection(db, 'products'));

// //         const data = snapshot.docs
// //           .map((doc) => ({
// //             id: doc.id,
// //             ...doc.data(),
// //           }))
// //           .filter(
// //             (item: any) => item.featured === true && item.available === true
// //           ) as Product[];

// //         setFeaturedItems(data);
// //       } catch (error) {
// //         console.error('Error fetching featured products:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchFeatured();
// //   }, []);

// //   // Agar koi featured item nahi hai to section hide karo
// //   if (!loading && featuredItems.length === 0) return null;

// //   return (
// //     <AnimatedSection className="py-16 bg-white">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// //         {/* Section Header */}
// //         <div className="text-center mb-12">
// //           <motion.h2
// //             className="text-4xl font-bold text-gray-800 mb-4"
// //             initial={{ opacity: 0, y: -20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //           >
// //             Featured Dishes
// //           </motion.h2>
// //           <motion.p
// //             className="text-xl text-gray-600"
// //             initial={{ opacity: 0, y: -20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6, delay: 0.2 }}
// //           >
// //             Our most popular items, loved by customers
// //           </motion.p>
// //         </div>

// //         {/* LOADING SKELETON */}
// //         {loading ? (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {[1, 2, 3].map((i) => (
// //               <div
// //                 key={i}
// //                 className="bg-gray-100 rounded-2xl h-80 animate-pulse"
// //               >
// //                 <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
// //                 <div className="p-5 space-y-3">
// //                   <div className="h-5 bg-gray-200 rounded w-3/4"></div>
// //                   <div className="h-4 bg-gray-200 rounded w-full"></div>
// //                   <div className="flex justify-between">
// //                     <div className="h-6 bg-gray-200 rounded w-16"></div>
// //                     <div className="h-8 bg-gray-200 rounded w-24"></div>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           /* Food Cards Grid with Stagger Animation */
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {featuredItems.map((item, index) => (
// //               <motion.div
// //                 key={item.id}
// //                 initial={{ opacity: 0, y: 50 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5, delay: index * 0.1 }}
// //               >
// //                 <div className="relative">
// //                   {/* ⭐ Featured Badge */}
// //                   <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
// //                     ⭐ Featured
// //                   </div>
// //                   <FoodCard
// //                     id={item.id}
// //                     name={item.name}
// //                     description={item.description}
// //                     price={item.price}
// //                     image={item.image}
// //                     category={item.category}
// //                   />
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </AnimatedSection>
// //   );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { db } from '../../lib/firebase';
// import { collection, getDocs, } from 'firebase/firestore';
// import FoodCard from '../components/FoodCard';

// type Product = {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   available: boolean;
//   featured?: boolean;
//   stock?: number;
// };

// export default function MenuPage() {
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<string[]>(['All']);
//   const [loading, setLoading] = useState(true);

//   // 🔥 FETCH PRODUCTS FROM FIREBASE
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, 'products'));

//         const data = snapshot.docs
//           .map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//           .filter((item: any) => item.available === true) as Product[];

//         setProducts(data);

//         // Extract unique categories
//         const uniqueCategories = [
//           'All',
//           ...new Set(data.map((item) => item.category).filter(Boolean)),
//         ];
//         setCategories(uniqueCategories);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // FILTER BY CATEGORY
//   const filteredProducts =
//     activeCategory === 'All'
//       ? products
//       : products.filter((food) => food.category === activeCategory);

//   // FEATURED PRODUCTS
//   const featuredProducts = products.filter((food) => food.featured);

//   return (
//     <div className="py-16 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Page Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold text-gray-800 mb-4">Our Menu</h1>
//           <p className="text-xl text-gray-600">
//             Explore our delicious selection of food and drinks
//           </p>
//         </div>

//         {/* 🔥 FEATURED SECTION
//         {featuredProducts.length > 0 && (
//           <div className="mb-16">
//             <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
//               ⭐ Featured Items
//             </h2>
//             <p className="text-gray-500 text-center mb-8">
//               Our most popular dishes
//             </p>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//               {featuredProducts.map((food) => (
//                 <div key={food.id} className="relative">
//                   <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
//                     ⭐ Featured
//                   </div>
//                   <FoodCard
//                     id={food.id}
//                     name={food.name}
//                     description={food.description}
//                     price={food.price}
//                     image={food.image}
//                     category={food.category}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )} */}

//         {/* Divider */}
//         <div className="border-t-2 border-gray-200 mb-12"></div>

//         {/* All Menu Title */}
//         <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//           🍽️ Full Menu
//         </h2>

//         {/* Category Filter - DYNAMIC from Firebase */}
//         <div className="flex flex-wrap justify-center gap-4 mb-12">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`px-6 py-3 rounded-full font-semibold transition-all ${
//                 activeCategory === category
//                   ? 'bg-orange-600 text-white shadow-lg'
//                   : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* LOADING STATE */}
//         {loading ? (
//           <div className="text-center py-20">
//             <div className="inline-block w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-gray-500 mt-4 text-lg">Loading menu...</p>
//           </div>
//         ) : (
//           <>
//             {/* Food Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//               {filteredProducts.map((food) => (
//                 <FoodCard
//                   key={food.id}
//                   id={food.id}
//                   name={food.name}
//                   description={food.description}
//                   price={food.price}
//                   image={food.image}
//                   category={food.category}
//                 />
//               ))}
//             </div>

//             {filteredProducts.length === 0 && (
//               <div className="text-center py-12">
//                 <p className="text-2xl text-gray-500">
//                   No items in this category yet
//                 </p>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
// app/components/FeaturedFoods.tsx
'use client';

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import {
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';
import FoodCard from './FoodCards';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  featured: boolean;
};

export default function FeaturedFoods() {
  const [featuredItems, setFeaturedItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'products'),
      where('featured', '==', true),
      where('available', '==', true)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setFeaturedItems(data);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching featured products:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (!loading && featuredItems.length === 0) return null;

  return (
    <AnimatedSection className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Featured Dishes
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our most popular items, loved by customers
          </motion.p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-2xl h-80 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    ⭐ Featured
                  </div>

                  <FoodCard
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    category={item.category}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}