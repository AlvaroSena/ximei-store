import { XMarkIcon } from "@heroicons/react/24/outline";
import { CartItem } from "./cart-item";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity?: number;
};

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  items?: CartItem[];
};

export default function CartDrawer({
  isOpen,
  onClose,
  items = [],
}: CartDrawerProps) {
  const total = items.reduce((s, it) => s + it.price * (it.quantity ?? 1), 0);

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
        className={`fixed top-0 right-0 h-full w-full  md:w-[40vw] min-w-[260px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-bold text-stone-900">CARRINHO</h2>
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
            <CartItem />
            <div className="w-full h-[1px] my-6 bg-stone-200"></div>
            <CartItem />
          </main>

          <footer className="border-t border-neutral-200 px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xl text-red-950">Total</p>
              <p className="text-xl font-semibold text-red-950">
                R$ {total.toFixed(2)} BRL
              </p>
            </div>

            <div className="w-full flex flex-row items-center gap-4">
              <button
                onClick={onClose}
                className="w-full border border-red-900 px-6 py-4 font-medium text-lg transition hover:bg-red-900 hover:text-white"
              >
                IR PARA O CARRINHO
              </button>

              <button
                onClick={() => alert("Ir para checkout")}
                className="w-full bg-red-900 text-white text-lg py-4 px-6 font-medium transition hover:opacity-90"
              >
                FINALIZAR
              </button>
            </div>
          </footer>
        </div>
      </aside>
    </div>
  );
}
