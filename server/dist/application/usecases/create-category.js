"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategory = void 0;
const prisma_1 = require("../../infra/prisma");
const slugify_1 = require("../../utils/slugify");
class CreateCategory {
    async execute({ title }) {
        await prisma_1.prisma.category.create({
            data: {
                title,
                slug: (0, slugify_1.slugify)(title),
            },
        });
    }
}
exports.CreateCategory = CreateCategory;
