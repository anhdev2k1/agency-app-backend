import express from "express";
import { CategoryController } from "../controllers/category.controller.js";
const router = express.Router();

router
  .route("/category")
  .get(CategoryController.getCategories)
  .post(CategoryController.createCategory);
router.route("/category/search").get(CategoryController.SearchProductByCategory)
export const CategoryRoute = router;
