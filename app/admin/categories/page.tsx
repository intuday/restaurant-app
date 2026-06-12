// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { db } from '../../../lib/firebase';
// // import { Timestamp } from 'firebase/firestore';
// // import {
// //   collection,
// //   addDoc,
// //   getDocs,
// //   deleteDoc,
// //   updateDoc,
// //   doc,
// //   serverTimestamp,
// // } from 'firebase/firestore';

// // type Category = {
// //   id: string;
// //   name: string;
// //   image?: string;
// //   active?: boolean;
// //   createdAt?: Timestamp;
// // };

// // type Product = {
// //   id: string;
// //   category?: string;
// // };
// // <main className="flex-1 min-w-0 bg-gray-50 dark:bg-gray-900"></main>
// // export default function CategoriesPage() {
// //   const [categories, setCategories] = useState<
// //     Category[]
// //   >([]);

// //   const [products, setProducts] = useState<
// //     Product[]
// //   >([]);

// //   const [loading, setLoading] = useState(true);

// //   // FORM STATES
// //   const [name, setName] = useState('');
// //   const [image, setImage] = useState('');

// //   // FORM TOGGLE
// //   const [showForm, setShowForm] =
// //     useState(false);

// //   // EDIT MODE
// //   const [editingId, setEditingId] =
// //     useState<string | null>(null);

// //   // FETCH DATA
// //   const fetchData = async () => {
// //     try {
// //       const categorySnapshot = await getDocs(
// //         collection(db, 'categories')
// //       );

// //       const categoriesData =
// //         categorySnapshot.docs.map((item) => ({
// //           id: item.id,
// //           ...item.data(),
// //         })) as Category[];

// //       setCategories(categoriesData);

// //       // PRODUCTS
// //       const productSnapshot = await getDocs(
// //         collection(db, 'products')
// //       );

// //       const productData =
// //         productSnapshot.docs.map((item) => ({
// //           id: item.id,
// //           ...item.data(),
// //         })) as Product[];

// //       setProducts(productData);
// //     } catch (error) {
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// // useEffect(() => {
// //   const load = async () => {
// //     await fetchData();
// //   };

// //   load();
// // }, []);

// //   // RESET FORM
// //   const resetForm = () => {
// //     setName('');
// //     setImage('');
// //     setEditingId(null);
// //   };

// //   // ADD / UPDATE CATEGORY
// //   const handleSubmit = async (
// //     e: React.FormEvent
// //   ) => {
// //     e.preventDefault();

// //     try {
// //       // UPDATE
// //       if (editingId) {
// //         await updateDoc(
// //           doc(db, 'categories', editingId),
// //           {
// //             name,
// //             image,
// //           }
// //         );

// //         setCategories((prev) =>
// //           prev.map((item) =>
// //             item.id === editingId
// //               ? {
// //                   ...item,
// //                   name,
// //                   image,
// //                 }
// //               : item
// //           )
// //         );

// //         alert('Category updated');
// //       } else {
// //         // ADD
// //         const docRef = await addDoc(
// //           collection(db, 'categories'),
// //           {
// //             name,
// //             image,
// //             active: true,
// //             createdAt: serverTimestamp(),
// //           }
// //         );

// //         const newCategory: Category = {
// //           id: docRef.id,
// //           name,
// //           image,
// //           active: true,
// //         };

// //         setCategories((prev) => [
// //           newCategory,
// //           ...prev,
// //         ]);

// //         alert('Category added');
// //       }

// //       resetForm();
// //       setShowForm(false);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   // DELETE CATEGORY
// //   const handleDelete = async (
// //     id: string
// //   ) => {
// //     const confirmDelete = confirm(
// //       'Delete this category?'
// //     );

// //     if (!confirmDelete) return;

// //     try {
// //       await deleteDoc(
// //         doc(db, 'categories', id)
// //       );

