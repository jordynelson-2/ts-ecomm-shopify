import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-black text-lg mb-4">Store</h3>
            <p className="text-black text-sm">
              Your one-stop shop for quality products and exceptional service.
            </p>
          </div>
          <div>
            <h3 className="font-semibold  text-black mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-black">
              <li>
                <Link
                  href="/products"
                  className="hover:text-black transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="hover:text-black transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrivals"
                  className="hover:text-black transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/sale"
                  className="hover:text-black transition-colors"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-black  mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-black">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-black transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-black transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-black transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-black transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-black  mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-black">
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-black">
          <p>&copy; {new Date().getFullYear()} Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
