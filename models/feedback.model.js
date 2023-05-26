import mongoose, { Schema } from "mongoose";
const FeedbackSchema = new Schema(
  {
    rating: {
      type: Number,
    },
    content: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);
const FeedbackModel = mongoose.model("Feedback", FeedbackSchema);
export const Feedback = FeedbackModel;
