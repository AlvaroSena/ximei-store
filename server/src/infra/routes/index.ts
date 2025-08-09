import { Router } from "express";
import { CreateCategoryController } from "../controllers/create-category-controller";
import { ListCategoriesController } from "../controllers/list-categories-controller";
import { UpdateCategoryController } from "../controllers/update-category-controller";
import { GetCategoryController } from "../controllers/get-category-controller";
import { DeleteCategoryController } from "../controllers/delete-category-controller";

export const routes = Router();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const updateCategoryController = new UpdateCategoryController();
const getCategoryController = new GetCategoryController();
const deleteCategoryController = new DeleteCategoryController();

routes.post("/v1/categories", createCategoryController.handle);
routes.get("/v1/categories", listCategoriesController.handle);
routes.put("/v1/categories/update/:id", updateCategoryController.handle);
routes.get("/v1/categories/:id", getCategoryController.handle);
routes.delete("/v1/categories/delete/:id", deleteCategoryController.handle);
