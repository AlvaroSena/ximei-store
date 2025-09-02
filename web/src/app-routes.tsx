import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Product } from "./pages/product";
import { Catalog } from "./pages/catalog";
import { CollectionProducts } from "./pages/collection-products";
import { AdminCollections } from "./pages/admin/collections";
import { Layout } from "./components/layout";
import { AdminLayout } from "./pages/admin";
import { AdminProducts } from "./pages/admin/products";
import { CraeteProduct } from "./pages/admin/create-product";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products/:productSlug" element={<Product />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/:categorySlug" element={<CollectionProducts />} />
      </Route>
      <Route
        path="/admin/collections"
        element={
          <AdminLayout>
            <AdminCollections />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminLayout>
            <AdminProducts />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/products/create"
        element={
          <AdminLayout>
            <CraeteProduct />
          </AdminLayout>
        }
      />
    </Routes>
  );
}
