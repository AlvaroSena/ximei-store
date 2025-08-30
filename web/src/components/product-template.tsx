import React, { useState, useContext } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { QuantityInput } from "../components/quantity-input";
import { ShoppingCartContext } from "../contexts/shopping-cart-context";
import { useLocation, useSearchParams } from "react-router-dom";
import { PixIcon } from "./icons/pix-icon";
import Zoom from "react-medium-image-zoom";
import type { Product } from "../types/product";
import type { Variant } from "../types/variant";
import type { VariantAttribute } from "../types/variant-attribute";

interface ProductTemplateProps {
  product: Product;
  currentVariant: Variant | null | undefined;
  variantParam?: string;
}

export function ProductTemplate({
  product,
  currentVariant,
}: ProductTemplateProps) {
  const { addToCart } = useContext(ShoppingCartContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [variantNotSelected, setVariantNotSelected] = useState(false);
  const [sizeNotSelected, setSizeNotSelected] = useState(false);
  const location = useLocation();
  const queryParams = location.search.split("&");

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

  function submitItemToCart() {
    if (product.variants && product.variants?.length >= 1 && !currentVariant) {
      setVariantNotSelected(true);
      return;
    }

    if (
      (currentVariant &&
        currentVariant.attributes.length >= 1 &&
        queryParams.length <= 1) ||
      (currentVariant &&
        currentVariant.attributes.length > 1 &&
        queryParams.length <= 2)
    ) {
      setSizeNotSelected(true);
      return;
    }

    const cartItem = {
      productId: product.id,
      imageUrl: currentVariant?.imageUrl ?? product.imageUrls[0],
      title: currentVariant?.title
        ? `${product.title} (${currentVariant.title})`
        : product.title,
      slug: currentVariant?.slug ?? product.slug,
      priceInCents: currentVariant?.priceInCents ?? product.priceInCents,
      quantity,
      totalPriceInCents:
        currentVariant?.priceInCents ?? product.priceInCents * quantity,
      variantId: currentVariant?.id ?? null,
    };

    addToCart(cartItem);
  }

  return (
    <div className="max-w-[1120px] mx-auto my-8 flex flex-col md:flex-row gap-8">
      {/* {currentVariant?.offers && currentVariant?.offers.length >= 1 && (
        <PromoModal offer={currentVariant.offers[0]} />
      )} */}

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
        {currentVariant?.isAnOffer && (
          <span className="text-lg line-through font-semibold text-stone-500">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(
              currentVariant && currentVariant?.basePriceInCents
                ? currentVariant.basePriceInCents / 100
                : product.priceInCents / 100
            )}
          </span>
        )}
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

        <p className="text-neutral-900">Cor: {currentVariant?.title}</p>
        <div className="flex flex-row items-center gap-3">
          {product.variants?.map((variant: Variant) => {
            return (
              <button
                key={variant.id}
                className={`relative hover:outline outline-stone-300 ${
                  variantNotSelected && "border border-red-500"
                } ${
                  currentVariant?.slug === variant.slug &&
                  "border border-stone-300 outline-none"
                }`}
                onClick={() => {
                  setSearchParams({
                    variant: variant.slug,
                  });
                  setVariantNotSelected(false);
                }}
              >
                {variant.isAnOffer && (
                  <span className="absolute top-0 right-0 p-1">🔥</span>
                )}
                <img
                  src={variant.imageUrl ?? ""}
                  alt=""
                  className="size-[70px]"
                />
              </button>
            );
          })}
        </div>

        {variantNotSelected && (
          <span className="block text-red-500 text-sm">*Selecione uma cor</span>
        )}

        {currentVariant?.attributes &&
          currentVariant?.attributes?.length >= 1 && (
            <div>
              {currentVariant?.attributes.map((attribute: VariantAttribute) => {
                return (
                  <div className="flex flex-col gap-4">
                    <p className="">{attribute.attributeName}</p>
                    <div className="flex flex-row items-center gap-3 mb-3">
                      {attribute.attributeValues.map((value, index: number) => {
                        return (
                          <button
                            key={index}
                            className={`px-3.5 py-2 border ${
                              sizeNotSelected
                                ? "border-red-500"
                                : "border-neutral-200"
                            }  transition hover:bg-neutral-100
                            ${
                              location.search.includes(
                                `${attribute.id}=${value}`
                              ) &&
                              "bg-red-900 text-white border-none hover:bg-red-900"
                            }`}
                            onClick={() => {
                              const updatedParams = new URLSearchParams(
                                searchParams
                              );
                              updatedParams.set(`size-${attribute.id}`, value);
                              setSearchParams(updatedParams);
                              setSizeNotSelected(false);
                            }}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {sizeNotSelected && (
                <span className="block text-red-500 text-sm py-4">
                  *Selecione um tamanho
                </span>
              )}
            </div>
          )}

        {currentVariant?.isAnOffer === false && (
          <QuantityInput
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        )}

        <button
          className="py-3 px-4 font-semibold text-white bg-red-900 text-xl w-full transition hover:opacity-80"
          onClick={submitItemToCart}
        >
          Adicionar ao carrinho
        </button>

        <div className="w-full flex flex-col items-center gap-3">
          <span className="text-sm text-neutral-900">
            Só aceitamos Pix como forma de pagamento
          </span>
          <PixIcon />
        </div>

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
