import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      default: 1,
    },
    url: {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("User", UserSchema);
export const User = UserModel;
