import { Router } from "express";
import { CreateCategoryController } from "../controllers/create-category-controller";
import { ListCategoriesController } from "../controllers/list-categories-controller";
import { UpdateCategoryController } from "../controllers/update-category-controller";
import { GetCategoryController } from "../controllers/get-category-controller";
import { DeleteCategoryController } from "../controllers/delete-category-controller";
import { CreateProductController } from "../controllers/create-product-controller";
import { ListProductsController } from "../controllers/list-products-controller";
import { UpdateProductController } from "../controllers/update-product-controller";
import { GetProductController } from "../controllers/get-product-controller";
import { DeleteProductController } from "../controllers/delete-product-controller";
import { GetProductBySlugController } from "../controllers/get-product-by-slug-controller";
import { SearchProductController } from "../controllers/search-product-controller";
import { CreateVariantAttributesController } from "../controllers/create-variant-attributes-controller";
import { ListProductVariantsController } from "../controllers/list-product-variants-controller";
import { CreateProductVariantController } from "../controllers/create-product-variant-controller";
import { UpdateProductVariantController } from "../controllers/update-product-variant-controller";
import { DeleteProductVariantController } from "../controllers/delete-product-variant-controller";
import { ListFeaturedCategoriesController } from "../controllers/list-featured-categories-controller";
import { ListProductsByCategoryController } from "../controllers/list-products-by-category-controller";

export const routes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const listFeaturedCategoriesController = new ListFeaturedCategoriesController();
const updateCategoryController = new UpdateCategoryController();
const getCategoryController = new GetCategoryController();
const deleteCategoryController = new DeleteCategoryController();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const updateProductController = new UpdateProductController();
const getProductController = new GetProductController();
const deleteProductController = new DeleteProductController();
const getProductBySlugController = new GetProductBySlugController();
const searchProductController = new SearchProductController();
const listProductsByCategoryController = new ListProductsByCategoryController();

const createProductVariantsController = new CreateProductVariantController();
const listProductVariantsController = new ListProductVariantsController();
const updateVariantController = new UpdateProductVariantController();
const deleteProductVariantController = new DeleteProductVariantController();

const createVariantAttributes = new CreateVariantAttributesController();

routes.post("/v1/categories", createCategoryController.handle);
routes.get("/v1/categories", listCategoriesController.handle);
routes.get("/v1/categories/featured", listFeaturedCategoriesController.handle);
routes.put("/v1/categories/update/:id", updateCategoryController.handle);
routes.get("/v1/categories/:id", getCategoryController.handle);
routes.delete("/v1/categories/delete/:id", deleteCategoryController.handle);

routes.post("/v1/products", createProductController.handle);
routes.get("/v1/products", listProductsController.handle);
routes.put("/v1/products/update/:id", updateProductController.handle);
routes.get("/v1/products/:id", getProductController.handle);
routes.delete("/v1/products/delete/:id", deleteProductController.handle);
routes.get("/v1/products/q/:slug", getProductBySlugController.handle);
routes.get("/v1/products/search/filter", searchProductController.handle);
routes.get(
  "/v1/products/categories/:categorySlug",
  listProductsByCategoryController.handle
);

routes.post(
  "/v1/variants/product/:productId",
  createProductVariantsController.handle
);
routes.get(
  "/v1/variants/product/:productId",
  listProductVariantsController.handle
);
routes.put("/v1/variants/update/:id", updateVariantController.handle);
routes.delete("/v1/variants/delete/:id", deleteProductVariantController.handle);

routes.post(
  "/v1/variants-attributes/variant/:variantId",
  createVariantAttributes.handle
);
