import { EmptyImage } from "./empty-imagem";
import type { Product } from "../types/product";
import { Link } from "react-router-dom";

type FeaturedProductCardProps = {
  product: Product;
  index?: number;
};

export function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className={`relative group min-w-[90%] sm:min-w-[40%] lg:min-w-[30%] snap-center overflow-hidden cursor-pointer text-white`}
    >
      {product.imageUrls.length < 1 ? (
        <EmptyImage />
      ) : (
        <img
          src={product.imageUrls[0]}
          alt="Imagem da Bolsa deste produto"
          className="relative min-w-96 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
      )}

      <div className="absolute inset-0 bg-black/20 transition duration-500 group-hover:bg-black/40"></div>

      <div className="absolute w-full bottom-0 text-center p-6 ">
        {/* <h1 className="text-3xl font-bold">{product.title}</h1>
        <h2 className="text-lg font-medium text-center">
          {product.description}
        </h2> */}
      </div>
    </Link>
  );
}
