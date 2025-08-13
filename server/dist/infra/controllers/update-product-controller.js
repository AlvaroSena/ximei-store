"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductController = void 0;
const resource_not_found_error_1 = require("../../application/errors/resource-not-found-error");
const update_product_1 = require("../../application/usecases/update-product");
class UpdateProductController {
    async handle(request, reply) {
        try {
            const { id } = request.params;
            const { title, description, price, brand, categoryId } = request.body;
            const updateProduct = new update_product_1.UpdateProduct();
            await updateProduct.execute({
                id,
                title,
                description,
                price,
                brand,
                categoryId,
            });
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
exports.UpdateProductController = UpdateProductController;
