import { AppRoutes } from "./app-routes";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

export function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}
