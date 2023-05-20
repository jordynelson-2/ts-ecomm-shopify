import { createContext, useContext, useState, useEffect } from "react";
import client from "../lib/client";

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

//5.Create a custom hook to consume the ShopifyContext
export const useShopify = () => useContext(ShopifyContext);
