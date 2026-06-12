'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/firebase'; 
import { doc, onSnapshot } from 'firebase/firestore';

// Detailed Interface for Professional Receipt
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  id: string;
  orderNo: string; 
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  tableNumber: string;
  paymentMethod: string;
  customerName: string;
  status: string;
}

function SuccessPageContent() {
  const searchParams = useSearchParams();
  // const router = useRouter();
  const orderId = searchParams.get('id');
  
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(() => !orderId);

  useEffect(() => {
    if (!orderId) return;

    const orderDocRef = doc(db, 'orders', orderId);

    const unsubscribe = onSnapshot(orderDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const rawOrderNo = data.orderNo || 0;
        const formattedOrderNo = String(rawOrderNo).padStart(3, '0');

        setOrder({
          id: docSnap.id,
          orderNo: formattedOrderNo,
          items: data.items || [], // Array of items ordered
          subtotal: data.subtotal || 0,
          tax: data.tax || 0,
          total: data.total || 0,
          tableNumber: data.tableNumber || 'N/A',
          paymentMethod: data.paymentMethod || 'UNKNOWN',
          customerName: data.customerName || 'Valued Guest',
          status: data.status || 'Pending'
        });
      } else {
        console.error("No such order found!");
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching real-time data:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!order && !loading) {
    return (
      <div className="min-h-screen bg-[#0B0F17] flex flex-col items-center justify-center text-white p-4">
        <h2 className="text-xl font-bold mb-4">Order Details Not Found</h2>
        <Link href="/menu" className="bg-orange-500 px-4 py-2 rounded-xl">Go back to Menu</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-gray-100 flex flex-col items-center justify-center p-4 relative overflow-y-auto py-12">
      <div className="absolute top-[-20%] left-[-10%] w-125 h-125 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-125 h-125 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md bg-[#161C2A]/60 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl text-center relative z-10">
        
        {/* Success Header */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-4 animate-bounce">
          <svg className="h-8 w-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-extrabold text-white mb-1">Order Placed Successfully!</h1>
        <p className="text-gray-400 text-xs mb-6">Thank you, {order?.customerName}. Your order has been sent to the kitchen.</p>

        {/* Digital Invoice / Receipt */}
        <div className="bg-[#0F1320]/80 border border-gray-800/80 rounded-2xl p-5 text-left space-y-4 mb-6">
          
          {/* TOKEN DISPLAY */}
          <div className="flex flex-col items-center justify-center py-2 border-b border-dashed border-gray-800 text-center">
            <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase mb-0.5">Token Number</span>
            <span className="text-4xl font-black text-orange-500 font-mono tracking-widest"> </span>
              {order?.orderNo}
          <p className="font-semibold text-white-800 dark:text-white uppercase font-mono">
                    ID: #{order?.id?.slice(0, 8)}
                  </p>
          </div>
          

          {/* ITEM SUMMARY SECTION */}
          <div className="border-b border-gray-800/60 pb-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Items Ordered</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {order?.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">
                    {item.name} <span className="text-xs text-orange-400 font-bold">x{item.quantity}</span>
                  </span>
                  <span className="font-mono text-gray-400">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BILL BREAKDOWN */}
          <div className="space-y-1.5 text-xs border-b border-gray-800/60 pb-3">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span className="font-mono">₹{order?.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>GST / Taxes</span>
              <span className="font-mono">₹{order?.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Table Info</span>
              <span className="text-white font-medium bg-gray-800 px-1.5 py-0.5 rounded">{order?.tableNumber}</span>
            </div>
          </div>

          {/* TOTAL AMOUNT */}
          <div className="flex justify-between items-center pt-1">
            <span className="text-sm font-bold text-white">Amount Paid</span>
            <span className="text-lg font-extrabold text-emerald-400">₹{order?.total.toFixed(2)}</span>
          </div>
        </div>

        {/* CONTACT & SUPPORT SECTION */}
        <div className="bg-gray-900/40 border border-gray-800/50 rounded-xl p-3.5 mb-6 text-left text-xs">
          <p className="text-gray-400 font-semibold mb-1">Need help with your order?</p>
          <p className="text-gray-500 mb-2">If you have any changes or queries, contact the restaurant counter immediately:</p>
          <div className="flex justify-between text-orange-400 font-medium">
            <a href="tel:+919876543210" className="hover:underline">📞 Call: +91 98765 43210</a>
            <span>📍 Counter No. 1</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="space-y-2.5">
          <Link
            href="/my-orders"
            className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all text-sm shadow-md shadow-emerald-600/10"
          >
            Track in My Orders 📋
          </Link>
          
          <Link
            href="/menu"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all text-sm active:scale-[0.99]"
          >
            Order Something More
          </Link>
        </div>

        {/* <p className="mt-4 text-[11px] text-gray-500">
          Order ID: <span className="font-mono select-all text-gray-400">{orderId}</span>
        </p> */}

      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}