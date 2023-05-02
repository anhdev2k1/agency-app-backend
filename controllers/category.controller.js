
import { CategoryService } from "../services/category.service.js";
import url from "url";
const getCategories = async (req, res) => {
  try {
    const result = await CategoryService.getCategories();
    res.status(200).json({
      status: "Get all category successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
const createCategory = async (req, res) => {
  try {
    const result = await CategoryService.createCategory(req.body);
    res.status(200).json({
      status: "Create category successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
const SearchProductByCategory = async (req, res) => {
  try {
    const result = await CategoryService.SearchProductByCategory(req.query.q);
    res.status(200).json({
      status: "Search product by category successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
export const CategoryController = {
  getCategories,
  createCategory,
  SearchProductByCategory
};
