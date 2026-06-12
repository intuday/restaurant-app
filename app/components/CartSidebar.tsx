// // 'use client';

// // import {
// //   Sheet,
// //   SheetContent,
// //   SheetDescription,
// //   SheetHeader,
// //   SheetTitle,
// //   SheetTrigger,
// // } from '@/components/ui/sheet';

// // import { Button } from '@/components/ui/button';
// // import { useCart } from '../context/CartContext';
// // import { useAuth } from '../context/AuthContext';
// // import { usePromotion } from '../context/PromotionContext';
// // import { useState, useEffect } from 'react';
// // import { Tag, X, ChevronRight, ShoppingBag, Ticket } from 'lucide-react';

// // export default function CartSidebar() {
// //   const {
// //     cart,
// //     removeFromCart,
// //     updateQuantity,
// //     cartTotal,
// //     cartCount,
// //     clearCart,
// //     placeOrder,
// //   } = useCart();

// //   const { user } = useAuth();
// //   const { promotions } = usePromotion();

// //   const [isOpen, setIsOpen] = useState(false);
// //   const [mounted, setMounted] = useState(false);
// //   const [couponInput, setCouponInput] = useState('');
// //   const [appliedPromo, setAppliedPromo] = useState<any>(null);
// //   const [discount, setDiscount] = useState(0);
// //   const [couponError, setCouponError] = useState('');
// //   const [couponSuccess, setCouponSuccess] = useState('');

// //   useEffect(() => setMounted(true), []);

// //   /* ✅ Remove Promo */
// //   const removePromo = () => {
// //     setAppliedPromo(null);
// //     setDiscount(0);
// //     setCouponSuccess('');
// //     setCouponError('');
// //   };

// //   /* ✅ Apply Promo */
// //   const applyPromo = (code: string) => {
// //     setCouponError('');
// //     setCouponSuccess('');

// //     if (!code || code.trim() === '') {
// //       setCouponError('Please enter a coupon code');
// //       return;
// //     }

// //     const promo = promotions.find(
// //       (p) => p.code === code.trim().toUpperCase() && p.active
// //     );

// //     if (!promo) {
// //       setCouponError('❌ Invalid or inactive coupon code');
// //       return;
// //     }

// //     let calculatedDiscount = 0;

// //     if (promo.type === 'percentage') {
// //       calculatedDiscount = (cartTotal * promo.value) / 100;
// //     }

// //     if (promo.type === 'flat') {
// //       calculatedDiscount = Math.min(promo.value, cartTotal);
// //     }

// //     setAppliedPromo(promo);
// //     setDiscount(calculatedDiscount);
// //     setCouponSuccess(
// //       `You save ₹${calculatedDiscount.toFixed(0)}!`
// //     );
// //     setCouponInput('');
// //   };

// //   /* ✅ Auto Apply */
// //   useEffect(() => {
// //     if (promotions.length === 0) return;

// //     const autoPromo = promotions.find(
// //       (p) => p.autoApply && p.active
// //     );

// //     if (autoPromo && cartTotal > 0 && !appliedPromo) {
// //       let calculatedDiscount = 0;

// //       if (autoPromo.type === 'percentage') {
// //         calculatedDiscount = (cartTotal * autoPromo.value) / 100;
// //       }

// //       if (autoPromo.type === 'flat') {
// //         calculatedDiscount = Math.min(autoPromo.value, cartTotal);
// //       }

// //       setAppliedPromo(autoPromo);
// //       setDiscount(calculatedDiscount);
// //       setCouponSuccess(
// //         `You save ₹${calculatedDiscount.toFixed(0)}!`
// //       );
// //     }

// //     if (cartTotal === 0) {
// //       removePromo();
// //     }
// //   }, [cartTotal, promotions]);

// //   /* ✅ Checkout */
// //   const handleCheckout = async () => {
// //     if (!user) {
// //       alert('Please login first');
// //       return;
// //     }

// //     try {
// //       await placeOrder(user.uid, {
// //         discount,
// //         promoCode: appliedPromo?.code || null,
// //         finalAmount: cartTotal - discount,
// //       });

// //       setIsOpen(false);
// //       removePromo();
// //     } catch (err) {
// //       console.error('CHECKOUT ERROR:', err);
// //       alert('Order failed');
// //     }
// //   };

// //   const finalAmount = Math.max(cartTotal - discount, 0);

// //   /* ✅ Active manual offers (not auto apply) */
// //   const availableOffers = promotions.filter(
// //     (p) => p.active && !p.autoApply
// //   );

