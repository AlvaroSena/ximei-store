import { prisma } from ".";

// prisma/seed.ts
export async function main() {
  const categoryId = "1affc447-ed83-4b62-bb4c-0af625f5022d";

  // Lista de nomes diferentes para bolsas (sem números)
  const productNames = [
    "Bolsa Elegance",
    "Bolsa Clássica",
    "Bolsa Casual",
    "Bolsa Premium",
    "Bolsa de Ombro",
    "Bolsa de Mão",
    "Bolsa Tote",
    "Bolsa Shopping",
    "Bolsa Transversal",
    "Bolsa Vintage",
    "Bolsa Minimalista",
    "Bolsa Luxo",
    "Bolsa Charmosa",
    "Bolsa Moderna",
    "Bolsa Sofisticada",
    "Bolsa Chic",
    "Bolsa Estilo Urbano",
    "Bolsa Glamour",
    "Bolsa Feminina",
    "Bolsa Fashion",
    "Bolsa Exclusiva",
    "Bolsa Estilo Retrô",
    "Bolsa Compacta",
    "Bolsa Grande",
    "Bolsa Pequena",
    "Bolsa Estilo Executivo",
    "Bolsa Versátil",
    "Bolsa Boho",
    "Bolsa Clássico Moderno",
    "Bolsa Estilo Praia",
    "Bolsa Urbana",
    "Bolsa Social",
    "Bolsa Deluxe",
    "Bolsa Original",
    "Bolsa Estilo Minimal",
    "Bolsa Luxuosa",
    "Bolsa Moderna Chic",
    "Bolsa Clássica Luxo",
    "Bolsa Tendência",
    "Bolsa Casual Luxo",
    "Bolsa Leve",
    "Bolsa Estilo Noite",
    "Bolsa Estilo Dia",
    "Bolsa Contemporânea",
    "Bolsa Premium Chic",
    "Bolsa Essencial",
    "Bolsa Estilo Vintage",
    "Bolsa Glamour Clássico",
    "Bolsa Fashion Luxo",
    "Bolsa Atemporal",
  ];

  // Criar os produtos
  const createdProducts = [];
  for (let i = 0; i < 50; i++) {
    const product = await prisma.product.create({
      data: {
        title: productNames[i],
        description: `Uma bolsa ${productNames[
          i
        ].toLowerCase()} da Gucci, perfeita para diversas ocasiões.`,
        slug: productNames[i].toLowerCase().replace(/\s+/g, "-"),
        priceInCents: 299.99 * 100,
        brand: "Gucci",
        categoryId,
      },
    });
    createdProducts.push(product);
  }

  // Criar as imagens para cada produto
  for (let i = 0; i < createdProducts.length; i++) {
    await prisma.productImage.create({
      data: {
        productId: createdProducts[i].id,
        url: `https://ximei-store.s3.sa-east-1.amazonaws.com/bolsa-${
          i + 1
        }.jpeg`,
        order: 1,
      },
    });
  }

  console.log("Seed finalizado: 50 produtos e imagens inseridos.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
