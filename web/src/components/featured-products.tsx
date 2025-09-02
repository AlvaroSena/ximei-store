import { FeaturedProductCard } from "./featured-product-card";
import type { Product } from "../types/product";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-stone-900 mb-8">
        Must have do momento
      </h1>
      <div className="w-full overflow-x-auto snap-x snap-mandatory flex md:grid grid-cols-3 gap-4 scrollbar-hid">
        {products.map((product: Product, index: number) => {
          return (
            <FeaturedProductCard key={index} product={product} index={index} />
          );
        })}
      </div>
    </div>
  );
}
