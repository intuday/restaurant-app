// // 'use client';

// // import { useState } from 'react';
// // import { db } from '@/app/lib/firebase';
// // import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// // import { useRouter } from 'next/navigation';

// // export default function AddProductPage() {
// //   const router = useRouter();

// //   const [name, setName] = useState('');
// //   const [price, setPrice] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [image, setImage] = useState('');
// //   const [category, setCategory] = useState('');

// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     try {
// //       setLoading(true);

// //       await addDoc(collection(db, 'products'), {
// //         name,
// //         price: Number(price),
// //         description,
// //         image,
// //         category,
// //         createdAt: serverTimestamp(),
// //       });

// //       alert('Product added successfully');

// //       // reset form
// //       setName('');
// //       setPrice('');
// //       setDescription('');
// //       setImage('');
// //       setCategory('');

// //       router.push('/admin');
// //     } catch (error: any) {
// //       alert(error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">

// //       <h1 className="text-3xl font-bold text-orange-600 mb-6">
// //         Add New Food 🍕
// //       </h1>

// //       <form
// //         onSubmit={handleSubmit}
// //         className="max-w-lg space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
// //       >

// //         <input
// //           type="text"
// //           placeholder="Food Name"
// //           value={name}
// //           onChange={(e) => setName(e.target.value)}
// //           className="w-full p-3 border rounded"
// //           required
// //         />

// //         <input
// //           type="number"
// //           placeholder="Price"
// //           value={price}
// //           onChange={(e) => setPrice(e.target.value)}
// //           className="w-full p-3 border rounded"
// //           required
// //         />

// //         <textarea
// //           placeholder="Description"
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //           className="w-full p-3 border rounded"
// //           required
// //         />

// //         <input
// //           type="text"
// //           placeholder="Image URL"
// //           value={image}
// //           onChange={(e) => setImage(e.target.value)}
// //           className="w-full p-3 border rounded"
// //           required
// //         />

// //         <input
// //           type="text"
// //           placeholder="Category (pizza, burger etc)"
// //           value={category}
// //           onChange={(e) => setCategory(e.target.value)}
// //           className="w-full p-3 border rounded"
// //           required
// //         />

// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full bg-orange-600 text-white py-3 rounded font-bold"
// //         >
// //           {loading ? 'Adding...' : 'Add Food'}
// //         </button>

// //       </form>
// //     </div>
// //   );
// // }

// 'use client';

// import { useState } from 'react';
// import { db } from '@/app/lib/firebase';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { useRouter } from 'next/navigation';

// export default function AddProductPage() {
//   const router = useRouter();

//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState('');
//   const [category, setCategory] = useState('');

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       await addDoc(collection(db, 'products'), {
//         name,
//         price: Number(price),
//         description,
//         image,
//         category,
//         createdAt: serverTimestamp(),
//       });

//       alert('Product added successfully');

//       // reset form
//       setName('');
//       setPrice('');
//       setDescription('');
//       setImage('');
//       setCategory('');

//       router.push('/admin');
//     } catch (error: any) {
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">

//       <h1 className="text-3xl font-bold text-orange-600 mb-6">
//         Add New Food 🍕
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="max-w-lg space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
//       >

//         <input
//           type="text"
//           placeholder="Food Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full p-3 border rounded"
//           required
//         />

//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           className="w-full p-3 border rounded"
//           required
//         />

//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full p-3 border rounded"
//           required
//         />

//         <input
//           type="text"
//           placeholder="Image URL"
//           value={image}
//           onChange={(e) => setImage(e.target.value)}
//           className="w-full p-3 border rounded"
//           required
//         />

//         <input
//           type="text"
//           placeholder="Category (pizza, burger etc)"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="w-full p-3 border rounded"
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-orange-600 text-white py-3 rounded font-bold"
//         >
//           {loading ? 'Adding...' : 'Add Food'}
//         </button>

//       </form>
//     </div>
//   );
// }