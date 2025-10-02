import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../contexts/shopping-cart-context";
import { CartItem } from "./cart-item";
import { LoaderCircle } from "lucide-react";
import type { CartItem as CartItemType } from "../types/cart-item";
import whatsappIcon from "../assets/64px-WhatsApp.svg.png";
import { generateOrderMessage } from "../utils/generate-order-message";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [isSendingOrder, setIsSendingOrder] = useState(false);
  const [isOrderFilled, setIsOrderFilled] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const { cart, finalizeOrder } = useContext(ShoppingCartContext);
  const [cartData, setCartData] = useState<any>([]);
  let total = 0;

  for (const item of cart) {
    total += item.totalPriceInCents;
  }

  useEffect(() => {
    setCartData(cart);
  }, [cart]);

  async function submitOrder() {
    setIsSendingOrder(true);

    setTimeout(async () => {
      const orderId = await finalizeOrder();
      setIsSendingOrder(false);

      if (orderId) {
        const encodedMessage = generateOrderMessage(orderId);
        setOrderMessage(encodedMessage);

        setIsOrderFilled(true);
      }
    }, 1500);
  }

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
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
            <button aria-label="Fechar carrinho" onClick={onClose} className="p-2 transition">
              <XMarkIcon className={`size-6 text-stone-900 transition hover:opacity-50`} />
            </button>
          </header>

          {isOrderFilled ? (
            <div className="h-full px-6 py-4 flex flex-col items-center justify-center gap-4">
              <img src={whatsappIcon} alt="Icone do whatsapp" />
              <a
                href={`https://api.whatsapp.com/send?phone=${import.meta.env.VITE_PHONE_NUMBER}&text=${orderMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white p-4 text-sm transition hover:bg-green-700"
              >
                <span>FINALIZAR NO WHATSAPP</span>
              </a>
            </div>
          ) : (
            <>
              <main className="flex-1 overflow-auto px-6 py-4">
                {cartData.length >= 1 ? (
                  cartData?.map((item: CartItemType, index: number) => {
                    return <CartItem key={index} itemIndex={index} data={item} />;
                  })
                ) : (
                  <div className="flex flex-col h-full items-center justify-center gap-4">
                    <p className="text-red-950 font-semibold text-2xl">Seu carrinho está vazio</p>
                    <a
                      href="/catalog"
                      className=" bg-red-900 text-white text-lg py-4 px-6 font-medium transition hover:opacity-90"
                    >
                      COMEÇAR A COMPRAR
                    </a>
                  </div>
                )}
              </main>

              {cart.length >= 1 && (
                <footer className="border-t border-neutral-200 px-6 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xl text-red-950">Total</p>
                    <p className="text-xl font-semibold text-red-950">
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(total / 100)}
                    </p>
                  </div>

                  <div className="w-full flex flex-row items-center gap-4">
                    {/* <button
                      onClick={onClose}
                      className="w-full border border-red-900 px-6 py-4 font-medium text-lg transition hover:bg-red-900 hover:text-white"
                    >
                      IR PARA O CARRINHO
                    </button> */}

                    <button
                      onClick={submitOrder}
                      className="w-full flex flex-row items-center justify-center gap-2 bg-red-900 text-white text-lg py-4 px-6 font-medium transition hover:opacity-90"
                    >
                      {isSendingOrder ? (
                        <>
                          <LoaderCircle className="animate-spin text-white" />
                          CONTINUANDO...
                        </>
                      ) : (
                        "CONTINUAR"
                      )}
                    </button>
                  </div>
                </footer>
              )}
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
