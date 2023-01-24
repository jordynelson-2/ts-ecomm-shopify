import React from "react";
import client from "../../lib/client";

export const getStaticPaths = async () => {
  const collections = await client.collection.fetchAllWithProducts();
  const serialize = JSON.stringify(collections);
  const parsed = JSON.parse(serialize);

  const paths = parsed.map((product: any) => {
    return {
      params: { handle: product.handle.toString() },
    };
  });
  console.log("PATHS:", paths);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  console.log("CONTEXT:", context);
  const handle = context.params.handle;
  console.log("Handle:", handle);

  const collection = await client.collection.fetchWithProducts(
    "gid://shopify/Collection/279518675083",
    {
      productsFirst: 10,
    }
  );
  const serialize = JSON.stringify(collection);

  return {
    props: {
      collection: serialize,
    },
  };
};

function Collection({ collection }: any) {
  const parsed = JSON.parse(collection);
  console.log(parsed);
  return (
    <div>
      <div className=" text-2xl font-bold m-8 flex items-center justify-center ">
        <h1>Collection</h1>
        <p>{parsed.handle}</p>
      </div>
    </div>
  );
}

export default Collection;
