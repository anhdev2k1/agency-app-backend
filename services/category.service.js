import mongoose from "mongoose";
import { Category } from "../models/category.model.js";
import {Product} from "../models/product.model.js"
import {Image} from "../models/image.model.js"
const getCategories = async () => {
  const getAllCategory = await Category.find({}).populate("url");
  return getAllCategory;
};

const createCategory = async (data) => {
  const { url, ...rest } = data;
  const image = {
    type: "category",
    url,
  };

  const newImage = await Image.create(image);
  const category = { url: newImage._doc._id, ...rest };
  const newCategory = await Category.create(category);
  return newCategory;
};
const SearchProductByCategory = async (data) => {
  const result = await Category.findOne({$text: {$search: data}})
  const search = await Product.find({category_id: result._id}).populate({
    path: "shop",
    populate: "user",
  })
  .populate("category_id")
  .populate("image");
  return search
};
export const CategoryService = { getCategories, createCategory, SearchProductByCategory };
