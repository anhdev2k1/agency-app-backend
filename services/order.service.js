import mongoose from "mongoose";
import { Order } from "../models/order.model.js";
import { Transaction } from "../models/transaction.model.js";

const getOrder = async () => {
  try {
    const result = await Order.find({}).populate("transaction").populate({
      path: "product",
      populate: "image",
    });
    return result;
  } catch (error) {
    throw error;
  }
};
const getOrderByShop = async (idPage) => {
  try {
    const pid = mongoose.Types.ObjectId(idPage);
    const result = await Order.find({ shop_id: pid })
      .populate({
        path: "transaction",
        populate:"user"
      })
      .populate({
        path: "product",
        populate: "image",
      });
    // const result = await Order.aggregate([
    //   {
    //     $lookup: {
    //       from: "transactions",
    //       localField: "transaction",
    //       foreignField: "_id",
    //       as: "transaction",
    //     },
    //   },

    //   {
    //     $unwind: "$transaction",
    //   },
    //   {
    //     $lookup: {
    //       from: "products",
    //       localField: "product",
    //       foreignField: "_id",
    //       as: "product",
    //     },
    //   },
    //   {
    //     $unwind: "$product",
    //   },

    //   {
    //     $lookup: {
    //       from: "shops",
    //       localField: "product.shop",
    //       foreignField: "_id",
    //       as: "shop",
    //     },
    //   },

    //   {
    //     $unwind: "$shop",
    //   },
    //   {
    //     $lookup: {
    //       from: "images",
    //       localField: "product.image",
    //       foreignField: "_id",
    //       as: "image",
    //     },
    //   },

    //   {
    //     $unwind: "$image",
    //   },

    //   {
    //     $match: {
    //       "shop._id": pid,
    //     },
    //   },

    //   {
    //     $project: {
    //       _id: 1,
    //       transaction: 1,
    //       product: 1,
    //       quantity: 1,
    //       amount: 1,
    //       status: 1,
    //       shipping_fee: 1,
    //       createdAt: 1,
    //       updatedAt: 1,
    //     },
    //   },
    // ]);
    return result;
  } catch (error) {
    throw error;
  }
};
const getOrderById = async (idOrder) => {
  try {
    const oid = mongoose.Types.ObjectId(idOrder);
    const result = await Order.find({ _id: oid })
      .populate({
        path: "transaction",
        populate:"user"
      })
      .populate({
        path: "product",
        populate: "image",
      });
    return result;
  } catch (error) {
    throw error;
  }
};
const updateOrder = async (idTrans, data) => {
  try {
    const oid = mongoose.Types.ObjectId(idTrans);
    const result = await Order.findByIdAndUpdate({_id : oid},{$set : {status: data.status}})
      .populate({
        path: "transaction",
        populate:"user"
      })
      .populate({
        path: "product",
        populate: "image",
      });
    return result;
  } catch (error) {
    throw error;
  }
};
const createOrder = async () => {};
export const orderService = { getOrder, createOrder, getOrderByShop, getOrderById, updateOrder };
