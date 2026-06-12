// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { db } from '../../../lib/firebase';
// // import {
// //   collection,
// //   getDocs,
// //   deleteDoc,
// //   doc,
// //   addDoc,
// //   updateDoc,
// //   serverTimestamp,
// // } from 'firebase/firestore';

// // type Product = {
// //   id: string;
// //   name: string;
// //   price: number;
// //   category: string;
// //   description: string;
// //   image: string;
// //   available: boolean;
// //   featured: boolean;
// //   stock: number;
// // };

// // export default function ProductsPage() {
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   // FORM STATES
// //   const [name, setName] = useState('');
// //   const [price, setPrice] = useState('');
// //   const [category, setCategory] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [image, setImage] = useState('');
// //   const [available, setAvailable] = useState(true);
// //   const [featured, setFeatured] = useState(false);
// //   const [stock, setStock] = useState('0');

// //   // EDIT MODE
// //   const [editingId, setEditingId] = useState<string | null>(null);

// //   // SHOW / HIDE FORM
// //   const [showForm, setShowForm] = useState(false);

// //   // SEARCH & FILTER
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [filterCategory, setFilterCategory] = useState('All');

// //   // FETCH PRODUCTS
// //   const fetchProducts = async () => {
// //     try {
// //       const snapshot = await getDocs(collection(db, 'products'));
// //       const data = snapshot.docs.map((item) => ({
// //         id: item.id,
// //         ...item.data(),
// //       })) as Product[];
// //       setProducts(data);
// //     } catch (error) {
// //       console.error('Error fetching products:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProducts();
// //   }, []);

// //   // GET UNIQUE CATEGORIES
// //   const uniqueCategories = [
// //     'All',
// //     ...new Set(products.map((p) => p.category).filter(Boolean)),
// //   ];

// //   // FILTER + SEARCH
// //   const filteredProducts = products.filter((product) => {
// //     const matchSearch = product.name
// //       .toLowerCase()
// //       .includes(searchTerm.toLowerCase());
// //     const matchCategory =
// //       filterCategory === 'All' || product.category === filterCategory;
// //     return matchSearch && matchCategory;
// //   });

// //   // RESET FORM
// //   const resetForm = () => {
// //     setEditingId(null);
// //     setName('');
// //     setPrice('');
// //     setCategory('');
// //     setDescription('');
// //     setImage('');
// //     setAvailable(true);
// //     setFeatured(false);
// //     setStock('0');
// //   };

// //   // ADD / UPDATE PRODUCT
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     const productData = {
// //       name,
// //       price: Number(price),
// //       category,
// //       description,
// //       image,
// //       available,
// //       featured,
// //       stock: Number(stock),
// //     };

// //     try {
// //       if (editingId) {
// //         await updateDoc(doc(db, 'products', editingId), productData);
// //         setProducts((prev) =>
// //           prev.map((item) =>
// //             item.id === editingId ? { ...item, ...productData } : item
// //           )
// //         );
// //         alert('✅ Product updated successfully!');
// //       } else {
// //         const docRef = await addDoc(collection(db, 'products'), {
// //           ...productData,
// //           createdAt: serverTimestamp(),
// //         });
// //         setProducts((prev) => [
// //           { id: docRef.id, ...productData },
// //           ...prev,
// //         ]);
// //         alert('✅ Product added successfully!');
// //       }

// //       resetForm();
// //       setShowForm(false);
// //     } catch (error) {
// //       console.error('Error saving product:', error);
// //       alert('❌ Error saving product');
// //     }
// //   };

// //   // DELETE PRODUCT
// //   const handleDelete = async (id: string) => {
// //     if (!confirm('Are you sure you want to delete this product?')) return;
// //     try {
// //       await deleteDoc(doc(db, 'products', id));
// //       setProducts((prev) => prev.filter((item) => item.id !== id));
// //     } catch (error) {
// //       console.error('Error deleting product:', error);
// //     }
// //   };

// //   // TOGGLE AVAILABILITY
// //   const toggleAvailability = async (id: string, currentStatus: boolean) => {
// //     try {
// //       await updateDoc(doc(db, 'products', id), { available: !currentStatus });
// //       setProducts((prev) =>
// //         prev.map((item) =>
// //           item.id === id ? { ...item, available: !currentStatus } : item
// //         )
// //       );
// //     } catch (error) {
// //       console.error('Error updating status:', error);
// //     }
// //   };

// //   // TOGGLE FEATURED
// //   const toggleFeatured = async (id: string, currentStatus: boolean) => {
// //     try {
// //       await updateDoc(doc(db, 'products', id), { featured: !currentStatus });
// //       setProducts((prev) =>
// //         prev.map((item) =>
// //           item.id === id ? { ...item, featured: !currentStatus } : item
// //         )
// //       );
// //     } catch (error) {
// //       console.error('Error updating featured:', error);
// //     }
// //   };

// //   // EDIT PRODUCT
// //   const handleEdit = (product: Product) => {
// //     setEditingId(product.id);
// //     setName(product.name);
// //     setPrice(product.price.toString());
// //     setCategory(product.category || '');
// //     setDescription(product.description || '');
// //     setImage(product.image || '');
// //     setAvailable(product.available ?? true);
// //     setFeatured(product.featured ?? false);
// //     setStock(product.stock?.toString() || '0');
// //     setShowForm(true);
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-4 md:p-6">

// //       {/* HEADER */}
// //       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
// //         <div>
// //           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
// //             🍔 Products Management
// //           </h1>
// //           <p className="text-gray-500 text-sm mt-1">
// //             Total: {products.length} products | Showing: {filteredProducts.length}
// //           </p>
// //         </div>

// //         <button
// //           onClick={() => {
// //             if (showForm && editingId) resetForm();
// //             setShowForm(!showForm);
// //           }}
// //           className="bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm md:text-base hover:bg-orange-700 transition font-semibold"
// //         >
// //           {showForm ? '✕ Close Form' : '+ Add New Product'}
// //         </button>
// //       </div>

// //       {/* FORM */}
// //       {showForm && (
// //         <form
// //           onSubmit={handleSubmit}
// //           className="bg-white rounded-2xl shadow-lg p-6 mb-8 space-y-4 border-l-4 border-orange-500"
// //         >
// //           <h2 className="text-xl font-bold text-gray-800">
// //             {editingId ? '✏️ Update Product' : '➕ Add New Product'}
// //           </h2>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Product Name *
// //               </label>
// //               <input
// //                 type="text"
// //                 placeholder="e.g. Chicken Biryani"
// //                 value={name}
// //                 onChange={(e) => setName(e.target.value)}
// //                 className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Price (₹) *
// //               </label>
// //               <input
// //                 type="number"
// //                 placeholder="e.g. 299"
// //                 value={price}
// //                 onChange={(e) => setPrice(e.target.value)}
// //                 className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Category
// //               </label>
// //               <input
// //                 type="text"
// //                 placeholder="e.g. Pizza, Burgers, Drinks"
// //                 value={category}
// //                 onChange={(e) => setCategory(e.target.value)}
// //                 className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Stock
// //               </label>
// //               <input
// //                 type="number"
// //                 placeholder="e.g. 50"
// //                 value={stock}
// //                 onChange={(e) => setStock(e.target.value)}
// //                 className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //               />
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Description
// //             </label>
// //             <textarea
// //               placeholder="Describe the product..."
// //               value={description}
// //               onChange={(e) => setDescription(e.target.value)}
// //               className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //               rows={3}
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">
// //               Image URL
// //             </label>
// //             <input
// //               type="text"
// //               placeholder="https://example.com/image.jpg"
// //               value={image}
// //               onChange={(e) => setImage(e.target.value)}
// //               className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //             />

// //             {image && (
// //               <div className="mt-3">
// //                 <img
// //                   src={image}
// //                   alt="Preview"
// //                   className="w-32 h-24 object-cover rounded-xl border"
// //                   onError={(e) => {
// //                     (e.target as HTMLImageElement).style.display = 'none';
// //                   }}
// //                 />
// //               </div>
// //             )}
// //           </div>

// //           {/* TOGGLES */}
// //           <div className="flex flex-wrap gap-6">
// //             <label className="flex items-center gap-3 cursor-pointer">
// //               <input
// //                 type="checkbox"
// //                 checked={available}
// //                 onChange={(e) => setAvailable(e.target.checked)}
// //                 className="w-5 h-5 accent-green-600"
// //               />
// //               <span className="text-sm font-medium text-gray-700">
// //                 ✅ Available
// //               </span>
// //             </label>

// //             <label className="flex items-center gap-3 cursor-pointer">
// //               <input
// //                 type="checkbox"
// //                 checked={featured}
// //                 onChange={(e) => setFeatured(e.target.checked)}
// //                 className="w-5 h-5 accent-orange-600"
// //               />
// //               <span className="text-sm font-medium text-gray-700">
// //                 ⭐ Featured (Show on homepage)
// //               </span>
// //             </label>
// //           </div>

// //           <div className="flex gap-3 pt-2">
// //             <button
// //               type="submit"
// //               className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition font-semibold"
// //             >
// //               {editingId ? '✏️ Update Product' : '➕ Add Product'}
// //             </button>

// //             <button
// //               type="button"
// //               onClick={() => {
// //                 resetForm();
// //                 setShowForm(false);
// //               }}
// //               className="bg-gray-300 px-6 py-3 rounded-xl hover:bg-gray-400 transition font-semibold"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       )}

// //       {/* SEARCH & FILTER BAR */}
// //       <div className="bg-white rounded-2xl shadow p-4 mb-6 flex flex-col md:flex-row gap-4">
// //         <input
// //           type="text"
// //           placeholder="🔍 Search products..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           className="flex-1 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500"
// //         />

// //         <select
// //           value={filterCategory}
// //           onChange={(e) => setFilterCategory(e.target.value)}
// //           className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 md:w-48"
// //         >
// //           {uniqueCategories.map((cat) => (
// //             <option key={cat} value={cat}>
// //               {cat}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* LOADING */}
// //       {loading ? (
// //         <div className="text-center py-20">
// //           <div className="inline-block w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
// //           <p className="text-gray-500 mt-4">Loading products...</p>
// //         </div>
// //       ) : filteredProducts.length === 0 ? (
// //         <div className="bg-white rounded-xl p-10 text-center shadow">
// //           <p className="text-gray-500 text-lg">No products found.</p>
// //         </div>
// //       ) : (
// //         <>
// //           {/* DESKTOP TABLE */}
// //           <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow">
// //             <table className="w-full">
// //               <thead className="bg-gray-100">
// //                 <tr>
// //                   <th className="text-left px-4 py-4">Image</th>
// //                   <th className="text-left px-4 py-4">Name</th>
// //                   <th className="text-left px-4 py-4">Price</th>
// //                   <th className="text-left px-4 py-4">Category</th>
// //                   <th className="text-left px-4 py-4">Stock</th>
// //                   <th className="text-left px-4 py-4">Status</th>
// //                   <th className="text-left px-4 py-4">Featured</th>
// //                   <th className="text-left px-4 py-4">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {filteredProducts.map((product) => (
// //                   <tr key={product.id} className="border-t hover:bg-gray-50 transition">
// //                     <td className="px-4 py-3">
// //                       {product.image ? (
// //                         <img
// //                           src={product .mage}
// //                           alt={product.name}
// //                           className="w-14 h-14 object-cover rounded-xl"
// //                         />
// //                       ) : (
// //                         <div className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
// //                           📷
// //                         </div>
// //                       )}
// //                     </td>

// //                     <td className="px-4 py-3">
// //                       <p className="font-semibold text-gray-800">{product.name}</p>
// //                       <p className="text-xs text-gray-500 truncate max-w-[200px]">
// //                         {product.description}
// //                       </p>
// //                     </td>

// //                     <td className="px-4 py-3 font-semibold text-green-700">
// //                       ₹{product.price}
// //                     </td>

// //                     <td className="px-4 py-3">
// //                       <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
// //                         {product.category || 'N/A'}
// //                       </span>
// //                     </td>

// //                     <td className="px-4 py-3">
// //                       <span
// //                         className={`font-semibold ${
// //                           (product.stock ?? 0) < 10 ? 'text-red-600' : 'text-gray-700'
// //                         }`}
// //                       >
// //                         {product.stock ?? 0}
// //                       </span>
// //                     </td>

// //                     <td className="px-4 py-3">
// //                       <button
// //                         onClick={() =>
// //                           toggleAvailability(product.id, !!product.available)
// //                         }
// //                         className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
// //                           product.available
// //                             ? 'bg-green-100 text-green-700 hover:bg-green-200'
// //                             : 'bg-red-100 text-red-700 hover:bg-red-200'
// //                         }`}
// //                       >
// //                         {product.available ? '✅ Available' : '❌ Out of Stock'}
// //                       </button>
// //                     </td>

// //                     <td className="px-4 py-3">
// //                       <button
// //                         onClick={() =>
// //                           toggleFeatured(product.id, !!product.featured)
// //                         }
// //                         className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
// //                           product.featured
// //                             ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
// //                             : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
// //                         }`}
// //                       >
// //                         {product.featured ? '⭐ Featured' : '☆ Normal'}
// //                       </button>
// //                     </td>

// //                     <td className="px-4 py-3">
// //                       <div className="flex gap-2">
// //                         <button
// //                           onClick={() => handleEdit(product)}
// //                           className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
// //                         >
// //                           ✏️ Edit
// //                         </button>

// //                         <button
// //                           onClick={() => handleDelete(product.id)}
// //                           className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
// //                         >
// //                           🗑️ Delete
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* MOBILE CARDS */}
// //           <div className="grid gap-4 md:hidden">
// //             {filteredProducts.map((product) => (
// //               <div key={product.id} className="bg-white rounded-2xl shadow p-4">
// //                 <div className="flex gap-4">
// //                   {product.image ? (
// //                     <img
// //                       src={product.image}
// //                       alt={product.name}
// //                       className="w-20 h-20 object-cover rounded-xl"
// //                     />
// //                   ) : (
// //                     <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center">
// //                       📷
// //                     </div>
// //                   )}

