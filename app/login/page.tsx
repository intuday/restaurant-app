// // // 'use client';

// // // import { useState } from 'react';
// // // import { useRouter } from 'next/navigation';

// // // import {
// // //   signInWithEmailAndPassword,
// // //   createUserWithEmailAndPassword,
// // //   GoogleAuthProvider,
// // //   signInWithPopup,
// // // } from 'firebase/auth';

// // // import { auth } from '@/app/lib/firebase';

// // // export default function LoginPage() {
// // //   const [isLogin, setIsLogin] = useState(true);
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');

// // //   const router = useRouter();

// // //   const handleAuth = async (e: React.FormEvent) => {
// // //     e.preventDefault();

// // //     try {
// // //       if (isLogin) {
// // //         await signInWithEmailAndPassword(auth, email, password);

// // //         alert('Login successful');

// // //         // ✅ FIX: redirect after login
// // //         router.push('/');
// // //       } else {
// // //         await createUserWithEmailAndPassword(auth, email, password);

// // //         alert('Account created');

// // //         // auto redirect after signup
// // //         router.push('/');
// // //       }
// // //     } catch (error: any) {
// // //       alert(error.message);
// // //     }
// // //   };

// // //   const handleGoogleLogin = async () => {
// // //     try {
// // //       const provider = new GoogleAuthProvider();

// // //       await signInWithPopup(auth, provider);

// // //       alert('Google login successful');

// // //       // ✅ FIX: redirect
// // //       router.push('/');
// // //     } catch (error: unknown) {
// // //       alert(error.message);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
// // //       <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">

// // //         <h1 className="text-3xl font-bold text-center mb-6 text-orange-600">
// // //           {isLogin ? 'Login' : 'Create Account'}
// // //         </h1>

// // //         <form onSubmit={handleAuth} className="space-y-4">

// // //           <input
// // //             type="email"
// // //             placeholder="Email"
// // //             value={email}
// // //             onChange={(e) => setEmail(e.target.value)}
// // //             className="w-full border p-3 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
// // //             required
// // //           />

// // //           <input
// // //             type="password"
// // //             placeholder="Password"
// // //             value={password}
// // //             onChange={(e) => setPassword(e.target.value)}
// // //             className="w-full border p-3 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
// // //             required
// // //           />

// // //           <button
// // //             type="submit"
// // //             className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold"
// // //           >
// // //             {isLogin ? 'Login' : 'Sign Up'}
// // //           </button>
// // //         </form>

// // //         <button
// // //           onClick={handleGoogleLogin}
// // //           className="w-full mt-4 border py-3 rounded-lg font-semibold dark:border-gray-600 dark:text-white"
// // //         >
// // //           Continue with Google
// // //         </button>

// // //         <p className="text-center mt-6 text-sm dark:text-gray-300">
// // //           {isLogin
// // //             ? "Don't have an account?"
// // //             : 'Already have an account?'}
// // //         </p>

// // //         <button
// // //           onClick={() => setIsLogin(!isLogin)}
// // //           className="w-full mt-2 text-orange-600 font-semibold"
// // //         >
// // //           {isLogin ? 'Create Account' : 'Login'}
// // //         </button>

// // //       </div>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import {
// //   signInWithEmailAndPassword,
// //   createUserWithEmailAndPassword,
// //   GoogleAuthProvider,
// //   signInWithPopup,
// //   updateProfile,
// // } from 'firebase/auth';
// // import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
// // import { auth, db } from '@/app/lib/firebase';

// // export default function LoginPage() {
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [name, setName] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const router = useRouter();

// //   // ✅ SAVE USER TO FIRESTORE
// //   const saveUserToFirestore = async (
// //     uid: string,
// //     userName: string,
// //     userEmail: string,
// //     userPhone: string,
// //     loginMethod: string
// //   ) => {
// //     try {
// //       await setDoc(
// //         doc(db, 'users', uid),
// //         {
// //           name: userName,
// //           email: userEmail,
// //           phone: userPhone,
// //           loginMethod,
// //           updatedAt: serverTimestamp(),
// //         },
// //         { merge: true } // ✅ merge = purana data safe rahega
// //       );
// //     } catch (error) {
// //       console.error('Error saving user:', error);
// //     }
// //   };

