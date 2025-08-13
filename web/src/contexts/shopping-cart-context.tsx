import { createContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

interface ShoppingCartContextProviderProps {
  children?: ReactNode;
}

interface ShoppingCartContextProps {
  addToCart: (item: any) => any;
  deleteFromCart: (itemId: string) => void;
  cleanCart: () => void;
  cart: any;
}

export const ShoppingCartContext = createContext(
  {} as ShoppingCartContextProps
);

export function ShoppingCartContextProvider({
  children,
}: ShoppingCartContextProviderProps) {
  const [cart, setCart] = useState<any>(() => {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      return JSON.parse(storedCart);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item: any) {
    const itemAlreadyExists = cart.find(
      (cartItem: any) => cartItem.id === item.id
    );

    if (itemAlreadyExists) {
      const itemAlreadyExistsIndex = cart.findIndex(
        (cartItem: any) => cartItem.id === itemAlreadyExists.id
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

  function deleteFromCart(itemId: string) {
    const item = cart.find((cartItem: any) => cartItem.id === itemId);

    if (!item) {
      console.error("Item not found");
      return;
    }

    const itemIndex = cart.findIndex(
      (cartItem: any) => cartItem.id === item.id
    );

    if (!itemIndex) {
      console.error("Item not found");
      return;
    }

    cart.splice(itemIndex, 1);
    toast.info(`Item foi removido do carrinho`);
    return setCart([...cart]);
  }

  function cleanCart() {
    setCart([]);
  }

  return (
    <ShoppingCartContext.Provider
      value={{ addToCart, deleteFromCart, cleanCart, cart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
