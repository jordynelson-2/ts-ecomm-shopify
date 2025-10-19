import { shopifyFetch } from '@/lib/shopify';
import { GET_ALL_COLLECTIONS } from '@/lib/queries';
import Link from 'next/link';

interface CollectionsResponse {
  collections: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        handle: string;
        description: string;
        image?: {
          url: string;
          altText: string | null;
        };
      };
    }>;
  };
}

export default async function CollectionsPage() {
  let collections: CollectionsResponse['collections']['edges'] = [];
  let error: string | null = null;

  try {
    const data = await shopifyFetch<CollectionsResponse>({
      query: GET_ALL_COLLECTIONS,
      variables: { first: 50 },
    });
    collections = data.collections.edges;
  } catch (err) {
    error = 'Failed to load collections. Please check your Shopify configuration.';
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
            <span className="text-gray-900 font-semibold">Collections</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop by Collection</h1>
          <p className="text-gray-600">Browse our curated collections of premium products</p>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        ) : collections.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
            <p className="font-semibold">No Collections Found</p>
            <p className="mt-2">There are no collections available at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map(({ node: collection }) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 rounded-lg mb-4">
                  {collection.image ? (
                    <img
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <svg
                        className="w-20 h-20 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#6366f1] transition-colors">
                    {collection.title}
                  </h2>
                  {collection.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {collection.description}
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
