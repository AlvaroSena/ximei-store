import { PrismaClient } from "../generated/prisma";
import { slugify } from "../src/utils/slugify";
const prisma = new PrismaClient();

async function main() {
  const productIds = [
    "73a01c92-05ec-4619-8b91-e34212fce7f9",
    "d8ae605d-d419-4bcd-8d1a-d13527ada5e7",
    "abc3cf56-8445-4737-af2d-c51ecf5227fe",
    "96092c4f-6229-40fb-beef-4826115104a6",
    "10db1f66-34a5-4501-bd08-184ee47f6f42",
    "fcbe2ea5-6a7e-4309-8494-04a443057fda",
    "ec74872d-c56e-443b-9363-b36eb19d4d1b",
    "d52de04b-3a53-406e-a763-551adcabb349",
    "5a217d58-89a7-43bd-aca2-f7be591ca4d1",
    "7407e869-3775-4728-921c-bbc5861a8014",
    "127539bd-23ff-40f1-adbf-f01a6d58cdfd",
    "72fc5248-283f-4357-81c0-0635966018be",
    "80411809-6ebc-4249-9336-78895272399c",
    "a779e6b7-210a-4dea-9332-2145f27b23c8",
    "58ebe325-dc64-4721-aa9f-2ed554d2a9f9",
    "d31594c1-24c8-4b96-9b0c-5e9bad9e5636",
    "9ff5ea1e-166d-45bd-8175-50fb01966e54",
    "11324819-9042-4dce-9ce8-5cf1f715a802",
    "75baba55-c5d7-4825-b48d-84321c5c9f9a",
    "d11c7322-1318-44a4-8266-a3aa92221b9a",
    "f72b4d6f-70b0-418b-84b2-98d2cd258ddc",
    "71bc87d3-a66b-41dd-914b-1f3a15193f69",
    "9b57a7f3-c953-4d2f-89f0-79cca8cfb837",
    "2bb2616a-e203-4b15-98f9-36a20ff4cbba",
    "a8b4edca-8bd1-416d-8324-de7e6fc1ad49",
    "0d86819a-e88b-48e5-a368-dd6a92717d81",
    "bb996236-07f6-44b9-8759-e79bccf73bbd",
    "a59b6fe7-c6d1-4220-9a88-8db431b75b02",
    "7f3662f0-51eb-45c7-9a29-00bd4356e816",
    "fd778d8a-43fd-4c5a-aaf7-0633f59fef18",
    "fd778d8a-43fd-4c5a-aaf7-0633f59fef18",
    "8019e273-d6b0-45a4-a1bb-01ac9dc7fabb",
    "17b58866-7ea4-4863-a62d-453ae47f709e",
    "e5766ec4-8cef-48e0-a7b6-8d7d08b266c7",
    "d0406afc-58a6-4ced-958b-429437fdbf2e",
    "1492f095-92dc-4c10-bff6-b4083e1bab18",
    "1a894999-7fe9-4e51-bd6f-7bdc2e2c679c",
    "fd778d8a-43fd-4c5a-aaf7-0633f59fef18",
    "fd778d8a-43fd-4c5a-aaf7-0633f59fef18",
    "4fca19a2-6f0f-461a-8410-0decb6421433",
    "c5134b3e-34cd-44a7-bfb2-5f1356650262",
    "513ba839-853c-4d6f-8fed-7aab27df28be",
    "807a86cf-cdcd-4a6f-a2df-07b2dfad8aec",
    "12454155-349f-4cb3-b750-19e098de81df",
    "2e5ce0f7-31d9-4bf6-81f7-0362e85d779d",
    "0b90bad5-f7c2-48ec-adb4-fdc5dc6094e4",
    "5c8d3229-2520-4039-8b17-ad99a517122e",
  ];

  const productImages = productIds.map((productId, index) => ({
    productId,
    url: `https://ximei-store.s3.sa-east-1.amazonaws.com/bolsa-${
      index + 1
    }.jpeg`,
    order: 1,
  }));

  await prisma.productImage.createMany({
    data: productImages,
    skipDuplicates: true,
  });

  console.log("Seed de productImage executado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
