import { EmptyImage } from "./empty-imagem";
import type { Category } from "../types/category";

type CollectionCardProps = {
  category: Category;
  index: number;
};

export function CollectionCard({ category, index }: CollectionCardProps) {
  return (
    <a
      href={`/${category.slug}`}
      className={`relative group min-w-[90%] sm:min-w-[40%] lg:min-w-[30%] snap-center overflow-hidden cursor-pointer text-white ${
        index === 2 ? "col-span-2" : ""
      }`}
    >
      {!category.imageUrl ? (
        <EmptyImage />
      ) : (
        <img
          src={category.imageUrl}
          alt="Imagem da Bolsa deste produto"
          className="relative min-w-96 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
      )}

      <div className="absolute inset-0 bg-black/20 transition duration-500 group-hover:bg-black/40"></div>

      <div className="absolute w-full bottom-0 text-center p-6 ">
        <h1 className="text-3xl font-bold">{category.title}</h1>
        <h2 className="text-lg font-medium text-center">
          {category.description}
        </h2>
      </div>
    </a>
  );
}
