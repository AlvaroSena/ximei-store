"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProduct = void 0;
const prisma_1 = require("../../infra/prisma");
const resource_not_found_error_1 = require("../errors/resource-not-found-error");
class DeleteProduct {
    async execute({ id }) {
        const product = await prisma_1.prisma.product.findUnique({
            where: {
                id,
            },
        });
        if (!product) {
            throw new resource_not_found_error_1.ResourceNotFoundError("Product not found");
        }
        await prisma_1.prisma.product.delete({
            where: {
                id: product.id,
            },
        });
    }
}
exports.DeleteProduct = DeleteProduct;