// //                   <div className="flex-1">
// //                     <h2 className="text-lg font-semibold text-gray-800">
// //                       {product.name}
// //                     </h2>
// //                     <p className="text-green-700 font-bold">₹{product.price}</p>
// //                     <p className="text-sm text-gray-500">
// //                       {product.category} · Stock: {product.stock ?? 0}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-2 mt-3">
// //                   <button
// //                     onClick={() =>
// //                       toggleAvailability(product.id, !!product.available)
// //                     }
// //                     className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition ${
// //                       product.available
// //                         ? 'bg-green-100 text-green-700'
// //                         : 'bg-red-100 text-red-700'
// //                     }`}
// //                   >
// //                     {product.available ? '✅ Available' : '❌ Out of Stock'}
// //                   </button>

// //                   <button
// //                     onClick={() =>
// //                       toggleFeatured(product.id, !!product.featured)
// //                     }
// //                     className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition ${
// //                       product.featured
// //                         ? 'bg-orange-100 text-orange-700'
// //                         : 'bg-gray-100 text-gray-500'
// //                     }`}
// //                   >
// //                     {product.featured ? '⭐ Featured' : '☆ Normal'}
// //                   </button>
// //                 </div>

// //                 <div className="flex gap-2 mt-3">
// //                   <button
// //                     onClick={() => handleEdit(product)}
// //                     className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition text-sm"
// //                   >
// //                     ✏️ Edit
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(product.id)}
// //                     className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition text-sm"
// //                   >
// //                     🗑️ Delete
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
// // // // 'use client';

// // // // import { useEffect, useState } from 'react';
// // // // import { db } from '../../../lib/firebase';

// // // // import {
// // // //   collection,
// // // //   getDocs,
// // // //  deleteDoc,
// // // //   doc,
// // // //   addDoc,
// // // //   updateDoc,
// // // //   serverTimestamp,
// // // // } from 'firebase/firestore';

// // // // type Product = {
// // // //   id: string;
// // // //   name: string;
// // // //   price: number;
// // // //   category?: string;
// // // //   description?: string;
// // // //   image?: string;
// // // //   available?: boolean;
// // // // };

// // // // export default function ProductsPage() {
// // // //   const [products, setProducts] = useState<Product[]>([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   // FORM STATES
// // // //   const [name, setName] = useState('');
// // // //   const [price, setPrice] = useState('');
// // // //   const [category, setCategory] = useState('');
// // // //   const [description, setDescription] = useState('');
// // // //   const [image, setImage] = useState('');