// //       setCategories((prev) =>
// //         prev.filter((item) => item.id !== id)
// //       );
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   // EDIT CATEGORY
// //   const handleEdit = (
// //     category: Category
// //   ) => {
// //     setEditingId(category.id);

// //     setName(category.name);
// //     setImage(category.image || '');

// //     setShowForm(true);

// //     window.scrollTo({
// //       top: 0,
// //       behavior: 'smooth',
// //     });
// //   };

// //   // TOGGLE STATUS
// //   const toggleStatus = async (
// //     id: string,
// //     currentStatus: boolean
// //   ) => {
// //     try {
// //       await updateDoc(
// //         doc(db, 'categories', id),
// //         {
// //           active: !currentStatus,
// //         }
// //       );

// //       setCategories((prev) =>
// //         prev.map((item) =>
// //           item.id === id
// //             ? {
// //                 ...item,
// //                 active: !currentStatus,
// //               }
// //             : item
// //         )
// //       );
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   // PRODUCTS COUNT
// //   const getProductCount = (
// //     categoryName: string
// //   ) => {
// //     return products.filter(
// //       (item) =>
// //         item.category?.toLowerCase() ===
// //         categoryName.toLowerCase()
// //     ).length;
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-4 md:p-6">

// //       {/* HEADER */}
// //       <div className="flex items-center justify-between mb-6">
// //         <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
// //           Categories
// //         </h1>

// //         <button
// //           onClick={() =>
// //             setShowForm(!showForm)
// //           }
// //           className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
// //         >
// //           {showForm
// //             ? 'Close Form'
// //             : editingId
// //             ? 'Update Category'
// //             : 'Add Category'}
// //         </button>
// //       </div>

// //       {/* FORM */}
// //       {showForm && (
// //         <form
// //           onSubmit={handleSubmit}
// //           className="bg-white rounded-2xl shadow p-5 mb-8 space-y-4"
// //         >
// //           <h2 className="text-xl font-semibold">
// //             {editingId
// //               ? 'Update Category'
// //               : 'Add Category'}
// //           </h2>

// //           <input
// //             type="text"
// //             placeholder="Category Name"
// //             value={name}
// //             onChange={(e) =>
// //               setName(e.target.value)
// //             }
// //             className="w-full border p-3 rounded-xl"
// //             required
// //           />

// //           <input
// //             type="text"
// //             placeholder="Category Image URL"
// //             value={image}
// //             onChange={(e) =>
// //               setImage(e.target.value)
// //             }
// //             className="w-full border p-3 rounded-xl"
            
// //           />

// //           <div className="flex gap-3">
// //             <button
// //               type="submit"
// //               className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
// //             >
// //               {editingId
// //                 ? 'Update Category'
// //                 : 'Add Category'}
// //             </button>

// //             <button
// //               type="button"
// //               onClick={() => {
// //                 resetForm();
// //                 setShowForm(false);
// //               }}
// //               className="bg-gray-300 px-5 py-3 rounded-xl hover:bg-gray-400 transition"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       )}

// //       {/* LOADING */}
// //       {loading ? (
// //         <div className="text-center py-20 text-gray-600">
// //           Loading categories...
// //         </div>
// //       ) : categories.length === 0 ? (
// //         <div className="bg-white rounded-2xl shadow p-10 text-center">
// //           <p className="text-gray-500">
// //             No categories found.
// //           </p>
// //         </div>
// //       ) : (
// //         <>
// //           {/* DESKTOP TABLE */}
// //           <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow">
// //             <table className="w-full">
// //               <thead className="bg-gray-100">
// //                 <tr>
// //                   <th className="text-left px-6 py-4">
// //                     Image
// //                   </th>

// //                   <th className="text-left px-6 py-4">
// //                     Category Name
// //                   </th>

// //                   <th className="text-left px-6 py-4">
// //                     Products Count
// //                   </th>

// //                   <th className="text-left px-6 py-4">
// //                     Status
// //                   </th>

// //                   <th className="text-left px-6 py-4">
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>

