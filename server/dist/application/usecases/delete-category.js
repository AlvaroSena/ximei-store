"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategory = void 0;
const prisma_1 = require("../../infra/prisma");
const resource_not_found_error_1 = require("../errors/resource-not-found-error");
class DeleteCategory {
    async execute({ id }) {
        const category = await prisma_1.prisma.category.findUnique({
            where: {
                id,
            },
        });
        if (!category) {
            throw new resource_not_found_error_1.ResourceNotFoundError("Category not found");
        }
        await prisma_1.prisma.category.delete({
            where: {
                id: category.id,
            },
        });
    }
}
exports.DeleteCategory = DeleteCategory;