// // // //   // EDIT MODE
// // // //   const [editingId, setEditingId] =
// // // //     useState<string | null>(null);

// // // //   // SHOW / HIDE FORM
// // // //   const [showForm, setShowForm] =
// // // //     useState(false);

// // // //   // FETCH PRODUCTS
// // // //   const fetchProducts = async () => {
// // // //     try {
// // // //       const snapshot = await getDocs(
// // // //         collection(db, 'products')
// // // //       );

// // // //       const data = snapshot.docs.map((item) => ({
// // // //         id: item.id,
// // // //         ...item.data(),
// // // //       })) as Product[];

// // // //       setProducts(data);
// // // //     } catch (error) {
// // // //       console.error(
// // // //         'Error fetching products:',
// // // //         error
// // // //       );
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchProducts();
// // // //   }, []);

// // // //   // RESET FORM
// // // //   const resetForm = () => {
// // // //     setEditingId(null);

// // // //     setName('');
// // // //     setPrice('');
// // // //     setCategory('');
// // // //     setDescription('');
// // // //     setImage('');
// // // //   };

// // // //   // ADD / UPDATE PRODUCT
// // // //   const handleSubmit = async (
// // // //     e: React.FormEvent
// // // //   ) => {
// // // //     e.preventDefault();

// // // //     try {
// // // //       // UPDATE
// // // //       if (editingId) {
// // // //         await updateDoc(
// // // //           doc(db, 'products', editingId),
// // // //           {
// // // //             name,
// // // //             price: Number(price),
// // // //             category,
// // // //             description,
// // // //             image,
// // // //           }
// // // //         );

// // // //         setProducts((prev) =>
// // // //           prev.map((item) =>
// // // //             item.id === editingId
// // // //               ? {
// // // //                   ...item,
// // // //                   name,
// // // //                   price: Number(price),
// // // //                   category,
// // // //                   description,
// // // //                   image,
// // // //                 }
// // // //               : item
// // // //           )
// // // //         );

// // // //         alert('Product updated successfully');
// // // //       } else {
// // // //         // ADD
// // // //         const docRef = await addDoc(
// // // //           collection(db, 'products'),
// // // //           {
// // // //             name,
// // // //             price: Number(price),
// // // //             category,
// // // //             description,
// // // //             image,
// // // //             available: true,
// // // //             createdAt: serverTimestamp(),
// // // //           }
// // // //         );

// // // //         const newProduct: Product = {
// // // //           id: docRef.id,
// // // //           name,
// // // //           price: Number(price),
// // // //           category,
// // // //           description,
// // // //           image,
// // // //           available: true,
// // // //         };

// // // //         setProducts((prev) => [
// // // //           newProduct,
// // // //           ...prev,
// // // //         ]);

// // // //         alert('Product added successfully');
// // // //       }

// // // //       resetForm();
// // // //       setShowForm(false);
// // // //     } catch (error) {
// // // //       console.error(
// // // //         'Error saving product:',
// // // //         error
// // // //       );
// // // //     }
// // // //   };

// // // //   // DELETE PRODUCT
// // // //   const handleDelete = async (id: string) => {
// // // //     const confirmDelete = confirm(
// // // //       'Are you sure you want to delete this product?'
// // // //     );

// // // //     if (!confirmDelete) return;

// // // //     try {
// // // //       await deleteDoc(doc(db, 'products', id));

// // // //       setProducts((prev) =>
// // // //         prev.filter((item) => item.id !== id)
// // // //       );
// // // //     } catch (error) {
// // // //       console.error(
// // // //         'Error deleting product:',
// // // //         error
// // // //       );
// // // //     }
// // // //   };

// // // //   // TOGGLE AVAILABLE / OUT OF STOCK
// // // //   const toggleAvailability = async (
// // // //     id: string,
// // // //     currentStatus: boolean
// // // //   ) => {
// // // //     try {
// // // //       await updateDoc(doc(db, 'products', id), {
// // // //         available: !currentStatus,
// // // //       });

// // // //       setProducts((prev) =>
// // // //         prev.map((item) =>
// // // //           item.id === id
// // // //             ? {
// // // //                 ...item,
// // // //                 available: !currentStatus,
// // // //               }
// // // //             : item
// // // //         )
// // // //       );
// // // //     } catch (error) {
// // // //       console.error(
// // // //         'Error updating status:',
// // // //         error
// // // //       );
// // // //     }
// // // //   };

// // // //   // EDIT PRODUCT
// // // //   const handleEdit = (product: Product) => {
// // // //     setEditingId(product.id);

// // // //     setName(product.name);
// // // //     setPrice(product.price.toString());
// // // //     setCategory(product.category || '');
// // // //     setDescription(product.description || '');
// // // //     setImage(product.image || '');

// // // //     setShowForm(true);

// // // //     window.scrollTo({
// // // //       top: 0,
// // // //       behavior: 'smooth',
// // // //     });
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-100 p-4 md:p-6">

// // // //       {/* HEADER */}
// // // //       <div className="flex items-center justify-between mb-6">
// // // //         <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
// // // //           Products
// // // //         </h1>

// // // //         <button
// // // //           onClick={() =>
// // // //             setShowForm(!showForm)
// // // //           }
// // // //           className="bg-black text-white px-4 py-2 rounded-lg text-sm md:text-base hover:bg-gray-800 transition"
// // // //         >
// // // //           {showForm
// // // //             ? 'Close Form'
// // // //             : editingId
// // // //             ? 'Update Product'
// // // //             : 'Add Product'}
// // // //         </button>
// // // //       </div>

// // // //       {/* FORM */}
// // // //       {showForm && (
// // // //         <form
// // // //           onSubmit={handleSubmit}
// // // //           className="bg-white rounded-2xl shadow p-5 mb-8 space-y-4"
// // // //         >
// // // //           <h2 className="text-xl font-semibold">
// // // //             {editingId
// // // //               ? 'Update Product'
// // // //               : 'Add Product'}
// // // //           </h2>

// // // //           <input
// // // //             type="text"
// // // //             placeholder="Product Name"
// // // //             value={name}
// // // //             onChange={(e) =>
// // // //               setName(e.target.value)
// // // //             }
// // // //             className="w-full border p-3 rounded-xl"
// // // //             required
// // // //           />

// // // //           <input
// // // //             type="number"
// // // //             placeholder="Price"
// // // //             value={price}
// // // //             onChange={(e) =>
// // // //               setPrice(e.target.value)
// // // //             }
// // // //             className="w-full border p-3 rounded-xl"
// // // //             required
// // // //           />

// // // //           <input
// // // //             type="text"
// // // //             placeholder="Category"
// // // //             value={category}
// // // //             onChange={(e) =>
// // // //               setCategory(e.target.value)
// // // //             }
// // // //             className="w-full border p-3 rounded-xl"
// // // //           />

// // // //           <textarea
// // // //             placeholder="Description"
// // // //             value={description}
// // // //             onChange={(e) =>
// // // //               setDescription(e.target.value)
// // // //             }
// // // //             className="w-full border p-3 rounded-xl"
// // // //             rows={4}
// // // //           />

// // // //           <input
// // // //             type="text"
// // // //             placeholder="Image URL"
// // // //             value={image}
// // // //             onChange={(e) =>
// // // //               setImage(e.target.value)
// // // //             }
// // // //             className="w-full border p-3 rounded-xl"
// // // //           />

// // // //           <div className="flex gap-3">
// // // //             <button
// // // //               type="submit"
// // // //               className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
// // // //             >
// // // //               {editingId
// // // //                 ? 'Update Product'
// // // //                 : 'Add Product'}
// // // //             </button>

// // // //             <button
// // // //               type="button"
// // // //               onClick={() => {
// // // //                 resetForm();
// // // //                 setShowForm(false);
// // // //               }}
// // // //               className="bg-gray-300 px-5 py-3 rounded-xl hover:bg-gray-400 transition"
// // // //             >
// // // //               Cancel
// // // //             </button>
// // // //           </div>
// // // //         </form>
// // // //       )}