// //               <tbody>
// //                 {categories.map((category) => (
// //                   <tr
// //                     key={category.id}
// //                     className="border-t hover:bg-gray-50 transition"
// //                   >
// //                     <td className="px-6 py-4">
// //                       {category.image ? (
// //                         <img
// //   src={category.image}
// //   alt={category.name}
// //   className="w-12 h-12 object-cover rounded-lg"

// // />
// //                       ) : (
// //                         <div className="w-14 h-14 rounded-xl bg-gray-200" />
// //                       )}
// //                     </td>

// //                     <td className="px-6 py-4 font-medium">
// //                       {category.name}
// //                     </td>

// //                     <td className="px-6 py-4">
// //                       {getProductCount(
// //                         category.name
// //                       )}
// //                     </td>

// //                     <td className="px-6 py-4">
// //                       <button
// //                         onClick={() =>
// //                           toggleStatus(
// //                             category.id,
// //                             !!category.active
// //                           )
// //                         }
// //                         className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
// //                           category.active
// //                             ? 'bg-green-100 text-green-700'
// //                             : 'bg-red-100 text-red-700'
// //                         }`}
// //                       >
// //                         {category.active
// //                           ? 'Active'
// //                           : 'Inactive'}
// //                       </button>
// //                     </td>

// //                     <td className="px-6 py-4 flex gap-3">
// //                       <button
// //                         onClick={() =>
// //                           handleEdit(category)
// //                         }
// //                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition"
// //                       >
// //                         Edit
// //                       </button>

// //                       <button
// //                         onClick={() =>
// //                           handleDelete(category.id)
// //                         }
// //                         className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
// //                       >
// //                         Delete
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* MOBILE CARDS */}
// //           <div className="grid gap-4 md:hidden">
// //             {categories.map((category) => (
// //               <div
// //                 key={category.id}
// //                 className="bg-white rounded-2xl shadow p-4"
// //               >
// //                 <div className="flex gap-4">
// //                   {category.image ? (
// //                     <img
// //                       src={category.image}
// //                       alt={category.name}
// //                       className="w-20 h-20 rounded-xl object-cover"
// //                     />
// //                   ) : (
// //                     <div className="w-20 h-20 rounded-xl bg-gray-200" />
// //                   )}

// //                   <div className="flex-1">
// //                     <h2 className="text-lg font-semibold">
// //                       {category.name}
// //                     </h2>

// //                     <p className="text-gray-500 mt-1">
// //                       Products:{' '}
// //                       {getProductCount(
// //                         category.name
// //                       )}
// //                     </p>

// //                     <button
// //                       onClick={() =>
// //                         toggleStatus(
// //                           category.id,
// //                           !!category.active
// //                         )
// //                       }
// //                       className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
// //                         category.active
// //                           ? 'bg-green-100 text-green-700'
// //                           : 'bg-red-100 text-red-700'
// //                       }`}
// //                     >
// //                       {category.active
// //                         ? 'Active'
// //                         : 'Inactive'}
// //                     </button>
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-3 mt-4">
// //                   <button
// //                     onClick={() =>
// //                       handleEdit(category)
// //                     }
// //                     className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition"
// //                   >
// //                     Edit
// //                   </button>

// //                   <button
// //                     onClick={() =>
// //                       handleDelete(category.id)
// //                     }
// //                     className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
// //                   >
// //                     Delete
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // }
// 'use client';

// import { useEffect, useState } from 'react';
// import { db } from '../../../lib/firebase';
// import { Timestamp } from 'firebase/firestore';
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   updateDoc,
//   doc,
//   serverTimestamp,
// } from 'firebase/firestore';

// type Category = {
//   id: string;
//   name: string;
//   image?: string;
//   active?: boolean;
//   createdAt?: Timestamp;
// };

// type Product = {
//   id: string;
//   category?: string;
// };

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   // FORM STATES
//   const [name, setName] = useState('');
//   const [image, setImage] = useState('');