// //   return (
// //     <Sheet open={isOpen} onOpenChange={setIsOpen}>

// //       {/* CART BUTTON */}
// //       <SheetTrigger asChild>
// //         <Button variant="outline" className="relative">
// //           🛒
// //           {mounted && cartCount > 0 && (
// //             <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
// //               {cartCount}
// //             </span>
// //           )}
// //         </Button>
// //       </SheetTrigger>

// //       <SheetContent
// //         side="right"
// //         className="w-full sm:max-w-md flex flex-col p-0 overflow-hidden"
// //       >
// //         {/* HEADER */}
// //         <SheetHeader className="px-5 py-4 border-b bg-white">
// //           <SheetTitle className="flex items-center gap-2 text-lg">
// //             <ShoppingBag className="w-5 h-5 text-orange-500" />
// //             Your Cart
// //             {cartCount > 0 && (
// //               <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-semibold">
// //                 {cartCount} items
// //               </span>
// //             )}
// //           </SheetTitle>
// //           <SheetDescription>
// //             Review your order before checkout
// //           </SheetDescription>
// //         </SheetHeader>

// //         {/* ITEMS LIST */}
// //         <div className="flex-1 overflow-y-auto bg-white">
// //           {cart.length === 0 ? (
// //             <div className="flex flex-col items-center justify-center h-full text-gray-400 py-24">
// //               <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
// //               <p className="font-semibold text-lg">
// //                 Your cart is empty
// //               </p>
// //               <p className="text-sm mt-1">
// //                 Add delicious items from our menu
// //               </p>
// //             </div>
// //           ) : (
// //             <div className="divide-y">
// //               {cart.map((item) => (
// //                 <div
// //                   key={item.id}
// //                   className="flex gap-3 px-5 py-4 hover:bg-orange-50/30 transition-colors"
// //                 >
// //                   <img
// //                     src={item.image}
// //                     alt={item.name}
// //                     className="w-16 h-16 object-cover rounded-xl shrink-0"
// //                   />

// //                   <div className="flex-1 min-w-0">
// //                     <p className="font-semibold text-gray-800 truncate">
// //                       {item.name}
// //                     </p>
// //                     <p className="text-orange-600 font-bold text-sm">
// //                       ₹{item.price} each
// //                     </p>

// //                     {/* QTY CONTROLS */}
// //                     <div className="flex items-center gap-3 mt-2">
// //                       <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-2 py-1">
// //                         <button
// //                           onClick={() =>
// //                             updateQuantity(item.id, item.quantity - 1)
// //                           }
// //                           className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-orange-600 font-bold text-lg"
// //                         >
// //                           −
// //                         </button>
// //                         <span className="text-sm font-bold w-5 text-center">
// //                           {item.quantity}
// //                         </span>
// //                         <button
// //                           onClick={() =>
// //                             updateQuantity(item.id, item.quantity + 1)
// //                           }
// //                           className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-orange-600 font-bold text-lg"
// //                         >
// //                           +
// //                         </button>
// //                       </div>

// //                       <button
// //                         onClick={() => removeFromCart(item.id)}
// //                         className="text-red-400 hover:text-red-600 text-xs font-medium transition-colors"
// //                       >
// //                         Remove
// //                       </button>
// //                     </div>
// //                   </div>

// //                   {/* ITEM TOTAL */}
// //                   <div className="shrink-0 text-right">
// //                     <p className="font-bold text-gray-800">
// //                       ₹{item.price * item.quantity}
// //                     </p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* BOTTOM CHECKOUT SECTION */}
// //         {cart.length > 0 && (
// //           <div className="border-t bg-gray-50 px-5 py-5 space-y-4">

// //             {/* AVAILABLE OFFERS */}
// //             {availableOffers.length > 0 && (
// //               <div className="bg-white rounded-2xl border border-dashed border-orange-200 p-4">
// //                 <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
// //                   <Ticket className="w-4 h-4 text-orange-500" />
// //                   Available Offers
// //                 </p>

// //                 <div className="space-y-2">
// //                   {availableOffers.map((promo) => (
// //                     <div
// //                       key={promo.code}
// //                       className="flex justify-between items-center bg-orange-50 rounded-xl px-3 py-2.5"
// //                     >
// //                       <div>
// //                         <p className="text-orange-600 font-black text-sm tracking-widest">
// //                           {promo.code}
// //                         </p>
// //                         <p className="text-gray-500 text-xs mt-0.5">
// //                           {promo.type === 'percentage'
// //                             ? `${promo.value}% OFF on your order`
// //                             : `Flat ₹${promo.value} OFF`}
// //                         </p>
// //                       </div>

