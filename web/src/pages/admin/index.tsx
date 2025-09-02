import type { ReactNode } from "react";
import { Handbag, Package, Tag } from "lucide-react";

interface AdminLayoutProps {
  children?: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="admin bg-gray-50 h-screen">
      <header className="h-12 text-white bg-stone-800">
        <div className="h-12 flex items-center px-4 italic gap-3">
          <Handbag className="" />
          <h1 className="text-2xl font-bold">Ximei</h1>
        </div>
      </header>
      <div className="flex flex-row">
        <div className="w-80 bg-gray-100 p-4 text-sm text-stone-700 h-screen flex flex-col gap-3">
          <a
            href=""
            className="px-3 py-1.5 bg-white rounded-lg flex flex-row items-center gap-3 shadow-sm"
          >
            <Package size={20} />
            Coleções
          </a>
          <a href="" className="px-4 py-3 flex flex-row items-center gap-3">
            <Tag size={20} />
            Produtos
          </a>
        </div>

        <div className="w-full m-4 rounded-2xl text-black p-2">{children}</div>
      </div>
    </div>
  );
}
