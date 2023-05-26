import mongoose from "mongoose";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
const getCart = async () => {
  try {
    const result = await Cart.find({})
      .populate("product_id")
      .populate("user_id");
    return result;
  } catch (error) {
    throw error;
  }
};
const getCartByUser = async (data) => {
  try {
    const { id } = data;
    const uid = mongoose.Types.ObjectId(id);
    
    const result = await Cart.find({ user_id: uid })
      .populate({
        path: "product_id",
        populate: [{ path: "image" }, { path: "shop" }],
      })
      .populate("user_id").lean();
    
    return result;
  } catch (error) {
    throw error;
  }
};
const addToCart = async (data) => {
  try {
    console.log(data.increaseOne);
    const pid = mongoose.Types.ObjectId(data.productId);
    const uid = mongoose.Types.ObjectId(data.userId);
    const listProductCart = await Cart.findOne({product_id: pid, user_id: uid})
      .populate("product_id")
      .populate("user_id");
    if (listProductCart !== null) {
      const cartItem = await Cart.findOne({ _id: listProductCart._id });
      if(data.increaseOne){
        const totalTemp = cartItem.quantity_p + data.quantity_p
        const carItemUpdate = await Cart.findOneAndUpdate(
          { _id: listProductCart._id },
          { $set: { quantity_p: totalTemp } }
        );
        return carItemUpdate
      }
      const carItemUpdate = await Cart.findOneAndUpdate(
        { _id: listProductCart._id },
        { $set: { quantity_p: data.quantity_p } }
      );
      return carItemUpdate
    }
    const CartItem = await Cart.create({
      product_id: data.productId,
      user_id: data.userId,
      quantity_p: data.quantity_p,
    });
    return CartItem;
  } catch (error) {
    throw error;
  }
};
const updateCart = async (data) => {
  try {
    const writeUpdates = data.map((item) => {
      const pid = mongoose.Types.ObjectId(item._id);
      return {
        updateOne: {
          filter: { product_id: pid },
          update: { quantity_p: item.quantity_p },
        },
      };
    });
    const result = await Cart.bulkWrite(writeUpdates);
    return result;
  } catch (error) {
    throw error;
  }
};
const deleteCart = async (idProduct) => {
  try {
    const pid = mongoose.Types.ObjectId(idProduct);
    const result = await Cart.deleteOne({ product_id: pid });
    return result;
  } catch (error) {
    throw error;
  }
};
export const CartService = {
  getCart,
  addToCart,
  getCartByUser,
  updateCart,
  deleteCart,
};
