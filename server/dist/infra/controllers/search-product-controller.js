"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchProductController = void 0;
const search_product_1 = require("../../application/usecases/search-product");
class SearchProductController {
    async handle(request, reply) {
        const query = request.query.q;
        const searchProduct = new search_product_1.SearchProduct();
        const products = await searchProduct.execute({ query });
        reply.json(products);
    }
}
exports.SearchProductController = SearchProductController;
