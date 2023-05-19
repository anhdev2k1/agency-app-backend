import express from "express";
import { CategoryController } from "../controllers/category.controller.js";
const router = express.Router();

router
  .route("/category")
  .get(CategoryController.getCategories)
  .post(CategoryController.createCategory);
router
  .route("/category/search")
  .get(CategoryController.SearchProductByCategory);
router
  .route("/category/:id")
  .get(CategoryController.getCategoryById)
  .patch(CategoryController.updateCategoryById)
  .delete(CategoryController.deleteCategoryById);

export const CategoryRoute = router;
