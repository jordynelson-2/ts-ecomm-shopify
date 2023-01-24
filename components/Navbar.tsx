import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import Link from "next/link";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="flex justify-between items-center h-24 max-w-5xl mx-auto px-4">
        <img
          src="/TS-figma-logo.svg"
          className="h-[50px] w-[50px] object-contain"
          alt="Tuckshop"
        />
        <ul className=" hidden md:flex gap-2 text-l font-semibold text-inter capitalize">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/cart">Cart</Link>
          </li>
        </ul>
        <button className="md:hidden">
          {isOpen ? (
            <AiOutlineClose onClick={() => setIsOpen(!isOpen)} />
          ) : (
            <FaBars onClick={() => setIsOpen(!isOpen)} />
          )}
        </button>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col gap-2 text-l font-semibold text-inter capitalize px-4 md:hidden bg-white w-full items-center"
        >
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;