// //                       <button
// //                         onClick={() => applyPromo(promo.code)}
// //                         className="text-blue-600 text-xs font-bold flex items-center gap-0.5 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
// //                       >
// //                         Apply
// //                         <ChevronRight className="w-3 h-3" />
// //                       </button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* COUPON INPUT OR APPLIED STATE */}
// //             {!appliedPromo ? (
// //               <div className="space-y-1.5">
// //                 <p className="text-xs font-semibold text-gray-600 flex items-center gap-1">
// //                   <Tag className="w-3 h-3" />
// //                   Have a coupon code?
// //                 </p>
// //                 <div className="flex gap-2">
// //                   <input
// //                     type="text"
// //                     placeholder="Enter coupon code"
// //                     value={couponInput}
// //                     onChange={(e) =>
// //                       setCouponInput(e.target.value.toUpperCase())
// //                     }
// //                     onKeyDown={(e) => {
// //                       if (e.key === 'Enter') applyPromo(couponInput);
// //                     }}
// //                     className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
// //                   />
// //                   <Button
// //                     variant="outline"
// //                     onClick={() => applyPromo(couponInput)}
// //                     className="rounded-xl border-orange-300 text-orange-600 hover:bg-orange-50 font-semibold"
// //                   >
// //                     Apply
// //                   </Button>
// //                 </div>

// //                 {couponError && (
// //                   <p className="text-red-500 text-xs pl-1 flex items-center gap-1">
// //                     {couponError}
// //                   </p>
// //                 )}
// //               </div>
// //             ) : (
// //               /* APPLIED PROMO BADGE */
// //               <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex justify-between items-center">
// //                 <div>
// //                   <p className="text-green-700 font-bold text-sm flex items-center gap-1.5">
// //                     🎉 Coupon Applied!
// //                   </p>
// //                   <p className="text-green-600 text-xs mt-0.5">
// //                     <span className="font-black tracking-wider">
// //                       {appliedPromo.code}
// //                     </span>
// //                     {' '}→ {couponSuccess}
// //                   </p>
// //                 </div>
// //                 <button
// //                   onClick={removePromo}
// //                   className="text-gray-400 hover:text-red-500 transition-colors ml-2"
// //                 >
// //                   <X className="w-4 h-4" />
// //                 </button>
// //               </div>
// //             )}

// //             {/* PRICE BREAKDOWN */}
// //             <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2.5">

// //               <div className="flex justify-between text-sm text-gray-500">
// //                 <span>Subtotal</span>
// //                 <span className="font-medium text-gray-700">
// //                   ₹{cartTotal}
// //                 </span>
// //               </div>

// //               {appliedPromo && (
// //                 <div className="flex justify-between text-sm text-green-600 font-semibold">
// //                   <span className="flex items-center gap-1">
// //                     <Tag className="w-3 h-3" />
// //                     Discount ({appliedPromo.code})
// //                   </span>
// //                   <span>− ₹{discount.toFixed(0)}</span>
// //                 </div>
// //               )}

// //               <div className="flex justify-between font-black text-base text-gray-900 border-t border-dashed pt-2.5">
// //                 <span>Total Payable</span>
// //                 <span className="text-orange-600 text-lg">
// //                   ₹{finalAmount.toFixed(0)}
// //                 </span>
// //               </div>

// //             </div>

// //             {/* CHECKOUT BUTTON */}
// //             <Button
// //               className="w-full bg-orange-600 hover:bg-orange-700 rounded-xl py-6 text-base font-bold tracking-wide shadow-lg shadow-orange-200"
// //               onClick={handleCheckout}
// //             >
// //               Proceed to Checkout →
// //             </Button>

// //             {/* CLEAR CART */}
// //             <button
// //               onClick={clearCart}
// //               className="w-full text-center text-sm text-gray-400 hover:text-red-500 transition-colors py-1"
// //             >
// //               Clear Cart
// //             </button>

// //           </div>
// //         )}

// //       </SheetContent>
// //     </Sheet>
// //   );
// // }
// 'use client';

// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from '@/components/ui/sheet';

// import { Button } from '@/components/ui/button';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import { usePromotion } from '../context/PromotionContext';
// import { useState, useEffect } from 'react';
// import { Tag, X, ChevronRight, ShoppingBag, Ticket } from 'lucide-react';

// type PromoType = {
//   code: string;
//   type: string;
//   value: number;
//   active: boolean;
//   autoApply?: boolean;
// };

