// // 'use client';

// // import {
// //   onAuthStateChanged,
// //   User,
// //   signOut,
// // } from 'firebase/auth';

// // import {
// //   createContext,
// //   useContext,
// //   useEffect,
// //   useState,
// // } from 'react';

// // import { auth, db } from '@/app/lib/firebase';
// // import { doc, getDoc, setDoc } from 'firebase/firestore';

// // interface AuthContextType {
// //   user: User | null;
// //   loading: boolean;
// //   logout: () => Promise<void>;
// //   isAdmin: boolean | null;
// // }

// // const AuthContext = createContext<AuthContextType>({
// //   user: null,
// //   loading: true,
// //   logout: async () => {},
// //   isAdmin: null,
// // });

// // export function AuthProvider({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// //       setUser(user);
// //       setLoading(true);

// //       if (user) {
// //         const userRef = doc(db, 'users', user.uid);
// //         const userSnap = await getDoc(userRef);

// //         // create user if not exists
// //         if (!userSnap.exists()) {
// //           await setDoc(userRef, {
// //             uid: user.uid,
// //             email: user.email,
// //             role: 'user',
// //             createdAt: new Date().toISOString(),
// //           });
// //         }

// //         const data = (await getDoc(userRef)).data();

// //         setIsAdmin(data?.role === 'admin');
// //       } else {
// //         setIsAdmin(false);
// //       }

// //       setLoading(false);
// //     });

// //     return () => unsubscribe();
// //   }, []);

// //   const logout = async () => {
// //     await signOut(auth);
// //   };

// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         user,
// //         loading,
// //         logout,
// //         isAdmin,
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export function useAuth() {
// //   return useContext(AuthContext);
// // }
// 'use client';

// import {
//   onAuthStateChanged,
//   User,
//   signOut,
// } from 'firebase/auth';

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';

// import { auth, db } from '@/lib/firebase';
// import { doc, getDoc, setDoc } from 'firebase/firestore';

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   logout: () => Promise<void>;
//   isAdmin: boolean | null;
//   userData: UserData | null;
// }

// type UserData = {
//   uid: string;
//   email: string;
//   name?: string;
//   phone?: string;
//   role: 'admin' | 'user';
//   photoURL?: string;
//   loginMethod?: string;
//   totalOrders?: number;
//   totalSpent?: number;
//   createdAt?: string;
// };

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
//   logout: async () => {},
//   isAdmin: null,
//   userData: null,
// });

// export function AuthProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
//   const [userData, setUserData] = useState<UserData | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       setUser(firebaseUser);
//       setLoading(true);

//       if (firebaseUser) {
//         const userRef = doc(db, 'users', firebaseUser.uid);
//         let userSnap = await getDoc(userRef);

//         // ✅ Agar user exist nahi karta to create karo role: 'user' ke saath
//         if (!userSnap.exists()) {
//           await setDoc(userRef, {
//             uid: firebaseUser.uid,
//             email: firebaseUser.email,
//             name: firebaseUser.displayName || '',
//             role: 'user',
//             createdAt: new Date().toISOString(),
//           });
//           userSnap = await getDoc(userRef);
//         }

//         const data = userSnap.data() as UserData;
//         setUserData(data);
//         setIsAdmin(data?.role === 'admin');
//       } else {
//         setIsAdmin(false);
//         setUserData(null);
//       }

//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const logout = async () => {
//     await signOut(auth);
//     setUserData(null);
//     setIsAdmin(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         logout,
//         isAdmin,
//         userData,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
'use client';

import {
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  isAdmin: boolean | null;
  userData: UserData | null;
  // New QR Table System Properties
  tableNumber: string | null;
  clearTableSession: () => void;
}

type UserData = {
  uid: string;
  email: string;
  name?: string;
  phone?: string;
  role: 'admin' | 'user';
  photoURL?: string;
  loginMethod?: string;
  totalOrders?: number;
  totalSpent?: number;
  createdAt?: string;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  isAdmin: null,
  userData: null,
  // New QR Table System Default States
  tableNumber: null,
  clearTableSession: () => {},
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  // New QR Table System State
  const [tableNumber, setTableNumber] = useState<string | null>(null);

  useEffect(() => {
    // Hydrate table state from sessionStorage securely on component mount
    if (typeof window !== 'undefined') {
      const storedTable = sessionStorage.getItem('qr_table_number');
      if (storedTable) {
        setTableNumber(storedTable);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(true);

      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        let userSnap = await getDoc(userRef);

        // ✅ Agar user exist nahi karta to create karo role: 'user' ke saath
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || '',
            role: 'user',
            createdAt: new Date().toISOString(),
          });
          userSnap = await getDoc(userRef);
        }

        const data = userSnap.data() as UserData;
        setUserData(data);
        setIsAdmin(data?.role === 'admin');
      } else {
        setIsAdmin(false);
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUserData(null);
    setIsAdmin(false);
  };

  // New QR Table System Method to clear session data after order placement
  const clearTableSession = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('qr_table_number');
    }
    setTableNumber(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        isAdmin,
        userData,
        // Expose new properties globally
        tableNumber,
        clearTableSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}