// //   // ✅ EMAIL LOGIN / SIGNUP
// //   const handleAuth = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       if (isLogin) {
// //         // LOGIN
// //         const result = await signInWithEmailAndPassword(auth, email, password);

// //         // ✅ Check if user has name & phone in Firestore
// //         const userDoc = await getDoc(doc(db, 'users', result.user.uid));

// //         if (userDoc.exists()) {
// //           const userData = userDoc.data();
// //           if (!userData.name || !userData.phone) {
// //             // Name ya phone missing → form me fill karna padega
// //             alert('Please update your name and phone number');
// //             setIsLogin(false);
// //             setLoading(false);
// //             return;
// //           }
// //         }

// //         router.push('/');
// //       } else {
// //         // SIGNUP
// //         if (!name.trim()) {
// //           alert('Please enter your name');
// //           setLoading(false);
// //           return;
// //         }

// //         if (!phone.trim() || phone.length < 10) {
// //           alert('Please enter a valid phone number');
// //           setLoading(false);
// //           return;
// //         }

// //         const result = await createUserWithEmailAndPassword(
// //           auth,
// //           email,
// //           password
// //         );

// //         // ✅ Update Firebase Auth Profile
// //         await updateProfile(result.user, {
// //           displayName: name,
// //         });

// //         // ✅ Save to Firestore "users" collection
// //         await saveUserToFirestore(
// //           result.user.uid,
// //           name,
// //           email,
// //           phone,
// //           'email'
// //         );

// //         router.push('/');
// //       }
// //     } catch (error: unknown) {
// //       if (error instanceof Error) {
// //         alert(error.message);
// //       } else {
// //         alert('Something went wrong');
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ✅ GOOGLE LOGIN
// //   const handleGoogleLogin = async () => {
// //     setLoading(true);

// //     try {
// //       const provider = new GoogleAuthProvider();
// //       const result = await signInWithPopup(auth, provider);
// //       const user = result.user;

// //       // ✅ Check if user already exists in Firestore
// //       const userDoc = await getDoc(doc(db, 'users', user.uid));

// //       if (userDoc.exists()) {
// //         const userData = userDoc.data();
// //         if (userData.name && userData.phone) {
// //           // ✅ Already has name & phone → go to home
// //           router.push('/');
// //           return;
// //         }
// //       }

// //       // ❌ No name/phone → show phone input
// //       setName(user.displayName || '');
// //       setEmail(user.email || '');
// //       setShowPhoneModal(true);
// //     } catch (error: unknown) {
// //       if (error instanceof Error) {
// //         alert(error.message);
// //       } else {
// //         alert('Something went wrong');
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ✅ PHONE MODAL FOR GOOGLE LOGIN
// //   const [showPhoneModal, setShowPhoneModal] = useState(false);

// //   const handleSavePhone = async () => {
// //     if (!phone.trim() || phone.length < 10) {
// //       alert('Please enter a valid phone number');
// //       return;
// //     }

// //     if (!name.trim()) {
// //       alert('Please enter your name');
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const user = auth.currentUser;
// //       if (user) {
// //         // ✅ Update display name if changed
// //         await updateProfile(user, {
// //           displayName: name,
// //         });

// //         // ✅ Save to Firestore
// //         await saveUserToFirestore(
// //           user.uid,
// //           name,
// //           user.email || email,
// //           phone,
// //           'google'
// //         );

// //         setShowPhoneModal(false);
// //         router.push('/');
// //       }
// //     } catch (error) {
// //       console.error('Error saving phone:', error);
// //       alert('Error saving details');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

