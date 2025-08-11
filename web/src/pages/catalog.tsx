import { ProductCard } from "../components/product-card";
import { useIsMobile } from "../hooks/useIsMobile";

const allProducts = [...Array(7)];

export function Catalog() {
  const isMobile = useIsMobile(768);
  const productsToShow = isMobile ? allProducts.slice(0, 4) : allProducts;

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
          max-w-[1120px]
          px-4 lg:px-0
          mx-auto my-8
          ${
            isMobile
              ? "flex overflow-x-auto gap-4 snap-x snap-mandatory"
              : "grid grid-cols-3 lg:grid-cols-4 gap-4"
          }
        `}
        >
          {productsToShow.map((_, i) => (
            <div
              key={i}
              className={`${isMobile ? "snap-center shrink-0 w-72" : ""}`}
            >
              <ProductCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
