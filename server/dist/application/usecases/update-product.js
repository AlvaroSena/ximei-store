"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProduct = void 0;
const prisma_1 = require("../../infra/prisma");
const slugify_1 = require("../../utils/slugify");
const resource_not_found_error_1 = require("../errors/resource-not-found-error");
class UpdateProduct {
    async execute({ id, title, description, price, brand, categoryId, }) {
        const product = await prisma_1.prisma.product.findUnique({
            where: {
                id,
            },
        });
        if (!product) {
            throw new resource_not_found_error_1.ResourceNotFoundError("Product not found");
        }
        await prisma_1.prisma.product.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                priceInCents: price * 100,
                brand,
                slug: (0, slugify_1.slugify)(title),
                categoryId,
            },
        });
    }
}
exports.UpdateProduct = UpdateProduct;
