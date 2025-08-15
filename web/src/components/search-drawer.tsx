import React from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { searchProducts } from "../lib/api";
import { EmptyImage } from "./empty-imagem";
import { LoaderCircle } from "lucide-react";
import type { Product } from "../types/product";

type SearchDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
  const [query, setQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const { data, isFetching } = useQuery({
    queryKey: ["filteredProducts", debouncedSearch],
    queryFn: async () => await searchProducts(debouncedSearch),
    enabled: !!debouncedSearch,
  });

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 h-full w-full  md:w-[35vw] min-w-[260px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-bold text-stone-900">PESQUISE</h2>
            <button
              aria-label="Fechar carrinho"
              onClick={onClose}
              className="p-2 transition"
            >
              <XMarkIcon
                className={`size-6 text-stone-900 transition hover:opacity-50`}
              />
            </button>
          </header>

          <main className="flex-1 overflow-auto px-6 py-4">
            <div className="border-b border-stone-900 w-full py-3 flex flex-row items-center">
              <input
                type="text"
                placeholder="O que você está procurando?"
                className=" outline-none w-full placeholder-neutral-400 text-stone-900"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <MagnifyingGlassIcon className="size-6 text-zinc-900" />
            </div>
            <div className="my-5 flex flex-col gap-5">
              {data?.products && (
                <span className="block text-sm text-stone-500 font-normal">
                  Resultados: {data?.products.length} achado(s)
                </span>
              )}

              {isFetching ? (
                <div className="flex items-center justify-center h-screen">
                  <LoaderCircle className="animate-spin text-red-900 size-10" />
                </div>
              ) : (
                <React.Fragment>
                  {data?.products.map((product: Product) => {
                    return (
                      <a
                        key={product.id}
                        href={`/${product.slug}`}
                        className="flex flex-row gap-5"
                      >
                        {product.images.length >= 1 ? (
                          <img
                            src={product.images[0].url}
                            alt={product.title}
                            className="size-36 object-cover"
                          />
                        ) : (
                          <div className="size-36">
                            <EmptyImage />
                          </div>
                        )}

                        <div className="flex flex-col gap-3">
                          <p className="font-semibold w-48 truncate">
                            {product.title}
                          </p>
                          <span className="block text-sm text-stone-900">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(product.priceInCents / 100)}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </React.Fragment>
              )}
            </div>
          </main>
        </div>
      </aside>
    </div>
  );
}
