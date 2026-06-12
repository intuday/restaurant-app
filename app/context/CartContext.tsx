// 'use client';

// import { db } from '@/app/lib/firebase';
// import { collection, addDoc } from 'firebase/firestore';
// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
// } from 'react';

// type CartItem = {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
//   quantity: number;
// };

// type CartContextType = {
//   cart: CartItem[];
//   addToCart: (item: Omit<CartItem, 'quantity'>) => void;
//   removeFromCart: (id: number) => void;
//   updateQuantity: (id: number, quantity: number) => void;
//   clearCart: () => void;
//   cartTotal: number;
//   cartCount: number;
//   placeOrder: (userId: string | null) => Promise<void>;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: React.ReactNode }) {

//   // ✅ SAFE INIT (avoids hydration issues)
//   const [cart, setCart] = useState<CartItem[]>(() => {
//     if (typeof window !== 'undefined') {
//       try {
//         return JSON.parse(localStorage.getItem('cart') || '[]');
//       } catch {
//         return [];
//       }
//     }
//     return [];
//   });

//   // ✅ persist cart
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   // ---------------- CART ACTIONS ----------------

//   const addToCart = (item: Omit<CartItem, 'quantity'>) => {
//     setCart((prev) => {
//       const exists = prev.find((i) => i.id === item.id);

//       if (exists) {
//         return prev.map((i) =>
//           i.id === item.id
//             ? { ...i, quantity: i.quantity + 1 }
//             : i
//         );
//       }

//       return [...prev, { ...item, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (id: number) => {
//     setCart((prev) => prev.filter((i) => i.id !== id));
//   };

//   const updateQuantity = (id: number, quantity: number) => {
//     if (quantity <= 0) {
//       removeFromCart(id);
//       return;
//     }

//     setCart((prev) =>
//       prev.map((i) =>
//         i.id === id ? { ...i, quantity } : i
//       )
//     );
//   };

//   const clearCart = () => setCart([]);

//   // ---------------- CALCULATIONS ----------------

//   const cartTotal = cart.reduce(
//     (sum, i) => sum + i.price * i.quantity,
//     0
//   );

//   const cartCount = cart.reduce(
//     (sum, i) => sum + i.quantity,
//     0
//   );

//   // ---------------- ORDER SYSTEM (FIXED) ----------------

//   const placeOrder = async (userId: string | null) => {
//     try {
//       console.log("🔥 PLACE ORDER TRIGGERED");

//       if (!userId) {
//         alert("Please login first");
//         return;
//       }

//       if (cart.length === 0) {
//         alert("Cart is empty");
//         return;
//       }

//       const orderData = {
//         userId,
//         items: cart,
//         totalAmount: cartTotal,
//         status: "pending",

//         // 🔥 CRITICAL FIX (REAL-TIME SAFE)
//         createdAt: Date.now(),

//         // future POS support
//         source: "online",
//       };

//       console.log("📦 ORDER DATA:", orderData);

//       await addDoc(collection(db, "orders"), orderData);

//       console.log("✅ ORDER SAVED SUCCESSFULLY");

//       clearCart();
//       alert("Order placed successfully");
//     } catch (error) {
//       console.error("❌ ORDER ERROR:", error);
//       alert("Order failed — check console");
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         cartTotal,
//         cartCount,
//         placeOrder,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// // ---------------- HOOK ----------------

// export function useCart() {
//   const ctx = useContext(CartContext);

//   if (!ctx) {
//     throw new Error('useCart must be used within CartProvider');
//   }

//   return ctx;
// }
'use client';

import { db } from '@/lib/firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

export interface CartItem  {
  id: string; // ✅ string (Firebase doc id)
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
};

// ✅ Extra order info (discount, promo etc.)
type OrderExtras = {
  discount?: number;
  promoCode?: string | null;
  finalAmount?: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  placeOrder: (userId: string | null, extras?: OrderExtras) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {

  // ✅ SAFE INIT
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        return JSON.parse(localStorage.getItem('cart') || '[]');
      } catch {
        return [];
      }
    }
    return [];
  });

  // ✅ Persist cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // -------- CART ACTIONS --------

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  // -------- CALCULATIONS --------

  const cartTotal = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const cartCount = cart.reduce(
    (sum, i) => sum + i.quantity,
    0
  );

  // -------- ORDER SYSTEM --------

  const placeOrder = async (
    userId: string | null,
    extras: OrderExtras = {}
  ) => {
    try {
      console.log('🔥 PLACE ORDER TRIGGERED');

      if (!userId) {
        alert('Please login first');
        return;
      }

      if (cart.length === 0) {
        alert('Cart is empty');
        return;
      }

      // ✅ FETCH USER DATA FROM FIRESTORE
      let customerName = 'Unknown Customer';
      let customerPhone = '';
      let customerEmail = '';

      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          customerName = (userData.name as string) || 'Unknown Customer';
          customerPhone = (userData.phone as string) || '';
          customerEmail = (userData.email as string) || '';
          console.log('👤 User found:', customerName, customerPhone);
        } else {
          console.log('⚠️ User not found in Firestore');
        }
      } catch (userError) {
        console.error('Error fetching user:', userError);
      }

      // ✅ FINAL AMOUNT
      const finalAmount =
        extras.finalAmount !== undefined
          ? extras.finalAmount
          : cartTotal - (extras.discount || 0);

      // ✅ ORDER DATA WITH CUSTOMER INFO
      const orderData = {
        // Customer Info
        userId,
        customerName,      // ✅ Real name from Firestore
        customerPhone,     // ✅ Phone from Firestore
        customerEmail,     // ✅ Email from Firestore

        // Order Info
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          category: item.category,
          itemTotal: item.price * item.quantity,
        })),

        // Pricing
        subtotal: cartTotal,
        discount: extras.discount || 0,
        promoCode: extras.promoCode || null,
        totalAmount: Math.max(finalAmount, 0),

        // Status & Meta
        status: 'pending',
        source: 'online',
        createdAt: Date.now(), // ✅ Timestamp
      };

      console.log('📦 ORDER DATA:', orderData);

      await addDoc(collection(db, 'orders'), orderData);

      console.log('✅ ORDER SAVED SUCCESSFULLY');

      clearCart();
      alert(`✅ Order placed successfully!\nThank you, ${customerName}!`);
    } catch (error) {
      console.error('❌ ORDER ERROR:', error);
      alert('Order failed — check console');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}