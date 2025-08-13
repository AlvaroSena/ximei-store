import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { ProductCard } from "../components/product-card";
import { useIsMobile } from "../hooks/useIsMobile";
import { getProducts } from "../lib/api";

// const allProducts = [...Array(7)];

export function Catalog() {
  const isMobile = useIsMobile(768);
  // const productsToShow = isMobile ? allProducts.slice(0, 4) : allProducts;

  const { data, isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
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
      <div className="max-w-[1120px] mx-auto">
        <div className="bg-neutral-200 flex flex-col items-center justify-center h-64 gap-6">
          <div className="flex flex-row items-center gap-4 text-stone-700 font-medium">
            <p>Catálogo</p>/<p>Produtos</p>
          </div>
          <h3 className="text-3xl font-bold text-stone-900">Produtos</h3>
        </div>

        <div
          className={`
          ${
            isMobile
              ? "flex overflow-x-auto gap-4 snap-x snap-mandatory"
              : "grid grid-cols-3 lg:grid-cols-4 gap-4 my-32"
          }
        `}
        >
          {data?.products.map((product: any, i: number) => (
            <div
              key={i}
              className={`${isMobile ? "snap-center shrink-0 w-72" : ""}`}
            >
              <ProductCard
                images={product.images}
                title={product.title}
                price={product.priceInCents / 1000}
                slug={product.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
