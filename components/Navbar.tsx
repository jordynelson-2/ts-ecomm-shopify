import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import {
  AiOutlineClose,
  AiFillHome,
  AiOutlineShoppingCart,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { GiClothes } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links = [
  { name: "Home", to: "/", logo: AiFillHome, id: 1 },
  { name: "Products", to: "/products", logo: GiClothes, id: 2 },
  { name: "Cart", to: "/cart", logo: AiOutlineShoppingCart, id: 3 },
  { name: "About", to: "/about", logo: AiOutlineInfoCircle, id: 4 },
];

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="flex justify-between items-center h-24 max-w-xl md:max-w-5xl mx-auto px-4">
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
      <div className="flex md:hidden">
        <AnimatePresence>
          {isOpen && (
            <motion.aside
              initial={{ width: 0 }}
              animate={{
                width: 300,
              }}
              exit={{
                width: 0,
                transition: { delay: 0.7, duration: 0.3 },
              }}
              className="bg-white w-[auto] h-screen "
            >
              <motion.div
                className="container mt-[4.5rem] mb-[4.5rem] ml-[1.4rem] mr-[1.4rem] "
                initial="closed"
                animate="open"
                exit="closed"
                variants={sideVariants}
              >
                {links.map((link) => (
                  <div className="flex items-center">
                    <link.logo className="text-4xl  text-black" />
                    <motion.a
                      key={link.id}
                      href={link.to}
                      whileHover={{ scale: 1.1 }}
                      variants={itemVariants}
                      className="text-black decoration-none text-[1.75rem] font-bold block m-[20px]"
                    >
                      {link.name}
                    </motion.a>
                  </div>
                ))}
              </motion.div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
