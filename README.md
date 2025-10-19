# Shopify Headless CMS Store

A Next.js 15 application using Shopify as a headless CMS for an online store, built with TypeScript and Tailwind CSS.

## Features

- Next.js 15 with App Router
- TypeScript for type safety
- Shopify Storefront API integration
- Tailwind CSS for styling
- Server-side rendering for product data
- GraphQL queries for Shopify data

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Shopify Credentials

Create a `.env.local` file in the root directory with your Shopify credentials:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```

To get these credentials:

1. Go to your Shopify Admin
2. Navigate to Settings > Apps and sales channels > Develop apps
3. Create a new app or use an existing one
4. Configure Storefront API scopes (at minimum: `unauthenticated_read_product_listings`)
5. Install the app and copy the Storefront Access Token

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your store.

## Project Structure

```
ts-shopify-26/
├── app/
│   ├── page.tsx          # Home page with product grid
│   └── layout.tsx        # Root layout
├── lib/
│   ├── shopify.ts        # Shopify API client
│   ├── queries.ts        # GraphQL queries
│   └── types.ts          # TypeScript types
├── .env.local            # Environment variables (not in git)
├── .env.example          # Example environment variables
└── README.md
```

## Available GraphQL Queries

The project includes pre-built GraphQL queries for:

- `GET_ALL_PRODUCTS` - Fetch all products
- `GET_PRODUCT_BY_HANDLE` - Fetch a single product by handle
- `GET_COLLECTION_BY_HANDLE` - Fetch a collection with products
- `GET_ALL_COLLECTIONS` - Fetch all collections
- `CREATE_CART` - Create a new cart
- `ADD_TO_CART` - Add items to cart
- `UPDATE_CART` - Update cart items
- `REMOVE_FROM_CART` - Remove items from cart

## Next Steps

1. Configure your Shopify credentials in `.env.local`
2. Add product detail pages
3. Implement shopping cart functionality
4. Add collection/category pages
5. Implement search functionality
6. Add checkout flow
7. Optimize images with Next.js Image component

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
