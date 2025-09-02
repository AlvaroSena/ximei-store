import { useState } from "react";
import { Checkbox, Switch } from "@headlessui/react";
import { Plus } from "lucide-react";

export function AdminProducts() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Produtos</h1>
        <a
          href="/admin/products/create"
          className="bg-stone-800 px-4 py-1.5 text-white text-sm rounded-lg shadow-sm flex flex-row items-center gap-2"
        >
          <Plus size={18} />
          Novo produto
        </a>
      </div>

      <div className="rounded-xl bg-white my-8 shadow-sm">
        <table className="min-w-full">
          <thead className="border-b border-stone-100">
            <tr>
              <th className="px-4 py-4 text-left">
                <Checkbox
                  checked={enabled}
                  onChange={setEnabled}
                  className="group block size-4 rounded border border-stone-200 bg-white data-checked:bg-blue-900"
                >
                  {/* Checkmark icon */}
                  <svg
                    className="stroke-white opacity-0 group-data-checked:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Checkbox>
              </th>
              <th className="px-4 py-2 text-left text-stone-500 text-sm font-normal">
                Título
              </th>
              <th className="px-4 py-2 text-left text-stone-500 text-sm font-normal">
                Preço
              </th>
              <th className="px-4 py-2 text-left text-stone-500 text-sm font-normal">
                Marca
              </th>
              <th className="px-4 py-2 text-left text-stone-500 text-sm font-normal">
                Variações
              </th>
              <th className="px-4 py-2 text-left text-stone-500 text-sm font-normal">
                Data de criação
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td className="px-4 py-2 text-stone-700">
                <Checkbox
                  checked={enabled}
                  onChange={setEnabled}
                  className="group block size-4 rounded border border-stone-200 bg-white data-checked:bg-blue-900"
                >
                  {/* Checkmark icon */}
                  <svg
                    className="stroke-white opacity-0 group-data-checked:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Checkbox>
              </td>
              <td className="px-4 py-2 text-stone-700">Tênis Nike</td>
              <td className="px-4 py-2 text-stone-700">
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-blue-900"
                >
                  <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                </Switch>
              </td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-stone-700">
                <Checkbox
                  checked={enabled}
                  onChange={setEnabled}
                  className="group block size-4 rounded border border-stone-200 bg-white data-checked:bg-blue-900"
                >
                  {/* Checkmark icon */}
                  <svg
                    className="stroke-white opacity-0 group-data-checked:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Checkbox>
              </td>
              <td className="px-4 py-2 text-stone-700">Sandália</td>
              <td className="px-4 py-2 text-stone-700">
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-blue-900"
                >
                  <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                </Switch>
              </td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-stone-700">
                <Checkbox
                  checked={enabled}
                  onChange={setEnabled}
                  className="group block size-4 rounded border border-stone-200 bg-white data-checked:bg-blue-900"
                >
                  {/* Checkmark icon */}
                  <svg
                    className="stroke-white opacity-0 group-data-checked:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Checkbox>
              </td>
              <td className="px-4 py-2 text-stone-700">Bota</td>
              <td className="px-4 py-2 text-stone-700">
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-blue-900"
                >
                  <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                </Switch>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
