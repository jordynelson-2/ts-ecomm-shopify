"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    cartTotal,
    cartCount,
    currencyCode,
  } = useCart();
  const [orderNotes, setOrderNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);

  const currencySymbol =
    currencyCode === "GBP" ? "£" : currencyCode === "EUR" ? "€" : "$";

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              Cart{" "}
              <span className="text-sm font-normal text-gray-600">
                ({cartCount} item{cartCount !== 1 ? "s" : ""})
              </span>
            </h2>
            <button
              onClick={closeCart}
              className="text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Close cart"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Promo Banner */}

          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button
                  onClick={closeCart}
                  className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.variant.id}
                    className="flex gap-4 pb-4 border-b"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-sm text-gray-900 line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="font-bold text-sm text-gray-900 ml-2">
                          {currencySymbol}
                          {parseFloat(item.variant.price.amount).toFixed(2)}
                        </p>
                      </div>

                      {/* Variant Info */}
                      {item.variant.selectedOptions.map((option) => (
                        <p
                          key={option.name}
                          className="text-sm text-gray-600 mb-2"
                        >
                          {option.name}: {option.value}
                        </p>
                      ))}

                      {/* Quantity and Remove */}
                      <div className="flex items-center justify-between">
                        <div className="relative">
                          <select
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.variant.id,
                                parseInt(e.target.value)
                              )
                            }
                            className="border border-gray-300 rounded px-3 py-1 pr-8 text-sm text-black font-medium appearance-none bg-white cursor-pointer hover:border-gray-400 transition-colors"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                          <svg
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                        <button
                          onClick={() => removeItem(item.variant.id)}
                          className="text-sm text-gray-600 hover:text-[#6366f1] font-medium underline transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Order Notes */}
                <div className="border-t pt-4">
                  <button
                    onClick={() => setShowNotes(!showNotes)}
                    className="flex items-center justify-between w-full text-sm font-medium text-gray-900 hover:text-[#6366f1] transition-colors"
                  >
                    Add order notes
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        showNotes ? "rotate-45" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                  {showNotes && (
                    <textarea
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Add special instructions for your order..."
                      className="mt-3 w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] min-h-[100px]"
                    />
                  )}
                </div>
              </div>

              {/* Footer with Checkout Buttons */}
              <div className="border-t p-4 space-y-3">
                <button className="w-full bg-black text-white py-4 rounded-lg font-bold text-base hover:bg-gray-800 transition-colors">
                  CHECKOUT • {currencySymbol}
                  {cartTotal.toFixed(2)} {currencyCode}
                </button>

                <button className="w-full bg-[#6366f1] text-white py-4 rounded-lg font-bold hover:bg-[#5558e3] transition-colors flex items-center justify-center gap-2">
                  <span className="text-lg">shopPay</span>
                </button>

                <p className="text-xs text-gray-600 text-center">
                  By purchasing, you agree to the{" "}
                  <a href="#" className="underline hover:text-[#6366f1]">
                    terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline hover:text-[#6366f1]">
                    privacy policy
                  </a>{" "}
                  of Global-e, our international service provider.
                </p>

                <p className="text-sm text-gray-700 font-medium text-center pt-2">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
