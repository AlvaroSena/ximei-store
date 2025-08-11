import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { QuantityInput } from "../components/quantity-input";

export function Product() {
  return (
    <div className="max-w-[1120px] mx-auto my-8 flex flex-col md:flex-row gap-8">
      <div>
        <img
          src="https://ximei-store.s3.sa-east-1.amazonaws.com/bolsa-1.jpeg"
          alt=""
          className="w-[100%]"
        />
      </div>
      <div className="w-full px-4 lg:px-0 flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-red-900">Titulo do produto</h1>
        <h3 className="text-3xl font-semibold text-red-900">R$ 320,00</h3>

        <div className="flex flex-row items-center gap-3">
          <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
          <p className="font-medium text-red-900">Em estoque</p>
        </div>

        <QuantityInput />

        <button className="py-3 px-4 font-semibold text-white bg-red-900 text-xl w-full transition hover:opacity-80">
          Adicionar ao carrinho
        </button>

        <div className="w-full h-[1px] bg-stone-200"></div>

        <Disclosure>
          {({ open }) => (
            <>
              <DisclosureButton className="flex flex-row items-center justify-between font-medium text-lg text-red-900 py-3">
                DESCRIÇÃO
                {open ? (
                  <MinusIcon
                    className="size-5 text-red-900 transition hover:opacity-50"
                    style={{
                      animation: open && "top-spin-reverse 0.3s forwards",
                    }}
                  />
                ) : (
                  <PlusIcon
                    className="size-5 text-red-900 transition hover:opacity-50"
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
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Eaque eius nesciunt maxime repellat labore accusamus eum sunt
                  nostrum voluptatem quas odio, doloremque illum expedita
                  impedit nam dolor ullam veritatis tenetur!
                </DisclosurePanel>
              )}
            </>
          )}
        </Disclosure>

        <div className="w-full h-[1px] bg-stone-200"></div>
      </div>
    </div>
  );
}