// export default function CartSidebar() {
//   const {
//     cart,
//     removeFromCart,
//     updateQuantity,
//     cartTotal,
//     cartCount,
//     clearCart,
//     placeOrder,
//   } = useCart();

//   const { user } = useAuth();
//   const { promotions } = usePromotion();

//   const [isOpen, setIsOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [couponInput, setCouponInput] = useState('');
//   const [appliedPromo, setAppliedPromo] = useState<PromoType | null>(null);
//   const [discount, setDiscount] = useState(0);
//   const [couponError, setCouponError] = useState('');
//   const [couponSuccess, setCouponSuccess] = useState('');
//   const [isOrdering, setIsOrdering] = useState(false);
  
//   /* eslint-disable react-hooks/set-state-in-effect */

//   useEffect(() => setMounted(true), []);

//   /* ✅ Remove Promo */
//   const removePromo = () => {
//     setAppliedPromo(null);
//     setDiscount(0);
//     setCouponSuccess('');
//     setCouponError('');
//   };

//   /* ✅ Apply Promo */
//   const applyPromo = (code: string) => {
//     setCouponError('');
//     setCouponSuccess('');

//     if (!code || code.trim() === '') {
//       setCouponError('Please enter a coupon code');
//       return;
//     }

//     const promo = promotions.find(
//       (p: PromoType) => p.code === code.trim().toUpperCase() && p.active
//     );

//     if (!promo) {
//       setCouponError('❌ Invalid or inactive coupon code');
//       return;
//     }

//     let calculatedDiscount = 0;

//     if (promo.type === 'percentage') {
//       calculatedDiscount = (cartTotal * promo.value) / 100;
//     }

//     if (promo.type === 'flat') {
//       calculatedDiscount = Math.min(promo.value, cartTotal);
//     }

//     setAppliedPromo(promo);
//     setDiscount(calculatedDiscount);
//     setCouponSuccess(`You save ₹${calculatedDiscount.toFixed(0)}!`);
//     setCouponInput('');
//   };

//   /* ✅ Auto Apply */
//   useEffect(() => {
//     if (promotions.length === 0) return;

//     const autoPromo = promotions.find(
//       (p: PromoType) => p.autoApply && p.active
//     );

//     if (autoPromo && cartTotal > 0 && !appliedPromo) {
//       let calculatedDiscount = 0;

//       if (autoPromo.type === 'percentage') {
//         calculatedDiscount = (cartTotal * autoPromo.value) / 100;
//       }

//       if (autoPromo.type === 'flat') {
//         calculatedDiscount = Math.min(autoPromo.value, cartTotal);
//       }

//       setAppliedPromo(autoPromo);
//       setDiscount(calculatedDiscount);
//       setCouponSuccess(`You save ₹${calculatedDiscount.toFixed(0)}!`);
//     }

//     if (cartTotal === 0) {
//       removePromo();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [cartTotal, promotions]);

//   /* ✅ Checkout - Customer name + phone automatically from Firestore */
//   const handleCheckout = async () => {
//     if (!user) {
//       alert('Please login first to place an order');
//       return;
//     }

//     setIsOrdering(true);

//     try {
//       await placeOrder(user.uid, {
//         discount,
//         promoCode: appliedPromo?.code || null,
//         finalAmount: Math.max(cartTotal - discount, 0),
//       });

//       setIsOpen(false);
//       removePromo();
//     } catch (err) {
//       console.error('CHECKOUT ERROR:', err);
//       alert('Order failed');
//     } finally {
//       setIsOrdering(false);
//     }
//   };

//   const finalAmount = Math.max(cartTotal - discount, 0);

//   /* ✅ Active manual offers */
//   const availableOffers = promotions.filter(
//     (p: PromoType) => p.active && !p.autoApply
//   );

//   return (
//     <Sheet open={isOpen} onOpenChange={setIsOpen}>

//       {/* CART BUTTON */}
//       <SheetTrigger asChild>
//         <Button variant="outline" className="relative dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-700">
//           🛒
//           {mounted && cartCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//               {cartCount}
//             </span>
//           )}
//         </Button>
//       </SheetTrigger>

//       <SheetContent
//         side="right"
//         className="
//           w-full md:w-187.5 max-w-none
//           flex flex-col p-0 overflow-hidden
//           bg-white text-black
//           dark:bg-zinc-950 dark:text-white dark:border-l dark:border-zinc-800
//         "
//       >
//         {/* HEADER */}
//         <SheetHeader className="px-5 py-4 border-b bg-white dark:bg-zinc-950 dark:border-zinc-800">
//           <SheetTitle className="flex items-center gap-2 text-lg dark:text-gray-100">
//             <ShoppingBag className="w-5 h-5 text-orange-500" />
//             Your Cart
//             {cartCount > 0 && (
//               <span className="bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 text-xs px-2 py-0.5 rounded-full font-semibold">
//                 {cartCount} items
//               </span>
//             )}
//           </SheetTitle>
//           <SheetDescription className="dark:text-gray-400">
//             Review your order before checkout
//           </SheetDescription>
//         </SheetHeader>

