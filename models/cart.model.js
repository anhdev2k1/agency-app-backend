import mongoose, { Schema } from "mongoose";
const CartSChema = new Schema(
  {
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    quantity_p: {
      type: Number,
    },
  },
  { timestamps: true }
);
const CartModel = mongoose.model("Cart", CartSChema);
export const Cart = CartModel;
