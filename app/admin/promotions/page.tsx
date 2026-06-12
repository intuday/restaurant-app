// // app/admin/promotions/page.tsx
// 'use client';

// import { useState } from 'react';
// import { usePromotion } from '../../context/PromotionContext';
// import { Tag, Zap, ToggleLeft, ToggleRight, Plus, Loader2 } from 'lucide-react';

// function generateCouponCode(length = 8) {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   let result = '';
//   for (let i = 0; i < length; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return result;
// }

// export default function PromotionsPage() {
//   const { promotions, addPromotion, togglePromotion, loading } = usePromotion();

//   const [type, setType] = useState<'percentage' | 'flat'>('percentage');
//   const [value, setValue] = useState(10);
//   const [autoApply, setAutoApply] = useState(false);
//   const [applyToAll, setApplyToAll] = useState(true);
//   const [creating, setCreating] = useState(false);
//   const [togglingId, setTogglingId] = useState<string | null>(null);

//   const handleCreate = async () => {
//     if (!value || value <= 0) {
//       alert('Please enter a valid discount value');
//       return;
//     }

//     setCreating(true);
//     try {
//       await addPromotion({
//         code: generateCouponCode(),
//         type,
//         value,
//         autoApply,
//         applyToAll,
//         active: true,
//         usedCount: 0,
//         createdAt: new Date(),
//       });
//       // Reset form
//       setValue(10);
//       setAutoApply(false);
//     } catch (err) {
//       alert('Failed to create promotion');
//       console.error(err);
//     } finally {
//       setCreating(false);
//     }
//   };

//   const handleToggle = async (id: string, currentStatus: boolean) => {
//     setTogglingId(id);
//     try {
//       await togglePromotion(id, currentStatus);
//     } catch (err) {
//       alert('Failed to update promotion');
//     } finally {
//       setTogglingId(null);
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">

//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             🎁 Promotions
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Create and manage coupon codes
//           </p>
//         </div>

//         <div className="bg-orange-50 px-4 py-2 rounded-xl">
//           <p className="text-orange-600 font-semibold text-sm">
//             Total Coupons: {promotions.length}
//           </p>
//         </div>
//       </div>

//       {/* CREATE SECTION */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
//         <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
//           <Plus className="w-4 h-4 text-orange-500" />
//           Create New Promotion
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//           {/* TYPE */}
//           <div>
//             <label className="text-sm text-gray-600 mb-1 block">
//               Discount Type
//             </label>
//             <select
//               value={type}
//               onChange={(e) => setType(e.target.value as 'percentage' | 'flat')}
//               className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
//             >
//               <option value="percentage">Percentage (%)</option>
//               <option value="flat">Flat Amount (₹)</option>
//             </select>
//           </div>

//           {/* VALUE */}
//           <div>
//             <label className="text-sm text-gray-600 mb-1 block">
//               Discount Value
//             </label>
//             <input
//               type="number"
//               placeholder={type === 'percentage' ? 'e.g. 10' : 'e.g. 100'}
//               value={value}
//               onChange={(e) => setValue(Number(e.target.value))}
//               className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
//             />
//           </div>
//         </div>

//         {/* TOGGLES */}
//         <div className="flex flex-wrap gap-6 mt-4">
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={autoApply}
//               onChange={(e) => setAutoApply(e.target.checked)}
//               className="w-4 h-4 accent-orange-500"
//             />
//             <span className="text-sm text-gray-700">
//               Auto Apply to Cart
//             </span>
//           </label>

//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={applyToAll}
//               onChange={(e) => setApplyToAll(e.target.checked)}
//               className="w-4 h-4 accent-orange-500"
//             />
//             <span className="text-sm text-gray-700">
//               Apply to All Items
//             </span>
//           </label>
//         </div>

//         <button
//           onClick={handleCreate}
//           disabled={creating}
//           className="mt-5 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2"
//         >
//           {creating ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" />
//               Creating...
//             </>
//           ) : (
//             <>
//               <Tag className="w-4 h-4" />
//               Generate Coupon Code
//             </>
//           )}
//         </button>
//       </div>

