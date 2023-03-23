import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { CartProvider } from "../context/cart";
import { ShopifyProvider } from "../context/collection";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ShopifyProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </ShopifyProvider>
    </Layout>
  );
}

export default MyApp;
