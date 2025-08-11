import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Product } from "./pages/product";
import { Cart } from "./pages/cart";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}
