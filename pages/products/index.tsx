import React, { useState } from "react";
import client from "../../lib/client";

function Products({ products, shoes, hoodies, gilets, tShirts, jackets }: any) {
  const [productCategory, setProductCategory] = useState("All Products");
  const [brand, setBrand] = useState("All Brands");

  products = JSON.parse(products);
  // console.log(products);
  // console.log(shoes);

  let productsToShow;
  switch (productCategory) {
    case "All Products":
      productsToShow = products;
      break;
    case "Shoes":
      productsToShow = shoes;
      break;
    case "Hoodies":
      productsToShow = hoodies;
      break;
    case "Gilets":
      productsToShow = gilets;
      break;
    case "Jackets":
      productsToShow = jackets;
      break;
    case "T-Shirts":
      productsToShow = tShirts;
    default:
      productsToShow = products;
  }

  return (
    <div>
      <div className=" text-2xl font-bold m-8 flex items-center justify-center ">
        <div className="flex-col">
          <h1 className="text-center mb-4">{productCategory}</h1>
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={() => setProductCategory("All Products")}
            disabled={productCategory === "All Products"}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              All Products
            </span>
          </button>
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={() => setProductCategory("Shoes")}
            disabled={productCategory === "Shoes"}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Shoes
            </span>
          </button>
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={() => setProductCategory("Hoodies")}
            disabled={productCategory === "Hoodies"}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Hoodies
            </span>
          </button>
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={() => setProductCategory("Gilets")}
            disabled={productCategory === "Gilets"}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Gilets
            </span>
          </button>
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={() => setProductCategory("Jackets")}
            disabled={productCategory === "Jackets"}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Jackets
            </span>
          </button>
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={() => setProductCategory("T-Shirts")}
            disabled={productCategory === "T-Shirts"}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              T-Shirts
            </span>
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8 px-6">
        {productsToShow.map((product: any) => (
          <div>
            <a
              href={`/products/${product.handle}`}
              className="group h-80 block bg-gray-100 rounded-lg overflow-hidden relative mb-2 lg:mb-3"
            >
              <img
                src={product.images[0].src}
                loading="lazy"
                alt="Photo by Irene Kredenets"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-200"
              />
            </a>

            <div>
              <a
                href="#"
                className="text-gray-500 hover:gray-800 lg:text-lg transition duration-100 mb-1"
              >
                {product.title
                  .replace(/i/g, "1")
                  .replace(/e/g, "3")
                  .replace(/o/g, "0")}
              </a>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-gray-800 lg:text-lg font-bold">
                {`£${parseInt(product.variants[0].price.amount)}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await client.product.fetchAll(30);
  const products = JSON.stringify(res);
  const productsArray = JSON.parse(products);

  // Sort the products alphabetically by title
  productsArray.sort((a: any, b: any) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });

  const shoes = productsArray.filter((product: any) =>
    product.productType.toLowerCase().includes("shoes")
  );

  const hoodies = productsArray.filter((product: any) =>
    product.productType.toLowerCase().includes("hoodie")
  );

  const gilets = productsArray.filter((product: any) =>
    product.productType.toLowerCase().includes("gilet")
  );

  const tShirts = productsArray.filter((product: any) =>
    product.productType.toLowerCase().includes("t-shirt")
  );

  const jackets = productsArray.filter((product: any) =>
    product.productType.toLowerCase().includes("jacket")
  );

  return {
    props: {
      products,
      shoes,
      hoodies,
      gilets,
      tShirts,
      jackets,
    },
  };
}

export default Products;
