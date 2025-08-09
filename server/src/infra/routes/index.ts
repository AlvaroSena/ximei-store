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
