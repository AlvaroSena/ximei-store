import { HeroBanner } from "../components/hero-banner";
import { getFeaturedCategories, getFeaturedProducts } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { Title, Link, Meta } from "react-head";
import { FeaturedProducts } from "../components/featured-products";
import { FeaturedCollections } from "../components/featured-collections";

export function Home() {
  const {
    data: featuredProductsData,
    isPending: isPendingProducts,
    error: errorProducts,
  } = useQuery({
    queryKey: ["featured-products"],
    queryFn: getFeaturedProducts,
  });

  const {
    data: featuredCategoriesData,
    isPending: isPendingCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ["featured-categories"],
    queryFn: getFeaturedCategories,
  });

  if (isPendingProducts || isPendingCategories) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin text-red-900 size-10" />
      </div>
    );
  }

  if (errorProducts || errorCategories) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h3 className="text-xl font-semibold text-stone-900">
          Nenhum produto foi encontrado.
        </h3>
      </div>
    );
  }

  return (
    <div>
      <Title>Home | Loja Ximei</Title>
      <Link rel="canonical" href="https://ximei.vercel.app/" />
      <Meta
        name="description"
        content="Descubra o catálogo de bolsas da loja Ximei. Elegância e estilo em cada detalhe."
      />
      <HeroBanner />
      <div className="max-w-[1120px] flex flex-col gap-8 px-4 lg:px-0 mx-auto my-32">
        <FeaturedCollections categories={featuredCategoriesData.categories} />
        <FeaturedProducts products={featuredProductsData.products} />
      </div>
    </div>
  );
}
