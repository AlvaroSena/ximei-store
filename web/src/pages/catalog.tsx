import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { getProducts } from "../lib/api";
import { ProductList } from "../components/product-list";
import { useLocation } from "react-router-dom";
import { Title, Link, Meta } from "react-head";

export function Catalog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") as string;

  const { data, isPending, error, isFetching } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => await getProducts(parseInt(page || "1"), 25),
    placeholderData: (prev) => prev,
  });

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin text-red-900 size-10" />
      </div>
    );
  }

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
        <h3 className="text-xl font-semibold text-stone-900">Nenhum produto foi encontrado.</h3>
      </div>
    );
  }

  return (
    <div>
      <Title>Catálogo | Loja Ximei</Title>
      <Link rel="canonical" href="https://ximei.vercel.app/catalogo" />
      <Meta name="description" content="Veja todas as bolsas disponíveis no catálogo da Ximei." />

      <div className="max-w-[1120px] mx-auto">
        <div className="bg-neutral-200 flex flex-col items-center justify-center h-64 gap-6">
          <div className="flex flex-row items-center gap-4 text-stone-700 font-medium">
            <p>Catálogo</p>/<p>Produtos</p>
          </div>
          <h3 className="text-3xl font-bold text-stone-900">Produtos</h3>
        </div>

        <div className="my-32 px-4 lg:px-0">
          <ProductList data={data} path={location.pathname} />
        </div>
      </div>
    </div>
  );
}
