import { useShopify } from "../../context/collection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import client from "../../lib/client";

function Collection() {
  const { collections } = useShopify();
  const router = useRouter();
  const { handle } = router.query;
  const [products, setProducts] = useState<any>([]);

  const getProductsFromCollection = () => {
    collections.map((collection: any) => {
      if (collection.handle === handle) {
        const res = client.collection
          .fetchWithProducts(collection.id, {
            productsFirst: 10,
          })
          .then((res: any) => {
            console.log("RES", res);
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

  useEffect(() => {
    getProductsFromCollection();
  }, [handle, collections]);

  return (
    console.log("products", products),
    (
      <>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8 px-6">
          {products.map((product: any) => (
            <div>
              <a
                href={`/products/${product.handle}`}
                className="group h-80 block bg-gray-100 rounded-lg overflow-hidden relative mb-2 lg:mb-3"
              >
                <img
                  src={product.images[0].src}
                  loading="lazy"
                  alt="Photo by Irene Kredenets"
                  className=" w-full h-full object-cover object-center group-hover:scale-110 transition duration-200 blur-lg hover:blur-none"
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
                {/* <span className="text-gray-800 lg:text-lg font-bold">
                  {`£${parseInt(product.variants[0].price.amount)}`}
                </span> */}
              </div>
            </div>
          ))}
        </div>
      </>
    )
  );
}

export default Collection;
