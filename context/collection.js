import { createContext, useContext, useState, useEffect } from "react";
import client from "../lib/client";

const ShopifyContext = createContext();

export const ShopifyProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const res = await client.collection.fetchAll();
      const collections = JSON.stringify(res);
      const collectionsParsed = JSON.parse(collections);
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

export const useShopify = () => useContext(ShopifyContext);
