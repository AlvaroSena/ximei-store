import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Textarea,
} from "@headlessui/react";

export function Cart() {
  return (
    <div>
      <div className="max-w-[1040px] px-4 lg:px-0 mx-auto my-16">
        <h3 className="text-2xl font-semibold text-stone-900 text-center lg:text-left">
          Carrinho
        </h3>

        <div className="w-full h-[1px] bg-stone-200 my-4"></div>

        {/* <div className="flex flex-col h-full items-center justify-center gap-4">
          <p className="text-red-950 font-semibold text-2xl">
            Seu carrinho está vazio
          </p>
          <button
            onClick={() => alert("Ir para checkout")}
            className=" bg-red-900 text-white text-lg py-4 px-6 font-medium transition hover:opacity-90"
          >
            COMEÇAR A COMPRAR
          </button>
        </div> */}

        <div className="flex flex-row items-center justify-between">
          <img
            src="https://ximei-store.s3.sa-east-1.amazonaws.com/bolsa-1.jpeg"
            alt=""
            className="max-w-28"
          />
          <p>Bolsa</p>
          <span className="block">R$ 100,00</span>

          <div className="flex flex-col gap-4 items-end">
            <button>
              <TrashIcon className="size-6 transition text-neutral-400 hover:text-red-950" />
            </button>
            {/* <CartItemQuantityInput /> */}
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-96 ml-auto my-6">
          <div className="bg-neutral-100 p-6">
            <Disclosure>
              <DisclosureButton className="py-2 flex flex-row items-center gap-3 text-stone-900 font-medium">
                <PencilIcon className="size-5" />
                Observações
              </DisclosureButton>
              <DisclosurePanel className="text-gray-500">
                <Textarea
                  name="order-notes"
                  className="w-full bg-white py-3 px-4 placeholder-neutral-500 text-stone-900"
                  placeholder="Deixe aqui suas observações"
                ></Textarea>
              </DisclosurePanel>
            </Disclosure>
          </div>

          <div className="bg-neutral-100 p-6 flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
              <p className="text-xl font-semibold text-stone-900">Total</p>
              <p className="text-xl font-semibold text-stone-900">R$ 100,00</p>
            </div>

            <button
              onClick={() => alert("Ir para checkout")}
              className="w-full bg-red-900 text-white text-lg py-4 px-6 font-medium transition hover:opacity-90"
            >
              FINALIZAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