// // // //       {/* LOADING */}
// // // //       {loading ? (
// // // //         <div className="text-center py-20 text-gray-600">
// // // //           Loading products...
// // // //         </div>
// // // //       ) : products.length === 0 ? (
// // // //         <div className="bg-white rounded-xl p-10 text-center shadow">
// // // //           <p className="text-gray-500">
// // // //             No products found.
// // // //           </p>
// // // //         </div>
// // // //       ) : (
// // // //         <>
// // // //           {/* DESKTOP TABLE */}
// // // //           <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow">
// // // //             <table className="w-full">
// // // //               <thead className="bg-gray-100">
// // // //                 <tr>
// // // //                   <th className="text-left px-6 py-4">
// // // //                     Name
// // // //                   </th>

// // // //                   <th className="text-left px-6 py-4">
// // // //                     Price
// // // //                   </th>

// // // //                   <th className="text-left px-6 py-4">
// // // //                     Category
// // // //                   </th>

// // // //                   <th className="text-left px-6 py-4">
// // // //                     Status
// // // //                   </th>

// // // //                   <th className="text-left px-6 py-4">
// // // //                     Actions
// // // //                   </th>
// // // //                 </tr>
// // // //               </thead>

// // // //               <tbody>
// // // //                 {products.map((product) => (
// // // //                   <tr
// // // //                     key={product.id}
// // // //                     className="border-t hover:bg-gray-50 transition"
// // // //                   >
// // // //                     <td className="px-6 py-4 font-medium">
// // // //                       {product.name}
// // // //                     </td>

// // // //                     <td className="px-6 py-4">
// // // //                       ₹{product.price}
// // // //                     </td>

// // // //                     <td className="px-6 py-4">
// // // //                       {product.category || 'N/A'}
// // // //                     </td>

// // // //                     <td className="px-6 py-4">
// // // //                       <button
// // // //                         onClick={() =>
// // // //                           toggleAvailability(
// // // //                             product.id,
// // // //                             !!product.available
// // // //                           )
// // // //                         }
// // // //                         className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
// // // //                           product.available
// // // //                             ? 'bg-green-100 text-green-700 hover:bg-green-200'
// // // //                             : 'bg-red-100 text-red-700 hover:bg-red-200'
// // // //                         }`}
// // // //                       >
// // // //                         {product.available
// // // //                           ? 'Available'
// // // //                           : 'Out of Stock'}
// // // //                       </button>
// // // //                     </td>

// // // //                     <td className="px-6 py-4 flex gap-3">
// // // //                       <button
// // // //                         onClick={() =>
// // // //                           handleEdit(product)
// // // //                         }
// // // //                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition"
// // // //                       >
// // // //                         Edit
// // // //                       </button>

// // // //                       <button
// // // //                         onClick={() =>
// // // //                           handleDelete(product.id)
// // // //                         }
// // // //                         className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
// // // //                       >
// // // //                         Delete
// // // //                       </button>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ))} 
// // // //               </tbody>
// // // //             </table>
// // // //           </div>

// // // //           {/* MOBILE CARDS */}
// // // //           <div className="grid gap-4 md:hidden">
// // // //             {products.map((product) => (
// // // //               <div
// // // //                 key={product.id}
// // // //                 className="bg-white rounded-2xl shadow p-4"
// // // //               >
// // // //                 <div className="flex items-start justify-between gap-3">
// // // //                   <div>
// // // //                     <h2 className="text-lg font-semibold text-gray-800">
// // // //                       {product.name}
// // // //                     </h2>

// // // //                     <p className="text-gray-600 mt-1">
// // // //                       ₹{product.price}
// // // //                     </p>

// // // //                     <p className="text-sm text-gray-500 mt-1">
// // // //                       {product.category || 'N/A'}
// // // //                     </p>
// // // //                   </div>

// // // //                   <button
// // // //                     onClick={() =>
// // // //                       toggleAvailability(
// // // //                         product.id,
// // // //                         !!product.available
// // // //                       )
// // // //                     }
// // // //                     className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
// // // //                       product.available
// // // //                         ? 'bg-green-100 text-green-700 hover:bg-green-200'
// // // //                         : 'bg-red-100 text-red-700 hover:bg-red-200'
// // // //                     }`}
// // // //                   >
// // // //                     {product.available
// // // //                       ? 'Available'
// // // //                       : 'Out of Stock'}
// // // //                   </button>
// // // //                 </div>

// // // //                 <div className="flex gap-3 mt-4">
// // // //                   <button
// // // //                     onClick={() =>
// // // //                       handleEdit(product)
// // // //                     }
// // // //                     className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition"
// // // //                   >
// // // //                     Edit
// // // //                   </button>

// // // //                   <button
// // // //                     onClick={() =>
// // // //                       handleDelete(product.id)
// // // //                     }
// // // //                     className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
// // // //                   >
// // // //                     Delete
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }
// // // // app/admin/products/page.tsx
// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { db } from '../../../lib/firebase';
// // // import {
// // //   collection,
// // //   getDocs,
// // //   deleteDoc,
// // //   doc,
// // //   addDoc,
// // //   updateDoc,
// // //   serverTimestamp,
// // // } from 'firebase/firestore';

// // // type Product = {
// // //   id: string;
// // //   name: string;
// // //   price: number;
// // //   category: string;
// // //   description: string;
// // //   image: string;
// // //   available: boolean;
// // //   featured: boolean;
// // //   stock: number;
// // // };

// // // export default function ProductsPage() {
// // //   const [products, setProducts] = useState<Product[]>([]);
// // //   const [loading, setLoading] = useState(true);

// // //   // FORM STATES
// // //   const [name, setName] = useState('');
// // //   const [price, setPrice] = useState('');
// // //   const [category, setCategory] = useState('');
// // //   const [description, setDescription] = useState('');
// // //   const [image, setImage] = useState('');
// // //   const [available, setAvailable] = useState(true);
// // //   const [featured, setFeatured] = useState(false);
// // //   const [stock, setStock] = useState('0');

// // //   // EDIT MODE
// // //   const [editingId, setEditingId] = useState<string | null>(null);

// // //   // SHOW / HIDE FORM
// // //   const [showForm, setShowForm] = useState(false);

// // //   // SEARCH & FILTER
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [filterCategory, setFilterCategory] = useState('All');

// // //   // FETCH PRODUCTS
// // //   const fetchProducts = async () => {
// // //     try {
// // //       const snapshot = await getDocs(collection(db, 'products'));
// // //       const data = snapshot.docs.map((item) => ({
// // //         id: item.id,
// // //         ...item.data(),
// // //       })) as Product[];
// // //       setProducts(data);
// // //     } catch (error) {
// // //       console.error('Error fetching products:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchProducts();
// // //   }, []);

// // //   // GET UNIQUE CATEGORIES
// // //   const uniqueCategories = [
// // //     'All',
// // //     ...new Set(products.map((p) => p.category).filter(Boolean)),
// // //   ];

// // //   // FILTER + SEARCH
// // //   const filteredProducts = products.filter((product) => {
// // //     const matchSearch = product.name
// // //       .toLowerCase()
// // //       .includes(searchTerm.toLowerCase());
// // //     const matchCategory =
// // //       filterCategory === 'All' || product.category === filterCategory;
// // //     return matchSearch && matchCategory;
// // //   });

// // //   // RESET FORM
// // //   const resetForm = () => {
// // //     setEditingId(null);
// // //     setName('');
// // //     setPrice('');
// // //     setCategory('');
// // //     setDescription('');
// // //     setImage('');
// // //     setAvailable(true);
// // //     setFeatured(false);
// // //     setStock('0');
// // //   };

// // //   // ADD / UPDATE PRODUCT
// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();

// // //     const productData = {
// // //       name,
// // //       price: Number(price),
// // //       category,
// // //       description,
// // //       image,
// // //       available,
// // //       featured,
// // //       stock: Number(stock),
// // //     };

// // //     try {
// // //       if (editingId) {
// // //         await updateDoc(doc(db, 'products', editingId), productData);
// // //         setProducts((prev) =>
// // //           prev.map((item) =>
// // //             item.id === editingId ? { ...item, ...productData } : item
// // //           )
// // //         );
// // //         alert('✅ Product updated successfully!');
// // //       } else {
// // //         const docRef = await addDoc(collection(db, 'products'), {
// // //           ...productData,
// // //           createdAt: serverTimestamp(),
// // //         });
// // //         setProducts((prev) => [
// // //           { id: docRef.id, ...productData },
// // //           ...prev,
// // //         ]);
// // //         alert('✅ Product added successfully!');
// // //       }

