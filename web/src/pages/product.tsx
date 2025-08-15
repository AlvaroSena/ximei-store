import React, { useContext, useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { QuantityInput } from "../components/quantity-input";
import { LoaderCircle } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";
import { ShoppingCartContext } from "../contexts/shopping-cart-context";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Zoom from "react-medium-image-zoom";
import { getProduct } from "../lib/api";
import type { Image } from "../types/image";

export function Product() {
  const isMobile = useIsMobile(768);
  const { productSlug } = useParams();
  const { addToCart } = useContext(ShoppingCartContext);

  const [quantity, setQuantity] = useState(1);

  if (!productSlug) {
    return;
  }

  const { data, isPending, error } = useQuery({
    queryKey: ["product"],
    queryFn: async () => await getProduct(productSlug),
  });

  function increaseQuantity() {
    setQuantity(quantity + 1);
  }

  function decreaseQuantity() {
    if (quantity === 1) {
      return;
    }

    setQuantity(quantity - 1);
  }

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
          Produto não foi encontrado.
        </h3>
      </div>
    );
  }

  return (
    <div className="max-w-[1120px] mx-auto my-8 flex flex-col md:flex-row gap-8">
      <div
        className={`
          ${
            isMobile
              ? "flex overflow-x-auto gap-4 snap-x snap-mandatory"
              : `grid gap-4 ${
                  data?.product.images.length > 1
                    ? "grid-cols-2"
                    : "grid-cols-1"
                }`
          }
        `}
      >
        {data?.product.images.map((image: Image) => {
          return (
            <React.Fragment key={image.id}>
              {!isMobile ? (
                <Zoom>
                  <img
                    key={image.id}
                    src={image.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </Zoom>
              ) : (
                <img
                  key={image.id}
                  src={image.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="w-full px-4 lg:px-0 flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-stone-900">
          {data?.product.title}
        </h1>
        <span className="text-3xl font-semibold text-stone-900">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(data?.product.priceInCents / 100)}
        </span>

        <div className="flex flex-row items-center gap-3">
          <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
          <p className="font-medium text-stone-900">Em estoque</p>
        </div>

        <QuantityInput
          quantity={quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />

        <button
          className="py-3 px-4 font-semibold text-white bg-red-900 text-xl w-full transition hover:opacity-80"
          onClick={() =>
            addToCart({
              ...data?.product,
              quantity,
              totalPriceInCents: data?.product.priceInCents * quantity,
            })
          }
        >
          Adicionar ao carrinho
        </button>

        <div className="w-full h-[1px] bg-stone-200"></div>

        <Disclosure>
          {({ open }) => (
            <React.Fragment>
              <DisclosureButton className="flex flex-row items-center justify-between font-medium text-lg text-stone-900 py-3">
                DESCRIÇÃO
                {open ? (
                  <MinusIcon
                    className="size-5 text-stone-900 transition hover:opacity-50"
                    style={{
                      animation: open && "top-spin-reverse 0.3s forwards",
                    }}
                  />
                ) : (
                  <PlusIcon
                    className="size-5 text-stone-900 transition hover:opacity-50"
                    style={{
                      animation: open
                        ? "bottom-spin 0.3s forwards"
                        : "bottom-spin-reverse 0.3s forwards",
                    }}
                  />
                )}
              </DisclosureButton>
              {open && (
                <DisclosurePanel className="text-stone-700 font-medium text-lg">
                  {data?.product.description}
                </DisclosurePanel>
              )}
            </React.Fragment>
          )}
        </Disclosure>

        <div className="w-full h-[1px] bg-stone-200"></div>
      </div>
    </div>
  );
}
