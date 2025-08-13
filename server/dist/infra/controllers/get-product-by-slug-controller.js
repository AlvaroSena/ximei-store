"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductBySlugController = void 0;
const resource_not_found_error_1 = require("../../application/errors/resource-not-found-error");
const get_product_by_slug_1 = require("../../application/usecases/get-product-by-slug");
class GetProductBySlugController {
    async handle(request, reply) {
        try {
            const { slug } = request.params;
            const getProduct = new get_product_by_slug_1.GetProductBySlug();
            const product = await getProduct.execute({ slug });
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
exports.GetProductBySlugController = GetProductBySlugController;
