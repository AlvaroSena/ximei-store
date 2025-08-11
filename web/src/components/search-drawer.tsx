import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type SearchDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
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
        className={`fixed top-0 right-0 h-full w-full  md:w-[35vw] min-w-[260px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-bold text-stone-900">PESQUISE</h2>
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
            <div className="border-b border-stone-900 w-full py-3 flex flex-row items-center">
              <input
                type="text"
                placeholder="O que você está procurando?"
                className=" outline-none w-full placeholder-neutral-400 text-stone-900"
              />
              <MagnifyingGlassIcon className="size-6 text-zinc-900" />
            </div>
          </main>
        </div>
      </aside>
    </div>
  );
}
