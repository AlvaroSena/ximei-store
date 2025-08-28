import type { Variant } from "./variant";

export type Product = {
  id: string;
  imageUrl?: string | null;
  title: string;
  description: string;
  slug: string;
  brand: string;
  categoryId: string;
  createdAt: Date;
  variants: Variant[];
};
