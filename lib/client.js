import Client from "shopify-buy";

const client = Client.buildClient({
  domain: "tucks-shop-1.myshopify.com",
  storefrontAccessToken: "2f591814c8b25b2336a51d6998ef82e7",
});

export default client;
