import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2024-10',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
});

export async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
}): Promise<T> {
  try {
    const result = await client.request(query, {
      variables,
    });

    if (result.errors) {
      throw new Error(result.errors.map((e: { message: string }) => e.message).join(', '));
    }

    return result.data as T;
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
}

export { client as shopifyClient };
