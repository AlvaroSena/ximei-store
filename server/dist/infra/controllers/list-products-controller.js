"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductsController = void 0;
const list_products_1 = require("../../application/usecases/list-products");
class ListProductsController {
    async handle(request, reply) {
        try {
            const page = parseInt(request.query.page) || 1;
            const perPage = parseInt(request.query.perPage) || 10;
            const listProducts = new list_products_1.ListProducts();
            const products = await listProducts.execute({ page, perPage });
            reply.json(products);
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.ListProductsController = ListProductsController;
