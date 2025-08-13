"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductController = void 0;
const resource_not_found_error_1 = require("../../application/errors/resource-not-found-error");
const get_product_1 = require("../../application/usecases/get-product");
class GetProductController {
    async handle(request, reply) {
        try {
            const { id } = request.params;
            const getProduct = new get_product_1.GetProduct();
            const product = await getProduct.execute({ id });
            reply.json(product);
        }
        catch (err) {
            if (err instanceof resource_not_found_error_1.ResourceNotFoundError) {
                reply.status(404).json({ message: err.message });
            }
            console.log(err);
        }
    }
}
exports.GetProductController = GetProductController;
