import mongoose, { Mongoose, Schema, Types } from 'mongoose';
const ContacSchema = new Schema(
  {
    sender: {
      type: String,
      require: true,
    },
    receiver: {
      type: String,
      require: true,
    },
    message: String,
    checked_at: Date,
    deletedAt: Date,
  },
  { timestamps: true }
);
const ContactModel = mongoose.model('Contact', ContacSchema);
export const Contact = ContactModel;
