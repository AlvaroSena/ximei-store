import { useState } from "react";
// import { PlusIcon } from "@heroicons/react/24/outline";
import { EmptyImage } from "./empty-imagem";
import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentImage, setCurrentImage] = useState(product.imageUrls[0]);

  // useEffect(() => {
  //   function handleResize() {
  //     setIsMobile(window.innerWidth <= 768);
  //   }
  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <a
      href={`/${product.slug}`}
      className="block w-full max-w-72 text-stone-900 font-semibold text-lg"
    >
      <div className="h-72 w-full relative group">
        {!currentImage ? (
          <EmptyImage />
        ) : (
          <img
            src={currentImage}
            alt="Imagem da Bolsa deste produto"
            className="w-full h-full object-cover"
            onMouseEnter={() =>
              product.imageUrls.length > 1 &&
              setCurrentImage(product.imageUrls[1])
            }
            onMouseLeave={() => setCurrentImage(product.imageUrls[0])}
          />
        )}

        <div
          className={`text-white text-center bg-red-900 px-4 py-3 absolute bottom-0 hover:opacity-90 w-full`}
        >
          Ver item
        </div>

        {/* <div
          className={`text-white text-center bg-red-900 px-4 py-3 absolute bottom-0 hover:opacity-90 ${
            isMobile
              ? "w-auto"
              : "w-full opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 absolute bottom-0 transition-all duration-300 ease-out"
          }`}
        >
          {isMobile ? <PlusIcon className="size-5 text-white" /> : "Ver item"}
        </div> */}
      </div>

      <div className="flex flex-col items-center">
        {/* <p>{product.title}</p> */}
        {/* {product.variants && product.variants[1].basePriceInCents && (
          <span className="block line-through text-stone-600 text-sm mt-3">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format((product.variants[1].basePriceInCents * 2) / 100)}
          </span>
        )} */}
        <span className="block mt-3">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.priceInCents / 100)}
        </span>
      </div>
    </a>
  );
}
