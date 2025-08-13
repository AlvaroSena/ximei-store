"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategory = void 0;
const prisma_1 = require("../../infra/prisma");
const slugify_1 = require("../../utils/slugify");
const resource_not_found_error_1 = require("../errors/resource-not-found-error");
class UpdateCategory {
    async execute({ id, title }) {
        const category = await prisma_1.prisma.category.findUnique({
            where: {
                id,
            },
        });
        if (!category) {
            throw new resource_not_found_error_1.ResourceNotFoundError("Category not found");
        }
        await prisma_1.prisma.category.update({
            where: {
                id,
            },
            data: {
                title,
                slug: (0, slugify_1.slugify)(title),
            },
        });
    }
}
exports.UpdateCategory = UpdateCategory;
