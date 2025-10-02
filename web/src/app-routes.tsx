import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Product } from "./pages/product";
import { Catalog } from "./pages/catalog";
import { CollectionProducts } from "./pages/collection-products";
import { Order } from "./pages/order";
import { Layout } from "./components/layout";
import { Header } from "./components/header";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/products/:productSlug"
        element={
          <Layout>
            <Product />
          </Layout>
        }
      />
      <Route
        path="/catalog"
        element={
          <Layout>
            <Catalog />
          </Layout>
        }
      />
      <Route
        path="/:categorySlug"
        element={
          <Layout>
            <CollectionProducts />
          </Layout>
        }
      />
      <Route
        path="/orders/:orderId"
        element={
          <>
            <Header />
            <Order />
          </>
        }
      />
    </Routes>
  );
}
