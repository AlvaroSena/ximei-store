"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductController = void 0;
const resource_not_found_error_1 = require("../../application/errors/resource-not-found-error");
const delete_product_1 = require("../../application/usecases/delete-product");
class DeleteProductController {
    async handle(request, reply) {
        try {
            const { id } = request.params;
            const deleteProduct = new delete_product_1.DeleteProduct();
            await deleteProduct.execute({ id });
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
exports.DeleteProductController = DeleteProductController;
