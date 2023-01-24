import React from "react";
import Navbar from "./Navbar";

function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
