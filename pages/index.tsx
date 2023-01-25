import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BiBadgeCheck } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { FaPeopleCarry } from "react-icons/fa";
import { RiSecurePaymentFill, RiSendPlaneFill } from "react-icons/ri";
import { MdPriceCheck } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const Home: NextPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const firstSectionRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSecondSection = () => {
    if (secondSectionRef.current) {
      secondSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section>
        <div
          ref={firstSectionRef}
          className=" relative px-8 h-auto w-[100%] md:h-[100vh] overflow-hidden flex flex-col items-center justify-center max-w-5xl mx-auto lg:px-4 gap-2"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center bg-gray-50 text-gray-500 border rounded gap-2 p-2"
          >
            <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold leading-none rounded-full px-2 py-1 mt-0.5">
              New
            </span>
            <span className="text-sm">Welcome to our new look website!</span>
            <a
              href="#"
              className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 text-sm font-bold transition duration-100"
            >
              More
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            exit={{ opacity: 0, y: -20 }}
            className=""
          >
            <h1 className="text-3xl lg:text-5xl font-bold text-inter text-center">
              the brands you{" "}
              <span>
                <img
                  className="w-[50px] h-[50px] inline-block"
                  src="/heart-svgrepo-com 1.png"
                ></img>{" "}
              </span>
              all in one place.
            </h1>
          </motion.div>
          <motion.p
            //fade in from back to front
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-gray-500 xl:text-lg leading-relaxed mb-8 md:mb-12"
          >
            #1🔌for all your favourite brands.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full flex flex-col sm:flex-row sm:justify-center gap-2.5"
          >
            <Link
              href="/products"
              className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            >
              Shop Now
            </Link>

            <a
              href="#"
              className="inline-block bg-white hover:bg-gray-100 active:bg-gray-200 focus-visible:ring ring-indigo-300 border text-gray-500 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            >
              Learn More
            </a>
          </motion.div>
        </div>
        <button
          className="opacity-0 md:opacity-100 absolute bottom-0 right-0 p-4 m-10 bg-indigo-500 text-white rounded-full shadow-lg "
          onClick={scrollToSecondSection}
        >
          What we offer <IoIosArrowDown className="inline-block" />
        </button>
      </section>

      <motion.section
        // ref={ref}
        ref={secondSectionRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className=" h-[100vh] w-[100%] px-4 md:px-8 mx-auto justify-center">
          <div className="mb-10 md:mb-16">
            <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 mt-4 md:mb-6">
              What we offer
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 xl:gap-16">
            <div className="flex gap-4 md:gap-6">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg">
                <BiBadgeCheck className="w-6 h-6 md:w-7 md:h-7" />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Quality
                </h3>
                <p className="text-gray-500 mb-2">
                  All items are sourced from reliable sellers which we have
                  established concrete relationships with.
                </p>
              </div>
            </div>
            <div className="flex gap-4 md:gap-6">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg">
                <GiReceiveMoney className="w-6 h-6 md:w-7 md:h-7" />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Affordability
                </h3>
                <p className="text-gray-500 mb-2">
                  When buying two or more items, we offer a 10% discount for all
                  customers. This coupled with our already fantastic prices make
                  our items affordable!
                </p>
              </div>
            </div>
            <div className="flex gap-4 md:gap-6">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg">
                <FaPeopleCarry className="w-6 h-6 md:w-7 md:h-7" />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Consignment
                </h3>
                <p className="text-gray-500 mb-2">
                  Let us take care of selling your items! Fill out our
                  consignment form to find out how you can get your items sold.
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg">
                <RiSecurePaymentFill className="w-6 h-6 md:w-7 md:h-7" />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Secutre Payments
                </h3>
                <p className="text-gray-500 mb-2">
                  You can use Revolut or Paypal to pay for your peace of mind.
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg">
                <RiSendPlaneFill className="w-6 h-6 md:w-7 md:h-7" />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Tracked Delivery
                </h3>
                <p className="text-gray-500 mb-2">
                  All our packages are sent via AnPost, RoyalMail or EMS with
                  tracked delivery.
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6">
              <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg">
                <MdPriceCheck className="w-6 h-6 md:w-7 md:h-7" />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Low Price Guarantee
                </h3>
                <p className="text-gray-500 mb-2">
                  We guarantee that our prices won't be beaten! If so, we
                  promise to match it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Home;
