import type { Variant } from "./variant";

export type Product = {
  id: string;
  imageUrls: string[];
  title: string;
  priceInCents: number;
  description: string;
  slug: string;
  brand: string;
  categoryId: string;
  createdAt: Date;
  variants?: Variant[];
};
