import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { MinusIcon } from "@heroicons/react/24/outline";

export function Product() {
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
    <div className="max-w-[1120px] mx-auto my-8 flex flex-row gap-8">
      <div>
        <img
          src="https://ximei-store.s3.sa-east-1.amazonaws.com/bolsa-1.jpeg"
          alt=""
          className="w-[100%]"
        />
      </div>
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-red-900">Titulo do produto</h1>
        <h3 className="text-3xl font-semibold text-red-900">R$ 320,00</h3>

        <div className="flex flex-row items-center gap-3">
          <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
          <p className="font-medium text-red-900">Em estoque</p>
        </div>

        <div className="flex flex-row items-center justify-between">
          <p className="font-medium text-red-900">Quantidade</p>

          <div className="flex flex-row items-center gap-2">
            <button onClick={decreaseQuantity} className="p-3">
              <MinusIcon className="size-5 text-red-900 transition hover:opacity-50" />
            </button>
            <span className="block text-red-900 font-medium py-3 px-4">
              {quantity}
            </span>
            <button onClick={increaseQuantity} className="p-3">
              <PlusIcon className="size-5 text-red-900 transition hover:opacity-50" />
            </button>
          </div>
        </div>

        <button className="py-3 px-4 font-semibold text-white bg-red-900 text-xl w-full transition hover:opacity-80">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
