import mongoose, { Schema } from "mongoose";
const TransactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    user_delivery: {
      type: Object,
    },
    product: {
      type: Array,
    },
    amount: {
      type: Number,
    },
    payment: {
      type: Number,
    },
    paid_at: {
      type: Date,
      default: null,
    },
    shipping_fee: {
      type: Number,
    },
  },
  { timestamps: true }
);
const TransactionModel = mongoose.model("Transaction", TransactionSchema);
export const Transaction = TransactionModel;
