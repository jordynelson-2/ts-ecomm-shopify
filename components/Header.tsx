"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const { cartCount, openCart } = useCart();

  return (
    <header className="bg-white border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/ts-plug.svg"
                alt="Tucks Shop"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-900 font-semibold hover:text-[#6366f1] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/collections"
              className="text-gray-900 font-semibold hover:text-[#6366f1] transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/products"
              className="text-gray-900 font-semibold hover:text-[#6366f1] transition-colors"
            >
              Products
            </Link>
            <button
              onClick={openCart}
              className="text-gray-900 font-semibold hover:text-[#6366f1] transition-colors relative"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-[#6366f1] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
