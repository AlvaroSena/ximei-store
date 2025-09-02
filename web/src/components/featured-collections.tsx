import type { Category } from "../types/category";
import { CollectionCard } from "./collection-card";

interface FeaturedCollectionsProps {
  categories: Category[];
}

export function FeaturedCollections({ categories }: FeaturedCollectionsProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-stone-900 mb-8">
        Coleções em destaque
      </h1>
      <div className="w-full overflow-x-auto snap-x snap-mandatory flex md:grid grid-cols-3 md:grid-cols-2 gap-4 scrollbar-hid">
        {categories.map((category: Category, index: number) => {
          return (
            <CollectionCard key={index} category={category} index={index} />
          );
        })}
      </div>
    </div>
  );
}
