import Link from "next/link";
import { useShopify } from "../../context/collection";

function Collections() {
  const { collections } = useShopify();

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4 mb-10 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Collections
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {collections.map((collection: any) => {
            return (
              <a
                href={`/collections/${collection.handle}`}
                className="group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
              >
                <img
                  src={collection.image.src}
                  loading="lazy"
                  alt="Photo by Fakurian Design"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                <div className="relative flex flex-col">
                  <span className="text-lg font-semibold text-white lg:text-xl">
                    {collection.title}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Collections;
