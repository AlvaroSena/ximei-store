import { MoveLeft } from "lucide-react";

export function CraeteProduct() {
  return (
    <div className="max-w-[800px] mx-auto grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <a
          href="/admin/products"
          className="flex flex-row items-center gap-3 text-stone-800 text-xl font-semibold"
        >
          <MoveLeft />
          Adicionar produto
        </a>

        <div className="bg-white shadow-sm p-4 rounded-xl flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-sm font-semibold text-stone-800"
            >
              Título
            </label>
            <input
              id="title"
              type="text"
              placeholder="Título"
              className="px-1.5 py-1 border border-stone-200 rounded-lg text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-semibold text-stone-800"
            >
              Descrição
            </label>
            <textarea
              id="description"
              placeholder="Título"
              className="px-1.5 py-1 border border-stone-200 rounded-lg text-sm"
            ></textarea>
          </div>
        </div>

        <div className="bg-white shadow-sm p-4 rounded-xl flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="midia"
              className="text-sm font-semibold text-stone-800"
            >
              Midia
            </label>
            <input
              id="mdia"
              type="text"
              placeholder="Título"
              className="px-1.5 py-1 border border-stone-200 rounded-lg text-sm"
            />
          </div>
        </div>

        <div className="bg-white shadow-sm p-4 rounded-xl flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="price"
              className="text-sm font-semibold text-stone-800"
            >
              Preço
            </label>
            <input
              id="price"
              type="text"
              placeholder="0.00"
              className="px-1.5 py-1 border border-stone-200 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white shadow-sm p-4 rounded-xl flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="price"
              className="text-sm font-semibold text-stone-800"
            >
              Coleção do produto
            </label>
            <input
              id="price"
              type="text"
              placeholder="Adicione uma coleção"
              className="px-1.5 py-1 border border-stone-200 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