// //       {/* ✅ PHONE MODAL (for Google Login) */}
// //       {showPhoneModal && (
// //         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
// //           <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
// //             <h2 className="text-2xl font-bold text-orange-600 mb-2 text-center">
// //               Almost There! 🎉
// //             </h2>
// //             <p className="text-gray-500 text-sm text-center mb-6">
// //               Please enter your details to continue
// //             </p>

// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Full Name *
// //                 </label>
// //                 <input
// //                   type="text"
// //                   placeholder="Enter your full name"
// //                   value={name}
// //                   onChange={(e) => setName(e.target.value)}
// //                   className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //                   required
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Phone Number *
// //                 </label>
// //                 <div className="flex">
// //                   <span className="bg-gray-100 border border-r-0 border-gray-300 px-3 py-3 rounded-l-xl text-gray-500 font-medium">
// //                     +91
// //                   </span>
// //                   <input
// //                     type="tel"
// //                     placeholder="Enter 10 digit number"
// //                     value={phone}
// //                     onChange={(e) => {
// //                       const val = e.target.value.replace(/\D/g, '');
// //                       if (val.length <= 10) setPhone(val);
// //                     }}
// //                     className="w-full border border-gray-300 p-3 rounded-r-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //                     maxLength={10}
// //                     required
// //                   />
// //                 </div>
// //                 {phone && phone.length < 10 && (
// //                   <p className="text-red-500 text-xs mt-1">
// //                     Phone number must be 10 digits
// //                   </p>
// //                 )}
// //               </div>

// //               <button
// //                 onClick={handleSavePhone}
// //                 disabled={loading || phone.length < 10 || !name.trim()}
// //                 className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
// //               >
// //                 {loading ? (
// //                   <span className="flex items-center justify-center gap-2">
// //                     <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
// //                     Saving...
// //                   </span>
// //                 ) : (
// //                   'Continue to Restaurant 🍕'
// //                 )}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* MAIN LOGIN FORM */}
// //       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

// //         {/* Logo/Header */}
// //         <div className="text-center mb-8">
// //           <span className="text-5xl">🍕</span>
// //           <h1 className="text-3xl font-bold text-orange-600 mt-2">
// //             {isLogin ? 'Welcome Back!' : 'Create Account'}
// //           </h1>
// //           <p className="text-gray-500 text-sm mt-1">
// //             {isLogin
// //               ? 'Login to order your favorite food'
// //               : 'Sign up to get started'}
// //           </p>
// //         </div>

// //         <form onSubmit={handleAuth} className="space-y-4">

// //           {/* NAME - Only for Signup */}
// //           {!isLogin && (
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Full Name *
// //               </label>
// //               <input
// //                 type="text"
// //                 placeholder="Enter your full name"
// //                 value={name}
// //                 onChange={(e) => setName(e.target.value)}
// //                 className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //                 required={!isLogin}
// //               />
// //             </div>
// //           )}

// //           {/* EMAIL */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Email *
// //             </label>
// //             <input
// //               type="email"
// //               placeholder="Enter your email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //               required
// //             />
// //           </div>

// //           {/* PHONE - Only for Signup */}
// //           {!isLogin && (
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Phone Number *
// //               </label>
// //               <div className="flex">
// //                 <span className="bg-gray-100 border border-r-0 border-gray-300 px-3 py-3 rounded-l-xl text-gray-500 font-medium">
// //                   +91
// //                 </span>
// //                 <input
// //                   type="tel"
// //                   placeholder="Enter 10 digit number"
// //                   value={phone}
// //                   onChange={(e) => {
// //                     const val = e.target.value.replace(/\D/g, '');
// //                     if (val.length <= 10) setPhone(val);
// //                   }}
// //                   className="w-full border border-gray-300 p-3 rounded-r-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //                   maxLength={10}
// //                   required={!isLogin}
// //                 />
// //               </div>
// //               {phone && phone.length < 10 && (
// //                 <p className="text-red-500 text-xs mt-1">
// //                   Phone number must be 10 digits
// //                 </p>
// //               )}
// //             </div>
// //           )}

