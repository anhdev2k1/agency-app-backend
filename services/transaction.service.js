import mongoose from "mongoose";
import { Order } from "../models/order.model.js";
import { Transaction } from "../models/transaction.model.js";
const getTransaction = async () => {
  try {
    const result = await Transaction.find({}).populate("user");
    return result;
  } catch (error) {
    throw error;
  }
};
const getTransactionByUser = async (user) => {
  try {
    const { id } = user;
    const uid = mongoose.Types.ObjectId(id);
    const transaction = await Transaction.find({ user: uid }).populate("user");
    const idTrans = transaction.map((item) => {
      return item._id;
    });
    const order = await Order.find({ transaction: { $in: idTrans } }).sort({createdAt : -1})
      .populate({
        path: "transaction",
        populate: "user",
      })
      .populate({
        path: "product",
        populate: ["shop", "image"],
      });
    return order;
  } catch (error) {
    throw error;
  }
};
const createTransaction = async (data) => {
  try {
    const transactionData = await Transaction.create(data);
    const createOrder = data.product.map((item) => {
      const orderData = {
        transaction: transactionData._id,
        product: item._id,
        quantity: item.quantity_p,
        amount: item.quantity_p * item.price,
        shipping_fee: transactionData.shipping_fee,
        shop_id: item.shop,
      };
      return {
        insertOne: {
          document: orderData,
        },
      };
    });
    await Order.bulkWrite(createOrder);
    return transactionData;
  } catch (error) {
    throw error;
  }
};

export const transactionService = {
  createTransaction,
  getTransaction,
  getTransactionByUser,
};
