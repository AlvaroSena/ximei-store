import React, { useState, useContext } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { QuantityInput } from "../components/quantity-input";
import { ShoppingCartContext } from "../contexts/shopping-cart-context";
import Zoom from "react-medium-image-zoom";
import type { Product } from "../types/product";
import type { Variant } from "../types/variant";
import { useSearchParams } from "react-router-dom";

interface ProductTemplateProps {
  product: Product;
  currentVariant: Variant | null;
}

export function ProductTemplate({
  product,
  currentVariant,
}: ProductTemplateProps) {
  const { addToCart } = useContext(ShoppingCartContext);
  const [, setSearchParams] = useSearchParams();

  const [quantity, setQuantity] = useState(1);

  function increaseQuantity() {
    setQuantity(quantity + 1);
  }

  function decreaseQuantity() {
    if (quantity === 1) {
      return;
    }

    setQuantity(quantity - 1);
  }

  return (
    <div className="max-w-[1120px] mx-auto my-8 flex flex-col md:flex-row gap-8">
      <div className="w-full flex flex-col gap-3">
        <Zoom>
          <img
            src={currentVariant?.imageUrl ?? product.imageUrls[0]}
            alt={product.title}
            className="size-full object-cover"
          />
        </Zoom>

        <div className="flex overflow-y-hidden overflow-x-auto gap-4 snap-x snap-mandatory px-4 md:px-0">
          {product.imageUrls.map((url, index: number) => {
            if (index === 0) return;

            return (
              <Zoom>
                <img
                  key={index}
                  src={url}
                  alt={product.title}
                  className="size-32 object-cover"
                />
              </Zoom>
            );
          })}
        </div>
      </div>

      <div className="w-full px-4 lg:px-0 flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-stone-900">
          {product.title} {currentVariant?.title}
        </h1>
        <span className="text-3xl font-semibold text-stone-900">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(
            currentVariant?.priceInCents
              ? currentVariant?.priceInCents / 100
              : product.priceInCents / 100
          )}
        </span>

        <div className="flex flex-row items-center gap-3">
          <div className="size-2 bg-emerald-600 rounded-full animate-pulse"></div>
          <p className="font-medium text-stone-900">Em estoque</p>
        </div>

        <p>Cor: {currentVariant?.title}</p>
        <div className="flex flex-row items-center gap-3">
          {product.variants?.map((variant: Variant) => {
            return (
              <button
                key={variant.id}
                className={`block hover:outline outline-stone-300 ${
                  currentVariant?.slug === variant.slug &&
                  "border border-stone-300 outline-none"
                }`}
                onClick={() => {
                  setSearchParams({ variant: variant.slug });
                }}
              >
                <img
                  src={variant.imageUrl ?? ""}
                  alt=""
                  className="size-[70px]"
                />
              </button>
            );
          })}
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
              ...product,
              quantity,
              totalPriceInCents: 0,
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
                  {product.description}
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
