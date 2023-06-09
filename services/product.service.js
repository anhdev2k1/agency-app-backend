import mongoose from 'mongoose';
import { Product } from '../models/product.model.js';
import { Image } from '../models/image.model.js';
import moment from 'moment';
import {Cart} from "../models/cart.model.js"
const GetProducts = async () => {
  const getAllProduct = await Product.find({deletedAt: null})
    .sort({ createdAt: -1 })
    .populate({
      path: 'shop',
      populate: {
        path: 'user',
        populate: 'url',
      },
    })
    .populate('category_id')
    .populate('image');
  return getAllProduct;
};
const GetProductById = async (idProduct) => {
  const pid = mongoose.Types.ObjectId(idProduct);
  const getProduct = await Product.findOne({_id: pid})
    .populate({
      path: 'shop',
      populate: {
        path: 'user',
        populate: 'url',
      },
      
    })
    .populate('category_id')
    .populate('image')
  return getProduct;
};
const GetProductByIds = async (idProduct) => {
  const pids = idProduct.map((product) => {
    return mongoose.Types.ObjectId(product._id);
  });
  const getProducts = await Product.find({ _id: { $in: pids } })
    .populate({
      path: 'shop',
      populate: 'user',
    })
    .populate('category_id')
    .populate('image');
  return getProducts;
};
const GetProductsByShop = async (idShop) => {
  const sid = mongoose.Types.ObjectId(idShop);
  const getProducts = await Product.find({ shop: sid })
    .populate({
      path: 'shop',
      populate: 'user',
    })
    .populate('category_id')
    .populate('image');
  return getProducts;
};
const CreateProduct = async (data) => {
  const { url, ...rest } = data;
  const image = {
    type: 'product',
    url,
  };
  const newImage = await Image.create(image);
  const product = { image: newImage._doc._id, ...rest };
  const newProduct = await Product.create(product);
  return newProduct;
};
const UpdateProduct = async (id, data) => {
  // const { _id, ...preProduct } = data;
  const pid = mongoose.Types.ObjectId(id);
  const updateProduct = await Product.findOneAndUpdate({ _id: pid }, data, {
    new: true,
  });
  return updateProduct;
};
const DeleteProduct = async (idProduct) => {
  const pid = mongoose.Types.ObjectId(idProduct);
  const deleteProduct = await Product.findOneAndUpdate(
    { _id: pid },
    { deletedAt: moment().toDate() },
    { new: true }
  );
  return deleteProduct;
};
const SearchProducts = async (dataSearch) => {
  const result = await Product.find({ $text: { $search: dataSearch }})
    .populate({
      path: 'shop',
      populate: {
        path: 'user',
        populate: 'url',
      },
    })
    .populate('category_id')
    .populate('image');
  return result;
};
export const ProductService = {
  GetProducts,
  GetProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  GetProductByIds,
  GetProductsByShop,
  SearchProducts,
};
