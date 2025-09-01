import { createContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { CartItem } from "../types/cart-item";

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

export const ShoppingCartContext = createContext(
  {} as ShoppingCartContextProps
);

export function ShoppingCartContextProvider({
  children,
}: ShoppingCartContextProviderProps) {
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
    const itemAlreadyExists = cart.find(
      (cartItem: CartItem) => cartItem.productId === item.productId
    );

    if (itemAlreadyExists && itemAlreadyExists.variantId === item.variantId) {
      const itemAlreadyExistsIndex = cart.findIndex(
        (cartItem: CartItem) =>
          cartItem.productId === itemAlreadyExists.productId
      );

      cart.splice(itemAlreadyExistsIndex, 1);
      const newItem = itemAlreadyExists;
      newItem.quantity += item.quantity;
      newItem.totalPriceInCents += item.totalPriceInCents;

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

  function finalizeOrder() {
    let message = "# *Meu Pedido:*\n\n";

    cart.map((cartItem: CartItem) => {
      return (message += `${cartItem.quantity}x ${
        cartItem.title
      } - ${Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(cartItem.priceInCents / 100)}\n`);
    });

    let total = cart.reduce(
      (sum: number, item: CartItem) => sum + item.priceInCents * item.quantity,
      0
    );

    message += `\n-------------------------\n *Total:* R$ ${Intl.NumberFormat(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    ).format(total / 100)}`;

    const phoneNumber = import.meta.env.VITE_API_URL;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  }

  return (
    <ShoppingCartContext.Provider
      value={{ addToCart, deleteFromCart, cleanCart, finalizeOrder, cart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
