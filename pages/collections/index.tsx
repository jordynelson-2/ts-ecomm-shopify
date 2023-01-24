import React from "react";
import client from "../../lib/client";

export async function getStaticProps() {
  const res = await client.collection.fetchAllWithProducts();
  const collections = JSON.stringify(res);

  return {
    props: {
      collections,
    },
  };
}

function Collections({ collections }: any) {
  const collectionsArray = JSON.parse(collections);
  return (
    <div>
      <div className=" text-2xl font-bold m-8 flex items-center justify-center ">
        <h1>Collections</h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8 ml-8">
        {collectionsArray.map((collection: any) => (
          <div key={collection.handle}>
            <a
              href={`/collections/${collection.handle}`}
              className="group h-80 block bg-gray-100 rounded-lg overflow-hidden relative mb-2 lg:mb-3"
            >
              <img
                src={collection.image.src}
                loading="lazy"
                alt="Shoe Album Cover Photo"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-200"
              />
            </a>

            <div>
              <a
                href="#"
                className="text-gray-500 hover:gray-800 lg:text-lg transition duration-100 mb-1"
              >
                {collection.title}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collections;
