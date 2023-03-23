import Link from "next/link";
import { useShopify } from "../../context/collection";

function Collections() {
  const { collections } = useShopify();
  console.log("COLLECTIONS", collections);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8 px-6">
        {collections.map((collection: any) => {
          return (
            <div>
              <a
                href={`/collections/${collection.handle}`}
                className="group h-80 block bg-gray-100 rounded-lg overflow-hidden relative mb-2 lg:mb-3"
              >
                <img
                  src={collection.image.src}
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
                  {collection.title
                    .replace(/i/g, "1")
                    .replace(/e/g, "3")
                    .replace(/o/g, "0")}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Collections;
