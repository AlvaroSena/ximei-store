"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategories = void 0;
const prisma_1 = require("../../infra/prisma");
class ListCategories {
    async execute() {
        const categories = await prisma_1.prisma.category.findMany();
        return {
            categories,
        };
    }
}
exports.ListCategories = ListCategories;
