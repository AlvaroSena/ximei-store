"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProducts = void 0;
const prisma_1 = require("../../infra/prisma");
class ListProducts {
    async execute({ page, perPage }) {
        const skip = (page - 1) * perPage;
        const take = perPage;
        const [products, totalProducts] = await Promise.all([
            prisma_1.prisma.product.findMany({
                skip,
                take,
                include: {
                    images: true,
                },
            }),
            prisma_1.prisma.product.count(),
        ]);
        const totalPages = Math.ceil(totalProducts / perPage);
        return {
            products,
            totalProducts,
            totalPages,
            currentPage: page,
        };
    }
}
exports.ListProducts = ListProducts;
