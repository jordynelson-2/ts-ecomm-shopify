import React from "react";
import Link from "next/link";

function Home() {
  return (
    <>
      <h1 className="text-center text-2xl mb-4 md:text-3xl lg:text-5xl font-bold text-inter px-8">
        the brands you{" "}
        <span>
          <img
            className="w-[30px] h-[30px] inline-block"
            src="/heart-svgrepo-com 1.png"
          ></img>{" "}
        </span>
        all in one place.
      </h1>
      <div className="flex justify-center max-w-xl mx-auto px-6 md:max-w-5xl">
        <div className="flex flex-col ">
          <p className="text-center"> #1🔌for all your favourite brands.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 ">
            <Link
              href="/products"
              className="button  bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            >
              Shop Now
            </Link>
            <button className="button  bg-white hover:bg-gray-100 active:bg-gray-200 focus-visible:ring ring-indigo-300 border text-gray-500 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
              How It Works
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 mb-6">
            <div className="flex gap-2">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 md:w-7 md:h-7"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.035 15.479A3.976 3.976 0 0 0 4 16c0 2.378 2.138 4.284 4.521 3.964C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.036C17.857 20.284 20 18.378 20 16c0-.173-.012-.347-.035-.521C21.198 14.786 22 13.465 22 12s-.802-2.786-2.035-3.479C19.988 8.347 20 8.173 20 8c0-2.378-2.143-4.288-4.521-3.964C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.036C6.138 3.712 4 5.622 4 8c0 .173.012.347.035.521C2.802 9.214 2 10.535 2 12s.802 2.786 2.035 3.479zm1.442-5.403 1.102-.293-.434-1.053A1.932 1.932 0 0 1 6 8c0-1.103.897-2 2-2 .247 0 .499.05.73.145l1.054.434.293-1.102a1.99 1.99 0 0 1 3.846 0l.293 1.102 1.054-.434C15.501 6.05 15.753 6 16 6c1.103 0 2 .897 2 2 0 .247-.05.5-.145.73l-.434 1.053 1.102.293a1.993 1.993 0 0 1 0 3.848l-1.102.293.434 1.053c.095.23.145.483.145.73 0 1.103-.897 2-2 2-.247 0-.499-.05-.73-.145l-1.054-.434-.293 1.102a1.99 1.99 0 0 1-3.846 0l-.293-1.102-1.054.434A1.935 1.935 0 0 1 8 18c-1.103 0-2-.897-2-2 0-.247.05-.5.145-.73l.434-1.053-1.102-.293a1.993 1.993 0 0 1 0-3.848z"></path>
                  <path d="m15.742 10.71-1.408-1.42-3.331 3.299-1.296-1.296-1.414 1.414 2.704 2.704z"></path>
                </svg>
              </div>
              <div className="flex flex-col ml-2">
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Quality{" "}
                </h3>
                <div className="text">
                  All items are sourced from reliable sellers which we have
                  established concrete relationships with.
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  className="w-6 h-6 md:w-7 md:h-7"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M258 21.89c-.5 0-1.2 0-1.8.12-4.6.85-10.1 5.1-13.7 14.81-3.8 9.7-4.6 23.53-1.3 38.34 3.4 14.63 10.4 27.24 18.2 34.94 7.6 7.7 14.5 9.8 19.1 9 4.8-.7 10.1-5.1 13.7-14.7 3.8-9.64 4.8-23.66 1.4-38.35-3.5-14.8-10.4-27.29-18.2-34.94-6.6-6.8-12.7-9.22-17.4-9.22zM373.4 151.4c-11 .3-24.9 3.2-38.4 8.9-15.6 6.8-27.6 15.9-34.2 24.5-6.6 8.3-7.2 14.6-5.1 18.3 2.2 3.7 8.3 7.2 20 7.7 11.7.7 27.5-2.2 43-8.8 15.5-6.7 27.7-15.9 34.3-24.3 6.6-8.3 7.1-14.8 5-18.5-2.1-3.8-8.3-7.1-20-7.5-1.6-.3-3-.3-4.6-.3zm-136.3 92.9c-6.6.1-12.6.9-18 2.3-11.8 3-18.6 8.4-20.8 14.9-2.5 6.5 0 14.3 7.8 22.7 8.2 8.2 21.7 16.1 38.5 20.5 16.7 4.4 32.8 4.3 44.8 1.1 12.1-3.1 18.9-8.6 21.1-15 2.3-6.5 0-14.2-8.1-22.7-7.9-8.2-21.4-16.1-38.2-20.4-9.5-2.5-18.8-3.5-27.1-3.4zm160.7 58.1L336 331.7c4.2.2 14.7.5 14.7.5l6.6 8.7 54.7-28.5-14.2-10zm-54.5.1l-57.4 27.2c5.5.3 18.5.5 23.7.8l49.8-23.6-16.1-4.4zm92.6 10.8l-70.5 37.4 14.5 18.7 74.5-44.6-18.5-11.5zm-278.8 9.1a40.33 40.33 0 0 0-9 1c-71.5 16.5-113.7 17.9-126.2 17.9H18v107.5s11.6-1.7 30.9-1.8c37.3 0 103 6.4 167 43.8 3.4 2.1 10.7 2.9 19.8 2.9 24.3 0 61.2-5.8 69.7-9C391 452.6 494 364.5 494 364.5l-32.5-28.4s-79.8 50.9-89.9 55.8c-91.1 44.7-164.9 16.8-164.9 16.8s119.9 3 158.4-27.3l-22.6-34s-82.8-2.3-112.3-6.2c-15.4-2-48.7-18.8-73.1-18.8z"></path>
                </svg>
              </div>
              <div className="flex flex-col ml-2">
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Affordability
                </h3>
                <div className="text">
                  When buying two or more items, we offer a 10% discount for all
                  customers. This coupled with our already fantastic prices make
                  our items affordable!
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 640 512"
                  className="w-6 h-6 md:w-7 md:h-7"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M128 96c26.5 0 48-21.5 48-48S154.5 0 128 0 80 21.5 80 48s21.5 48 48 48zm384 0c26.5 0 48-21.5 48-48S538.5 0 512 0s-48 21.5-48 48 21.5 48 48 48zm125.7 372.1l-44-110-41.1 46.4-2 18.2 27.7 69.2c5 12.5 17 20.1 29.7 20.1 4 0 8-.7 11.9-2.3 16.4-6.6 24.4-25.2 17.8-41.6zm-34.2-209.8L585 178.1c-4.6-20-18.6-36.8-37.5-44.9-18.5-8-39-6.7-56.1 3.3-22.7 13.4-39.7 34.5-48.1 59.4L432 229.8 416 240v-96c0-8.8-7.2-16-16-16H240c-8.8 0-16 7.2-16 16v96l-16.1-10.2-11.3-33.9c-8.3-25-25.4-46-48.1-59.4-17.2-10-37.6-11.3-56.1-3.3-18.9 8.1-32.9 24.9-37.5 44.9l-18.4 80.2c-4.6 20 .7 41.2 14.4 56.7l67.2 75.9 10.1 92.6C130 499.8 143.8 512 160 512c1.2 0 2.3-.1 3.5-.2 17.6-1.9 30.2-17.7 28.3-35.3l-10.1-92.8c-1.5-13-6.9-25.1-15.6-35l-43.3-49 17.6-70.3 6.8 20.4c4.1 12.5 11.9 23.4 24.5 32.6l51.1 32.5c4.6 2.9 12.1 4.6 17.2 5h160c5.1-.4 12.6-2.1 17.2-5l51.1-32.5c12.6-9.2 20.4-20 24.5-32.6l6.8-20.4 17.6 70.3-43.3 49c-8.7 9.9-14.1 22-15.6 35l-10.1 92.8c-1.9 17.6 10.8 33.4 28.3 35.3 1.2.1 2.3.2 3.5.2 16.1 0 30-12.1 31.8-28.5l10.1-92.6 67.2-75.9c13.6-15.5 19-36.7 14.4-56.7zM46.3 358.1l-44 110c-6.6 16.4 1.4 35 17.8 41.6 16.8 6.6 35.1-1.7 41.6-17.8l27.7-69.2-2-18.2-41.1-46.4z"></path>
                </svg>
              </div>
              <div className="flex flex-col ml-2">
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Consignment
                </h3>
                <div className="text">
                  Let us take care of selling your items! Fill out our
                  consignment form to find out how you can get your items sold.
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 md:w-7 md:h-7"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill-rule="nonzero"
                      d="M11 2l7.298 2.28a1 1 0 0 1 .702.955V7h2a1 1 0 0 1 1 1v2H9V8a1 1 0 0 1 1-1h7V5.97l-6-1.876L5 5.97v7.404a4 4 0 0 0 1.558 3.169l.189.136L11 19.58 14.782 17H10a1 1 0 0 1-1-1v-4h13v4a1 1 0 0 1-1 1l-3.22.001c-.387.51-.857.96-1.4 1.33L11 22l-5.38-3.668A6 6 0 0 1 3 13.374V5.235a1 1 0 0 1 .702-.954L11 2z"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="flex flex-col ml-2">
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Secure Payments{" "}
                </h3>
                <div className="text">
                  You can use Revolut or Paypal or check out with Shopify for
                  your peace of mind.
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 md:w-7 md:h-7"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                  </g>
                </svg>
              </div>
              <div className="flex flex-col ml-2">
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Tracked Delivery{" "}
                </h3>
                <div className="text">
                  All our packages are sent via AnPost, RoyalMail or EMS with
                  tracked delivery.
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 md:w-7 md:h-7"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M12 13V9c0-.55-.45-1-1-1H7V6h5V4H9.5V3h-2v1H6c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h4v2H5v2h2.5v1h2v-1H11c.55 0 1-.45 1-1zM19.59 12.52l-5.66 5.65-2.83-2.83-1.41 1.42L13.93 21 21 13.93z"></path>
                </svg>
              </div>
              <div className="flex flex-col ml-2">
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Low Price Guarantee{" "}
                </h3>
                <div className="text">
                  We guarantee that our prices won't be beaten! If so, we
                  promise to match it.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