//         {/* ITEMS LIST */}
//         <div className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950">
//           {cart.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500 py-24">
//               <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
//               <p className="font-semibold text-lg dark:text-gray-400">Your cart is empty</p>
//               <p className="text-sm mt-1">Add delicious items from our menu</p>
//             </div>
//           ) : (
//             <div className="divide-y dark:divide-zinc-800">
//               {cart.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex gap-3 px-5 py-4 hover:bg-orange-50/30 dark:hover:bg-zinc-900 transition-colors"
//                 >
//                   {/* eslint-disable-next-line @next/next/no-img-element */}
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded-xl shrink-0"
//                   />

//                   <div className="flex-1 min-w-0">
//                     <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">
//                       {item.name}
//                     </p>
//                     <p className="text-orange-600 dark:text-orange-500 font-bold text-sm">
//                       ₹{item.price} each
//                     </p>

//                     {/* QTY CONTROLS */}
//                     <div className="flex items-center gap-3 mt-2">
//                       <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 rounded-xl px-2 py-1">
//                         <button
//                           onClick={() =>
//                             updateQuantity(item.id, item.quantity - 1)
//                           }
//                           className="w-6 h-6 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 font-bold text-lg"
//                         >
//                           −
//                         </button>
//                         <span className="text-sm font-bold w-5 text-center dark:text-gray-200">
//                           {item.quantity}
//                         </span>
//                         <button
//                           onClick={() =>
//                             updateQuantity(item.id, item.quantity + 1)
//                           }
//                           className="w-6 h-6 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 font-bold text-lg"
//                         >
//                           +
//                         </button>
//                       </div>

//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         className="text-red-400 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 text-xs font-medium transition-colors"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>

//                   {/* ITEM TOTAL */}
//                   <div className="shrink-0 text-right">
//                     <p className="font-bold text-gray-800 dark:text-gray-200">
//                       ₹{item.price * item.quantity}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* BOTTOM CHECKOUT SECTION */}
//         {cart.length > 0 && (
//           <div className="border-t bg-gray-50 px-5 py-5 space-y-4 dark:border-zinc-800 dark:bg-zinc-900/50">

//             {/* LOGGED IN USER INFO */}
//             {user && (
//               <div className="bg-blue-50 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/50 rounded-xl px-4 py-3">
//                 <p className="text-blue-700 dark:text-blue-400 text-sm font-semibold flex items-center gap-2">
//                   👤 Ordering as
//                 </p>
//                 <p className="text-blue-600 dark:text-blue-300 text-xs mt-0.5">
//                   {user.displayName || user.email || 'Logged in user'}
//                 </p>
//               </div>
//             )}

//             {/* NOT LOGGED IN WARNING */}
//             {!user && (
//               <div className="bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-900/50 rounded-xl px-4 py-3">
//                 <p className="text-red-600 dark:text-red-400 text-sm font-semibold">
//                   ⚠️ Please login to place an order
//                 </p>
//                 <a
//                   href="/login"
//                   className="text-red-500 dark:text-red-400 text-xs underline mt-1 inline-block"
//                 >
//                   Login here →
//                 </a>
//               </div>
//             )}

//             {/* AVAILABLE OFFERS */}
//             {availableOffers.length > 0 && (
//               <div className="bg-white rounded-2xl border border-dashed border-orange-200 p-4 dark:bg-zinc-950 dark:border-zinc-700">
//                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
//                   <Ticket className="w-4 h-4 text-orange-500" />
//                   Available Offers
//                 </p>

//                 <div className="space-y-2">
//                   {availableOffers.map((promo: PromoType) => (
//                     <div
//                       key={promo.code}
//                       className="flex justify-between items-center bg-orange-50 dark:bg-orange-950/30 rounded-xl px-3 py-2.5"
//                     >
//                       <div>
//                         <p className="text-orange-600 dark:text-orange-400 font-black text-sm tracking-widest">
//                           {promo.code}
//                         </p>
//                         <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
//                           {promo.type === 'percentage'
//                             ? `${promo.value}% OFF on your order`
//                             : `Flat ₹${promo.value} OFF`}
//                         </p>
//                       </div>

