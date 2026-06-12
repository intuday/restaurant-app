// // 'use client';

// // import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { useCart } from '@/app/context/CartContext';
// // import { useState } from 'react';

// // type FoodCardProps = {
// //   id: string;
// //   name: string;
// //   description: string;
// //   price: number;
// //   image: string;
// //   category: string;
// // };

// // export default function FoodCard({ id, name, description, price, image, category }: FoodCardProps) {
// //   const { addToCart } = useCart();
// //   const [isAdded, setIsAdded] = useState(false);

// //   const handleAddToCart = () => {
// //     addToCart({ id, name, price, image, category });
// //     setIsAdded(true);
    
// //     // Reset button after 2 seconds
// //     setTimeout(() => {
// //       setIsAdded(false);
// //     }, 2000);
// //   };

// //   return (
// //     <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      
// //       {/* Food Image */}
// //       <div className="relative h-48 w-full bg-gray-200">
// //         {/* <img
// //           src={image}
// //           alt={name}
// //           className="w-full h-full object-cover" */}
        
// //         {/* Category Badge */}
// //         <span className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
// //           {category}
// //         </span>
// //       </div>

// //       {/* Card Content */}
// //       <CardHeader>
// //         <CardTitle className="text-xl">{name}</CardTitle>
// //       </CardHeader>

// //       <CardContent>
// //         <p className="text-gray-600 text-sm mb-4">{description}</p>
// //         <p className="text-2xl font-bold text-orange-600">${price.toFixed(2)}</p>
// //       </CardContent>

// //       {/* Add to Cart Button */}
// //       <CardFooter>
// //         <Button 
// //           onClick={handleAddToCart}
// //           className={`w-full transition-all ${
// //             isAdded 
// //               ? 'bg-green-600 hover:bg-green-700' 
// //               : 'bg-orange-600 hover:bg-orange-700'
// //           }`}
// //         >
// //           {isAdded ? '✓ Added!' : 'Add to Cart'}
// //         </Button>
// //       </CardFooter>
      
// //     </Card>
// //   );
// // }
// 'use client';

// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { useCart } from '@/app/context/CartContext';
// import { useState } from 'react';

// type FoodCardProps = {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
// };

// export default function FoodCard({ id, name, description, price, image, category }: FoodCardProps) {
//   const { addToCart } = useCart();
//   const [isAdded, setIsAdded] = useState(false);

//   const handleAddToCart = () => {
//     addToCart({ id, name, price, image, category });
//     setIsAdded(true);
    
//     // Reset button after 2 seconds
//     setTimeout(() => {
//       setIsAdded(false);
//     }, 2000);
//   };

//   return (
//     <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      
//       {/* Food Image */}
//       <div className="relative h-48 w-full bg-gray-200">
//         <img
//           src={image}
//           alt={name}
//           className="w-full h-full object-cover" 
//         />
        
//         {/* Category Badge */}
//         <span className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//           {category}
//         </span>
//       </div>

//       {/* Card Content */}
//       <CardHeader>
//         <CardTitle className="text-xl">{name}</CardTitle>
//       </CardHeader>

//       <CardContent>
//         <p className="text-gray-600 text-sm mb-4">{description}</p>
//         <p className="text-2xl font-bold text-orange-600">${price.toFixed(2)}</p>
//       </CardContent>

//       {/* Add to Cart Button */}
//       <CardFooter>
//         <Button 
//           onClick={handleAddToCart}
//           className={`w-full transition-all ${
//             isAdded 
//               ? 'bg-green-600 hover:bg-green-700' 
//               : 'bg-orange-600 hover:bg-orange-700'
//           }`}
//         >
//           {isAdded ? '✓ Added!' : 'Add to Cart'}
//         </Button>
//       </CardFooter>
      
//     </Card>
//   );
// }
'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/context/CartContext';
import { useState, useEffect } from 'react';
// ✅ Firebase and Lucide Icons imports
import { Heart } from 'lucide-react';
import { db, auth } from '@/lib/firebase'; 
import { doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

type FoodCardProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export default function FoodCard({ id, name, description, price, image, category }: FoodCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  
  // ✅ Favorite States
  const [userId, setUserId] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // 1. Check if User is Logged In
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubAuth();
  }, []);

  // 2. Real-time check: Kya ye item already user ka favorite hai?
  useEffect(() => {
    if (!userId) {
      // setIsFavorite(false);
      return;
    }

    const favDocRef = doc(db, 'users', userId, 'favorites', id);
    const unsubSnap = onSnapshot(favDocRef, (docSnap) => {
      setIsFavorite(docSnap.exists());
    });

    return () => unsubSnap();
  }, [userId, id]);

  const handleAddToCart = () => {
    addToCart({ id, name, price, image, category });
    setIsAdded(true);
    
    // Reset button after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // ✅ 3. Toggle Favorite Function (Like / Unlike Logic)
  const handleToggleFavorite = async () => {
    if (!userId) {
      alert("Please login to add items to your favorites!");
      return;
    }

    const favDocRef = doc(db, 'users', userId, 'favorites', id);

    try {
      if (isFavorite) {
        // Agar already liked hai to remove karo
        await deleteDoc(favDocRef);
      } else {
        // Agar liked nahi hai to Firestore me metadata save karo
        await setDoc(favDocRef, {
          id,
          name,
          description,
          price,
          image,
          category,
          savedAt: Date.now()
        });
      }
    } catch (error) {
      console.error("Error updates on favorites subcollection:", error);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative group">
      
      {/* Food Image */}
      <div className="relative h-48 w-full bg-gray-200">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover" 
        />
        
        {/* ✅ Like (Heart) Button - Top Left corner pe wrapper */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 left-2 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md transition-all duration-200 hover:scale-110 active:scale-95 z-10"
          aria-label="Like button"
        >
          <Heart 
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavorite 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-600 dark:text-gray-300 hover:text-red-500'
            }`} 
          />
        </button>

        {/* Category Badge */}
        <span className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {category}
        </span>
      </div>

      {/* Card Content */}
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <p className="text-2xl font-bold text-orange-600">${price.toFixed(2)}</p>
      </CardContent>

      {/* Add to Cart Button */}
      <CardFooter>
        <Button 
          onClick={handleAddToCart}
          className={`w-full transition-all ${
            isAdded 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-orange-600 hover:bg-orange-700'
          }`}
        >
          {isAdded ? '✓ Added!' : 'Add to Cart'}
        </Button>
      </CardFooter>
      
    </Card>
  );
}