"use client";

import { useState } from "react";
import { ShopifyProduct } from "@/lib/types";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

interface ProductDetailClientProps {
  product: ShopifyProduct;
  currencySymbol: string;
}

export default function ProductDetailClient({
  product,
  currencySymbol,
}: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.edges[0]?.node
  );
  const [quantity, setQuantity] = useState(1);

  const images = product.images.edges.map((edge) => edge.node);

  // Function to handle variant selection and update image
  const handleVariantChange = (variantId: string) => {
    const variant = product.variants.edges.find(
      (v) => v.node.id === variantId
    )?.node;
    if (!variant) return;

    setSelectedVariant(variant);

    // If variant has an associated image, find and display it
    if (variant?.image) {
      const imageIndex = images.findIndex(
        (img) => img.url === variant.image?.url
      );
      if (imageIndex !== -1) {
        setSelectedImage(imageIndex);
      }
    }
  };

  // Function to handle thumbnail click - updates both image and variant
  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);

    // Find variant that matches this image
    const clickedImage = images[index];
    const matchingVariant = product.variants.edges.find(
      (v) => v.node.image?.url === clickedImage.url
    );

    if (matchingVariant) {
      setSelectedVariant(matchingVariant.node);
    }
  };

  // Function to handle add to cart
  const handleAddToCart = () => {
    if (selectedVariant) {
      addItem(selectedVariant, product, quantity);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left: Product Images */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          {images[selectedImage] && (
            <img
              src={images[selectedImage].url}
              alt={images[selectedImage].altText || product.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="relative">
            <div className="grid grid-cols-4 gap-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === index
                      ? "border-[#6366f1]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.altText || `${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right: Product Info */}
      <div className="space-y-6">
        {/* Authenticity Badge */}
        <div className="flex items-center gap-2 text-green-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-semibold text-sm">
            100% Authenticity Guaranteed
          </span>
        </div>

        {/* Product Title */}
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

        {/* Price */}
        <div className="text-3xl font-bold text-gray-900">
          {currencySymbol}
          {parseFloat(
            selectedVariant?.price.amount ||
              product.priceRange.minVariantPrice.amount
          ).toFixed(2)}
        </div>

        {/* Variant Selector Dropdown */}
        {product.variants.edges.length > 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {product.variants.edges[0]?.node.selectedOptions[0]?.name ||
                "Variant"}
            </label>
            <div className="relative">
              <select
                value={selectedVariant?.id || ""}
                onChange={(e) => handleVariantChange(e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-[#6366f1] rounded font-medium text-black appearance-none bg-white cursor-pointer focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 focus:outline-none transition-all"
              >
                {product.variants.edges.map((variant) => {
                  const variantNode = variant.node;
                  const optionValue =
                    variantNode.selectedOptions[0]?.value || variantNode.title;

                  return (
                    <option
                      key={variantNode.id}
                      value={variantNode.id}
                      disabled={!variantNode.availableForSale}
                      className="py-2"
                    >
                      {optionValue}
                    </option>
                  );
                })}
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500"
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
          </div>
        )}

        {/* Add to Cart Button */}
        <div className="space-y-3">
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant?.availableForSale}
            className={`w-full py-4 rounded-lg font-bold text-base transition-all ${
              selectedVariant?.availableForSale
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {selectedVariant?.availableForSale
              ? `ADD TO CART • ${currencySymbol}${parseFloat(
                  selectedVariant.price.amount
                ).toFixed(2)}`
              : "OUT OF STOCK"}
          </button>

          {/* Shop Pay Button */}
          <button className="w-full bg-[#6366f1] text-white py-4 rounded-lg font-bold hover:bg-[#5558e3] transition-colors">
            Buy with ShopPay
          </button>

          <button className="w-full text-sm text-gray-700 font-medium hover:text-[#6366f1] transition-colors">
            More payment options
          </button>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-600">
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

        {/* Collapsible Sections */}
        <div className="space-y-4 pt-6 border-t">
          {/* Product Description */}
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer py-4 font-bold text-gray-900">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span>Product Description</span>
              </div>
              <svg
                className="w-5 h-5 transition-transform group-open:rotate-180"
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
            </summary>
            <div className="pb-4 text-gray-700 leading-relaxed">
              {product.description || "No description available."}
            </div>
          </details>

          {/* Authenticity Guarantee */}
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer py-4 font-bold text-gray-900 border-t">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>100% Authenticity Guaranteed</span>
              </div>
              <svg
                className="w-5 h-5 transition-transform group-open:rotate-180"
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
            </summary>
            <div className="pb-4 text-gray-700 leading-relaxed">
              All products sold are guaranteed to be 100% authentic. We stand
              behind the authenticity of every item we sell.
            </div>
          </details>

          {/* Shipping */}
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer py-4 font-bold text-gray-900 border-t">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
                <span>Same Day Shipping</span>
              </div>
              <svg
                className="w-5 h-5 transition-transform group-open:rotate-180"
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
            </summary>
            <div className="pb-4 text-gray-700 leading-relaxed">
              Orders placed before 2pm are shipped the same day via tracked
              delivery with AnPost, RoyalMail or EMS.
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
