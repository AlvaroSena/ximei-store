export type CartItem = {
  productId: string;
  imageUrl: string;
  title: string;
  slug: string;
  priceInCents: number;
  quantity: number;
  totalPriceInCents: number;
  variantId: string | null;
  variantAttributesValues: any;
};