// //           {/* PASSWORD */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Password *
// //             </label>
// //             <input
// //               type="password"
// //               placeholder={isLogin ? 'Enter your password' : 'Create a password (min 6 chars)'}
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //               required
// //               minLength={6}
// //             />
// //           </div>

// //           {/* SUBMIT BUTTON */}
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
// //           >
// //             {loading ? (
// //               <span className="flex items-center justify-center gap-2">
// //                 <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
// //                 {isLogin ? 'Logging in...' : 'Creating account...'}
// //               </span>
// //             ) : isLogin ? (
// //               'Login'
// //             ) : (
// //               'Create Account'
// //             )}
// //           </button>
// //         </form>

// //         {/* DIVIDER */}
// //         <div className="flex items-center my-6">
// //           <div className="flex-1 border-t border-gray-300"></div>
// //           <span className="px-4 text-gray-500 text-sm">OR</span>
// //           <div className="flex-1 border-t border-gray-300"></div>
// //         </div>

// //         {/* GOOGLE LOGIN */}
// //         <button
// //           onClick={handleGoogleLogin}
// //           disabled={loading}
// //           className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition disabled:opacity-50"
// //         >
// //           <svg className="w-5 h-5" viewBox="0 0 24 24">
// //             <path
// //               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
// //               fill="#4285F4"
// //             />
// //             <path
// //               d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
// //               fill="#34A853"
// //             />
// //             <path
// //               d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
// //               fill="#FBBC05"
// //             />
// //             <path
// //               d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
// //               fill="#EA4335"
// //             />
// //           </svg>
// //           Continue with Google
// //         </button>

// //         {/* TOGGLE LOGIN / SIGNUP */}
// //         <div className="text-center mt-6">
// //           <p className="text-gray-500 text-sm">
// //             {isLogin ? "Don't have an account?" : 'Already have an account?'}
// //           </p>
// //           <button
// //             onClick={() => {
// //               setIsLogin(!isLogin);
// //               setName('');
// //               setPhone('');
// //               setPassword('');
// //             }}
// //             className="mt-1 text-orange-600 font-semibold hover:text-orange-700 transition"
// //           >
// //             {isLogin ? 'Create Account' : 'Login'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
//   updateProfile,
// } from 'firebase/auth';
// import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
// import { auth, db } from '@/lib/firebase';

// export default function LoginPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPhoneModal, setShowPhoneModal] = useState(false);

//   const router = useRouter();

//   // ✅ SAVE USER TO FIRESTORE
//   const saveUserToFirestore = async (
//     uid: string,
//     userName: string,
//     userEmail: string,
//     userPhone: string,
//     loginMethod: string
//   ) => {
//     try {
//       await setDoc(
//         doc(db, 'users', uid),
//         {
//           name: userName,
//           email: userEmail,
//           phone: userPhone,
//           loginMethod,
//           updatedAt: serverTimestamp(),
//         },
//         { merge: true }
//       );
//     } catch (error) {
//       console.error('Error saving user:', error);
//     }
//   };

//   // ✅ EMAIL LOGIN / SIGNUP
//   const handleAuth = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (isLogin) {
//         const result = await signInWithEmailAndPassword(auth, email, password);

//         const userDoc = await getDoc(doc(db, 'users', result.user.uid));

//         if (userDoc.exists()) {
//           const userData = userDoc.data();
//           if (!userData.name || !userData.phone) {
//             alert('Please update your name and phone number');
//             setIsLogin(false);
//             setLoading(false);
//             return;
//           }
//         }

//         router.push('/');
//       } else {
//         if (!name.trim()) {
//           alert('Please enter your name');
//           setLoading(false);
//           return;
//         }

//         if (!phone.trim() || phone.length < 10) {
//           alert('Please enter a valid phone number');
//           setLoading(false);
//           return;
//         }

//         const result = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );

//         await updateProfile(result.user, {
//           displayName: name,
//         });

//         await saveUserToFirestore(
//           result.user.uid,
//           name,
//           email,
//           phone,
//           'email'
//         );

