import type { Image } from "./image";

export type Product = {
  id: string;
  title: string;
  description: string;
  slug: string;
  priceInCents: number;
  brand: string;
  categoryId: string;
  createdAt: Date;
  images: Image[];
};
