import { shopifyFetch } from '@/lib/shopify';
import { GET_PRODUCT_BY_HANDLE } from '@/lib/queries';
import { ShopifyProduct } from '@/lib/types';
import Link from 'next/link';
import ProductDetailClient from '@/components/ProductDetailClient';

interface ProductResponse {
  product: ShopifyProduct;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  let product: ShopifyProduct | null = null;
  let error: string | null = null;

  try {
    const data = await shopifyFetch<ProductResponse>({
      query: GET_PRODUCT_BY_HANDLE,
      variables: { handle },
    });
    product = data.product;
  } catch (err) {
    error = 'Failed to load product.';
    console.error(err);
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products" className="text-[#6366f1] hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Get currency symbol
  const currencyCode = product.priceRange.minVariantPrice.currencyCode;
  const currencySymbol = currencyCode === 'GBP' ? '£' : currencyCode === 'EUR' ? '€' : '$';

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-gray-600 hover:text-[#6366f1] font-medium">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/products" className="text-gray-600 hover:text-[#6366f1] font-medium">
              Products
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetailClient product={product} currencySymbol={currencySymbol} />
      </div>
    </div>
  );
}
