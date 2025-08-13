import { HeroBanner } from "../components/hero-banner";
import { ProductCard } from "../components/product-card";
import { useIsMobile } from "../hooks/useIsMobile";
import { getProducts } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

// const allProducts = [...Array(7)];

export function Home() {
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
      <HeroBanner />

      <div className="max-w-[1120px] px-4 lg:px-0 mx-auto my-32">
        <h1 className="text-4xl font-bold text-stone-900 mb-8">Produtos</h1>

        <div
          className={`
          ${
            isMobile
              ? "flex overflow-x-auto gap-4 snap-x snap-mandatory"
              : "grid grid-cols-3 lg:grid-cols-4 gap-4"
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
