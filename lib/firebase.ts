// // import { initializeApp } from 'firebase/app';
// // import { getAuth } from 'firebase/auth';
// // import { getFirestore } from 'firebase/firestore';

// // const firebaseConfig = {
// //   apiKey: "AIzaSyCzU0TcrQKO5I7OfjY5zeCLTrBwBDuQ99c",
// //   authDomain: "tasty-bites-restaurant-ef4c9.firebaseapp.com",
// //   projectId: "tasty-bites-restaurant-ef4c9",
// //   storageBucket: "tasty-bites-restaurant-ef4c9.firebasestorage.app",
// //   messagingSenderId: "770210613439",
// //   appId: "1:770210613439:web:6b35c303ef6d5d733e9e0a",
// // };

// // const app = initializeApp(firebaseConfig);

// // export const auth = getAuth(app);
// // export const db = getFirestore(app);

// // export default app;
// // lib/firebase.ts
// import { initializeApp, getApps, getApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// // Hamesha environment variables use karein taaki keys safe rahein
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// // Singleton initialization (Next.js hot reload safe)
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// export const auth = getAuth(app);
// export const db = getFirestore(app);

// export default app;
// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// 🔥 FIXED: getFirestore hata kar offline cache initialize karne ke zaruri methods import kiye
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Singleton initialization (Next.js hot reload safe)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

// 🔥 GLOBAL FIX: Standard getFirestore(app) hata kar auto offline handling inject kar di.
// Ab agar background me firebase cloud network block bhi hoga, toh browser error nahi dega,
// balki disk/memory cache se menu items load kar dega!
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

export default app;