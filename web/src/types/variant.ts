import type { VariantAttribute } from "./variant-attribute";

export type Variant = {
  id: string;
  imageUrl?: string | null;
  title: string;
  slug: string;
  productId: string;
  priceInCents: number;
  basePriceInCents?: number;
  isAnOffer?: boolean | null;
  attributes: VariantAttribute[];
};
