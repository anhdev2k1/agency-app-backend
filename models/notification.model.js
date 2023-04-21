import mongoose, { Schema } from "mongoose";
const NotificationSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
    receiver: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    url: {
      type: String,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    checked_at: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);
const NotificationModel = mongoose.model("Notification", NotificationSchema);
export const Notification = NotificationModel;
