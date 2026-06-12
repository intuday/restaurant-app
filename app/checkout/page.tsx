// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { PaymentButton } from '@/components/ui/paymentButton';

// interface CartItem {
//   id: string | number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// export default function CheckoutPage() {
//   const { cart, cartTotal } = useCart();
//   const { user } = useAuth();
//   const router = useRouter();

//   const [isMounted, setIsMounted] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState<'ONLINE' | 'COD'>('ONLINE');

//   // 🔥 FIX: Form data state initialization directly reads from user state if available.
//   // This avoids running a synchronous setState inside a useEffect entirely.
//   const [formData, setFormData] = useState({
//     name: user?.displayName || '',
//     email: user?.email || '',
//     phone: user?.phoneNumber || '',
//   });

//   // 🔥 FIX 1: Hydration safe check using standard event loop macro-task
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsMounted(true);
//     }, 0);
//     return () => clearTimeout(timer);
//   }, []);

//   // 🔥 FIX 2: If the user logs in late or session resolves after mount, 
//   // we update it inside an event handler style callback or microtask wrapper 
//   // to prevent cascading synchronous renders warning.
//   useEffect(() => {
//     if (user) {
//       const updateData = setTimeout(() => {
//         setFormData((prev) => {
//           // If the user already started typing, don't overwrite their inputs
//           if (prev.name || prev.email || prev.phone) return prev;
//           return {
//             name: user.displayName || '',
//             email: user.email || '',
//             phone: user.phoneNumber || '',
//           };
//         });
//       }, 0);
//       return () => clearTimeout(updateData);
//     }
//   }, [user]);

//   // Route protection logic
//   useEffect(() => {
//     if (isMounted && !isProcessing && cart.length === 0) {
//       router.push('/');
//     }
//   }, [cart, router, isProcessing, isMounted]);

//   const subtotal = cartTotal;
//   const totalAmount = subtotal;

//   const isFormValid =
//     formData.name.trim().length > 1 &&
//     formData.phone.trim().length >= 10 &&
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
//         {/* Form Fields */}
//         <div className="lg:col-span-7 space-y-6">
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Details</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   required
//                   disabled={isProcessing}
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:text-gray-400"
//                   placeholder="John Doe"
//                 />
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                   <input
//                     type="tel"
//                     required
//                     disabled={isProcessing}
//                     value={formData.phone}
//                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                     className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:text-gray-400"
//                     placeholder="9876543210"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                   <input
//                     type="email"
//                     required
//                     disabled={isProcessing}
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:text-gray-400"
//                     placeholder="john@example.com"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Payment Selection */}
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${isProcessing ? 'opacity-60 cursor-not-allowed' : ''} ${paymentMethod === 'ONLINE' ? 'border-orange-500 bg-orange-50/50' : 'border-gray-200'}`}>
//                 <div className="flex items-center space-x-3">
//                   <input 
//                     type="radio" 
//                     disabled={isProcessing}
//                     checked={paymentMethod === 'ONLINE'} 
//                     onChange={() => setPaymentMethod('ONLINE')} 
//                     className="h-4 w-4 text-orange-500" 
//                   />
//                   <span className="font-semibold text-gray-900">Online Payments</span>
//                 </div>
//               </label>

//               <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${isProcessing ? 'opacity-60 cursor-not-allowed' : ''} ${paymentMethod === 'COD' ? 'border-orange-500 bg-orange-50/50' : 'border-gray-200'}`}>
//                 <div className="flex items-center space-x-3">
//                   <input 
//                     type="radio" 
//                     disabled={isProcessing}
//                     checked={paymentMethod === 'COD'} 
//                     onChange={() => setPaymentMethod('COD')} 
//                     className="h-4 w-4 text-orange-500" 
//                   />
//                   <span className="font-semibold text-gray-900">Cash On Delivery</span>
//                 </div>
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Order Summary Sidebar */}
//         <div className="lg:col-span-5">
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">Order Summary</h2>
            
//             <div className="max-h-60 overflow-y-auto divide-y divide-gray-100 mb-6 min-h-20">
//               {isMounted ? (
//                 cart.map((item: CartItem) => (
//                   <div key={item.id} className="flex justify-between items-center py-3">
//                     <div className="flex items-center space-x-3">
//                       <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100">
//                         <Image 
//                           src={item.image || '/placeholder.png'} 
//                           alt={item.name} 
//                           fill 
//                           className="object-cover" 
//                           sizes="48px" 
//                         />
//                       </div>
//                       <div>
//                         <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
//                         <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//                       </div>
//                     </div>
//                     <span className="font-semibold text-sm text-gray-800">₹{item.price * item.quantity}</span>
//                   </div>
//                 ))
//               ) : (
//                 /* Shimmer/Skeleton Effect */
//                 <div className="py-4 animate-pulse flex space-x-4 items-center">
//                   <div className="bg-gray-200 h-12 w-12 rounded-lg"></div>
//                   <div className="flex-1 space-y-2 py-1">
//                     <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                     <div className="h-3 bg-gray-200 rounded w-1/4"></div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="space-y-3 bg-gray-50 p-4 rounded-xl mb-6 text-sm">
//               <div className="flex justify-between text-gray-600">
//                 <span>Subtotal Items</span>
//                 <span>₹{isMounted ? subtotal : 0}</span>
//               </div>
//               <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-bold text-gray-900">
//                 <span>Total Due</span>
//                 <span>₹{isMounted ? totalAmount : 0}</span>
//               </div>
//             </div>

