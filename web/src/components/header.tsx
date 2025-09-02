import { useState, useEffect, useContext } from "react";
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import CartDrawer from "./cart-drawer";
import SearchDrawer from "./search-drawer";
import logo from "../assets/logo.png";
import { ShoppingCartContext } from "../contexts/shopping-cart-context";

export function Header() {
  const [open, setOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useContext(ShoppingCartContext);
  let totalCartQuantity = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  for (const item of cart) {
    totalCartQuantity += item.quantity;
  }

  return (
    <>
      <div className="bg-red-900 w-full text-white text-center text-sm py-3">
        🇧🇷 Envio para todo o Brasil
      </div>
      <header className="px-4 lg:p-0 sticky top-0 z-50 shadow-sm bg-white w-full h-24 text-xl text-stone-900 font-semibold">
        <div className="max-w-[1120px] mx-auto h-20 flex flex-row justify-between items-center">
          <nav className="hidden md:flex flex-row gap-5">
            <a
              href="/"
              className="relative inline-block
                 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full
                 before:origin-left before:scale-x-0 before:bg-stone-900 before:transition-transform before:duration-270
                 hover:before:scale-x-100"
            >
              Início
            </a>
            <a
              href="/catalog"
              className="relative inline-block
                 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full
                 before:origin-left before:scale-x-0 before:bg-stone-900 before:transition-transform before:duration-270
                 hover:before:scale-x-100"
            >
              Catálogo
            </a>
          </nav>

          <button
            className="md:hidden relative w-8 h-8 flex items-center justify-center group"
            onClick={() => setOpen(!open)}
          >
            <span
              className={`absolute h-0.5 w-6 bg-stone-900 rounded transition-all duration-300 ${
                open ? "rotate-45 translate-y-0" : "-translate-y-1.5"
              }`}
            />

            <span
              className={`absolute h-0.5 w-6 bg-stone-900 rounded transition-all duration-300 ${
                open ? "-rotate-45 translate-y-0" : "translate-y-1.5"
              }`}
            />
          </button>

          <div
            className={`fixed left-0 w-full bg-white border-t border-neutral-200 transform transition-transform duration-300 ease-in-out z-40 md:hidden`}
            style={{
              top: scrolled ? "96px" : `140px`,
              height: scrolled ? "calc(100vh - 96px)" : `calc(100vh - 140px)`,
              transform: open ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 text-lg relative">
              <a
                href="/"
                className="relative inline-block
                 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full
                 before:origin-left before:scale-x-0 before:bg-stone-900 before:transition-transform before:duration-270
                 hover:before:scale-x-100 font-semibold text-xl"
              >
                Início
              </a>
              <a
                href="/catalog"
                className="relative inline-block
                 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full
                 before:origin-left before:scale-x-0 before:bg-stone-900 before:transition-transform before:duration-270
                 hover:before:scale-x-100 font-semibold text-xl"
              >
                Catálogo
              </a>
            </div>
          </div>

          <a href="/" className="block">
            <img src={logo} alt="Logo Ximei Store" className="w-[72px]" />
          </a>

          <div className="flex flex-row items-center gap-5">
            <button className="" onClick={() => setIsSearchDrawerOpen(true)}>
              <MagnifyingGlassIcon className="size-6 text-stone-900 transition hover:opacity-50" />
            </button>
            <button className="relative" onClick={() => setIsCartOpen(true)}>
              {cart.length >= 1 && (
                <span className="absolute mx-1 my-[-5px] text-white bg-red-900 text-xs py-0.5 px-1.5 rounded-full">
                  {totalCartQuantity}
                </span>
              )}
              <ShoppingBagIcon className="size-6 stone-red-900 transition hover:opacity-50" />
            </button>
          </div>

          <SearchDrawer
            isOpen={isSearchDrawerOpen}
            onClose={() => setIsSearchDrawerOpen(false)}
          />

          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        </div>
      </header>
    </>
  );
}
