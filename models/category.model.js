import mongoose, { Mongoose, Schema, Types } from 'mongoose';
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
    },
    url: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
    },
    deletedAt: Date,
  },
  { timestamps: true }
);
const CategoryModel = mongoose.model('Category', CategorySchema);
export const Category = CategoryModel;
