import mongoose, { Schema } from "mongoose";
const OrderSchema = new Schema(
  {
    transaction: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    message: {
      type: String,
    },
    status: {
      type: Number,
      default: 0,
    },
    shipping_fee: {
      type: Number,
    },
    shop_id: {
      type: String,
    },
  },
  { timestamps: true }
);
const OrderModel = mongoose.model("Order", OrderSchema);
export const Order = OrderModel;
