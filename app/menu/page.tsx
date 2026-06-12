// // // 'use client';

// // // import { useState } from 'react';
// // // import FoodCard from '../components/FoodCard';

// // // export default function MenuPage() {
// // //   const [activeCategory, setActiveCategory] = useState('All');

// // //   const categories = ['All', 'Pizza', 'Burgers', 'Desserts', 'Drinks'];

// // //   const allFoods = [
// // //     {
// // //       id: 1,
// // //       name: 'Margherita Pizza',
// // //       description: 'Classic pizza with fresh mozzarella, basil, and tomato sauce',
// // //       price: 12.99,
// // //       image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=300&fit=crop',
// // //       category: 'Pizza',
// // //     },
// // //     {
// // //       id: 2,
// // //       name: 'Pepperoni Pizza',
// // //       description: 'Loaded with pepperoni and melted mozzarella cheese',
// // //       price: 14.99,
// // //       image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=300&fit=crop',
// // //       category: 'Pizza',
// // //     },
// // //     {
// // //       id: 3,
// // //       name: 'Cheeseburger Deluxe',
// // //       description: 'Juicy beef patty with cheddar, lettuce, tomato, and special sauce',
// // //       price: 10.99,
// // //       image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
// // //       category: 'Burgers',
// // //     },
// // //     {
// // //       id: 4,
// // //       name: 'Veggie Burger',
// // //       description: 'Plant-based patty with avocado, sprouts, and tahini sauce',
// // //       price: 11.99,
// // //       image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&h=300&fit=crop',
// // //       category: 'Burgers',
// // //     },
// // //     {
// // //       id: 5,
// // //       name: 'Chocolate Cake',
// // //       description: 'Rich, moist chocolate cake with creamy frosting',
// // //       price: 6.99,
// // //       image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=300&fit=crop',
// // //       category: 'Desserts',
// // //     },
// // //     {
// // //       id: 6,
// // //       name: 'Fresh Lemonade',
// // //       description: 'Refreshing homemade lemonade with real lemons',
// // //       price: 3.99,
// // //       image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f1e?w=500&h=300&fit=crop',
// // //       category: 'Drinks',
// // //     },
// // //     {
// // //       id: 7,
// // //       name: 'BBQ Chicken Pizza',
// // //       description: 'Grilled chicken with BBQ sauce, onions, and cilantro',
// // //       price: 15.99,
// // //       image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=300&fit=crop',
// // //       category: 'Pizza',
// // //     },
// // //     {
// // //       id: 8,
// // //       name: 'Mushroom Burger',
// // //       description: 'Beef patty topped with sautéed mushrooms and Swiss cheese',
// // //       price: 12.99,
// // //       image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=300&fit=crop',
// // //       category: 'Burgers',
// // //     },
// // //   ];

// // //   const filteredFoods = activeCategory === 'All' 
// // //     ? allFoods 
// // //     : allFoods.filter(food => food.category === activeCategory);

// // //   return (
// // //     <div className="py-16 bg-gray-50 min-h-screen">
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
// // //         {/* Page Header */}
// // //         <div className="text-center mb-12">
// // //           <h1 className="text-5xl font-bold text-gray-800 mb-4">
// // //             Our Menu
// // //           </h1>
// // //           <p className="text-xl text-gray-600">
// // //             Explore our delicious selection of food and drinks
// // //           </p>
// // //         </div>

// // //         {/* Category Filter */}
// // //         <div className="flex flex-wrap justify-center gap-4 mb-12">
// // //           {categories.map((category) => (
// // //             <button
// // //               key={category}
// // //               onClick={() => setActiveCategory(category)}
// // //               className={`px-6 py-3 rounded-full font-semibold transition-all ${
// // //                 activeCategory === category
// // //                   ? 'bg-orange-600 text-white shadow-lg'
// // //                   : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md'
// // //               }`}
// // //             >
// // //               {category}
// // //             </button>
// // //           ))}
// // //         </div>

// // //         {/* Food Grid */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
// // //           {filteredFoods.map((food) => (
// // //             <FoodCard
// // //               key={food.id}
// // //               id={food.id}
// // //               name={food.name}
// // //               description={food.description}
// // //               price={food.price}
// // //               image={food.image}
// // //               category={food.category}
// // //             />
// // //           ))}
// // //         </div>

