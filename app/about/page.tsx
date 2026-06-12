// 'use client';
// import { motion } from 'framer-motion';

// export default function AboutPage() {
//   return (
//     <div className="py-16 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Page Header */}
//         <motion.div 
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h1 className="text-5xl font-bold text-gray-800 mb-4">
//             About Tasty Bites
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Our story, our passion, and our commitment to delicious food
//           </p>
//         </motion.div>

//         {/* Story Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
//           <motion.div 
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <img 
//               src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop" 
//               alt="Restaurant interior" 
//               className="rounded-lg shadow-xl w-full h-80 object-cover"
//             />
//           </motion.div>
          
//           <motion.div 
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="flex flex-col justify-center"
//           >
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               Our Story
//             </h2>
//             <p className="text-gray-600 mb-4 leading-relaxed">
//               Founded in 2020, Tasty Bites started as a small family kitchen with a big dream: 
//               to bring authentic, delicious food to our community. What began as a weekend pop-up 
//               quickly grew into the beloved restaurant you know today.
//             </p>
//             <p className="text-gray-600 mb-4 leading-relaxed">
//               We believe that great food brings people together. Every dish we create is made 
//               with love, using the freshest ingredients sourced from local farms and suppliers.
//             </p>
//             <p className="text-gray-600 leading-relaxed">
//               Our mission is simple: to serve food that makes you smile, in a space where you 
//               feel right at home.
//             </p>
//           </motion.div>
//         </div>

//         {/* Why Choose Us */}
//         <motion.div 
//           className="mb-16"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//         >
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//             Why Choose Us
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
//               <div className="text-5xl mb-4">🌱</div>
//               <h3 className="text-xl font-bold text-gray-800 mb-3">Fresh Ingredients</h3>
//               <p className="text-gray-600">
//                 We source our ingredients daily from local farms to ensure the freshest taste
//               </p>
//             </div>
            
//             <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
//               <div className="text-5xl mb-4">👨‍🍳</div>
//               <h3 className="text-xl font-bold text-gray-800 mb-3">Expert Chefs</h3>
//               <p className="text-gray-600">
//                 Our team of experienced chefs brings years of culinary expertise to every dish
//               </p>
//             </div>
            
//             <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
//               <div className="text-5xl mb-4">❤️</div>
//               <h3 className="text-xl font-bold text-gray-800 mb-3">Made with Love</h3>
//               <p className="text-gray-600">
//                 Every meal is prepared with care and passion, just like homemade food
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Team Section */}
//         <motion.div 
//           className="mb-16"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//         >
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//             Meet Our Team
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img 
//                 src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop" 
//                 alt="Chef" 
//                 className="w-full h-64 object-cover"
//               />
//               <div className="p-6 text-center">
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">Chef Marco</h3>
//                 <p className="text-orange-600 font-semibold mb-3">Head Chef</p>
//                 <p className="text-gray-600 text-sm">
//                   15 years of culinary experience, trained in Italy
//                 </p>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img 
//                 src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop" 
//                 alt="Manager" 
//                 className="w-full h-64 object-cover"
//               />
//               <div className="p-6 text-center">
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">Sarah Johnson</h3>
//                 <p className="text-orange-600 font-semibold mb-3">Restaurant Manager</p>
//                 <p className="text-gray-600 text-sm">
//                   Ensuring every guest has an amazing experience
//                 </p>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img 
//                 src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=400&fit=crop" 
//                 alt="Baker" 
//                 className="w-full h-64 object-cover"
//               />
//               <div className="p-6 text-center">
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">Emily Chen</h3>
//                 <p className="text-orange-600 font-semibold mb-3">Head Baker</p>
//                 <p className="text-gray-600 text-sm">
//                   Creates our famous desserts and pastries daily
//                 </p>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//       </div>
//     </div>
//   );
// }
'use client';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="py-16 bg-gray-50 dark:bg-zinc-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            About Tasty Bites
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our story, our passion, and our commitment to delicious food
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop" 
              alt="Restaurant interior" 
              className="rounded-lg shadow-xl w-full h-80 object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Our Story
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Founded in 2020, Tasty Bites started as a small family kitchen with a big dream: 
              to bring authentic, delicious food to our community. What began as a weekend pop-up 
              quickly grew into the beloved restaurant you know today.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              We believe that great food brings people together. Every dish we create is made 
              with love, using the freshest ingredients sourced from local farms and suppliers.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our mission is simple: to serve food that makes you smile, in a space where you 
              feel right at home.
            </p>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
            Why Choose Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-transparent dark:border-zinc-800">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Fresh Ingredients</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We source our ingredients daily from local farms to ensure the freshest taste
              </p>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-transparent dark:border-zinc-800">
              <div className="text-5xl mb-4">👨‍🍳</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Expert Chefs</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our team of experienced chefs brings years of culinary expertise to every dish
              </p>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-transparent dark:border-zinc-800">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Made with Love</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every meal is prepared with care and passion, just like homemade food
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden border border-transparent dark:border-zinc-800">
              <img 
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop" 
                alt="Chef" 
                className="w- h-80p-5 object-cover"
              />
              <div className="p-5 text-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Chef Marco</h3>
                <p className="text-orange-600 dark:text-orange-500 font-semibold mb-3">Head Chef</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  15 years of culinary experience, trained in Italy
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden border border-transparent dark:border-zinc-800">
              <img 
                src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop" 
                alt="Manager" 
                className="w-full h-80p-5 object-cover"
              />
              <div className="p-5 text-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Sarah Johnson</h3>
                <p className="text-orange-600 dark:text-orange-500 font-semibold mb-3">Restaurant Manager</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Ensuring every guest has an amazing experience
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden border border-transparent dark:border-zinc-800">
              <img 
                src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=400&fit=crop" 
                alt="Baker" 
                className="w-full h-80p-5 object-cover"
              />
              <div className="p-5 text-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Emily Chen</h3>
                <p className="text-orange-600 dark:text-orange-500 font-semibold mb-3">Head Baker</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Creates our famous desserts and pastries daily
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}