import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: About */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-orange-500">
              🍕 Tasty Bites
            </h3>
            <p className="text-gray-400 mb-4">
              Delicious food delivered to your doorstep. 
              Fresh ingredients, amazing taste, every time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition text-2xl">
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition text-2xl">
                📷
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition text-2xl">
                🐦
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-400 hover:text-orange-500 transition">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-orange-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-orange-500 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>123 Food Street,<br />Tasty City, TC 12345</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                <span>info@tastybites.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span>11:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>10:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>10:00 - 21:00</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt- text-center text-gray-400">
          <p>&copy; 2024 Tasty Bites Restaurant. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Made with ❤️ and delicious food
          </p>
        </div>

      </div>
    </footer>
  );
}