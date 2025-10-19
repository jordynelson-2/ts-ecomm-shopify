import { shopifyFetch } from '@/lib/shopify';
import { GET_COLLECTION_BY_HANDLE } from '@/lib/queries';
import { ShopifyProduct } from '@/lib/types';
import Link from 'next/link';

interface CollectionResponse {
  collection: {
    id: string;
    title: string;
    handle: string;
    description: string;
    image?: {
      url: string;
      altText: string | null;
    };
    products: {
      edges: Array<{
        node: ShopifyProduct;
      }>;
    };
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  let collection: CollectionResponse['collection'] | null = null;
  let error: string | null = null;

  try {
    const data = await shopifyFetch<CollectionResponse>({
      query: GET_COLLECTION_BY_HANDLE,
      variables: { handle, first: 100 },
    });
    collection = data.collection;
  } catch (err) {
    error = 'Failed to load collection.';
    console.error(err);
  }

  if (error || !collection) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Collection Not Found</h1>
          <Link href="/collections" className="text-[#6366f1] hover:underline">
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  const products = collection.products.edges.map((edge) => edge.node);

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
            <span className="text-gray-900 font-semibold">{collection.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Collection Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{collection.title}</h1>
          {collection.description && (
            <p className="text-gray-600 max-w-3xl">{collection.description}</p>
          )}
        </div>

        {/* Product Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600 font-medium">
            {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
            <p className="font-semibold">No Products Found</p>
            <p className="mt-2">This collection doesn't have any products yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-lg mb-3">
                  {product.images.edges[0] && (
                    <img
                      src={product.images.edges[0].node.url}
                      alt={product.images.edges[0].node.altText || product.title}
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
                    {product.priceRange.minVariantPrice.currencyCode === 'GBP'
                      ? '£'
                      : product.priceRange.minVariantPrice.currencyCode === 'EUR'
                      ? '€'
                      : '$'}
                    {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                  </p>
                  {product.priceRange.minVariantPrice.amount !==
                    product.priceRange.maxVariantPrice.amount && (
                    <p className="text-sm text-gray-500">
                      From{' '}
                      {product.priceRange.minVariantPrice.currencyCode === 'GBP'
                        ? '£'
                        : product.priceRange.minVariantPrice.currencyCode === 'EUR'
                        ? '€'
                        : '$'}
                      {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
