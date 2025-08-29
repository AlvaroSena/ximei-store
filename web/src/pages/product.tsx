import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../lib/api";
import { Title, Link, Meta } from "react-head";
import type { Product as ProductType } from "../types/product";
import { ProductTemplate } from "../components/product-template";
import type { Variant } from "../types/variant";

type GetProductResponse = {
  product: ProductType;
};

export function Product() {
  const { productSlug } = useParams();
  const [searchParams] = useSearchParams();
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [isLoadingVariant, setIsLoadingVariant] = useState(false);

  const variantParam = searchParams.get("variant") as string;

  if (!productSlug) {
    return;
  }

  const { data, isPending, error } = useQuery<GetProductResponse>({
    queryKey: ["product"],
    queryFn: async () => await getProduct(productSlug),
  });

  useEffect(() => {
    if (data && variantParam) {
      setIsLoadingVariant(true);
      const variant = data.product.variants?.find(
        (item: Variant) => item.slug === variantParam
      );

      if (variant) {
        setTimeout(() => {
          setSelectedVariant(variant);
          setIsLoadingVariant(false);
        }, 250);
      }
    }
  }, [data, variantParam]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin text-red-900 size-10" />
      </div>
    );
  }

  if (isLoadingVariant) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin text-red-900 size-10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h3 className="text-xl font-semibold text-stone-900">
          Produto não foi encontrado.
        </h3>
      </div>
    );
  }

  return (
    <>
      <Title>
        {data.product ? `${data.product.title} | Loja Ximei` : "Carregando..."}
      </Title>

      <Link rel="canonical" href={`https://ximei.vercel.app/${productSlug}`} />
      <Meta
        name="description"
        content={`Compre a bolsa ${data?.product.title} na loja Ximei. Disponível online.`}
      />

      <ProductTemplate
        product={data?.product}
        currentVariant={selectedVariant}
      />
    </>
  );
}
