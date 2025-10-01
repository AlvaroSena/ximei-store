import { Title, Meta, Link } from "react-head";
import { ProductList } from "../components/product-list";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../lib/api";
import { LoaderCircle } from "lucide-react";

export function CollectionProducts() {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") as string;

  if (!categorySlug) {
    return;
  }

  const { data, isPending, error, isFetching } = useQuery({
    queryKey: ["collection-products", page],
    queryFn: async () => await getProductsByCategory(categorySlug, parseInt(page || "1"), 28),
    placeholderData: (prev) => prev,
  });

  console.log(data);

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
      <Title>{data.category ? `${data.category?.title} | Loja Ximei` : "Carregando..."}</Title>
      <Link rel="canonical" href="https://ximei.vercel.app/catalogo" />
      <Meta name="description" content="Veja todas as bolsas disponíveis no catálogo da Ximei." />

      <div className="relative max-w-[1120px] mx-auto">
        <img src={data.category?.imageUrl} className=" w-full h-64 object-cover" alt={data.category?.title} />
        <div className="absolute top-0 w-full bg-black/45 text-white flex flex-col items-center justify-center h-64 gap-6">
          <div className="flex flex-row items-center gap-4 font-medium">
            <p>Início</p>/<p>{data.category?.title}</p>
          </div>
          <h3 className="text-3xl font-bold">{data.category?.title}</h3>
        </div>

        <div className="my-32 px-4 lg:px-0">
          {data.products?.length === 0 ? (
            <p className="text-center font-semibold text-lg text-stone-900">Nenhum produto foi encontrado</p>
          ) : (
            <ProductList data={data} path={location.pathname} />
          )}
        </div>
      </div>
    </div>
  );
}