//         router.push('/');
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         alert(error.message);
//       } else {
//         alert('Something went wrong');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ GOOGLE LOGIN
//   const handleGoogleLogin = async () => {
//     setLoading(true);

//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       const userDoc = await getDoc(doc(db, 'users', user.uid));

//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         if (userData.name && userData.phone) {
//           router.push('/');
//           return;
//         }
//       }

//       setName(user.displayName || '');
//       setEmail(user.email || '');
//       setShowPhoneModal(true);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         alert(error.message);
//       } else {
//         alert('Something went wrong');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSavePhone = async () => {
//     if (!phone.trim() || phone.length < 10) {
//       alert('Please enter a valid phone number');
//       return;
//     }

//     if (!name.trim()) {
//       alert('Please enter your name');
//       return;
//     }

//     setLoading(true);

//     try {
//       const user = auth.currentUser;
//       if (user) {
//         await updateProfile(user, {
//           displayName: name,
//         });

//         await saveUserToFirestore(
//           user.uid,
//           name,
//           user.email || email,
//           phone,
//           'google'
//         );

//         setShowPhoneModal(false);
//         router.push('/');
//       }
//     } catch (error) {
//       console.error('Error saving phone:', error);
//       alert('Error saving details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper for consistent input styles
//   const inputClassName = "w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 border border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent";

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors">
//       {/* ✅ PHONE MODAL (for Google Login) */}
//       {showPhoneModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md">
//             <h2 className="text-2xl font-bold text-orange-600 mb-2 text-center">
//               Almost There! 🎉
//             </h2>
//             <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-6">
//               Please enter your details to continue
//             </p>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your full name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className={inputClassName}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Phone Number *
//                 </label>
//                 <div className="flex">
//                   <span className="bg-gray-100 dark:bg-gray-600 border border-r-0 border-gray-300 dark:border-gray-600 px-3 py-3 rounded-l-xl text-gray-500 dark:text-gray-300 font-medium">
//                     +91
//                   </span>
//                   <input
//                     type="tel"
//                     placeholder="Enter 10 digit number"
//                     value={phone}
//                     onChange={(e) => {
//                       const val = e.target.value.replace(/\D/g, '');
//                       if (val.length <= 10) setPhone(val);
//                     }}
//                     className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 border border-gray-300 dark:border-gray-600 p-3 rounded-r-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     maxLength={10}
//                     required
//                   />
//                 </div>
//                 {phone && phone.length < 10 && (
//                   <p className="text-red-500 dark:text-red-400 text-xs mt-1">
//                     Phone number must be 10 digits
//                   </p>
//                 )}
//               </div>

//               <button
//                 onClick={handleSavePhone}
//                 disabled={loading || phone.length < 10 || !name.trim()}
//                 className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                     Saving...
//                   </span>
//                 ) : (
//                   'Continue to Restaurant 🍕'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* MAIN LOGIN FORM */}
//       <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
//         {/* Logo/Header */}
//         <div className="text-center mb-8">
//           <span className="text-5xl">🍕</span>
//           <h1 className="text-3xl font-bold text-orange-600 mt-2">
//             {isLogin ? 'Welcome Back!' : 'Create Account'}
//           </h1>
//           <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
//             {isLogin
//               ? 'Login to order your favorite food'
//               : 'Sign up to get started'}
//           </p>
//         </div>

//         <form onSubmit={handleAuth} className="space-y-4">
//           {/* NAME - Only for Signup */}
//           {!isLogin && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Full Name *
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className={inputClassName}
//                 required={!isLogin}
//               />
//             </div>
//           )}

//           {/* EMAIL */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Email *
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className={inputClassName}
//               required
//             />
//           </div>

