import React, { useState, useContext } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { QuantityInput } from "../components/quantity-input";
import { EmptyImage } from "../components/empty-imagem";
import { ShoppingCartContext } from "../contexts/shopping-cart-context";
import Zoom from "react-medium-image-zoom";

interface ProductTemplateProps {
  product: any;
  variants: any;
}

export function ProductTemplate({ product, variants }: ProductTemplateProps) {
  const { addToCart } = useContext(ShoppingCartContext);

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
      <div>
        {product.imageUrl ? (
          <Zoom>
            <img
              src={product.imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </Zoom>
        ) : (
          <EmptyImage />
        )}
      </div>

      <div className="w-full px-4 lg:px-0 flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-stone-900">{product.title}</h1>
        <span className="text-3xl font-semibold text-stone-900">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(500)}
        </span>

        <div className="flex flex-row items-center gap-3">
          <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
          <p className="font-medium text-stone-900">Em estoque</p>
        </div>

        <p>Cor</p>
        <div className="flex flex-row items-center gap-3">
          {variants.map((variant: any) => {
            return (
              <a
                href={`/${product.slug}?variant=${variant.slug}`}
                key={variant.id}
                className="block transition hover:outline outline-stone-300 hover:outline-offset-3"
              >
                <img
                  src={variant.imageUrl ?? ""}
                  alt=""
                  className="size-[70px]"
                />
              </a>
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
