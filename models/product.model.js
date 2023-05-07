import mongoose, { Schema } from 'mongoose';
const ProductSchema = new Schema(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    view: {
      type: String,
    },
    quantity: {
      type: Number,
      require: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
    },
    deletedAt: Date,
  },
  { timestamps: true }
);
const ProductModel = mongoose.model('Product', ProductSchema);
export const Product = ProductModel;
