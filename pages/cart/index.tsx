import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useCartState, useCartDispatch } from "../../context/cart";
import client from "../../lib/client";
import cookie from "js-cookie";

function Cart() {
  const { setCart } = useCartDispatch();
  const { state } = useCartState();
  const { totalPrice, lineItems } = state;
  const { amount } = totalPrice;

  const incrementQuantity = (event: any) => {
    const itemId = event.target.dataset.itemId;
    const checkoutId = cookie.get("checkoutId");
    let lineItemsToUpdate: any = [];
    lineItemsToUpdate = lineItems.map((item: any) => {
      if (item.attrs.id.value === itemId) {
        return {
          id: itemId,
          quantity: item.attrs.quantity.value + 1,
        };
      } else {
        return {
          id: item.attrs.id.value,
          quantity: item.attrs.quantity.value,
        };
      }
    });

    client.checkout
      .updateLineItems(checkoutId, lineItemsToUpdate)
      .then((res: any) => {
        setCart(res);
      });
  };

  const decrementQuantity = (event: any) => {
    const itemId = event.target.dataset.itemId;
    const checkoutId = cookie.get("checkoutId");
    let lineItemsToUpdate: any = [];
    lineItemsToUpdate = lineItems.map((item: any) => {
      if (item.attrs.id.value === itemId) {
        return {
          id: itemId,
          quantity: item.attrs.quantity.value - 1,
        };
      } else {
        return {
          id: item.attrs.id.value,
          quantity: item.attrs.quantity.value,
        };
      }
    });

    client.checkout
      .updateLineItems(checkoutId, lineItemsToUpdate)
      .then((res: any) => {
        setCart(res);
      });
  };

  const delteItem = (event: any) => {
    const itemId = event.target.dataset.itemId;
    const checkoutId = cookie.get("checkoutId");
    const lineItemIdsToRemove = [itemId];

    client.checkout
      .removeLineItems(checkoutId, lineItemIdsToRemove)
      .then((res: any) => {
        setCart(res);
      });
  };

  const isEmpty = lineItems.length === 0;

  if (isEmpty) {
    return (
      <>
        <Head>
          <title>Cart | Tuck's Shop </title>
        </Head>
        <div className="max-w-screen-lg px-4 mx-auto">
          <div className="mb-6 sm:mb-10 lg:mb-16">
            <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
              Your Cart is Empty
            </h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <div>
        <div className="max-w-screen-lg px-4  mx-auto">
          <div className="mb-6 sm:mb-10 lg:mb-16">
            <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
              Your Cart
            </h2>
          </div>
          <div className="flex flex-col sm:border-t sm:border-b sm:divide-y mb-5 sm:mb-8">
            {state.lineItems &&
              state.lineItems.map((item: any) => {
                return (
                  <div className="py-5 sm:py-8">
                    <div className="flex flex-wrap gap-4 lg:gap-6 sm:py-2.5">
                      <div className="sm:-my-2.5">
                        <Image
                          src={item.variant.image.src}
                          width={400}
                          height={300}
                          alt={item.title}
                          className="  object-cover object-center group-hover:scale-110 transition duration-200 rounded-md"
                        />
                      </div>

                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <a
                            href="#"
                            className="inline-block text-gray-800 hover:text-gray-500 text-lg lg:text-xl font-bold transition duration-100 mb-1"
                          >
                            {item.title}
                          </a>

                          <span className="block text-gray-500">
                            {`Size: UK ${item.customAttributes[0].value}`}
                          </span>
                          <span className="block text-gray-500">
                            {`Colour: ${item.variant.title}`}
                          </span>
                        </div>

                        <div>
                          <span className="block text-gray-800 md:text-lg font-bold mb-1"></span>

                          <span className="flex items-center text-gray-500 text-sm gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            In stock
                          </span>
                        </div>
                      </div>

                      <div className="w-full sm:w-auto flex justify-between border-t sm:border-none pt-4 sm:pt-0">
                        <div className="flex flex-col items-start gap-2">
                          <div className="w-20 h-12 flex border rounded overflow-hidden">
                            <input
                              type="number"
                              value={item.quantity}
                              className="w-full focus:ring ring-inset ring-indigo-300 outline-none transition duration-100 px-4 py-2"
                            />

                            <div className="flex flex-col border-l divide-y">
                              <button
                                data-item-id={item.attrs.id.value}
                                onClick={incrementQuantity}
                                className="w-6 flex justify-center items-center flex-1 bg-white hover:bg-gray-100 active:bg-gray-200 leading-none select-none transition duration-100"
                              >
                                +
                              </button>
                              <button
                                data-item-id={item.attrs.id.value}
                                onClick={decrementQuantity}
                                className="w-6 flex justify-center items-center flex-1 bg-white hover:bg-gray-100 active:bg-gray-200 leading-none select-none transition duration-100"
                              >
                                -
                              </button>
                            </div>
                          </div>

                          <button
                            data-item-id={item.attrs.id.value}
                            onClick={delteItem}
                            className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 text-sm font-semibold select-none transition duration-100"
                          >
                            Delete
                          </button>
                        </div>

                        <div className="pt-3 sm:pt-2 ml-4 md:ml-8 lg:ml-16">
                          <span className="block text-gray-800 md:text-lg font-bold">
                            {`£${parseInt(item.variant.price.amount)} `}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="w-full sm:max-w-xs bg-gray-100 rounded-lg p-4">
              <div className="space-y-1">
                <div className="flex justify-between text-gray-500 gap-4">
                  <span>Subtotal</span>
                  <span>{`£${parseInt(amount)}`}</span>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-start text-gray-800 gap-4">
                  <span className="text-lg font-bold">Total</span>

                  <span className="flex flex-col items-end">
                    <span className="text-lg font-bold">{`${parseInt(
                      amount
                    )} GBP`}</span>
                    <span className="text-gray-500 text-sm">including VAT</span>
                  </span>
                </div>
              </div>
            </div>

            <Link
              href={state.webUrl}
              className=" mb-4 inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            >
              Check out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
