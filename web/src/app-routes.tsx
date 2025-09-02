import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Product } from "./pages/product";
import { Catalog } from "./pages/catalog";
import { CollectionProducts } from "./pages/collection-products";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:productSlug" element={<Product />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/:categorySlug" element={<CollectionProducts />} />
    </Routes>
  );
}
