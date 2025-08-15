import express, { type Application } from "express";
import cors from "cors";
import { routes } from "./infra/routes";
import { prisma } from "./infra/prisma";
import { errorHandler } from "./infra/middlewares/error-handler";

const app: Application = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL!,
    methods: "*",
  })
);
app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.json({ message: "hello, world" });
});

app.post("/seed", async (req, res) => {
  const { key } = req.body;

  if (key !== process.env.SEED_KEY) {
    res.status(401).json({ error: "Unauthorized" });
  }

  try {
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

    await prisma.$disconnect();

    res.json({
      message: "Seed finalizado: 50 produtos e imagens inseridos.",
    });
  } catch (err) {
    res.status(500).json({ error: "Erro no seed", details: err });
  }
});

app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
