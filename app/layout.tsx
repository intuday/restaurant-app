// // // import Navbar from './components/Navbar';
// // // import Footer from './components/Footer';
// // // import { PromotionProvider } from './context/PromotionContext';

// // // // wrap children like this:
// // // <AuthProvider>
// // //   <CartProvider>
// // //     <PromotionProvider>
// // //       {children}
// // //     </PromotionProvider>
// // //   </CartProvider>
// // // </AuthProvider>

// // // import { CartProvider } from './context/CartContext';
// // // import { AuthProvider } from './context/AuthContext';



// // // import './globals.css';

// // // export default function RootLayout({
// // //   children,
// // // }: {
// // //   children: React.ReactNode;
// // // }) {
// // //   return (
// // //     <html lang="en">
// // //       <body>
// // //         <AuthProvider>
// // //           <CartProvider>

// // //             <Navbar />

// // //             <main>
// // //               {children}
// // //             </main>

// // //             <Footer />

// // //           </CartProvider>
// // //         </AuthProvider>
// // //       </body>
// // //     </html>
// // //   );
// // // }


// // import Navbar from './components/Navbar';
// // import Footer from './components/Footer';

// // import { AuthProvider } from './context/AuthContext';
// // import { CartProvider } from './context/CartContext';
// // import { PromotionProvider } from './context/PromotionContext';
// // import './globals.css';
// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <html lang="en">
// //       <body>
// //         <AuthProvider>
// //           <CartProvider>
// //             <PromotionProvider>

// //               <Navbar />

// //               <main>
// //                 {children}
// //               </main>

// //               <Footer />

// //             </PromotionProvider>
// //           </CartProvider>
// //         </AuthProvider>
// //       </body>
// //     </html>
// //   );
// // }
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// import { AuthProvider } from './context/AuthContext';
// import { CartProvider } from './context/CartContext';
// import { PromotionProvider } from './context/PromotionContext';
// import OrderTrackingBar from '@/components/OrderTrackingBar'; // 🔥 New Global Tracking Bar
// import './globals.css';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen pb-24"> {/* pb-24 ensures the bottom bar doesn't overlap content */}
//         <AuthProvider>
//           <CartProvider>
//             <PromotionProvider>

//               <Navbar />

//               <main>
//                 {children}
//               </main>

//               <Footer />

//               {/* 🔥 Live Tracking active across the entire website */}
//               <OrderTrackingBar />

//             </PromotionProvider>
//           </CartProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OrderTrackingBar from '@/app/components/OrderTrackingBar';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { PromotionProvider } from './context/PromotionContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen pb-24 bg-white dark:bg-gray-950 transition-colors duration-200"> 
        {/* pb-24 ensures the bottom bar doesn't overlap any actionable bottom layouts */}
        <AuthProvider>
          <CartProvider>
            <PromotionProvider>

              <Navbar />

              <main>
                {children}
              </main>

              <Footer />

              {/* 🔥 Live Tracking active globally across client context maps */}
              <OrderTrackingBar />

            </PromotionProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}