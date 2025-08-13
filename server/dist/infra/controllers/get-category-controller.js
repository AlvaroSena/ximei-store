"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCategoryController = void 0;
const resource_not_found_error_1 = require("../../application/errors/resource-not-found-error");
const get_category_1 = require("../../application/usecases/get-category");
class GetCategoryController {
    async handle(request, reply) {
        try {
            const { id } = request.params;
            const getCategory = new get_category_1.GetCategory();
            const category = await getCategory.execute({ id });
            reply.json(category);
        }
        catch (err) {
            if (err instanceof resource_not_found_error_1.ResourceNotFoundError) {
                reply.status(404).json({ message: err.message });
            }
            console.log(err);
        }
    }
}
exports.GetCategoryController = GetCategoryController;