//           {/* PHONE - Only for Signup */}
//           {!isLogin && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Phone Number *
//               </label>
//               <div className="flex">
//                 <span className="bg-gray-100 dark:bg-gray-600 border border-r-0 border-gray-300 dark:border-gray-600 px-3 py-3 rounded-l-xl text-gray-500 dark:text-gray-300 font-medium">
//                   +91
//                 </span>
//                 <input
//                   type="tel"
//                   placeholder="Enter 10 digit number"
//                   value={phone}
//                   onChange={(e) => {
//                     const val = e.target.value.replace(/\D/g, '');
//                     if (val.length <= 10) setPhone(val);
//                   }}
//                   className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 border border-gray-300 dark:border-gray-600 p-3 rounded-r-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   maxLength={10}
//                   required={!isLogin}
//                 />
//               </div>
//               {phone && phone.length < 10 && (
//                 <p className="text-red-500 dark:text-red-400 text-xs mt-1">
//                   Phone number must be 10 digits
//                 </p>
//               )}
//             </div>
//           )}

//           {/* PASSWORD */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Password *
//             </label>
//             <input
//               type="password"
//               placeholder={isLogin ? 'Enter your password' : 'Create a password (min 6 chars)'}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className={inputClassName}
//               required
//               minLength={6}
//             />
//           </div>

//           {/* SUBMIT BUTTON */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                 {isLogin ? 'Logging in...' : 'Creating account...'}
//               </span>
//             ) : isLogin ? (
//               'Login'
//             ) : (
//               'Create Account'
//             )}
//           </button>
//         </form>

//         {/* DIVIDER */}
//         <div className="flex items-center my-6">
//           <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
//           <span className="px-4 text-gray-500 dark:text-gray-400 text-sm">OR</span>
//           <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
//         </div>

//         {/* GOOGLE LOGIN */}
//         <button
//           onClick={handleGoogleLogin}
//           disabled={loading}
//           className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 dark:border-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition disabled:opacity-50"
//         >
//           <svg className="w-5 h-5" viewBox="0 0 24 24">
//             <path
//               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
//               fill="#4285F4"
//             />
//             <path
//               d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               fill="#34A853"
//             />
//             <path
//               d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               fill="#FBBC05"
//             />
//             <path
//               d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               fill="#EA4335"
//             />
//           </svg>
//           Continue with Google
//         </button>

//         {/* TOGGLE LOGIN / SIGNUP */}
//         <div className="text-center mt-6">
//           <p className="text-gray-500 dark:text-gray-400 text-sm">
//             {isLogin ? "Don't have an account?" : 'Already have an account?'}
//           </p>
//           <button
//             onClick={() => {
//               setIsLogin(!isLogin);
//               setName('');
//               setPhone('');
//               setPassword('');
//             }}
//             className="mt-1 text-orange-600 font-semibold hover:text-orange-700 transition"
//           >
//             {isLogin ? 'Create Account' : 'Login'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
'use effect'
'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

