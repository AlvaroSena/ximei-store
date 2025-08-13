"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const create_product_1 = require("../../application/usecases/create-product");
const resource_not_found_error_1 = require("../../application/errors/resource-not-found-error");
class CreateProductController {
    async handle(request, reply) {
        try {
            const { title, description, price, brand, categoryId } = request.body;
            const createProduct = new create_product_1.CreateProduct();
            await createProduct.execute({
                title,
                description,
                price,
                brand,
                categoryId,
            });
            reply.status(201).send();
        }
        catch (err) {
            if (err instanceof resource_not_found_error_1.ResourceNotFoundError) {
                reply.status(404).json({ message: err.message });
            }
            console.log(err);
        }
    }
}
exports.CreateProductController = CreateProductController;
