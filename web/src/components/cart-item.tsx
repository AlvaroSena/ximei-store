import { TrashIcon } from "@heroicons/react/24/outline";
import { CartItemQuantityInput } from "./cart-item-quantity-input";

export function CartItem() {
  return (
    <div className="flex flex-row items-start justify-between w-full">
      <div className="flex flex-row gap-6">
        <img
          src="https://ximei-store.s3.sa-east-1.amazonaws.com/bolsa-1.jpeg"
          alt=""
          className="max-w-28"
        />
        <div className="flex flex-col gap-3">
          <a href="" className="text-stone-900 text-lg hover:underline">
            Bolsa
          </a>
          <span className="text-lg text-semibold text-red-950">R$ 100,00</span>
          <CartItemQuantityInput />
        </div>
      </div>
      <button>
        <TrashIcon className="size-6 transition text-neutral-400 hover:text-red-950" />
      </button>
    </div>
  );
}
