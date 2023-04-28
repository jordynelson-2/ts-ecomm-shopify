import { useShopify } from "../../context/collection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import client from "../../lib/client";

function Collection() {
  const { collections } = useShopify();
  const router = useRouter();
  const { handle } = router.query;
  const [products, setProducts] = useState<any>([]);
  const [productCategory, setProductCategory] = useState("All");
  const [displayedProducts, setDisplayedProducts] = useState(20);

  const brandsList = [
    "Nike",
    "Adidas",
    "NB",
    "Patagonia",
    "TNF",
    "Yeezy",
    "Hoka",
    "Salomon",
    "Balenciaga",
    "Moncler",
    "Kanye",
    "Palm Angels",
    "Arc'teryx",
    "Palace",
    "FOG",
    "Corteiz",
    "Trapstar",
    "Marc Jacobs",
    "Veja",
    "Stussy",
    "LV",
  ];
  let brandsArray: any = [];
  let filteredProducts: any = [{}];

  const getProductsFromCollection = () => {
    collections.map((collection: any) => {
      if (collection.handle === handle) {
        const res = client.collection
          .fetchWithProducts(collection.id, {
            productsFirst: 100,
          })
          .then((res: any) => {
            const serializedProducts = res.products.map((product: any) => {
              return {
                id: product.id,
                title: product.title,
                handle: product.handle,
                images: product.images.map((image: any) => {
                  return {
                    src: image.src,
                    alt: image.altText,
                  };
                }),
              };
            });
            setProducts(serializedProducts);
          });
      }
    });
  };

  function createArrayIfBrandExistsInsideOfProducts() {
    brandsList.map((brand) => {
      products.map((product: any) => {
        if (product.title.includes(brand)) {
          //only push if brandsArray doesn't already have the brand
          if (!brandsArray.includes(brand)) {
            brandsArray.push(brand);
          }
        }
      });
    });
  }
  createArrayIfBrandExistsInsideOfProducts();

  function createFilteredArrayForEachBrandThatExistsInsideBrandsArray() {
    brandsArray.map((brand: any) => {
      filteredProducts[brand] = products.filter((product: any) =>
        product.title.includes(brand)
      );
    });
  }
  createFilteredArrayForEachBrandThatExistsInsideBrandsArray();

  function chooseWhichProductsToShow() {
    if (productCategory === "All") {
      return products.slice(0, displayedProducts);
    } else {
      return filteredProducts[productCategory].slice(0, displayedProducts);
    }
  }

  const productsToShow = chooseWhichProductsToShow();

  //function to capetalize the handle
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const setHeadTitle = () => {
    if (handle) {
      return `${capitalize(handle?.toString())} | Tuck's Shop`;
    } else {
      return "Tuck's Shop";
    }
  };

  useEffect(() => {
    setHeadTitle();
  }, [handle]);

  useEffect(() => {
    getProductsFromCollection();
  }, [handle, collections]);

  return (
    <>
      <Head>
        <title>{setHeadTitle()}</title>
      </Head>
      <div className="mx-auto max-w-screen-2xl px-4 mb-10 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            {capitalize(handle?.toString() || "")}
          </h2>
        </div>
        <nav className="flex pl-6 mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <Link
                  href="/collections"
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Collections
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  {capitalize(handle?.toString() || "")}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <div className="flex flex-wrap ml-6 mb-6 gap-4">
          <button
            onClick={() => setProductCategory("All")}
            disabled={productCategory === "All"}
            type="button"
            className={`inline-block rounded border-2 border-neutral-800 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-800  ${
              productCategory === "All"
                ? "bg-neutral-800 text-white"
                : "text-neutral-800"
            }`}
          >
            All
          </button>
          {brandsArray.map((brand: any) => (
            <button
              onClick={() => setProductCategory(brand)}
              disabled={productCategory === brand}
              type="button"
              className={`inline-block rounded border-2 border-neutral-800 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-800  ${
                productCategory === brand
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-800"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
        <div className="grid mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8 px-6">
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
                  className=" w-full h-full object-cover object-center group-hover:scale-110 transition duration-200 "
                />
              </a>

              <div>
                <a
                  href="#"
                  className="text-gray-500 hover:gray-800 lg:text-lg transition duration-100 mb-1"
                >
                  {
                    product.title
                    // .replace(/i/g, "1")
                    // .replace(/e/g, "3")
                    // .replace(/o/g, "0")
                  }
                </a>
              </div>
              <div className="flex items-end gap-2">
                {/* <span className="text-gray-800 lg:text-lg font-bold">
                  {`£${parseInt(product.variants[0].price.amount)}`}
                </span> */}
              </div>
            </div>
          ))}
        </div>
        {displayedProducts <
          (productCategory === "All"
            ? products
            : filteredProducts[productCategory]
          ).length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setDisplayedProducts(displayedProducts + 12)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Collection;
