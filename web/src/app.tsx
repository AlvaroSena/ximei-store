import { QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./app-routes";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { queryClient } from "./lib/query-client";

export function App() {
  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
      <Footer />
    </>
  );
}
