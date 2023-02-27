import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWindowClose } from "react-icons/fa";

function Modal({ showModal, setShowModal, description }: any) {
  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
            >
              <div className="modal-header flex flex-row-reverse">
                {/* <p className="modal-tech-title">{techType}</p> */}
                <motion.button
                  className="close-modal-btn"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  <FaWindowClose style={{ fill: "#6366F1" }} />
                </motion.button>
              </div>
              <div className="modal-body">
                <ol className="steps-list border-l md:border-l-0 md:border-t border-gray-300 md:flex md:justify-center md:gap-6">
                  <li>
                    <div className="flex md:block flex-start items-center pt-2 md:pt-0">
                      <div className="bg-[#6366F1] w-6 h-6 rounded-full -ml-3  md:-mt-2">
                        <p className="text-white">1</p>
                      </div>
                    </div>
                    <div className="mt-0.5 ml-4 md:ml-0 pb-5">
                      <h4 className="text-gray-800 font-semibold text-xl mb-1.5">
                        Place Order
                      </h4>
                      <p className="text-gray-500 mb-3">
                        Place order via our website using our secure payment
                        with Shopify.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="flex md:block flex-start items-center pt-2 md:pt-0">
                      <div className="bg-[#6366F1] w-6 h-6 rounded-full -ml-3 md:-mt-2">
                        <p className="text-white">2</p>
                      </div>
                    </div>
                    <div className="mt-0.5 ml-4 md:ml-0 pb-5">
                      <h4 className="text-gray-800 font-semibold text-xl mb-1.5">
                        Quality Control Pictures
                      </h4>
                      <p className="text-gray-500 mb-3">
                        When your items are ready, we will send you quality
                        control pictures for your approval.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="flex md:block flex-start items-center pt-2 md:pt-0">
                      <div className="bg-[#6366F1] w-6 h-6 rounded-full -ml-3 md:-mt-2">
                        <p className="text-white">3</p>
                      </div>
                    </div>
                    <div className="mt-0.5 ml-4 md:ml-0 pb-5">
                      <h4 className="text-gray-800 font-semibold text-xl mb-1.5">
                        Order Shipped
                      </h4>
                      <p className="text-gray-500 mb-3">
                        Once we have your approval, we will ship your order.
                        Depending on your location, we will use AnPost or Royal
                        Mail via EMS
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="flex md:block flex-start items-center pt-2 md:pt-0">
                      <div className="bg-[#6366F1] w-6 h-6 rounded-full -ml-3 md:-mt-2">
                        <p className="text-white">4</p>
                      </div>
                    </div>
                    <div className="mt-0.5 ml-4 md:ml-0 pb-5">
                      <h4 className="text-gray-800 font-semibold text-xl mb-1.5">
                        Receive Tracking
                      </h4>
                      <p className="text-gray-500 mb-3">
                        When your order is shipped, you will receive a tracking
                        number within 2 business days.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Modal;