// // //         {filteredFoods.length === 0 && (
// // //           <div className="text-center py-12">
// // //             <p className="text-2xl text-gray-500">No items in this category yet</p>
// // //           </div>
// // //         )}

// // //       </div>
// // //     </div>
// // //   );
// // // }
// // // app/menu/page.tsx
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { db } from '../../lib/firebase';
// // import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
// // import FoodCard from '../components/FoodCard';

// // type Product = {
// //   id: string;
// //   name: string;
// //   description: string;
// //   price: number;
// //   image: string;
// //   category: string;
// //   available: boolean;
// //   featured?: boolean;
// //   stock?: number;
// // };

// // export default function MenuPage() {
// //   const [activeCategory, setActiveCategory] = useState('All');
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [categories, setCategories] = useState<string[]>(['All']);
// //   const [loading, setLoading] = useState(true);

// //   // 🔥 FETCH PRODUCTS FROM FIREBASE
// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const snapshot = await getDocs(collection(db, 'products'));

// //         const data = snapshot.docs
// //           .map((doc) => ({
// //             id: doc.id,
// //             ...doc.data(),
// //           }))
// //           .filter((item: any) => item.available === true) as Product[];

// //         setProducts(data);

// //         // Extract unique categories
// //         const uniqueCategories = [
// //           'All',
// //           ...new Set(data.map((item) => item.category).filter(Boolean)),
// //         ];
// //         setCategories(uniqueCategories);
// //       } catch (error) {
// //         console.error('Error fetching products:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProducts();
// //   }, []);

// //   // FILTER BY CATEGORY
// //   const filteredProducts =
// //     activeCategory === 'All'
// //       ? products
// //       : products.filter((food) => food.category === activeCategory);

// //   // FEATURED PRODUCTS
// //   const featuredProducts = products.filter((food) => food.featured);

// //   return (
// //     <div className="py-16 bg-gray-50 min-h-screen">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// //         {/* Page Header */}
// //         <div className="text-center mb-12">
// //           <h1 className="text-5xl font-bold text-gray-800 mb-4">Our Menu</h1>
// //           <p className="text-xl text-gray-600">
// //             Explore our delicious selection of food and drinks
// //           </p>
// //         </div>

// //         {/* 🔥 FEATURED SECTION
// //         {featuredProducts.length > 0 && (
// //           <div className="mb-16">
// //             <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
// //               ⭐ Featured Items
// //             </h2>
// //             <p className="text-gray-500 text-center mb-8">
// //               Our most popular dishes
// //             </p>

// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
// //               {featuredProducts.map((food) => (
// //                 <div key={food.id} className="relative">
// //                   <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
// //                     ⭐ Featured
// //                   </div>
// //                   <FoodCard
// //                     id={food.id}
// //                     name={food.name}
// //                     description={food.description}
// //                     price={food.price}
// //                     image={food.image}
// //                     category={food.category}
// //                   />
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )} */}

// //         {/* Divider */}
// //         <div className="border-t-2 border-gray-200 mb-12"></div>

// //         {/* All Menu Title */}
// //         <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
// //           🍽️ Full Menu
// //         </h2>

// //         {/* Category Filter - DYNAMIC from Firebase */}
// //         <div className="flex flex-wrap justify-center gap-4 mb-12">
// //           {categories.map((category) => (
// //             <button
// //               key={category}
// //               onClick={() => setActiveCategory(category)}
// //               className={`px-6 py-3 rounded-full font-semibold transition-all ${
// //                 activeCategory === category
// //                   ? 'bg-orange-600 text-white shadow-lg'
// //                   : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md'
// //               }`}
// //             >
// //               {category}
// //             </button>
// //           ))}
// //         </div>

// //         {/* LOADING STATE */}
// //         {loading ? (
// //           <div className="text-center py-20">
// //             <div className="inline-block w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
// //             <p className="text-gray-500 mt-4 text-lg">Loading menu...</p>
// //           </div>
// //         ) : (
// //           <>
// //             {/* Food Grid */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
// //               {filteredProducts.map((food) => (
// //                 <FoodCard
// //                   key={food.id}
// //                   id={food.id}
// //                   name={food.name}
// //                   description={food.description}
// //                   price={food.price}
// //                   image={food.image}
// //                   category={food.category}
// //                 />
// //               ))}
// //             </div>

// //             {filteredProducts.length === 0 && (
// //               <div className="text-center py-12">
// //                 <p className="text-2xl text-gray-500">
// //                   No items in this category yet
// //                 </p>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';