// 🌟 Main logic component
function LoginContent() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const router = useRouter();

  // 🛡️ BULLETPROOF: Lazy State Initialization (No unused searchParams warning)
  const [fixedTable] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tableFromUrl = params.get('table');
      
      if (tableFromUrl) {
        sessionStorage.setItem('qr_table_number', tableFromUrl);
        console.log("🎯 QR Code Detected! Table Number Locked via Initializer:", tableFromUrl);
        return tableFromUrl;
      }
      
      return sessionStorage.getItem('qr_table_number');
    }
    return null;
  });

  // ✅ SAVE USER TO FIRESTORE
  const saveUserToFirestore = async (
    uid: string,
    userName: string,
    userEmail: string,
    userPhone: string,
    loginMethod: string
  ) => {
    try {
      await setDoc(
        doc(db, 'users', uid),
        {
          name: userName,
          email: userEmail,
          phone: userPhone,
          loginMethod,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Error saving user to Firestore:', error);
    }
  };

  // ✅ EMAIL LOGIN / SIGNUP (Type safe with standard React.FormEvent)
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', result.user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (!userData.name || !userData.phone) {
            alert('Please update your name and phone number');
            setIsLogin(false);
            setLoading(false);
            return;
          }
        }
        router.push('/menu');
      } else {
        if (!name.trim() || !phone.trim() || phone.length < 10) {
          alert('Please enter valid Name and 10-digit Phone Number');
          setLoading(false);
          return;
        }

        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        await saveUserToFirestore(result.user.uid, name, email, phone, 'email');
        
        router.push('/menu');
      }
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.name && userData.phone) {
          router.push('/menu');
          return;
        }
      }

      setName(user.displayName || '');
      setEmail(user.email || '');
      setShowPhoneModal(true);
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePhone = async () => {
    if (!phone.trim() || phone.length < 10 || !name.trim()) {
      alert('Please fill all details correctly');
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, { displayName: name });
        await saveUserToFirestore(user.uid, name, user.email || email, phone, 'google');
        setShowPhoneModal(false);
        router.push('/menu');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving details');
    } finally {
      setLoading(false);
    }
  };

  const inputClassName = "w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 border border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors">
      
      {/* GOOGLE LOGIN PHONE MODAL */}
      {showPhoneModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-orange-600 mb-2 text-center">Almost There! 🎉</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-4">Please enter your details to continue</p>

            {fixedTable && (
              <div className="mb-4 bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 text-center">
                <span className="text-xs uppercase tracking-wider text-orange-600 font-bold block">Assigned Location</span>
                <span className="text-2xl font-black text-gray-900 dark:text-white">Table {fixedTable}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClassName} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number *</label>
                <div className="flex">
                  <span className="bg-gray-100 dark:bg-gray-600 border border-r-0 border-gray-300 dark:border-gray-600 px-3 py-3 rounded-l-xl text-gray-500 dark:text-gray-300 font-medium">+91</span>
                  <input
                    type="tel"
                    placeholder="10 digit number"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 10) setPhone(val);
                    }}
                    className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-r-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    maxLength={10}
                    required
                  />
                </div>
              </div>
              <button onClick={handleSavePhone} disabled={loading || phone.length < 10 || !name.trim()} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50">
                {loading ? 'Saving...' : 'Continue to Restaurant 🍕'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN LOGIN FORM */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <span className="text-5xl">🍕</span>
          <h1 className="text-3xl font-bold text-orange-600 mt-2">{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{isLogin ? 'Login to order your favorite food' : 'Sign up to get started'}</p>
        </div>

        {fixedTable ? (
          <div className="mb-6 bg-orange-500/10 border-2 border-dashed border-orange-500/30 rounded-xl p-3 text-center bg-linear-to-r from-orange-500/5 to-transparent">
            <span className="text-xs uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold block">🚨 QR Code Dynamic Lock</span>
            <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Table {fixedTable}</span>
          </div>
        ) : (
          <div className="mb-6 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-center">
            <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold block">Order Type</span>
            <span className="text-lg font-bold text-gray-700 dark:text-gray-300">Takeaway / Direct Order</span>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
              <input type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} className={inputClassName} required={!isLogin} />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClassName} required />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number *</label>
              <div className="flex">
                <span className="bg-gray-100 dark:bg-gray-600 border border-r-0 border-gray-300 dark:border-gray-600 px-3 py-3 rounded-l-xl text-gray-500 dark:text-gray-300 font-medium">+91</span>
                <input
                  type="tel"
                  placeholder="10 digit number"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 10) setPhone(val);
                  }}
                  className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-r-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  maxLength={10}
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password *</label>
            <input type="password" placeholder="Min 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClassName} required minLength={6} />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50">
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-4 text-gray-500 dark:text-gray-400 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        <button onClick={handleGoogleLogin} disabled={loading} className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 dark:border-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        <div className="text-center mt-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm">{isLogin ? "Don't have an account?" : 'Already have an account?'}</p>
          <button onClick={() => { setIsLogin(!isLogin); setName(''); setPhone(''); setPassword(''); }} className="mt-1 text-orange-600 font-semibold hover:text-orange-700 transition">
            {isLogin ? 'Create Account' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-500">Loading Login System...</div>}>
      <LoginContent />
    </Suspense>
  );
}