// // //       resetForm();
// // //       setShowForm(false);
// // //     } catch (error) {
// // //       console.error('Error saving product:', error);
// // //       alert('❌ Error saving product');
// // //     }
// // //   };

// // //   // DELETE PRODUCT
// // //   const handleDelete = async (id: string) => {
// // //     if (!confirm('Are you sure you want to delete this product?')) return;
// // //     try {
// // //       await deleteDoc(doc(db, 'products', id));
// // //       setProducts((prev) => prev.filter((item) => item.id !== id));
// // //     } catch (error) {
// // //       console.error('Error deleting product:', error);
// // //     }
// // //   };

// // //   // TOGGLE AVAILABILITY
// // //   const toggleAvailability = async (id: string, currentStatus: boolean) => {
// // //     try {
// // //       await updateDoc(doc(db, 'products', id), { available: !currentStatus });
// // //       setProducts((prev) =>
// // //         prev.map((item) =>
// // //           item.id === id ? { ...item, available: !currentStatus } : item
// // //         )
// // //       );
// // //     } catch (error) {
// // //       console.error('Error updating status:', error);
// // //     }
// // //   };

// // //   // TOGGLE FEATURED
// // //   const toggleFeatured = async (id: string, currentStatus: boolean) => {
// // //     try {
// // //       await updateDoc(doc(db, 'products', id), { featured: !currentStatus });
// // //       setProducts((prev) =>
// // //         prev.map((item) =>
// // //           item.id === id ? { ...item, featured: !currentStatus } : item
// // //         )
// // //       );
// // //     } catch (error) {
// // //       console.error('Error updating featured:', error);
// // //     }
// // //   };

// // //   // EDIT PRODUCT
// // //   const handleEdit = (product: Product) => {
// // //     setEditingId(product.id);
// // //     setName(product.name);
// // //     setPrice(product.price.toString());
// // //     setCategory(product.category || '');
// // //     setDescription(product.description || '');
// // //     setImage(product.image || '');
// // //     setAvailable(product.available ?? true);
// // //     setFeatured(product.featured ?? false);
// // //     setStock(product.stock?.toString() || '0');
// // //     setShowForm(true);
// // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 p-4 md:p-6">

// // //       {/* HEADER */}
// // //       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
// // //         <div>
// // //           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
// // //             🍔 Products Management
// // //           </h1>
// // //           <p className="text-gray-500 text-sm mt-1">
// // //             Total: {products.length} products | Showing: {filteredProducts.length}
// // //           </p>
// // //         </div>

// // //         <button
// // //           onClick={() => {
// // //             if (showForm && editingId) resetForm();
// // //             setShowForm(!showForm);
// // //           }}
// // //           className="bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm md:text-base hover:bg-orange-700 transition font-semibold"
// // //         >
// // //           {showForm ? '✕ Close Form' : '+ Add New Product'}
// // //         </button>
// // //       </div>

// // //       {/* FORM */}
// // //       {showForm && (
// // //         <form
// // //           onSubmit={handleSubmit}
// // //           className="bg-white rounded-2xl shadow-lg p-6 mb-8 space-y-4 border-l-4 border-orange-500"
// // //         >
// // //           <h2 className="text-xl font-bold text-gray-800">
// // //             {editingId ? '✏️ Update Product' : '➕ Add New Product'}
// // //           </h2>

// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Product Name *
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 placeholder="e.g. Chicken Biryani"
// // //                 value={name}
// // //                 onChange={(e) => setName(e.target.value)}
// // //                 className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// // //                 required
// // //               />
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Price (₹) *
// // //               </label>
// // //               <input
// // //                 type="number"
// // //                 placeholder="e.g. 299"
// // //                 value={price}
// // //                 onChange={(e) => setPrice(e.target.value)}
// // //                 className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// // //                 required
// // //               />
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Category
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 placeholder="e.g. Pizza, Burgers, Drinks"
// // //                 value={category}
// // //                 onChange={(e) => setCategory(e.target.value)}
// // //                 className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// // //               />
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Stock
// // //               </label>
// // //               <input
// // //                 type="number"
// // //                 placeholder="e.g. 50"
// // //                 value={stock}
// // //                 onChange={(e) => setStock(e.target.value)}
// // //                 className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// // //               />
// // //             </div>
// // //           </div>

// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // //               Description
// // //             </label>
// // //             <textarea
// // //               placeholder="Describe the product..."
// // //               value={description}
// // //               onChange={(e) => setDescription(e.target.value)}
// // //               className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// // //               rows={3}
// // //             />
// // //           </div>

// // //           <div>
// // //             <label className="block text-sm font-medium text-gray-700 mb-1">
// // //               Image URL
// // //             </label>
// // //             <input
// // //               type="text"
// // //               placeholder="https://example.com/image.jpg"
// // //               value={image}
// // //               onChange={(e) => setImage(e.target.value)}
// // //               className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// // //             />

// // //             {image && (
// // //               <div className="mt-3">
// // //                 <img
// // //                   src={image}
// // //                   alt="Preview"
// // //                   className="w-32 h-24 object-cover rounded-xl border"
// // //                   onError={(e) => {
// // //                     (e.target as HTMLImageElement).style.display = 'none';
// // //                   }}
// // //                 />
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* TOGGLES */}
// // //           <div className="flex flex-wrap gap-6">
// // //             <label className="flex items-center gap-3 cursor-pointer">
// // //               <input
// // //                 type="checkbox"
// // //                 checked={available}
// // //                 onChange={(e) => setAvailable(e.target.checked)}
// // //                 className="w-5 h-5 accent-green-600"
// // //               />
// // //               <span className="text-sm font-medium text-gray-700">
// // //                 ✅ Available
// // //               </span>
// // //             </label>

// // //             <label className="flex items-center gap-3 cursor-pointer">
// // //               <input
// // //                 type="checkbox"
// // //                 checked={featured}
// // //                 onChange={(e) => setFeatured(e.target.checked)}
// // //                 className="w-5 h-5 accent-orange-600"
// // //               />
// // //               <span className="text-sm font-medium text-gray-700">
// // //                 ⭐ Featured (Show on homepage)
// // //               </span>
// // //             </label>
// // //           </div>

// // //           <div className="flex gap-3 pt-2">
// // //             <button
// // //               type="submit"
// // //               className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition font-semibold"
// // //             >
// // //               {editingId ? '✏️ Update Product' : '➕ Add Product'}
// // //             </button>

// // //             <button
// // //               type="button"
// // //               onClick={() => {
// // //                 resetForm();
// // //                 setShowForm(false);
// // //               }}
// // //               className="bg-gray-300 px-6 py-3 rounded-xl hover:bg-gray-400 transition font-semibold"
// // //             >
// // //               Cancel
// // //             </button>
// // //           </div>
// // //         </form>
// // //       )}

// // //       {/* SEARCH & FILTER BAR */}
// // //       <div className="bg-white rounded-2xl shadow p-4 mb-6 flex flex-col md:flex-row gap-4">
// // //         <input
// // //           type="text"
// // //           placeholder="🔍 Search products..."
// // //           value={searchTerm}
// // //           onChange={(e) => setSearchTerm(e.target.value)}
// // //           className="flex-1 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500"
// // //         />

// // //         <select
// // //           value={filterCategory}
// // //           onChange={(e) => setFilterCategory(e.target.value)}
// // //           className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 md:w-48"
// // //         >
// // //           {uniqueCategories.map((cat) => (
// // //             <option key={cat} value={cat}>
// // //               {cat}
// // //             </option>
// // //           ))}
// // //         </select>
// // //       </div>

