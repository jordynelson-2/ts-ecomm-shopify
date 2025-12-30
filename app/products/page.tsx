import { shopifyFetch } from '@/lib/shopify';
import { GET_ALL_PRODUCTS } from '@/lib/queries';
import { ShopifyProduct } from '@/lib/types';
import Link from 'next/link';
import ProductsFilter from '@/components/ProductsFilter';

interface ProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

export default async function ProductsPage() {
  let products: ShopifyProduct[] = [];
  let error: string | null = null;

  try {
    const data = await shopifyFetch<ProductsResponse>({
      query: GET_ALL_PRODUCTS,
      variables: { first: 500 },
    });
    products = data.products.edges.map((edge) => edge.node);
  } catch (err) {
    error = 'Failed to load products. Please check your Shopify configuration.';
    console.error(err);
  }

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
            <Link href="/collections" className="text-gray-600 hover:text-[#6366f1] font-medium">
              Collections
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">All Products</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <ProductsFilter products={products} />
        )}
      </div>
    </div>
  );
}
