import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

export function ProductCard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <a
      href="/product"
      className="block w-full max-w-72 text-stone-900 font-semibold text-lg"
    >
      <div className="h-72 w-full relative group">
        <img
          src="https://ximei-store.s3.sa-east-1.amazonaws.com/bolsa-1.jpeg"
          alt=""
          className="w-full h-full object-cover"
        />

        {/* Botão com animação de surgimento */}
        <button
          className={`text-white bg-red-900 px-4 py-3 absolute bottom-0 hover:opacity-90 ${
            isMobile
              ? "w-auto"
              : "w-full opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 absolute bottom-0 transition-all duration-300 ease-out"
          }`}
        >
          {isMobile ? (
            <PlusIcon className="size-5 text-white" />
          ) : (
            "Adicionar ao carrinho"
          )}
        </button>
      </div>

      <div className="flex flex-col items-center">
        <p>Product title</p>
        <span className="block">R$ 0,00</span>
      </div>
    </a>
  );
}
