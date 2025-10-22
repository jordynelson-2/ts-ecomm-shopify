'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ShopifyProduct } from '@/lib/types';

interface ProductsFilterProps {
  products: ShopifyProduct[];
}

export default function ProductsFilter({ products }: ProductsFilterProps) {
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 24;

  // Extract unique product types
  const productTypes = useMemo(() => {
    return Array.from(
      new Set(products.map((p) => p.productType).filter((type): type is string => Boolean(type)))
    ).sort();
  }, [products]);

  // Calculate availability counts
  const inStockCount = products.filter((p) => p.availableForSale).length;
  const outOfStockCount = products.filter((p) => !p.availableForSale).length;

  // Calculate price ranges
  const priceRanges = useMemo(() => {
    const allPrices = products.map((p) =>
      parseFloat(p.priceRange.minVariantPrice.amount)
    );
    const maxPrice = Math.max(...allPrices);

    // Get currency symbol from first product
    const currencyCode = products[0]?.priceRange.minVariantPrice.currencyCode || 'USD';
    const currencySymbol = currencyCode === 'GBP' ? '£' : currencyCode === 'EUR' ? '€' : '$';

    return [
      {
        label: `Under ${currencySymbol}${Math.ceil(maxPrice / 4)}`,
        min: 0,
        max: Math.ceil(maxPrice / 4),
      },
      {
        label: `${currencySymbol}${Math.ceil(maxPrice / 4)} - ${currencySymbol}${Math.ceil(maxPrice / 2)}`,
        min: Math.ceil(maxPrice / 4),
        max: Math.ceil(maxPrice / 2),
      },
      {
        label: `${currencySymbol}${Math.ceil(maxPrice / 2)} - ${currencySymbol}${Math.ceil(maxPrice * 0.75)}`,
        min: Math.ceil(maxPrice / 2),
        max: Math.ceil(maxPrice * 0.75),
      },
      {
        label: `Over ${currencySymbol}${Math.ceil(maxPrice * 0.75)}`,
        min: Math.ceil(maxPrice * 0.75),
        max: Infinity,
      },
    ];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Availability filter
      if (selectedAvailability.length > 0) {
        if (selectedAvailability.includes('inStock') && !product.availableForSale)
          return false;
        if (
          selectedAvailability.includes('outOfStock') &&
          product.availableForSale
        )
          return false;
      }

      // Product type filter
      if (selectedTypes.length > 0) {
        if (!product.productType || !selectedTypes.includes(product.productType))
          return false;
      }

      // Price range filter
      if (selectedPriceRanges.length > 0) {
        const price = parseFloat(product.priceRange.minVariantPrice.amount);
        const matchesAnyRange = selectedPriceRanges.some((index) => {
          const range = priceRanges[index];
          return price >= range.min && price < range.max;
        });
        if (!matchesAnyRange) return false;
      }

      return true;
    });

    // Reset to page 1 when filters change
    setCurrentPage(1);
    return filtered;
  }, [products, selectedAvailability, selectedTypes, selectedPriceRanges, priceRanges]);

  // Paginate filtered products
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, productsPerPage]);

  const handleAvailabilityChange = (value: string) => {
    setSelectedAvailability((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handlePriceRangeChange = (index: number) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 font-medium">
            {filteredProducts.length} products
          </span>
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6366f1]">
            <option>Sort by</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
            <option>Best Selling</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-8 space-y-6">
            {/* Availability Filter */}
            <div className="border-b pb-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                AVAILABILITY
              </h3>
              <div className="space-y-3">
                {inStockCount > 0 && (
                  <label className="flex items-center text-sm text-gray-700 cursor-pointer hover:text-[#6366f1]">
                    <input
                      type="checkbox"
                      checked={selectedAvailability.includes('inStock')}
                      onChange={() => handleAvailabilityChange('inStock')}
                      className="mr-3 rounded border-gray-300 text-[#6366f1] focus:ring-[#6366f1]"
                    />
                    <span className="font-medium">In stock ({inStockCount})</span>
                  </label>
                )}
                {outOfStockCount > 0 && (
                  <label className="flex items-center text-sm text-gray-700 cursor-pointer hover:text-[#6366f1]">
                    <input
                      type="checkbox"
                      checked={selectedAvailability.includes('outOfStock')}
                      onChange={() => handleAvailabilityChange('outOfStock')}
                      className="mr-3 rounded border-gray-300 text-[#6366f1] focus:ring-[#6366f1]"
                    />
                    <span className="font-medium">
                      Out of stock ({outOfStockCount})
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Product Type Filter */}
            {productTypes.length > 0 && (
              <div className="border-b pb-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                  PRODUCT TYPE
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {productTypes.map((type) => {
                    const count = products.filter((p) => p.productType === type)
                      .length;
                    return (
                      <label
                        key={type}
                        className="flex items-center text-sm text-gray-700 cursor-pointer hover:text-[#6366f1]"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={() => handleTypeChange(type)}
                          className="mr-3 rounded border-gray-300 text-[#6366f1] focus:ring-[#6366f1]"
                        />
                        <span className="font-medium">
                          {type} ({count})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price Filter */}
            {products.length > 0 && (
              <div className="border-b pb-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                  PRICE
                </h3>
                <div className="space-y-3">
                  {priceRanges.map((range, index) => {
                    const count = products.filter((p) => {
                      const price = parseFloat(
                        p.priceRange.minVariantPrice.amount
                      );
                      return price >= range.min && price < range.max;
                    }).length;
                    if (count === 0) return null;
                    return (
                      <label
                        key={index}
                        className="flex items-center text-sm text-gray-700 cursor-pointer hover:text-[#6366f1]"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.includes(index)}
                          onChange={() => handlePriceRangeChange(index)}
                          className="mr-3 rounded border-gray-300 text-[#6366f1] focus:ring-[#6366f1]"
                        />
                        <span className="font-medium">
                          {range.label} ({count})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
              <p className="font-semibold">No Products Found</p>
              <p className="mt-2">
                No products match your current filter selection.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-lg mb-3">
                    {product.images.edges[0] && (
                      <img
                        src={product.images.edges[0].node.url}
                        alt={
                          product.images.edges[0].node.altText || product.title
                        }
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    {!product.availableForSale && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        OUT OF STOCK
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 mb-1 group-hover:text-[#6366f1] transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-base font-bold text-gray-900">
                      {product.priceRange.minVariantPrice.currencyCode === 'GBP' ? '£' : product.priceRange.minVariantPrice.currencyCode === 'EUR' ? '€' : '$'}
                      {parseFloat(
                        product.priceRange.minVariantPrice.amount
                      ).toFixed(2)}
                    </p>
                    {product.priceRange.minVariantPrice.amount !==
                      product.priceRange.maxVariantPrice.amount && (
                      <p className="text-sm text-gray-500">
                        From {product.priceRange.minVariantPrice.currencyCode === 'GBP' ? '£' : product.priceRange.minVariantPrice.currencyCode === 'EUR' ? '€' : '$'}
                        {parseFloat(
                          product.priceRange.minVariantPrice.amount
                        ).toFixed(2)}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-[#6366f1] hover:text-[#6366f1]'
                  }`}
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage =
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1);

                    // Show ellipsis
                    const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                    const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                    if (showEllipsisBefore || showEllipsisAfter) {
                      return (
                        <span key={page} className="px-2 text-gray-500">
                          ...
                        </span>
                      );
                    }

                    if (!showPage) return null;

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                          currentPage === page
                            ? 'bg-[#6366f1] text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:border-[#6366f1] hover:text-[#6366f1]'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-[#6366f1] hover:text-[#6366f1]'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
          )}
        </div>
      </div>
    </>
  );
}
