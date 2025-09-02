import React from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
}
