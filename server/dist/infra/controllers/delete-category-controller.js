"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoryController = void 0;
const resource_not_found_error_1 = require("../../application/errors/resource-not-found-error");
const delete_category_1 = require("../../application/usecases/delete-category");
class DeleteCategoryController {
    async handle(request, reply) {
        try {
            const { id } = request.params;
            const deleteCategory = new delete_category_1.DeleteCategory();
            await deleteCategory.execute({ id });
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
exports.DeleteCategoryController = DeleteCategoryController;
