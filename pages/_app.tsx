import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { CartProvider } from "../context/cart";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </Layout>
  );
}

export default MyApp;
