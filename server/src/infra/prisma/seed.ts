import { prisma } from "./index";
import { slugify } from "../../utils/slugify";

export async function seedProducts(categoryId: string) {
  const imageUrls = [
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-1.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-2.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-3.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-4.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-5.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-6.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-7.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-8.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-9.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-10.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-11.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-12.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-13.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-14.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-15.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-16.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-17.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-18.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-19.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-20.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-21.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-22.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-23.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-24.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-25.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-26.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-27.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-28.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-29.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-30.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-31.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-32.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-33.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-34.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-35.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-36.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-37.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-38.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-39.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-40.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-41.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-42.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-43.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-44.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-45.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-46.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-47.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-48.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-49.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-50.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-51.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-52.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-53.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-54.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-55.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-56.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-57.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-58.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-59.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-60.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-61.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-62.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-63.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-64.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-65.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-66.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-67.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-68.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-69.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-70.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-71.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-72.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-73.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-74.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-75.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-76.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-77.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-78.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-79.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-80.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-81.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-82.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-83.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-84.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-85.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-86.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-87.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-88.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-89.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-90.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-91.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-92.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-93.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-94.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-95.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-96.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-97.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-98.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-99.JPG",
    "https://ximei-store.s3.sa-east-1.amazonaws.com/saltos/salto-100.JPG",
  ];

  const tamanhos = ["36", "37", "38", "39", "40", "41", "42"];

  for (const url of imageUrls) {
    const title = "Produto " + Math.random().toString(36).substring(7); // pode adaptar
    const description = "Descrição do produto";
    const brand = "MinhaMarca";

    // Criação do produto
    const product = await prisma.product.create({
      data: {
        title,
        description,
        brand,
        categoryId,
        slug: slugify(title),
        priceInCents: 550 * 100,
        imageUrls: [url],
      },
    });

    // Criar primeira variant
    const variant1Title = "1 por R$ 550,00";
    const variant1 = await prisma.variant.create({
      data: {
        productId: product.id,
        title: variant1Title,
        priceInCents: 550 * 100,
        slug: slugify(product.title.concat("-1-par")),
        isAnOffer: false,
        imageUrl: url,
      },
    });

    await prisma.variantAttribute.create({
      data: {
        variantId: variant1.id,
        attributeName: "Tamanho",
        attributeValues: tamanhos,
      },
    });

    // Criar segunda variant
    const variant2Title = "2 por R$ 899,99";
    const variant2 = await prisma.variant.create({
      data: {
        productId: product.id,
        title: variant2Title,
        priceInCents: Math.round(899.99 * 100),
        basePriceInCents: 550 * 100,
        slug: slugify(product.title.concat("-2-pares")),
        isAnOffer: true,
        imageUrl: url,
      },
    });

    await prisma.variantAttribute.createMany({
      data: [
        {
          variantId: variant2.id,
          attributeName: "Tamanho 1º par",
          attributeValues: tamanhos,
        },
        {
          variantId: variant2.id,
          attributeName: "Tamanho 2º par",
          attributeValues: tamanhos,
        },
      ],
    });
  }
}

// Para rodar diretamente
async function main() {
  const categoryId = "5a9e1e79-5ffb-4580-bf33-2a93c9500425"; // <- você passa esse valor
  await seedProducts(categoryId);
  console.log("Seed concluído!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