//                       <button
//                         onClick={() => applyPromo(promo.code)}
//                         className="text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center gap-0.5 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/40 px-3 py-1.5 rounded-lg transition-colors"
//                       >
//                         Apply
//                         <ChevronRight className="w-3 h-3" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* COUPON INPUT OR APPLIED STATE */}
//             {!appliedPromo ? (
//               <div className="space-y-1.5">
//                 <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
//                   <Tag className="w-3 h-3" />
//                   Have a coupon code?
//                 </p>
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     placeholder="Enter coupon code"
//                     value={couponInput}
//                     onChange={(e) =>
//                       setCouponInput(e.target.value.toUpperCase())
//                     }
//                     onKeyDown={(e) => {
//                       if (e.key === 'Enter') applyPromo(couponInput);
//                     }}
//                     className="flex-1 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400"
//                   />
//                   <Button
//                     variant="outline"
//                     onClick={() => applyPromo(couponInput)}
//                     className="rounded-xl border-orange-300 dark:border-orange-500/50 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/50 dark:bg-transparent font-semibold"
//                   >
//                     Apply
//                   </Button>
//                 </div>

//                 {couponError && (
//                   <p className="text-red-500 dark:text-red-400 text-xs pl-1 flex items-center gap-1">
//                     {couponError}
//                   </p>
//                 )}
//               </div>
//             ) : (
//               /* APPLIED PROMO BADGE */
//               <div className="bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-900/50 rounded-xl px-4 py-3 flex justify-between items-center">
//                 <div>
//                   <p className="text-green-700 dark:text-green-400 font-bold text-sm flex items-center gap-1.5">
//                     🎉 Coupon Applied!
//                   </p>
//                   <p className="text-green-600 dark:text-green-500 text-xs mt-0.5">
//                     <span className="font-black tracking-wider">
//                       {appliedPromo.code}
//                     </span>{' '}
//                     → {couponSuccess}
//                   </p>
//                 </div>
//                 <button
//                   onClick={removePromo}
//                   className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors ml-2"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             )}

//             {/* PRICE BREAKDOWN */}
//             <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2.5 dark:bg-zinc-950 dark:border-zinc-800">
//               <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
//                 <span>Subtotal ({cartCount} items)</span>
//                 <span className="font-medium text-gray-700 dark:text-gray-200">₹{cartTotal}</span>
//               </div>

//               {appliedPromo && (
//                 <div className="flex justify-between text-sm text-green-600 dark:text-green-500 font-semibold">
//                   <span className="flex items-center gap-1">
//                     <Tag className="w-3 h-3" />
//                     Discount ({appliedPromo.code})
//                   </span>
//                   <span>− ₹{discount.toFixed(0)}</span>
//                 </div>
//               )}

//               <div className="flex justify-between font-black text-base text-gray-900 dark:text-gray-100 border-t border-dashed dark:border-zinc-700 pt-2.5">
//                 <span>Total Payable</span>
//                 <span className="text-orange-600 dark:text-orange-500 text-lg">
//                   ₹{finalAmount.toFixed(0)}
//                 </span>
//               </div>
//             </div>

//             {/* CHECKOUT BUTTON */}
//             <Button
//               className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500 rounded-xl py-6 text-base font-bold tracking-wide shadow-lg shadow-orange-200 dark:shadow-none disabled:opacity-50 dark:text-white"
//               onClick={handleCheckout}
//               disabled={isOrdering || !user}
//             >
//               {isOrdering ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                   Placing Order...
//                 </span>
//               ) : !user ? (
//                 '🔒 Login to Order'
//               ) : (
//                 'Proceed to Checkout →'
//               )}
//             </Button>

//             {/* CLEAR CART */}
//             <button
//               onClick={clearCart}
//               className="w-full text-center text-sm text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors py-1"
//             >
//               Clear Cart
//             </button>
//           </div>
//         )}
//       </SheetContent>
//     </Sheet>
//   );
// }
'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { usePromotion } from '../context/PromotionContext';
import { useState, useEffect } from 'react';
import { Tag, X, ChevronRight, ShoppingBag, Ticket } from 'lucide-react';
import { useRouter } from 'next/navigation';

type PromoType = {
  code: string;
  type: string;
  value: number;
  active: boolean;
  autoApply?: boolean;
};

