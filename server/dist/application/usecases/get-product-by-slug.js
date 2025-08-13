"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductBySlug = void 0;
const prisma_1 = require("../../infra/prisma");
const resource_not_found_error_1 = require("../errors/resource-not-found-error");
class GetProductBySlug {
    async execute({ slug }) {
        const product = await prisma_1.prisma.product.findUnique({
            where: {
                slug,
            },
            include: {
                images: true,
            },
        });
        if (!product) {
            throw new resource_not_found_error_1.ResourceNotFoundError("Product not found");
        }
        return {
            product,
        };
    }
}
exports.GetProductBySlug = GetProductBySlug;