// import { useState, useEffect } from 'react';
// import { db } from '../../lib/firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import FoodCard from '../components/FoodCards';


// type FirebaseProduct = {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   available: boolean;
// };

// export default function MenuPage() {
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [products, setProducts] = useState<FirebaseProduct[]>([]);
//   const [categories, setCategories] = useState<string[]>(['All']);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, 'products'));

//         const data = snapshot.docs
//           .map((docSnap) => {
//             const d = docSnap.data();
//             return {
//               id: docSnap.id,
//               name: (d.name as string) || '',
//               description: (d.description as string) || '',
//               price: (d.price as number) || 0,
//               image: (d.image as string) || '',
//               category: (d.category as string) || '',
//               available: (d.available as boolean) ?? false,
//             };
//           })
//           .filter((item) => item.available === true);

//         setProducts(data);

//         const uniqueCategories = [
//           'All',
//           ...Array.from(
//             new Set(data.map((item) => item.category).filter(Boolean))
//           ),
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

//   const filteredProducts =
//     activeCategory === 'All'
//       ? products
//       : products.filter((food) => food.category === activeCategory);

//   return (
//     <div className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Page Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
//             Our Menu
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300">
//             Explore our delicious selection of food and drinks
//           </p>
//         </div>
        

//         {/* Category Filter */}
//         <div className="flex flex-wrap justify-center gap-4 mb-12">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`px-6 py-3 rounded-full font-semibold transition-all ${
//                 activeCategory === category
//                   ? 'bg-orange-600 text-white shadow-lg'
//                   : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 shadow-md'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* LOADING */}
//         {loading ? (
//           <div className="text-center py-20">
//             <div className="inline-block w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">
//               Loading menu...
//             </p>
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
//                 <p className="text-2xl text-gray-500 dark:text-gray-400">
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
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { db } from '../../lib/firebase';
// // import { collection, getDocs } from 'firebase/firestore'; // ✅ unused imports hataye
// // import FoodCard from '../Components/FoodCard';

// // // ✅ any hataya - proper type
// // type FirebaseProduct = {
// //   id: string;
// //   name: string;
// //   description: string;
// //   price: number;
// //   image: string;
// //   category: string;
// //   available: boolean;
// // };

// // export default function MenuPage() {
// //   const [activeCategory, setActiveCategory] = useState('All');
// //   const [products, setProducts] = useState<FirebaseProduct[]>([]);
// //   const [categories, setCategories] = useState<string[]>(['All']);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const snapshot = await getDocs(collection(db, 'products'));

// //         // ✅ any ki jagah proper type casting
// //         const data = snapshot.docs
// //           .map((docSnap) => {
// //             const d = docSnap.data();
// //             return {
// //               id: docSnap.id,
// //               name: (d.name as string) || '',
// //               description: (d.description as string) || '',
// //               price: (d.price as number) || 0,
// //               image: (d.image as string) || '',
// //               category: (d.category as string) || '',
// //               available: (d.available as boolean) ?? false,
// //             };
// //           })
// //           .filter((item) => item.available === true);

// //         setProducts(data);

// //         // ✅ Dynamic categories
// //         const uniqueCategories = [
// //           'All',
// //           ...Array.from(
// //             new Set(data.map((item) => item.category).filter(Boolean))
// //           ),
// //         ];
// //         setCategories(uniqueCategories);
// //       } catch (error) {
// //         console.error('Error fetching products:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProducts();
// //   }, []);

// //   // FILTER BY CATEGORY
// //   const filteredProducts =
// //     activeCategory === 'All'
// //       ? products
// //       : products.filter((food) => food.category === activeCategory);

// //   return (
// //     <div className="py-16 bg-gray-50 min-h-screen">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// //         {/* Page Header */}
// //         <div className="text-center mb-12">
// //           <h1 className="text-5xl font-bold text-gray-800 mb-4">Our Menu</h1>
// //           <p className="text-xl text-gray-600">
// //             Explore our delicious selection of food and drinks
// //           </p>
// //         </div>

// //         {/* Category Filter */}
// //         <div className="flex flex-wrap justify-center gap-4 mb-12">
// //           {categories.map((category) => (
// //             <button
// //               key={category}
// //               onClick={() => setActiveCategory(category)}
// //               className={`px-6 py-3 rounded-full font-semibold transition-all ${
// //                 activeCategory === category
// //                   ? 'bg-orange-600 text-white shadow-lg'
// //                   : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md'
// //               }`}
// //             >
// //               {category}
// //             </button>
// //           ))}
// //         </div>

