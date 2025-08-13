import { useLocation } from "react-router-dom";
import { HeroBanner } from "../components/hero-banner";
import { getProducts } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { ProductList } from "../components/product-list";

export function Home() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const page = queryParams.get("page") as string;

  const { data, isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getProducts(parseInt(page), 25),
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin text-red-900 size-10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h3 className="text-xl font-semibold text-stone-900">
          Nenhum produto foi encontrado.
        </h3>
      </div>
    );
  }

  return (
    <div>
      <HeroBanner />

      <div className="max-w-[1120px] px-4 lg:px-0 mx-auto my-32">
        <h1 className="text-4xl font-bold text-stone-900 mb-8">Produtos</h1>
        <ProductList data={data} path={location.pathname} />
      </div>
    </div>
  );
}
