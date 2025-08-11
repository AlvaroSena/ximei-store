import { useState } from "react";
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import CartDrawer from "./cart-drawer";
import SearchDrawer from "./search-drawer";
import logo from "../assets/logo.png";

export function Header() {
  const [open, setOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);

  return (
    <>
      <div className="bg-red-900 w-full text-white text-center text-sm py-3">
        Frete gratis em todo o Brasil
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

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? (
              <XMarkIcon
                className={`size-9 text-red-900 transition hover:opacity-50`}
                style={{
                  animation: open
                    ? "top-spin 0.3s forwards"
                    : "top-spin-reverse 0.3s forwards",
                }}
              />
            ) : (
              <Bars3Icon
                className={`size-9 text-red-900 transition hover:opacity-50`}
                style={{
                  animation: open
                    ? "bottom-spin 0.3s forwards"
                    : "bottom-spin-reverse 0.3s forwards",
                }}
              />
            )}
          </button>

          <div
            className={`fixed left-0 w-full bg-white transform transition-transform duration-300 ease-in-out z-40 md:hidden`}
            style={{
              top: `96px`,
              height: `calc(100vh - 96px)`,
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
                href="/"
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
              <span className="absolute mx-1 my-[-5px] text-white bg-red-900 text-xs py-0.5 px-1.5 rounded-full">
                1
              </span>
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
