// 'use client';

// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';


// export default function Hero() {
//   return (
//     <section className="relative h-screen flex items-center justify-center bg-linear-to-r from-orange-400 to-red-500">
      
//       {/* Overlay for better text readability */}
//       <div className="absolute inset-0 bg-black opacity-40"></div>
      
//       {/* Content */}
//       <div className="relative z-10 text-center text-white px-4">
//         <motion.h1 
//           className="text-5xl md:text-7xl font-bold mb-6"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: 'easeOut' }}
//         >
//           Delicious Food, Delivered Fast
//         </motion.h1>
        
//         <motion.p 
//           className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
//         >
//           Experience the best flavors from our kitchen to your doorstep. 
//           Fresh ingredients, amazing taste!
//         </motion.p>
        
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
//         >
//           <Button 
//             size="lg" 
//             className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-6"
//           >
//             Order Now 🍔
            
//           </Button>
//         </motion.div>
//       </div>
      
//     </section>
//   );
// }
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-linear-to-r from-orange-400 to-red-500">
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Delicious Food, Delivered Fast
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          Experience the best flavors from our kitchen to your doorstep.
          Fresh ingredients, amazing taste!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <Link href="/menu">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-6"
            >
              Order Now 🍔
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}