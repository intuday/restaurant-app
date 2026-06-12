// 'use client';

// import { createContext, useContext, useState, ReactNode } from 'react';


// export type Promotion = {
//   id: string;
//   code: string;
//   type: 'percentage' | 'flat';
//   value: number;
//   autoApply: boolean;
//   applyToAll: boolean;
//   active: boolean;
//   usedCount: number;
//   createdAt: Date;
// };

// type PromotionContextType = {
//   promotions: Promotion[];
//   addPromotion: (promo: Promotion) => void;
//   togglePromotion: (id: string) => void;
// };

// const PromotionContext = createContext<PromotionContextType | null>(null);

// export function PromotionProvider({ children }: { children: ReactNode }) {
//   const [promotions, setPromotions] = useState<Promotion[]>([]);

//   const addPromotion = (promo: Promotion) => {
//     setPromotions((prev) => [...prev, promo]);
//   };

//   const togglePromotion = (id: string) => {
//     setPromotions((prev) =>
//       prev.map((p) =>
//         p.id === id ? { ...p, active: !p.active } : p
//       )
//     );
//   };

//   return (
//     <PromotionContext.Provider
//       value={{ promotions, addPromotion, togglePromotion }}
//     >
//       {children}
//     </PromotionContext.Provider>
//   );
// }

// export function usePromotion() {
//   const context = useContext(PromotionContext);
//   if (!context) {
//     throw new Error('usePromotion must be used inside PromotionProvider');
//   }
//   return context;
// }

// app/context/PromotionContext.tsx
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  collection,
  addDoc,
  // getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type Promotion = {
  id: string;
  code: string;
  type: 'percentage' | 'flat';
  value: number;
  autoApply: boolean;
  applyToAll: boolean;
  active: boolean;
  usedCount: number;
  createdAt: Date;
};

type PromotionContextType = {
  promotions: Promotion[];
  addPromotion: (promo: Omit<Promotion, 'id'>) => Promise<void>;
  togglePromotion: (id: string, currentStatus: boolean) => Promise<void>;
  loading: boolean;
};

const PromotionContext = createContext<PromotionContextType | null>(null);

export function PromotionProvider({ children }: { children: ReactNode }) {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Real-time Firestore listener
  useEffect(() => {
    const q = query(
      collection(db, 'promotions'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: Promotion[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Firestore Timestamp → JS Date
          createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        })) as Promotion[];

        setPromotions(data);
        setLoading(false);
      },
      (error) => {
        console.error('Firestore promotions error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ✅ Firestore me save karo
  const addPromotion = async (promo: Omit<Promotion, 'id'>) => {
    try {
      await addDoc(collection(db, 'promotions'), {
        ...promo,
        createdAt: serverTimestamp(),
        usedCount: 0,
      });
      // onSnapshot automatically update karega state
    } catch (error) {
      console.error('Error adding promotion:', error);
      throw error;
    }
  };

  // ✅ Firestore me toggle karo
  const togglePromotion = async (id: string, currentStatus: boolean) => {
    try {
      const promoRef = doc(db, 'promotions', id);
      await updateDoc(promoRef, {
        active: !currentStatus,
      });
      // onSnapshot automatically update karega state
    } catch (error) {
      console.error('Error toggling promotion:', error);
      throw error;
    }
  };

  return (
    <PromotionContext.Provider
      value={{ promotions, addPromotion, togglePromotion, loading }}
    >
      {children}
    </PromotionContext.Provider>
  );
}

export function usePromotion() {
  const context = useContext(PromotionContext);
  if (!context) {
    throw new Error('usePromotion must be used inside PromotionProvider');
  }
  return context;
}