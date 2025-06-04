import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(
  `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/api/2023-07/graphql.json`,
  {
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
      'Content-Type': 'application/json',
    },
  }
);

export default client;