// //         {/* LOADING */}
// //         {loading ? (
// //           <div className="text-center py-20">
// //             <div className="inline-block w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
// //             <p className="text-gray-500 mt-4 text-lg">Loading menu...</p>
// //           </div>
// //         ) : (
// //           <>
// //             {/* Food Grid */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
// //               {filteredProducts.map((food) => (
// //                 <FoodCard
// //                   key={food.id}
// //                   id={food.id}        // ✅ string id
// //                   name={food.name}
// //                   description={food.description}
// //                   price={food.price}
// //                   image={food.image}
// //                   category={food.category}
// //                 />
// //               ))}
// //             </div>

// //             {filteredProducts.length === 0 && (
// //               <div className="text-center py-12">
// //                 <p className="text-2xl text-gray-500">
// //                   No items in this category yet
// //                 </p>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';    // ✅ NEW
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import FoodCard from '../components/FoodCards';

type FirebaseProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
};

// ✅ Split into inner component so useSearchParams works inside Suspense
function MenuContent() {
  const searchParams = useSearchParams();                // ✅ NEW

  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');   // ✅ NEW

  // ✅ FIX 3: Read ?search= param from URL (set by navbar SearchBar)
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(decodeURIComponent(urlSearch));
    }
  }, [searchParams]);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));

        const data = snapshot.docs
          .map((docSnap) => {
            const d = docSnap.data();
            return {
              id: docSnap.id,
              name: (d.name as string) || '',
              description: (d.description as string) || '',
              price: (d.price as number) || 0,
              image: (d.image as string) || '',
              category: (d.category as string) || '',
              available: (d.available as boolean) ?? false,
            };
          })
          .filter((item) => item.available === true);

        setProducts(data);

        const uniqueCategories = [
          'All',
          ...Array.from(
            new Set(data.map((item) => item.category).filter(Boolean))
          ),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ FIX 3: Filter by BOTH category AND search query
  const filteredProducts = products.filter((food) => {
    const matchesCategory =
      activeCategory === 'All' || food.category === activeCategory;

    const matchesSearch =
      searchQuery.trim() === '' ||
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore our delicious selection of food and drinks
          </p>
        </div>

        {/* ✅ Inline Search Bar on Menu Page */}
        {/* <div className="max-w-xl mx-auto mb-10">
          <div className="relative flex items-center">
            <svg
              className="a h-5 text-gray-400 pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            {/* </svg> */}
            {/* <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for food, drinks, categories..."
              className="w-full pl-12 pr-12 py-4 rounded-2xl border-2
                border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800
                text-gray-800 dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:border-orange-500 focus:ring-2
                focus:ring-orange-500/20 text-base font-medium
                shadow-md transition-all"
            /> /*}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 p-1 rounded-full
                  bg-gray-100 dark:bg-gray-700
                  hover:bg-gray-200 dark:hover:bg-gray-600
                  text-gray-500 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Live result count */}
          {/* {searchQuery && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3 font-medium">
              {filteredProducts.length === 0
                ? `No results for "${searchQuery}"`
                : `${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''} for "${searchQuery}"`}
            </p>
          )}
        </div> */}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setSearchQuery(''); // ✅ clear search on category switch
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-orange-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-orange-600
              border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">
              Loading menu...
            </p>
          </div>
        ) : (
          <>
            {/* Food Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((food) => (
                <FoodCard
                  key={food.id}
                  id={food.id}
                  name={food.name}
                  description={food.description}
                  price={food.price}
                  image={food.image}
                  category={food.category}
                />
              ))}
            </div>

            {/* Empty state */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30
                  rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-orange-400"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-2">
                  No items found
                </p>
                <p className="text-gray-400 dark:text-gray-500 mb-6">
                  {searchQuery
                    ? `Nothing matched "${searchQuery}". Try a different term.`
                    : 'No items available in this category.'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600
                    text-white font-bold rounded-xl transition-all
                    hover:scale-105 shadow-lg shadow-orange-500/25"
                >
                  View All Items
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ✅ Wrap in Suspense — required by Next.js for useSearchParams()
export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center
        bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500
            border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium">
            Loading...
          </p>
        </div>
      </div>
    }>
      <MenuContent />
    </Suspense>
  );
}