//             {isMounted && (
//               <PaymentButton
//                 paymentMethod={paymentMethod}
//                 customerInfo={formData}
//                 isValid={isFormValid}
//                 onProcessing={(status) => setIsProcessing(status)}
//               />
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PaymentButton } from '@/components/ui/paymentButton';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'ONLINE' | 'COD'>('ONLINE');

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
  });

  // Hydration safe check
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Update user details if loaded dynamically
  useEffect(() => {
    if (user) {
      const updateData = setTimeout(() => {
        setFormData((prev) => {
          if (prev.name || prev.email || prev.phone) return prev;
          return {
            name: user.displayName || '',
            email: user.email || '',
            phone: user.phoneNumber || '',
          };
        });
      }, 0);
      return () => clearTimeout(updateData);
    }
  }, [user]);

  // Route protection logic
  useEffect(() => {
    if (isMounted && !isProcessing && cart.length === 0) {
      router.push('/');
    }
  }, [cart, router, isProcessing, isMounted]);

  const subtotal = cartTotal;
  const totalAmount = subtotal;

  // Simple tax calculation layer (e.g., 5% GST standard for restaurants)
  const calculatedTax = Number((totalAmount * 0.05).toFixed(2));
  const finalBillAmount = totalAmount + calculatedTax;

  const isFormValid =
    formData.name.trim().length > 1 &&
    formData.phone.trim().length >= 10 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Fields */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  disabled={isProcessing}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:text-gray-400"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    disabled={isProcessing}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:text-gray-400"
                    placeholder="9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    disabled={isProcessing}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:text-gray-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Selection */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${isProcessing ? 'opacity-60 cursor-not-allowed' : ''} ${paymentMethod === 'ONLINE' ? 'border-orange-500 bg-orange-50/50' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-3">
                  <input 
                    type="radio" 
                    disabled={isProcessing}
                    checked={paymentMethod === 'ONLINE'} 
                    onChange={() => setPaymentMethod('ONLINE')} 
                    className="h-4 w-4 text-orange-500" 
                  />
                  <span className="font-semibold text-gray-900">Online Payments</span>
                </div>
              </label>

              <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${isProcessing ? 'opacity-60 cursor-not-allowed' : ''} ${paymentMethod === 'COD' ? 'border-orange-500 bg-orange-50/50' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-3">
                  <input 
                    type="radio" 
                    disabled={isProcessing}
                    checked={paymentMethod === 'COD'} 
                    onChange={() => setPaymentMethod('COD')} 
                    className="h-4 w-4 text-orange-500" 
                  />
                  <span className="font-semibold text-gray-900">Cash On Delivery</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">Order Summary</h2>
            
            <div className="max-h-60 overflow-y-auto divide-y divide-gray-100 mb-6 min-h-20">
              {isMounted ? (
                cart.map((item: CartItem) => (
                  <div key={item.id} className="flex justify-between items-center py-3">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                        <Image 
                          src={item.image || '/placeholder.png'} 
                          alt={item.name} 
                          fill 
                          className="object-cover" 
                          sizes="48px" 
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-sm text-gray-800">₹{item.price * item.quantity}</span>
                  </div>
                ))
              ) : (
                <div className="py-4 animate-pulse flex space-x-4 items-center">
                  <div className="bg-gray-200 h-12 w-12 rounded-lg"></div>
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-xl mb-6 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal Items</span>
                <span>₹{isMounted ? subtotal : 0}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (5%)</span>
                <span>₹{isMounted ? calculatedTax : 0}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-bold text-gray-900">
                <span>Total Due</span>
                <span>₹{isMounted ? finalBillAmount : 0}</span>
              </div>
            </div>

            {isMounted && (
              <PaymentButton
                paymentMethod={paymentMethod}
                customerInfo={formData}
                isValid={isFormValid}
                subtotal={subtotal}
                tax={calculatedTax}
                totalAmount={finalBillAmount}
                onProcessing={(status) => setIsProcessing(status)}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}