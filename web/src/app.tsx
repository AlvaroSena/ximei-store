import "react-medium-image-zoom/dist/styles.css";
import { AppRoutes } from "./app-routes";
import { Toaster } from "sonner";
import { queryClient } from "./lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ShoppingCartContextProvider } from "./contexts/shopping-cart-context";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ShoppingCartContextProvider>
        <AppRoutes />
        <Toaster richColors closeButton />
      </ShoppingCartContextProvider>
    </QueryClientProvider>
  );
}
