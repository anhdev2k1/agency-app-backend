import mongoose, { Schema } from "mongoose";
const ImageSchema = new Schema(
  {
    type: {
      type: String,
    },
    url: [
      {
        type: String,
        require: true,
      },
    ],
  },
  { timestamps: true }
);
const ImageModel = mongoose.model("Image", ImageSchema);
export const Image = ImageModel;
