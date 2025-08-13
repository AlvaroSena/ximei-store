import { useIsMobile } from "../hooks/useIsMobile";
import { ProductCard } from "./product-card";

interface ProductListProps {
  data: any;
  path: string;
}

export function ProductList({ data, path }: ProductListProps) {
  const isMobile = useIsMobile(768);

  return (
    <div>
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
            <ProductCard images={product.images} product={product} />
          </div>
        ))}
      </div>

      <div className="flex flex-row gap-4 items-center justify-center my-16">
        {Array.from({ length: data?.totalPages }).map((_, index) => {
          return (
            <a
              key={index}
              href={`${path}?page=${index + 1}`}
              className={`flex items-center transition hover:bg-stone-100 text-xl border border-stone-200 rounded-full px-3.5 py-1 text-stone-900 ${
                data?.currentPage === index + 1 ? "bg-stone-100" : "bg-white"
              }`}
            >
              {index + 1}
            </a>
          );
        })}
      </div>
    </div>
  );
}
