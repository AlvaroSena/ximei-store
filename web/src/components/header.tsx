import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function Header() {
  return (
    <>
      <div className="bg-red-950 w-full text-white text-center text-sm py-3">
        Frete gratis em todo o Brasil
      </div>
      <header className="bg-red-white w-full h-24 text-xl text-red-950 font-medium">
        <div className="max-w-[1120px] mx-auto h-20 flex flex-row justify-between items-center">
          <nav className="flex flex-row gap-5">
            <a
              href=""
              className="relative inline-block
                 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full
                 before:origin-left before:scale-x-0 before:bg-red-950 before:transition-transform before:duration-270
                 hover:before:scale-x-100"
            >
              Início
            </a>
            <a
              href=""
              className="relative inline-block
                 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full
                 before:origin-left before:scale-x-0 before:bg-red-950 before:transition-transform before:duration-270
                 hover:before:scale-x-100"
            >
              Catálogo
            </a>
          </nav>

          <a href="" className="block">
            Minha loja
          </a>

          <div className="flex flex-row items-center gap-5">
            <a href="">
              <MagnifyingGlassIcon className="size-6 text-red-950 transition hover:opacity-50" />
            </a>
            <a href="" className="">
              <ShoppingBagIcon className="size-6 text-red-950 transition hover:opacity-50" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
