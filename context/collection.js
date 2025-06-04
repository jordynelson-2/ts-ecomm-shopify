import { createContext, useContext, useState, useEffect } from "react";
import client from "../lib/shopifyClient";
import { gql } from "graphql-request";

//1.Create the context
const ShopifyContext = createContext();

//2.Create the provider component that will wrap the app and provide the state
export const ShopifyProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);

  //4.Fetch all collections on mount
  useEffect(() => {
    fetchCollections();
  }, []);

  //3.Fetch all collections
  const COLLECTIONS_QUERY = gql`
    {
      collections(first: 250) {
        edges {
          node {
            id
            handle
            title
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const fetchCollections = async () => {
    try {
      const res = await client.request(COLLECTIONS_QUERY);
      const collectionsParsed = res.collections.edges.map(({ node }) => ({
        id: node.id,
        handle: node.handle,
        title: node.title,
        image: { src: node.image?.url, alt: node.image?.altText },
      }));
      setCollections(collectionsParsed);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ShopifyContext.Provider value={{ collections }}>
      {children}
    </ShopifyContext.Provider>
  );
};

//5.Create a custom hook to consume the ShopifyContext
export const useShopify = () => useContext(ShopifyContext);
