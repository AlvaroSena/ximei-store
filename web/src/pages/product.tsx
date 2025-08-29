import { LoaderCircle } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../lib/api";
import { Title, Link, Meta } from "react-head";
// import type { Image } from "../types/image";
import type { Product as ProductType } from "../types/product";
import { ProductTemplate } from "../components/product-template";
import { useState } from "react";

type GetProductResponse = {
  product: ProductType;
};

export function Product() {
  const isMobile = useIsMobile(768);
  const { productSlug } = useParams();
  const [searchParams] = useSearchParams();

  const variant = searchParams.get("variant") as string;

  if (!productSlug) {
    return;
  }

  const { data, isPending, error } = useQuery<GetProductResponse>({
    queryKey: ["product"],
    queryFn: async () => await getProduct(productSlug, variant),
  });

  if (isPending) {
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
    <div className="max-w-[1120px] mx-auto my-8 flex flex-col md:flex-row gap-8">
      <Title>
        {data.product ? `${data.product.title} | Loja Ximei` : "Carregando..."}
      </Title>

      <Link rel="canonical" href={`https://ximei.vercel.app/${productSlug}`} />
      <Meta
        name="description"
        content={`Compre a bolsa ${data?.product.title} na loja Ximei. Disponível online.`}
      />

      {/* <div
        className={`
          ${
            isMobile
              ? "flex overflow-x-auto gap-4 snap-x snap-mandatory"
              : `grid gap-4 ${
                  data?.product.images.length > 1
                    ? "grid-cols-2"
                    : "grid-cols-1"
                }`
          }
        `}
      >
        {data?.product.images.map((image: Image) => {
          return (
            <React.Fragment key={image.id}>
              {!isMobile ? (
                <Zoom>
                  <img
                    key={image.id}
                    src={image.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </Zoom>
              ) : (
                <img
                  key={image.id}
                  src={image.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </React.Fragment>
          );
        })}
      </div> */}

      <ProductTemplate
        product={data?.product}
        variants={data?.product.variants}
      />
    </div>
  );
}
