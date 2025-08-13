"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryController = void 0;
const update_category_1 = require("../../application/usecases/update-category");
const resource_not_found_error_1 = require("../../application/errors/resource-not-found-error");
class UpdateCategoryController {
    async handle(request, reply) {
        try {
            const { id } = request.params;
            const { title } = request.body;
            const updateCategory = new update_category_1.UpdateCategory();
            await updateCategory.execute({ id, title });
            reply.status(204).send();
        }
        catch (err) {
            if (err instanceof resource_not_found_error_1.ResourceNotFoundError) {
                reply.status(404).json({ message: err.message });
            }
            console.log(err);
        }
    }
}
exports.UpdateCategoryController = UpdateCategoryController;
