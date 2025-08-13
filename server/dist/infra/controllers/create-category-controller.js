"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryController = void 0;
const create_category_1 = require("../../application/usecases/create-category");
class CreateCategoryController {
    async handle(request, reply) {
        try {
            const { title } = request.body;
            const createCategory = new create_category_1.CreateCategory();
            await createCategory.execute({ title });
            reply.status(201).send();
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.CreateCategoryController = CreateCategoryController;
