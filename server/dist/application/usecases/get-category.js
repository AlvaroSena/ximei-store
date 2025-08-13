"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCategory = void 0;
const prisma_1 = require("../../infra/prisma");
const resource_not_found_error_1 = require("../errors/resource-not-found-error");
class GetCategory {
    async execute({ id }) {
        const category = await prisma_1.prisma.category.findUnique({
            where: {
                id,
            },
        });
        if (!category) {
            throw new resource_not_found_error_1.ResourceNotFoundError("Category not found");
        }
        return {
            category,
        };
    }
}
exports.GetCategory = GetCategory;
