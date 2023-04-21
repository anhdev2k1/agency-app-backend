import mongoose from "mongoose";
import { Category } from "../models/category.model.js";
const getCategories = async () => {
  const getAllCategory = await Category.find({});
  return getAllCategory;
};

const createCategory = async (data) => {
  const newCategory = await Category.create(data);
  return newCategory;
};
export const CategoryService = { getCategories, createCategory };