export default function CartSidebar() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    clearCart,
  } = useCart();

  const { user } = useAuth();
  const { promotions } = usePromotion();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoType | null>(null);
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  
  /* eslint-disable react-hooks/set-state-in-effect */

  useEffect(() => setMounted(true), []);

  /* ✅ Remove Promo */
  const removePromo = () => {
    setAppliedPromo(null);
    setDiscount(0);
    setCouponSuccess('');
    setCouponError('');
  };

  /* ✅ Apply Promo */
  const applyPromo = (code: string) => {
    setCouponError('');
    setCouponSuccess('');

    if (!code || code.trim() === '') {
      setCouponError('Please enter a coupon code');
      return;
    }

    const promo = promotions.find(
      (p: PromoType) => p.code === code.trim().toUpperCase() && p.active
    );

    if (!promo) {
      setCouponError('❌ Invalid or inactive coupon code');
      return;
    }

    let calculatedDiscount = 0;

    if (promo.type === 'percentage') {
      calculatedDiscount = (cartTotal * promo.value) / 100;
    }

    if (promo.type === 'flat') {
      calculatedDiscount = Math.min(promo.value, cartTotal);
    }

    setAppliedPromo(promo);
    setDiscount(calculatedDiscount);
    setCouponSuccess(`You save ₹${calculatedDiscount.toFixed(0)}!`);
    setCouponInput('');
  };

  /* ✅ Auto Apply */
  useEffect(() => {
    if (promotions.length === 0) return;

    const autoPromo = promotions.find(
      (p: PromoType) => p.autoApply && p.active
    );

    if (autoPromo && cartTotal > 0 && !appliedPromo) {
      let calculatedDiscount = 0;

      if (autoPromo.type === 'percentage') {
        calculatedDiscount = (cartTotal * autoPromo.value) / 100;
      }

      if (autoPromo.type === 'flat') {
        calculatedDiscount = Math.min(autoPromo.value, cartTotal);
      }

      setAppliedPromo(autoPromo);
      setDiscount(calculatedDiscount);
      setCouponSuccess(`You save ₹${calculatedDiscount.toFixed(0)}!`);
    }

    if (cartTotal === 0) {
      removePromo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartTotal, promotions]);

  /* ✅ Redirect to Dedicated Checkout Page */
  const handleCheckoutRedirect = () => {
    if (!user) {
      alert('Please login first to place an order');
      return;
    }
    setIsOpen(false);
    router.push('/checkout');
  };

  const finalAmount = Math.max(cartTotal - discount, 0);

  /* ✅ Active manual offers */
  const availableOffers = promotions.filter(
    (p: PromoType) => p.active && !p.autoApply
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>

      {/* CART BUTTON */}
      <SheetTrigger asChild>
        <Button variant="outline" className="relative dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-700">
          🛒
          {mounted && cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="
          w-full md:w-187.5 max-w-none
          flex flex-col p-0 overflow-hidden
          bg-white text-black
          dark:bg-zinc-950 dark:text-white dark:border-l dark:border-zinc-800
        "
      >
        {/* HEADER */}
        <SheetHeader className="px-5 py-4 border-b bg-white dark:bg-zinc-950 dark:border-zinc-800">
          <SheetTitle className="flex items-center gap-2 text-lg dark:text-gray-100">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            Your Cart
            {cartCount > 0 && (
              <span className="bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 text-xs px-2 py-0.5 rounded-full font-semibold">
                {cartCount} items
              </span>
            )}
          </SheetTitle>
          <SheetDescription className="dark:text-gray-400">
            Review your order before checkout
          </SheetDescription>
        </SheetHeader>

        {/* ITEMS LIST */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500 py-24">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
              <p className="font-semibold text-lg dark:text-gray-400">Your cart is empty</p>
              <p className="text-sm mt-1">Add delicious items from our menu</p>
            </div>
          ) : (
            <div className="divide-y dark:divide-zinc-800">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 px-5 py-4 hover:bg-orange-50/30 dark:hover:bg-zinc-900 transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                      {item.name}
                    </p>
                    <p className="text-orange-600 dark:text-orange-500 font-bold text-sm">
                      ₹{item.price} each
                    </p>

                    {/* QTY CONTROLS */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 rounded-xl px-2 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 font-bold text-lg"
                        >
                          −
                        </button>
                        <span className="text-sm font-bold w-5 text-center dark:text-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 font-bold text-lg"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 text-xs font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* ITEM TOTAL */}
                  <div className="shrink-0 text-right">
                    <p className="font-bold text-gray-800 dark:text-gray-200">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM CHECKOUT SECTION */}
        {cart.length > 0 && (
          <div className="border-t bg-gray-50 px-5 py-5 space-y-4 dark:border-zinc-800 dark:bg-zinc-900/50">

            {/* LOGGED IN USER INFO */}
            {user && (
              <div className="bg-blue-50 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/50 rounded-xl px-4 py-3">
                <p className="text-blue-700 dark:text-blue-400 text-sm font-semibold flex items-center gap-2">
                  👤 Ordering as
                </p>
                <p className="text-blue-600 dark:text-blue-300 text-xs mt-0.5">
                  {user.displayName || user.email || 'Logged in user'}
                </p>
              </div>
            )}

            {/* NOT LOGGED IN WARNING */}
            {!user && (
              <div className="bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-900/50 rounded-xl px-4 py-3">
                <p className="text-red-600 dark:text-red-400 text-sm font-semibold">
                  ⚠️ Please login to place an order
                </p>
                <a
                  href="/login"
                  className="text-red-500 dark:text-red-400 text-xs underline mt-1 inline-block"
                >
                  Login here →
                </a>
              </div>
            )}

            {/* AVAILABLE OFFERS */}
            {availableOffers.length > 0 && (
              <div className="bg-white rounded-2xl border border-dashed border-orange-200 p-4 dark:bg-zinc-950 dark:border-zinc-700">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-orange-500" />
                  Available Offers
                </p>

                <div className="space-y-2">
                  {availableOffers.map((promo: PromoType) => (
                    <div
                      key={promo.code}
                      className="flex justify-between items-center bg-orange-50 dark:bg-orange-950/30 rounded-xl px-3 py-2.5"
                    >
                      <div>
                        <p className="text-orange-600 dark:text-orange-400 font-black text-sm tracking-widest">
                          {promo.code}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                          {promo.type === 'percentage'
                            ? `${promo.value}% OFF on your order`
                            : `Flat ₹${promo.value} OFF`}
                        </p>
                      </div>

                      <button
                        onClick={() => applyPromo(promo.code)}
                        className="text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center gap-0.5 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/40 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Apply
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* COUPON INPUT OR APPLIED STATE */}
            {!appliedPromo ? (
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  Have a coupon code?
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) =>
                      setCouponInput(e.target.value.toUpperCase())
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') applyPromo(couponInput);
                    }}
                    className="flex-1 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400"
                  />
                  <Button
                    variant="outline"
                    onClick={() => applyPromo(couponInput)}
                    className="rounded-xl border-orange-300 dark:border-orange-500/50 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/50 dark:bg-transparent font-semibold"
                  >
                    Apply
                  </Button>
                </div>

                {couponError && (
                  <p className="text-red-500 dark:text-red-400 text-xs pl-1 flex items-center gap-1">
                    {couponError}
                  </p>
                )}
              </div>
            ) : (
              /* APPLIED PROMO BADGE */
              <div className="bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-900/50 rounded-xl px-4 py-3 flex justify-between items-center">
                <div>
                  <p className="text-green-700 dark:text-green-400 font-bold text-sm flex items-center gap-1.5">
                    🎉 Coupon Applied!
                  </p>
                  <p className="text-green-600 dark:text-green-500 text-xs mt-0.5">
                    <span className="font-black tracking-wider">
                      {appliedPromo.code}
                    </span>{' '}
                    → {couponSuccess}
                  </p>
                </div>
                <button
                  onClick={removePromo}
                  className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* PRICE BREAKDOWN */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2.5 dark:bg-zinc-950 dark:border-zinc-800">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-medium text-gray-700 dark:text-gray-200">₹{cartTotal}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-sm text-green-600 dark:text-green-500 font-semibold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Discount ({appliedPromo.code})
                  </span>
                  <span>− ₹{discount.toFixed(0)}</span>
                </div>
              )}

              <div className="flex justify-between font-black text-base text-gray-900 dark:text-gray-100 border-t border-dashed dark:border-zinc-700 pt-2.5">
                <span>Total Payable</span>
                <span className="text-orange-600 dark:text-orange-500 text-lg">
                  ₹{finalAmount.toFixed(0)}
                </span>
              </div>
            </div>

            {/* CHECKOUT BUTTON */}
            <Button
              className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500 rounded-xl py-6 text-base font-bold tracking-wide shadow-lg shadow-orange-200 dark:shadow-none disabled:opacity-50 dark:text-white"
              onClick={handleCheckoutRedirect}
              disabled={!user}
            >
              {!user ? '🔒 Login to Order' : 'Proceed to Checkout →'}
            </Button>

            {/* CLEAR CART */}
            <button
              onClick={clearCart}
              className="w-full text-center text-sm text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors py-1"
            >
              Clear Cart
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}