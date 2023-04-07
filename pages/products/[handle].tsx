import React, { useState, useRef } from "react";

import Link from "next/link";
import client from "../../lib/client";
import { useCartDispatch, useCartState } from "../../context/cart";
import cookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

export const getStaticPaths = async () => {
  const res = await client.product.fetchAll(100);
  const paths = res.map((product: any) => {
    return {
      params: { handle: product.handle.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const handle = context.params.handle;
  const res = await client.product.fetchByHandle(handle);
  const product = JSON.stringify(res);
  return {
    props: {
      product,
    },
  };
};

const shoeSizes = ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
const clothingSizes = ["S", "M", "L", "XL", "XXL"];

function Product({ product }: any) {
  product = JSON.parse(product);
  const variants = product.variants;
  const variantImages = variants.map((variant: any) => {
    return {
      original: variant.image.src,
      thumbnail: variant.image.src,
    };
  });

  const { state } = useCartState();
  const { setCart } = useCartDispatch();
  const [selectedVariant, setSelectedVariant] = useState(variants[0].id);
  const [selectedSize, setSelectedSize] = useState("");
  const galleryRef: any = useRef(null);

  const handleVariantChange = (title: string) => {
    setSelectedVariant(title);

    variants.map((variant: any, index: any) => {
      if (variant.id === title) {
        galleryRef.current.slideToIndex(index);
      }
    });
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const addToCart = async () => {
    if (selectedVariant === "" || selectedSize === "") {
      toast.error("Please select a size and colour!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const checkoutId = state.id;
    const lineItemsToAdd = [
      {
        variantId: selectedVariant,
        quantity: 1,
        customAttributes: [{ key: "Size", value: selectedSize }],
      },
    ];

    const res = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);
    if (cookie.get("checkoutId") === undefined) {
      cookie.set("checkoutId", res.id);
    }
    setCart(res);
    toast.success("Successfully added to Cart!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-lg px-4 md:px-8 mx-auto">
          <nav className="flex  mb-4" aria-label="Breadcrumb">
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
                    href={`/collections/${
                      product.productType === "hoodie"
                        ? "hoodies"
                        : product.productType
                    }`}
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    {product.productType === "hoodie"
                      ? "Hoodies"
                      : capitalize(product.productType)}
                  </Link>
                </div>
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

                  <p className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                    {product.title}
                  </p>
                </div>
              </li>
            </ol>
          </nav>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-64  xl:h-80 2xl:h-96">
              <ImageGallery
                items={variantImages}
                showNav={true}
                showFullscreenButton={false}
                showPlayButton={false}
                showBullets={false}
                ref={galleryRef}
                showThumbnails={false}
                //custom left arrow
                renderLeftNav={(onClick, disabled) => (
                  <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
                    onClick={onClick}
                    disabled={disabled}
                  >
                    <svg
                      className="w-8 h-8 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                )}
                renderRightNav={(onClick, disabled) => (
                  <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
                    onClick={onClick}
                    disabled={disabled}
                  >
                    <svg
                      className="w-8 h-8 text-gray-500"
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
                  </button>
                )}
              />
            </div>

            <div className="md:py-8">
              <div className="mb-2 md:mb-3">
                <span className="inline-block text-gray-500 mb-0.5">
                  {product.title
                    .replace(/i/g, "1")
                    .replace(/e/g, "3")
                    .replace(/o/g, "0")}
                </span>
                <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold">
                  {product.title
                    .replace(/i/g, "1")
                    .replace(/e/g, "3")
                    .replace(/o/g, "0")}
                </h2>
              </div>

              <div className="mb-4 md:mb-6">
                <span className="inline-block text-gray-500 text-sm md:text-base font-semibold mb-3 mr-4">
                  Color
                </span>

                {/*This creates the buttons for user to select the variant (ie: colour) */}
                <select
                  onChange={(e) => {
                    handleVariantChange(e.target.value);
                  }}
                  value={selectedVariant}
                  className="border-[#4f46e5] border-2 rounded-md p-2"
                >
                  {variants.map((variant: any) => (
                    <option value={variant.id}>{variant.title}</option>
                  ))}
                </select>
              </div>

              <div className="mb-8 md:mb-10">
                <span className="inline-block text-gray-500 text-sm md:text-base font-semibold mb-3">
                  Size
                </span>

                <div className="flex flex-wrap gap-3">
                  {product.productType === "shoes" ? (
                    shoeSizes.map((size) => (
                      <button
                        onClick={() => handleSizeChange(size)}
                        type="button"
                        className={`w-12 h-8 flex justify-center items-center bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 text-sm font-semibold text-center border rounded-md transition duration-100 ${
                          size === selectedSize ? "selected" : ""
                        }`}
                      >
                        {`UK ${size}`}
                      </button>
                    ))
                  ) : product.productType === "hoodie" ||
                    product.productType === "t-shirt" ||
                    product.productType === "jacket" ? (
                    clothingSizes.map((size) => (
                      <button
                        onClick={() => handleSizeChange(size)}
                        type="button"
                        className={`w-12 h-8 flex justify-center items-center bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 text-sm font-semibold text-center border rounded-md transition duration-100 ${
                          size === selectedSize ? "selected" : ""
                        }`}
                      >
                        {size}
                      </button>
                    ))
                  ) : product.productType === "handbag" ? (
                    <button
                      onClick={() => handleSizeChange("One Size")}
                      type="button"
                      className={`w-14 h-12 flex justify-center items-center bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 text-sm font-semibold text-center border rounded-md transition duration-100 ${
                        "One Size" === selectedSize ? "selected" : ""
                      }`}
                    >
                      {"One Size"}
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-end gap-2">
                  <span className="text-gray-800 text-xl md:text-2xl font-bold">
                    {`£${parseInt(
                      variants.find(
                        (variant: any) => variant.id === selectedVariant
                      )?.priceV2.amount ?? variants[0].priceV2.amount
                    )}`}
                  </span>
                </div>

                <span className="text-gray-500 text-sm">
                  incl. VAT plus shipping
                </span>
              </div>

              <div className="flex items-center text-gray-500 gap-2 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>

                <span className="text-sm">14-20 working days</span>
              </div>
              <div className="flex gap-2.5">
                <button
                  onClick={addToCart}
                  className="inline-block flex-1 sm:flex-none bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                >
                  Add to cart
                </button>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
