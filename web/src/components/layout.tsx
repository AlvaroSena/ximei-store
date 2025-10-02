import { Header } from "./header";
import { Footer } from "./footer";
import type { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
