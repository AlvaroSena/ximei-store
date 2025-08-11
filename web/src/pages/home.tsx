import { HeroBanner } from "../components/hero-banner";
import { ProductCart } from "../components/product-cart";

export function Home() {
  return (
    <div>
      <HeroBanner />
      <div className="max-w-[1120px] mx-auto my-8">
        <ProductCart />
      </div>
    </div>
  );
}