// // //       {/* LOADING */}
// // //       {loading ? (
// // //         <div className="text-center py-20">
// // //           <div className="inline-block w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
// // //           <p className="text-gray-500 mt-4">Loading products...</p>
// // //         </div>
// // //       ) : filteredProducts.length === 0 ? (
// // //         <div className="bg-white rounded-xl p-10 text-center shadow">
// // //           <p className="text-gray-500 text-lg">No products found.</p>
// // //         </div>
// // //       ) : (
// // //         <>
// // //           {/* DESKTOP TABLE */}
// // //           <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow">
// // //             <table className="w-full">
// // //               <thead className="bg-gray-100">
// // //                 <tr>
// // //                   <th className="text-left px-4 py-4">Image</th>
// // //                   <th className="text-left px-4 py-4">Name</th>
// // //                   <th className="text-left px-4 py-4">Price</th>
// // //                   <th className="text-left px-4 py-4">Category</th>
// // //                   <th className="text-left px-4 py-4">Stock</th>
// // //                   <th className="text-left px-4 py-4">Status</th>
// // //                   <th className="text-left px-4 py-4">Featured</th>
// // //                   <th className="text-left px-4 py-4">Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {filteredProducts.map((product) => (
// // //                   <tr key={product.id} className="border-t hover:bg-gray-50 transition">
// // //                     <td className="px-4 py-3">
// // //                       {product.image ? (
// // //                         <img
// // //                           src={product.image}
// // //                           alt={product.name}
// // //                           className="w-14 h-14 object-cover rounded-xl"
// // //                         />
// // //                       ) : (
// // //                         <div className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
// // //                           📷
// // //                         </div>
// // //                       )}
// // //                     </td>

// // //                     <td className="px-4 py-3">
// // //                       <p className="font-semibold text-gray-800">{product.name}</p>
// // //                       <p className="text-xs text-gray-500 truncate max-w-[200px]">
// // //                         {product.description}
// // //                       </p>
// // //                     </td>

// // //                     <td className="px-4 py-3 font-semibold text-green-700">
// // //                       ₹{product.price}
// // //                     </td>

// // //                     <td className="px-4 py-3">
// // //                       <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
// // //                         {product.category || 'N/A'}
// // //                       </span>
// // //                     </td>

// // //                     <td className="px-4 py-3">
// // //                       <span
// // //                         className={`font-semibold ${
// // //                           (product.stock ?? 0) < 10 ? 'text-red-600' : 'text-gray-700'
// // //                         }`}
// // //                       >
// // //                         {product.stock ?? 0}
// // //                       </span>
// // //                     </td>

// // //                     <td className="px-4 py-3">
// // //                       <button
// // //                         onClick={() =>
// // //                           toggleAvailability(product.id, !!product.available)
// // //                         }
// // //                         className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
// // //                           product.available
// // //                             ? 'bg-green-100 text-green-700 hover:bg-green-200'
// // //                             : 'bg-red-100 text-red-700 hover:bg-red-200'
// // //                         }`}
// // //                       >
// // //                         {product.available ? '✅ Available' : '❌ Out of Stock'}
// // //                       </button>
// // //                     </td>

// // //                     <td className="px-4 py-3">
// // //                       <button
// // //                         onClick={() =>
// // //                           toggleFeatured(product.id, !!product.featured)
// // //                         }
// // //                         className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
// // //                           product.featured
// // //                             ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
// // //                             : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
// // //                         }`}
// // //                       >
// // //                         {product.featured ? '⭐ Featured' : '☆ Normal'}
// // //                       </button>
// // //                     </td>

// // //                     <td className="px-4 py-3">
// // //                       <div className="flex gap-2">
// // //                         <button
// // //                           onClick={() => handleEdit(product)}
// // //                           className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
// // //                         >
// // //                           ✏️ Edit
// // //                         </button>

// // //                         <button
// // //                           onClick={() => handleDelete(product.id)}
// // //                           className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
// // //                         >
// // //                           🗑️ Delete
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>

// // //           {/* MOBILE CARDS */}
// // //           <div className="grid gap-4 md:hidden">
// // //             {filteredProducts.map((product) => (
// // //               <div key={product.id} className="bg-white rounded-2xl shadow p-4">
// // //                 <div className="flex gap-4">
// // //                   {product.image ? (
// // //                     <img
// // //                       src={product.image}
// // //                       alt={product.name}
// // //                       className="w-20 h-20 object-cover rounded-xl"
// // //                     />
// // //                   ) : (
// // //                     <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center">
// // //                       📷
// // //                     </div>
// // //                   )}

// // //                   <div className="flex-1">
// // //                     <h2 className="text-lg font-semibold text-gray-800">
// // //                       {product.name}
// // //                     </h2>
// // //                     <p className="text-green-700 font-bold">₹{product.price}</p>
// // //                     <p className="text-sm text-gray-500">
// // //                       {product.category} · Stock: {product.stock ?? 0}
// // //                     </p>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex gap-2 mt-3">
// // //                   <button
// // //                     onClick={() =>
// // //                       toggleAvailability(product.id, !!product.available)
// // //                     }
// // //                     className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition ${
// // //                       product.available
// // //                         ? 'bg-green-100 text-green-700'
// // //                         : 'bg-red-100 text-red-700'
// // //                     }`}
// // //                   >
// // //                     {product.available ? '✅ Available' : '❌ Out of Stock'}
// // //                   </button>

// // //                   <button
// // //                     onClick={() =>
// // //                       toggleFeatured(product.id, !!product.featured)
// // //                     }
// // //                     className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition ${
// // //                       product.featured
// // //                         ? 'bg-orange-100 text-orange-700'
// // //                         : 'bg-gray-100 text-gray-500'
// // //                     }`}
// // //                   >
// // //                     {product.featured ? '⭐ Featured' : '☆ Normal'}
// // //                   </button>
// // //                 </div>

// // //                 <div className="flex gap-2 mt-3">
// // //                   <button
// // //                     onClick={() => handleEdit(product)}
// // //                     className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition text-sm"
// // //                   >
// // //                     ✏️ Edit
// // //                   </button>
// // //                   <button
// // //                     onClick={() => handleDelete(product.id)}
// // //                     className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition text-sm"
// // //                   >
// // //                     🗑️ Delete
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // }
// 'use client';

// import { useEffect, useState } from 'react';
// import { db } from '../../../lib/firebase';
// import {
//   collection,
//   getDocs,
//   deleteDoc,
//   doc,
//   addDoc,
//   updateDoc,
//   serverTimestamp,
// } from 'firebase/firestore';

// type Product = {
//   id: string;
//   name: string;
//   price: number;
//   category: string;
//   description: string;
//   image: string;
//   available: boolean;
//   featured: boolean;
//   stock: number;
// };

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   // FORM STATES
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [category, setCategory] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState('');
//   const [available, setAvailable] = useState(true);
//   const [featured, setFeatured] = useState(false);
//   const [stock, setStock] = useState('0');

//   // EDIT MODE
//   const [editingId, setEditingId] = useState<string | null>(null);

//   // SHOW / HIDE FORM
//   const [showForm, setShowForm] = useState(false);

//   // SEARCH & FILTER
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterCategory, setFilterCategory] = useState('All');

//   // FETCH PRODUCTS
//   const fetchProducts = async () => {
//     try {
//       const snapshot = await getDocs(collection(db, 'products'));

//       // ✅ any ki jagah proper type casting
//       const data = snapshot.docs.map((docSnap) => {
//         const d = docSnap.data();
//         return {
//           id: docSnap.id,
//           name: (d.name as string) || '',
//           price: (d.price as number) || 0,
//           category: (d.category as string) || '',
//           description: (d.description as string) || '',
//           image: (d.image as string) || '',
//           available: (d.available as boolean) ?? true,
//           featured: (d.featured as boolean) ?? false,
//           stock: (d.stock as number) || 0,
//         };
//       });

//       setProducts(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
// /* eslint-disable react-hooks/set-state-in-effect */
//   useEffect(() => {
//     fetchProducts();
    
//   }, []);

//   // GET UNIQUE CATEGORIES ✅ Set error fix
//   const uniqueCategories = [
//     'All',
//     ...Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
//   ];

//   // FILTER + SEARCH
//   const filteredProducts = products.filter((product) => {
//     const matchSearch = product.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchCategory =
//       filterCategory === 'All' || product.category === filterCategory;
//     return matchSearch && matchCategory;
//   });

//   // RESET FORM
//   const resetForm = () => {
//     setEditingId(null);
//     setName('');
//     setPrice('');
//     setCategory('');
//     setDescription('');
//     setImage('');
//     setAvailable(true);
//     setFeatured(false);
//     setStock('0');
//   };