//   // FORM TOGGLE
//   const [showForm, setShowForm] = useState(false);

//   // EDIT MODE
//   const [editingId, setEditingId] = useState<string | null>(null);

//   // FETCH DATA
//   const fetchData = async () => {
//     try {
//       const categorySnapshot = await getDocs(collection(db, 'categories'));

//       const categoriesData = categorySnapshot.docs.map((item) => ({
//         id: item.id,
//         ...item.data(),
//       })) as Category[];

//       setCategories(categoriesData);

//       // PRODUCTS
//       const productSnapshot = await getDocs(collection(db, 'products'));

//       const productData = productSnapshot.docs.map((item) => ({
//         id: item.id,
//         ...item.data(),
//       })) as Product[];

//       setProducts(productData);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const load = async () => {
//       await fetchData();
//     };

//     load();
//   }, []);

//   // RESET FORM
//   const resetForm = () => {
//     setName('');
//     setImage('');
//     setEditingId(null);
//   };

//   // ADD / UPDATE CATEGORY
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       // UPDATE
//       if (editingId) {
//         await updateDoc(doc(db, 'categories', editingId), {
//           name,
//           image,
//         });

//         setCategories((prev) =>
//           prev.map((item) =>
//             item.id === editingId
//               ? {
//                   ...item,
//                   name,
//                   image,
//                 }
//               : item
//           )
//         );

//         alert('Category updated');
//       } else {
//         // ADD
//         const docRef = await addDoc(collection(db, 'categories'), {
//           name,
//           image,
//           active: true,
//           createdAt: serverTimestamp(),
//         });

//         const newCategory: Category = {
//           id: docRef.id,
//           name,
//           image,
//           active: true,
//         };

//         setCategories((prev) => [newCategory, ...prev]);

//         alert('Category added');
//       }

//       resetForm();
//       setShowForm(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // DELETE CATEGORY
//   const handleDelete = async (id: string) => {
//     const confirmDelete = confirm('Delete this category?');

//     if (!confirmDelete) return;

//     try {
//       await deleteDoc(doc(db, 'categories', id));

//       setCategories((prev) => prev.filter((item) => item.id !== id));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // EDIT CATEGORY
//   const handleEdit = (category: Category) => {
//     setEditingId(category.id);

//     setName(category.name);
//     setImage(category.image || '');

//     setShowForm(true);

//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   // TOGGLE STATUS
//   const toggleStatus = async (id: string, currentStatus: boolean) => {
//     try {
//       await updateDoc(doc(db, 'categories', id), {
//         active: !currentStatus,
//       });

//       setCategories((prev) =>
//         prev.map((item) =>
//           item.id === id
//             ? {
//                 ...item,
//                 active: !currentStatus,
//               }
//             : item
//         )
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // PRODUCTS COUNT
//   const getProductCount = (categoryName: string) => {
//     return products.filter(
//       (item) =>
//         item.category?.toLowerCase() === categoryName.toLowerCase()
//     ).length;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
//           Categories
//         </h1>

//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-orange-600 dark:bg-orange-700 text-white px-4 py-2 rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 transition shadow-md"
//         >
//           {showForm ? 'Close Form' : editingId ? 'Update Category' : 'Add Category'}
//         </button>
//       </div>

//       {/* FORM */}
//       {showForm && (
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-5 mb-8 space-y-4"
//         >
//           <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//             {editingId ? 'Update Category' : 'Add Category'}
//           </h2>

//           <input
//             type="text"
//             placeholder="Category Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-600 focus:border-transparent outline-none transition"
//             required
//           />

//           <input
//             type="text"
//             placeholder="Category Image URL"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-600 focus:border-transparent outline-none transition"
//           />

//           <div className="flex gap-3">
//             <button
//               type="submit"
//               className="bg-orange-600 dark:bg-orange-700 text-white px-5 py-3 rounded-xl hover:bg-orange-700 dark:hover:bg-orange-600 transition shadow-md"
//             >
//               {editingId ? 'Update Category' : 'Add Category'}
//             </button>

