'use client';

import React, { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface FavoriteItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function MyFavoritesSection() {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fallbackImage = 'https://images.unsplash.com/photo-1561047029-3000c68339ca';

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const favoritesCollectionRef = collection(db, 'users', user.uid, 'favorites');
    const sortedFavoritesQuery = query(favoritesCollectionRef, orderBy('savedAt', 'desc'));

    const unsubscribeSnapshot = onSnapshot(
      sortedFavoritesQuery, 
      (querySnapshot) => {
        const fetchedFavorites: FavoriteItem[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          fetchedFavorites.push({ 
            id: documentSnapshot.id, 
            ...documentSnapshot.data() 
          } as FavoriteItem);
        });
        setFavorites(fetchedFavorites);
        setLoading(false);
      }, 
      (error) => {
        console.error('CRITICAL: Failed to fetch real-time favorites snapshot collection:', error);
        setLoading(false);
      }
    );

    return () => unsubscribeSnapshot();
  }, [user]);

  const handleRemoveFavorite = async (itemId: string): Promise<void> => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'favorites', itemId));
    } catch (error) {
      console.error('CRITICAL: Failed to remove document from favorites subcollection:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center animate-pulse text-gray-500 dark:text-gray-400 font-medium tracking-wide">
        Retrieving your registered favorite items...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <p className="text-gray-500 dark:text-gray-400 font-semibold">
          Access Denied: Please authenticate to securely view your favorites dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500 fill-red-500" /> My Favorite Dishes
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Review and manage all products bookmarked from the catalog interface.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm px-6">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Saved Items Found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto text-sm mt-1 mb-6">
            Your preferences registry is empty. Explore the active food catalog and tap the heart indicator to populate this dashboard.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-orange-500/10"
          >
            Explore Restaurant Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favorites.map((item) => (
            <div 
              key={item.id}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-2xl flex items-center gap-4 relative transition hover:shadow-md duration-200 group"
            >
              <div className="w-20 h-20 rounded-xl bg-gray-50 dark:bg-gray-800 overflow-hidden shrink-0 relative">
                <img 
                  src={item.image && item.image.trim() !== '' ? item.image : fallbackImage} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackImage;
                  }}
                />
              </div>

              <div className="flex-1 min-w-0 pr-10">
                <span className="text-[10px] bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {item.category || 'Food Item'}
                </span>
                <h4 className="font-bold text-gray-900 dark:text-white text-base mt-1 truncate">
                  {item.name}
                </h4>
                <p className="text-gray-400 dark:text-gray-500 text-xs truncate mt-0.5">
                  {item.description}
                </p>
                <p className="text-orange-600 dark:text-orange-400 font-extrabold text-sm mt-1">
                  ₹{item.price.toFixed(2)}
                </p>
              </div>

              <div className="absolute right-4 top-4 bottom-4 flex flex-col justify-between items-end">
                <button
                  onClick={() => handleRemoveFavorite(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition rounded-lg"
                  title="Remove reference profile entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <Link
                  href="/menu"
                  className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-md transition transform hover:scale-105 active:scale-95"
                  title="Redirect to menu page context"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}