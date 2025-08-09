import { AppRoutes } from "./app-routes";
import { Header } from "./components/header";
import { HeroBanner } from "./components/hero-banner";
import { ProductCart } from "./components/product-cart";

export function App() {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}
