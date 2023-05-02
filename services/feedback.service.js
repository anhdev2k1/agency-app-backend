import mongoose from "mongoose";
import { Feedback } from "../models/feedback.model.js";

const getAllFeedback = async () => {
    const result = Feedback.find({});
    return result;
};
const createFeedback = async (data) => {
    const deleteUser = Feedback.create(data);
    return deleteUser;
};
const getFeedbackById = async (data) => {
    const id = mongoose.Types.ObjectId(data);
    const result = User.deleteOne({ user: id });
    return result;
};
export const feedbackService = {getAllFeedback, createFeedback, getFeedbackById}