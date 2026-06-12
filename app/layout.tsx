// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import { PromotionProvider } from './context/PromotionContext';

// // wrap children like this:
// <AuthProvider>
//   <CartProvider>
//     <PromotionProvider>
//       {children}
//     </PromotionProvider>
//   </CartProvider>
// </AuthProvider>

// import { CartProvider } from './context/CartContext';
// import { AuthProvider } from './context/AuthContext';



// import './globals.css';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <AuthProvider>
//           <CartProvider>

//             <Navbar />

//             <main>
//               {children}
//             </main>

//             <Footer />

//           </CartProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }


import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
      <body>
        <AuthProvider>
          <CartProvider>
            <PromotionProvider>

              <Navbar />

              <main>
                {children}
              </main>

              <Footer />

            </PromotionProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