//       {/* LOADING STATE */}
//       {loading ? (
//         <div className="text-center py-16 text-gray-400">
//           <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin opacity-50" />
//           <p>Loading promotions...</p>
//         </div>
//       ) : promotions.length === 0 ? (
//         <div className="text-center py-16 text-gray-400">
//           <Tag className="w-12 h-12 mx-auto mb-3 opacity-30" />
//           <p>No promotions created yet</p>
//         </div>
//       ) : (
//         /* PROMO LIST */
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {promotions.map((p) => (
//             <div
//               key={p.id}
//               className={`bg-white rounded-2xl shadow-sm border p-5 transition-all ${
//                 p.active ? 'border-green-100' : 'border-gray-100 opacity-60'
//               }`}
//             >
//               {/* CODE */}
//               <div className="flex justify-between items-start mb-3">
//                 <div className="bg-orange-50 px-3 py-1.5 rounded-lg">
//                   <p className="font-black text-orange-600 tracking-widest text-sm">
//                     {p.code}
//                   </p>
//                 </div>

//                 <span
//                   className={`text-xs px-2 py-1 rounded-full font-medium ${
//                     p.active
//                       ? 'bg-green-100 text-green-700'
//                       : 'bg-gray-100 text-gray-500'
//                   }`}
//                 >
//                   {p.active ? '● Active' : '○ Inactive'}
//                 </span>
//               </div>

//               {/* DISCOUNT */}
//               <p className="text-2xl font-black text-gray-800 mb-1">
//                 {p.type === 'percentage'
//                   ? `${p.value}% OFF`
//                   : `₹${p.value} OFF`}
//               </p>

//               {/* BADGES */}
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {p.autoApply && (
//                   <span className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
//                     <Zap className="w-3 h-3" />
//                     Auto Apply
//                   </span>
//                 )}
//                 {p.applyToAll && (
//                   <span className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
//                     All Items
//                   </span>
//                 )}
//               </div>

//               {/* CREATED AT */}
//               <p className="text-xs text-gray-400 mb-3">
//                 Created:{' '}
//                 {p.createdAt instanceof Date
//                   ? p.createdAt.toLocaleDateString('en-IN')
//                   : 'N/A'}
//               </p>

//               {/* TOGGLE BUTTON */}
//               <button
//                 onClick={() => handleToggle(p.id, p.active)}
//                 disabled={togglingId === p.id}
//                 className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50 ${
//                   p.active
//                     ? 'bg-red-50 text-red-500 hover:bg-red-100'
//                     : 'bg-green-50 text-green-600 hover:bg-green-100'
//                 }`}
//               >
//                 {togglingId === p.id ? (
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                 ) : p.active ? (
//                   <>
//                     <ToggleLeft className="w-4 h-4" />
//                     Deactivate
//                   </>
//                 ) : (
//                   <>
//                     <ToggleRight className="w-4 h-4" />
//                     Activate
//                   </>
//                 )}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { usePromotion } from '../../context/PromotionContext';
import { Tag, Zap, ToggleLeft, ToggleRight, Plus, Loader2 } from 'lucide-react';

function generateCouponCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function PromotionsPage() {
  const { promotions, addPromotion, togglePromotion, loading } = usePromotion();

  const [type, setType] = useState<'percentage' | 'flat'>('percentage');
  const [value, setValue] = useState(10);
  const [autoApply, setAutoApply] = useState(false);
  const [applyToAll, setApplyToAll] = useState(true);
  const [creating, setCreating] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!value || value <= 0) {
      alert('Please enter a valid discount value');
      return;
    }

    setCreating(true);
    try {
      await addPromotion({
        code: generateCouponCode(),
        type,
        value,
        autoApply,
        applyToAll,
        active: true,
        usedCount: 0,
        createdAt: new Date(),
      });
      // Reset form
      setValue(10);
      setAutoApply(false);
    } catch (err) {
      alert('Failed to create promotion');
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    setTogglingId(id);
    try {
      await togglePromotion(id, currentStatus);
    } catch (err) {
      alert('Failed to update promotion');
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 max-w-5xl mx-auto transition-colors duration-300">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            🎁 Promotions
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Create and manage coupon codes
          </p>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 px-4 py-2 rounded-xl">
          <p className="text-orange-600 dark:text-orange-400 font-semibold text-sm">
            Total Coupons: {promotions.length}
          </p>
        </div>
      </div>

      {/* CREATE SECTION */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-8">
        <h2 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-orange-500" />
          Create New Promotion
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* TYPE */}
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
              Discount Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'percentage' | 'flat')}
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 dark:text-white"
            >
              <option value="percentage">Percentage (%)</option>
              <option value="flat">Flat Amount (₹)</option>
            </select>
          </div>

          {/* VALUE */}
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
              Discount Value
            </label>
            <input
              type="number"
              placeholder={type === 'percentage' ? 'e.g. 10' : 'e.g. 100'}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 dark:text-white"
            />
          </div>
        </div>

        {/* TOGGLES */}
        <div className="flex flex-wrap gap-6 mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoApply}
              onChange={(e) => setAutoApply(e.target.checked)}
              className="w-4 h-4 accent-orange-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Auto Apply to Cart
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={applyToAll}
              onChange={(e) => setApplyToAll(e.target.checked)}
              className="w-4 h-4 accent-orange-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Apply to All Items
            </span>
          </label>
        </div>

        <button
          onClick={handleCreate}
          disabled={creating}
          className="mt-5 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2"
        >
          {creating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Tag className="w-4 h-4" />
              Generate Coupon Code
            </>
          )}
        </button>
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">
          <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin opacity-50" />
          <p>Loading promotions...</p>
        </div>
      ) : promotions.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Tag className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No promotions created yet</p>
        </div>
      ) : (
        /* PROMO LIST */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promotions.map((p) => (
            <div
              key={p.id}
              className={`bg-white dark:bg-gray-900 rounded-2xl shadow-sm border p-5 transition-all ${
                p.active 
                  ? 'border-green-100 dark:border-green-900' 
                  : 'border-gray-100 dark:border-gray-800 opacity-60'
              }`}
            >
              {/* CODE */}
              <div className="flex justify-between items-start mb-3">
                <div className="bg-orange-50 dark:bg-orange-900/20 px-3 py-1.5 rounded-lg">
                  <p className="font-black text-orange-600 dark:text-orange-400 tracking-widest text-sm">
                    {p.code}
                  </p>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    p.active
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {p.active ? '● Active' : '○ Inactive'}
                </span>
              </div>

              {/* DISCOUNT */}
              <p className="text-2xl font-black text-gray-800 dark:text-white mb-1">
                {p.type === 'percentage'
                  ? `${p.value}% OFF`
                  : `₹${p.value} OFF`}
              </p>

              {/* BADGES */}
              <div className="flex flex-wrap gap-2 mb-4">
                {p.autoApply && (
                  <span className="flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                    <Zap className="w-3 h-3" />
                    Auto Apply
                  </span>
                )}
                {p.applyToAll && (
                  <span className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full">
                    All Items
                  </span>
                )}
              </div>

              {/* CREATED AT */}
              <p className="text-xs text-gray-400 mb-3">
                Created:{' '}
                {p.createdAt instanceof Date
                  ? p.createdAt.toLocaleDateString('en-IN')
                  : 'N/A'}
              </p>

              {/* TOGGLE BUTTON */}
              <button
                onClick={() => handleToggle(p.id, p.active)}
                disabled={togglingId === p.id}
                className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50 ${
                  p.active
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30'
                    : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30'
                }`}
              >
                {togglingId === p.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : p.active ? (
                  <>
                    <ToggleLeft className="w-4 h-4" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <ToggleRight className="w-4 h-4" />
                    Activate
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}