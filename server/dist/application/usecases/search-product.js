"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchProduct = void 0;
const prisma_1 = require("../../infra/prisma");
class SearchProduct {
    async execute({ query }) {
        const products = await prisma_1.prisma.product.findMany({
            where: {
                title: {
                    contains: query,
                    mode: "insensitive",
                },
            },
            include: {
                images: true,
            },
            take: 25,
            orderBy: { title: "asc" },
        });
        return {
            products,
        };
    }
}
exports.SearchProduct = SearchProduct;
