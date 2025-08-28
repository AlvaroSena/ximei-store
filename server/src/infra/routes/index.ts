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
import { CreateOfferController } from "../controllers/create-offer-controller";
import { ListOffersController } from "../controllers/list-offers-controller";
import { GetOfferController } from "../controllers/get-offer-controller";
import { DeleteOfferController } from "../controllers/delete-offer-controller";

export const routes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
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

const createVariantAttributes = new CreateVariantAttributesController();

const createOfferController = new CreateOfferController();
const listOffersController = new ListOffersController();
const getOfferController = new GetOfferController();
const deleteOfferController = new DeleteOfferController();

routes.post("/v1/categories", createCategoryController.handle);
routes.get("/v1/categories", listCategoriesController.handle);
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

routes.post(
  "/v1/variants-attributes/variantId/:variantId",
  createVariantAttributes.handle
);

routes.post("/v1/offers", createOfferController.handle);
routes.get("/v1/offers", listOffersController.handle);
routes.get("/v1/offers/:id", getOfferController.handle);
routes.delete("/v1/offers/delete/:id", deleteOfferController.handle);
