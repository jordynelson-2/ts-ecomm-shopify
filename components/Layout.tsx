import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { childrenProps } from "../types";

function Layout({ children }: childrenProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