//             <button
//               type="button"
//               onClick={() => {
//                 resetForm();
//                 setShowForm(false);
//               }}
//               className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-5 py-3 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}

//       {/* LOADING */}
//       {loading ? (
//         <div className="text-center py-20 text-gray-600 dark:text-gray-400">
//           <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p>Loading categories...</p>
//         </div>
//       ) : categories.length === 0 ? (
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-10 text-center">
//           <p className="text-gray-500 dark:text-gray-400 text-lg">
//             No categories found.
//           </p>
//           <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
//             Click "Add Category" to create your first category.
//           </p>
//         </div>
//       ) : (
//         <>
//           {/* DESKTOP TABLE */}
//           <div className="hidden md:block overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
//             <table className="w-full">
//               <thead className="bg-gray-100 dark:bg-gray-700/50">
//                 <tr>
//                   <th className="text-left px-6 py-4 text-gray-700 dark:text-gray-300 font-semibold">
//                     Image
//                   </th>

//                   <th className="text-left px-6 py-4 text-gray-700 dark:text-gray-300 font-semibold">
//                     Category Name
//                   </th>

//                   <th className="text-left px-6 py-4 text-gray-700 dark:text-gray-300 font-semibold">
//                     Products Count
//                   </th>

//                   <th className="text-left px-6 py-4 text-gray-700 dark:text-gray-300 font-semibold">
//                     Status
//                   </th>

//                   <th className="text-left px-6 py-4 text-gray-700 dark:text-gray-300 font-semibold">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {categories.map((category) => (
//                   <tr
//                     key={category.id}
//                     className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
//                   >
//                     <td className="px-6 py-4">
//                       {category.image ? (
//                         <img
//                           src={category.image}
//                           alt={category.name}
//                           className="w-12 h-12 object-cover rounded-lg shadow-sm"
//                         />
//                       ) : (
//                         <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
//                           📷
//                         </div>
//                       )}
//                     </td>

//                     <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
//                       {category.name}
//                     </td>

//                     <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
//                       {getProductCount(category.name)}
//                     </td>

//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() =>
//                           toggleStatus(category.id, !!category.active)
//                         }
//                         className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
//                           category.active
//                             ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
//                             : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
//                         }`}
//                       >
//                         {category.active ? 'Active' : 'Inactive'}
//                       </button>
//                     </td>

//                     <td className="px-6 py-4 flex gap-3">
//                       <button
//                         onClick={() => handleEdit(category)}
//                         className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm transition shadow-sm"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => handleDelete(category.id)}
//                         className="bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm transition shadow-sm"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* MOBILE CARDS */}
//           <div className="grid gap-4 md:hidden">
//             {categories.map((category) => (
//               <div
//                 key={category.id}
//                 className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-4"
//               >
//                 <div className="flex gap-4">
//                   {category.image ? (
//                     <img
//                       src={category.image}
//                       alt={category.name}
//                       className="w-20 h-20 rounded-xl object-cover shadow-sm"
//                     />
//                   ) : (
//                     <div className="w-20 h-20 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-3xl text-gray-400 dark:text-gray-500">
//                       📷
//                     </div>
//                   )}

//                   <div className="flex-1">
//                     <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
//                       {category.name}
//                     </h2>

//                     <p className="text-gray-500 dark:text-gray-400 mt-1">
//                       Products: {getProductCount(category.name)}
//                     </p>

//                     <button
//                       onClick={() =>
//                         toggleStatus(category.id, !!category.active)
//                       }
//                       className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
//                         category.active
//                           ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
//                           : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
//                       }`}
//                     >
//                       {category.active ? 'Active' : 'Inactive'}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={() => handleEdit(category)}
//                     className="flex-1 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white py-2 rounded-xl transition shadow-sm"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => handleDelete(category.id)}
//                     className="flex-1 bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-500 text-white py-2 rounded-xl transition shadow-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }