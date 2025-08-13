import { useState, useEffect, useContext } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { EmptyImage } from "./empty-imagem";
import { ShoppingCartContext } from "../contexts/shopping-cart-context";

type ProductCardProps = {
  images: Image[];
  product: any;
};

type Image = {
  id: string;
  url: string;
};

export function ProductCard({ images, product }: ProductCardProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentImage, setCurrentImage] = useState(images[0]?.url);
  const { addToCart } = useContext(ShoppingCartContext);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              images.length > 1 && setCurrentImage(images[1].url)
            }
            onMouseLeave={() => setCurrentImage(images[0].url)}
          />
        )}

        {/* Botão com animação de surgimento */}
        <button
          className={`text-white bg-red-900 px-4 py-3 absolute bottom-0 hover:opacity-90 ${
            isMobile
              ? "w-auto"
              : "w-full opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 absolute bottom-0 transition-all duration-300 ease-out"
          }`}
          onClick={() =>
            addToCart({
              ...product,
              quantity: 1,
              totalPriceInCents: product.priceInCents * 1,
            })
          }
        >
          {isMobile ? (
            <PlusIcon className="size-5 text-white" />
          ) : (
            "Adicionar ao carrinho"
          )}
        </button>
      </div>

      <div className="flex flex-col items-center">
        <p>{product.title}</p>
        <span className="block">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.priceInCents / 100)}
        </span>
      </div>
    </a>
  );
}
