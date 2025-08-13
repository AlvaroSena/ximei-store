"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoriesController = void 0;
const list_categories_1 = require("../../application/usecases/list-categories");
class ListCategoriesController {
    async handle(request, reply) {
        try {
            const listCategories = new list_categories_1.ListCategories();
            const categories = await listCategories.execute();
            reply.json(categories);
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.ListCategoriesController = ListCategoriesController;
