"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProduct = void 0;
const prisma_1 = require("../../infra/prisma");
const slugify_1 = require("../../utils/slugify");
class CreateProduct {
    async execute({ title, description, price, brand, categoryId, }) {
        const category = await prisma_1.prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });
        if (!category) {
            throw new Error("Category not found");
        }
        await prisma_1.prisma.product.create({
            data: {
                title,
                description,
                priceInCents: price * 100,
                brand,
                slug: (0, slugify_1.slugify)(title),
                categoryId: category.id,
            },
        });
    }
}
exports.CreateProduct = CreateProduct;