//   // ADD / UPDATE PRODUCT
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const productData = {
//       name,
//       price: Number(price),
//       category,
//       description,
//       image,
//       available,
//       featured,
//       stock: Number(stock),
//     };

//     try {
//       if (editingId) {
//         await updateDoc(doc(db, 'products', editingId), productData);
//         setProducts((prev) =>
//           prev.map((item) =>
//             item.id === editingId ? { ...item, ...productData } : item
//           )
//         );
//         alert('✅ Product updated successfully!');
//       } else {
//         const docRef = await addDoc(collection(db, 'products'), {
//           ...productData,
//           createdAt: serverTimestamp(),
//         });
//         setProducts((prev) => [{ id: docRef.id, ...productData }, ...prev]);
//         alert('✅ Product added successfully!');
//       }

//       resetForm();
//       setShowForm(false);
//     } catch (error) {
//       console.error('Error saving product:', error);
//       alert('❌ Error saving product');
//     }
//   };

//   // DELETE PRODUCT
//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this product?')) return;
//     try {
//       await deleteDoc(doc(db, 'products', id));
//       setProducts((prev) => prev.filter((item) => item.id !== id));
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   // TOGGLE AVAILABILITY
//   const toggleAvailability = async (id: string, currentStatus: boolean) => {
//     try {
//       await updateDoc(doc(db, 'products', id), { available: !currentStatus });
//       setProducts((prev) =>
//         prev.map((item) =>
//           item.id === id ? { ...item, available: !currentStatus } : item
//         )
//       );
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   // TOGGLE FEATURED
//   const toggleFeatured = async (id: string, currentStatus: boolean) => {
//     try {
//       await updateDoc(doc(db, 'products', id), { featured: !currentStatus });
//       setProducts((prev) =>
//         prev.map((item) =>
//           item.id === id ? { ...item, featured: !currentStatus } : item
//         )
//       );
//     } catch (error) {
//       console.error('Error updating featured:', error);
//     }
//   };

//   // EDIT PRODUCT
//   const handleEdit = (product: Product) => {
//     setEditingId(product.id);
//     setName(product.name);
//     setPrice(product.price.toString());
//     setCategory(product.category || '');
//     setDescription(product.description || '');
//     setImage(product.image || '');
//     setAvailable(product.available ?? true);
//     setFeatured(product.featured ?? false);
//     setStock(product.stock?.toString() || '0');
//     setShowForm(true);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-6">

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//             🍔 Products Management
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Total: {products.length} products | Showing: {filteredProducts.length}
//           </p>
//         </div>

//         <button
//           onClick={() => {
//             if (showForm && editingId) resetForm();
//             setShowForm(!showForm);
//           }}
//           className="bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm md:text-base hover:bg-orange-700 transition font-semibold"
//         >
//           {showForm ? '✕ Close Form' : '+ Add New Product'}
//         </button>
//       </div>

//       {/* FORM */}
//       {showForm && (
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-2xl shadow-lg p-6 mb-8 space-y-4 border-l-4 border-orange-500"
//         >
//           <h2 className="text-xl font-bold text-gray-800">
//             {editingId ? '✏️ Update Product' : '➕ Add New Product'}
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Product Name *
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. Chicken Biryani"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Price (₹) *
//               </label>
//               <input
//                 type="number"
//                 placeholder="e.g. 299"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Category
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. Pizza, Burgers, Drinks"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Stock
//               </label>
//               <input
//                 type="number"
//                 placeholder="e.g. 50"
//                 value={stock}
//                 onChange={(e) => setStock(e.target.value)}
//                 className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               placeholder="Describe the product..."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               rows={3}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Image URL
//             </label>
//             <input
//               type="text"
//               placeholder="https://example.com/image.jpg"
//               value={image}
//               onChange={(e) => setImage(e.target.value)}
//               className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//             />

//             {/* ✅ img tag fix */}
//             {image && (
//               <div className="mt-3">
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={image}
//                   alt="Preview"
//                   className="w-32 h-24 object-cover rounded-xl border"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).style.display = 'none';
//                   }}
//                 />
//               </div>
//             )}
//           </div>

//           {/* TOGGLES */}
//           <div className="flex flex-wrap gap-6">
//             <label className="flex items-center gap-3 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={available}
//                 onChange={(e) => setAvailable(e.target.checked)}
//                 className="w-5 h-5 accent-green-600"
//               />
//               <span className="text-sm font-medium text-gray-700">
//                 ✅ Available
//               </span>
//             </label>

//             <label className="flex items-center gap-3 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={featured}
//                 onChange={(e) => setFeatured(e.target.checked)}
//                 className="w-5 h-5 accent-orange-600"
//               />
//               <span className="text-sm font-medium text-gray-700">
//                 ⭐ Featured (Show on homepage)
//               </span>
//             </label>
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button
//               type="submit"
//               className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition font-semibold"
//             >
//               {editingId ? '✏️ Update Product' : '➕ Add Product'}
//             </button>

//             <button
//               type="button"
//               onClick={() => {
//                 resetForm();
//                 setShowForm(false);
//               }}
//               className="bg-gray-300 px-6 py-3 rounded-xl hover:bg-gray-400 transition font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}

//       {/* SEARCH & FILTER BAR */}
//       <div className="bg-white rounded-2xl shadow p-4 mb-6 flex flex-col md:flex-row gap-4">
//         <input
//           type="text"
//           placeholder="🔍 Search products..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="flex-1 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500"
//         />

//         <select
//           value={filterCategory}
//           onChange={(e) => setFilterCategory(e.target.value)}
//           className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 md:w-48"
//         >
//           {uniqueCategories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* LOADING */}
//       {loading ? (
//         <div className="text-center py-20">
//           <div className="inline-block w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-gray-500 mt-4">Loading products...</p>
//         </div>
//       ) : filteredProducts.length === 0 ? (
//         <div className="bg-white rounded-xl p-10 text-center shadow">
//           <p className="text-gray-500 text-lg">No products found.</p>
//         </div>
//       ) : (
//         <>
//           {/* DESKTOP TABLE */}
//           <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow">
//             <table className="w-full">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="text-left px-4 py-4">Image</th>
//                   <th className="text-left px-4 py-4">Name</th>
//                   <th className="text-left px-4 py-4">Price</th>
//                   <th className="text-left px-4 py-4">Category</th>
//                   <th className="text-left px-4 py-4">Stock</th>
//                   <th className="text-left px-4 py-4">Status</th>
//                   <th className="text-left px-4 py-4">Featured</th>
//                   <th className="text-left px-4 py-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProducts.map((product) => (
//                   <tr
//                     key={product.id}
//                     className="border-t hover:bg-gray-50 transition"
//                   >
//                     <td className="px-4 py-3">
//                       {product.image ? (
//                         // ✅ img tag fix
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-14 h-14 object-cover rounded-xl"
//                         />
//                       ) : (
//                         <div className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
//                           🍽️
//                         </div>
//                       )}
//                     </td>

//                     <td className="px-4 py-3">
//                       <p className="font-semibold text-gray-800">
//                         {product.name}
//                       </p>
//                       <p className="text-xs text-gray-500 truncate max-w-50">
//                         {product.description}
//                       </p>
//                     </td>

//                     <td className="px-4 py-3 font-semibold text-green-700">
//                       ₹{product.price}
//                     </td>

//                     <td className="px-4 py-3">
//                       <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
//                         {product.category || 'N/A'}
//                       </span>
//                     </td>

//                     <td className="px-4 py-3">
//                       <span
//                         className={`font-semibold ${
//                           (product.stock ?? 0) < 10
//                             ? 'text-red-600'
//                             : 'text-gray-700'
//                         }`}
//                       >
//                         {product.stock ?? 0}
//                       </span>
//                     </td>

//                     <td className="px-4 py-3">
//                       <button
//                         onClick={() =>
//                           toggleAvailability(product.id, !!product.available)
//                         }
//                         className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
//                           product.available
//                             ? 'bg-green-100 text-green-700 hover:bg-green-200'
//                             : 'bg-red-100 text-red-700 hover:bg-red-200'
//                         }`}
//                       >
//                         {product.available ? '✅ Available' : '❌ Out of Stock'}
//                       </button>
//                     </td>

//                     <td className="px-4 py-3">
//                       <button
//                         onClick={() =>
//                           toggleFeatured(product.id, !!product.featured)
//                         }
//                         className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
//                           product.featured
//                             ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
//                             : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
//                         }`}
//                       >
//                         {product.featured ? '⭐ Featured' : '☆ Normal'}
//                       </button>
//                     </td>

//                     <td className="px-4 py-3">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleEdit(product)}
//                           className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
//                         >
//                           ✏️ Edit
//                         </button>

//                         <button
//                           onClick={() => handleDelete(product.id)}
//                           className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
//                         >
//                           🗑️ Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* MOBILE CARDS */}
//           <div className="grid gap-4 md:hidden">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white rounded-2xl shadow p-4"
//               >
//                 <div className="flex gap-4">
//                   {product.image ? (
//                     // ✅ img tag fix
//                     // eslint-disable-next-line @next/next/no-img-element
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-20 h-20 object-cover rounded-xl"
//                     />
//                   ) : (
//                     <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center text-2xl">
//                       🍽️
//                     </div>
//                   )}

//                   <div className="flex-1">
//                     <h2 className="text-lg font-semibold text-gray-800">
//                       {product.name}
//                     </h2>
//                     <p className="text-green-700 font-bold">₹{product.price}</p>
//                     <p className="text-sm text-gray-500">
//                       {product.category} · Stock: {product.stock ?? 0}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex gap-2 mt-3">
//                   <button
//                     onClick={() =>
//                       toggleAvailability(product.id, !!product.available)
//                     }
//                     className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition ${
//                       product.available
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-red-100 text-red-700'
//                     }`}
//                   >
//                     {product.available ? '✅ Available' : '❌ Out of Stock'}
//                   </button>

//                   <button
//                     onClick={() =>
//                       toggleFeatured(product.id, !!product.featured)
//                     }
//                     className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition ${
//                       product.featured
//                         ? 'bg-orange-100 text-orange-700'
//                         : 'bg-gray-100 text-gray-500'
//                     }`}
//                   >
//                     {product.featured ? '⭐ Featured' : '☆ Normal'}
//                   </button>
//                 </div>

//                 <div className="flex gap-2 mt-3">
//                   <button
//                     onClick={() => handleEdit(product)}
//                     className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition text-sm"
//                   >
//                     ✏️ Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(product.id)}
//                     className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition text-sm"
//                   >
//                     🗑️ Delete
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

'use client';

import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  available: boolean;
  featured: boolean;
  stock: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // FORM STATES
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [available, setAvailable] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [stock, setStock] = useState('0');

  // EDIT MODE
  const [editingId, setEditingId] = useState<string | null>(null);

  // SHOW / HIDE FORM
  const [showForm, setShowForm] = useState(false);

  // SEARCH & FILTER
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'products'));
      const data = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          name: (d.name as string) || '',
          price: (d.price as number) || 0,
          category: (d.category as string) || '',
          description: (d.description as string) || '',
          image: (d.image as string) || '',
          available: (d.available as boolean) ?? true,
          featured: (d.featured as boolean) ?? false,
          stock: (d.stock as number) || 0,
        };
      });
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const uniqueCategories = [
    'All',
    ...Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
  ];

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPrice('');
    setCategory('');
    setDescription('');
    setImage('');
    setAvailable(true);
    setFeatured(false);
    setStock('0');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name,
      price: Number(price),
      category,
      description,
      image,
      available,
      featured,
      stock: Number(stock),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), productData);
        setProducts((prev) => prev.map((item) => (item.id === editingId ? { ...item, ...productData } : item)));
        alert('✅ Product updated successfully!');
      } else {
        const docRef = await addDoc(collection(db, 'products'), { ...productData, createdAt: serverTimestamp() });
        setProducts((prev) => [{ id: docRef.id, ...productData }, ...prev]);
        alert('✅ Product added successfully!');
      }
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('❌ Error saving product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'products', id), { available: !currentStatus });
      setProducts((prev) => prev.map((item) => (item.id === id ? { ...item, available: !currentStatus } : item)));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'products', id), { featured: !currentStatus });
      setProducts((prev) => prev.map((item) => (item.id === id ? { ...item, featured: !currentStatus } : item)));
    } catch (error) {
      console.error('Error updating featured:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price.toString());
    setCategory(product.category || '');
    setDescription(product.description || '');
    setImage(product.image || '');
    setAvailable(product.available ?? true);
    setFeatured(product.featured ?? false);
    setStock(product.stock?.toString() || '0');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-6 transition-colors duration-300">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            🍔 Products Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Total: {products.length} products | Showing: {filteredProducts.length}
          </p>
        </div>

        <button
          onClick={() => {
            if (showForm && editingId) resetForm();
            setShowForm(!showForm);
          }}
          className="bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm md:text-base hover:bg-orange-700 transition font-semibold"
        >
          {showForm ? '✕ Close Form' : '+ Add New Product'}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 mb-8 space-y-4 border-l-4 border-orange-500">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {editingId ? '✏️ Update Product' : '➕ Add New Product'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name *</label>
              <input type="text" placeholder="e.g. Chicken Biryani" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 dark:text-white" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹) *</label>
              <input type="number" placeholder="e.g. 299" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 dark:text-white" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <input type="text" placeholder="e.g. Pizza, Burgers, Drinks" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
              <input type="number" placeholder="e.g. 50" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 dark:text-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea placeholder="Describe the product..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 dark:text-white" rows={3} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
            <input type="text" placeholder="https://example.com/image.jpg" value={image} onChange={(e) => setImage(e.target.value)} className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 dark:text-white" />
            {image && (
              <div className="mt-3">
                <img src={image} alt="Preview" className="w-32 h-24 object-cover rounded-xl border border-gray-300 dark:border-gray-700" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} className="w-5 h-5 accent-green-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">✅ Available</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-5 h-5 accent-orange-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">⭐ Featured</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition font-semibold">
              {editingId ? '✏️ Update Product' : '➕ Add Product'}
            </button>
            <button type="button" onClick={() => { resetForm(); setShowForm(false); }} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-6 py-3 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition font-semibold">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* SEARCH & FILTER BAR */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4 mb-6 flex flex-col md:flex-row gap-4">
        <input type="text" placeholder="🔍 Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 border border-gray-300 dark:border-gray-700 bg-transparent p-3 rounded-xl focus:ring-2 focus:ring-orange-500 dark:text-white" />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 dark:text-white md:w-48">
          {uniqueCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* LOADING / EMPTY / CONTENT */}
      {loading ? (
        <div className="text-center py-20"><div className="inline-block w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div></div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-10 text-center shadow"><p className="text-gray-500 dark:text-gray-400 text-lg">No products found.</p></div>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl shadow">
            <table className="w-full text-left">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-4">Image</th>
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Price</th>
                  <th className="px-4 py-4">Category</th>
                  <th className="px-4 py-4">Stock</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Featured</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <td className="px-4 py-3">
                      {product.image ? <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-xl" /> : <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">🍽️</div>}
                    </td>
                    <td className="px-4 py-3"><p className="font-semibold text-gray-800 dark:text-white">{product.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">{product.description}</p></td>
                    <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400">₹{product.price}</td>
                    <td className="px-4 py-3"><span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium">{product.category || 'N/A'}</span></td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{product.stock ?? 0}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleAvailability(product.id, !!product.available)} className={`px-3 py-1 rounded-full text-xs font-semibold ${product.available ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                        {product.available ? '✅ Available' : '❌ Out of Stock'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleFeatured(product.id, !!product.featured)} className={`px-3 py-1 rounded-full text-xs font-semibold ${product.featured ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>
                        {product.featured ? '⭐ Featured' : '☆ Normal'}
                      </button>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={() => handleEdit(product)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm">✏️ Edit</button>
                      <button onClick={() => handleDelete(product.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm">🗑️ Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="grid gap-4 md:hidden">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4">
                <div className="flex gap-4">
                  {product.image ? <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-xl" /> : <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">🍽️</div>}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h2>
                    <p className="text-green-600 dark:text-green-400 font-bold">₹{product.price}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.category} · Stock: {product.stock ?? 0}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => toggleAvailability(product.id, !!product.available)} className={`flex-1 py-1.5 rounded-xl text-xs font-semibold ${product.available ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                    {product.available ? '✅ Available' : '❌ Out of Stock'}
                  </button>
                  <button onClick={() => toggleFeatured(product.id, !!product.featured)} className={`flex-1 py-1.5 rounded-xl text-xs font-semibold ${product.featured ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>
                    {product.featured ? '⭐ Featured' : '☆ Normal'}
                  </button>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleEdit(product)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl text-sm">✏️ Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl text-sm">🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}