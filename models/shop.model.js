import mongoose, { Schema } from "mongoose";
const ShopSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    slug: {
      type: String,
      require: true,
    },
    page: {
      type: Array,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);
const ShopModel = mongoose.model("Shop", ShopSchema);
export const Shop = ShopModel;
