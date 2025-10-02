import { createContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { CartItem } from "../types/cart-item";
import { api } from "../lib/api";

interface ShoppingCartContextProviderProps {
  children?: ReactNode;
}

interface ShoppingCartContextProps {
  addToCart: (item: CartItem) => any;
  deleteFromCart: (itemIndex: number) => void;
  cleanCart: () => void;
  finalizeOrder: () => void;
  cart: CartItem[];
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export function ShoppingCartContextProvider({ children }: ShoppingCartContextProviderProps) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      return JSON.parse(storedCart);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item: CartItem) {
    const itemAlreadyExists = cart.find((cartItem: CartItem) => cartItem.productId === item.productId);

    if (itemAlreadyExists && itemAlreadyExists.variantId === item.variantId) {
      const itemAlreadyExistsIndex = cart.findIndex(
        (cartItem: CartItem) => cartItem.productId === itemAlreadyExists.productId,
      );

      cart.splice(itemAlreadyExistsIndex, 1);
      const newItem = itemAlreadyExists;
      newItem.quantity += item.quantity;
      newItem.totalPriceInCents += item.totalPriceInCents;
      newItem.variantAttributesValues = [...newItem.variantAttributesValues, item.variantAttributesValues[0]];

      toast.success(`${newItem.title} foi adicionado ao carrinho`);
      return setCart([...cart, newItem]);
    }

    toast.success(`${item.title} foi adicionado ao carrinho`);
    return setCart([...cart, item]);
  }

  function deleteFromCart(itemIndex: number) {
    if (itemIndex === null) {
      console.error("Item idx not found");
      return;
    }

    cart.splice(itemIndex, 1);
    toast.info(`Item foi removido do carrinho`);
    return setCart([...cart]);
  }

  function cleanCart() {
    setCart([]);
  }

  async function finalizeOrder() {
    try {
      let total = cart.reduce((sum: number, item: CartItem) => sum + item.priceInCents * item.quantity, 0);

      const response = await api.post("/orders", {
        items: cart,
        total,
      });

      if (response && response.data) {
        const data = response.data;

        const lines: string[] = [];

        const summaryUrl = `${import.meta.env.VITE_APP_URL}/orders/${data.orderId}`;

        lines.push("🛒 Quero finalizar meu pedido");
        lines.push("");
        lines.push("Resumo do meu pedido (clique para ver todos os itens):");
        lines.push(`👉 ${summaryUrl}`);
        lines.push("");
        lines.push("✅ Confira no link acima");
        lines.push("✅ Não precisa me pedir o modelo, já está tudo no link");

        const text = lines.join("\n");
        const encoded = encodeURIComponent(text);

        const phoneNumber = import.meta.env.VITE_PHONE_NUMBER;
        const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
        window.open(url, "_blank");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ShoppingCartContext.Provider value={{ addToCart, deleteFromCart, cleanCart, finalizeOrder, cart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
