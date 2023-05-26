import mongoose from "mongoose";
import { Feedback } from "../models/feedback.model.js";

const getAllFeedback = async () => {
    const result = await Feedback.find({});
    return result;
};
const createFeedback = async (data) => {
    const createFeedback = await Feedback.create(data);
    return createFeedback;
};
const getFeedbackById = async (data) => {
    const id = mongoose.Types.ObjectId(data);
    const result = await Feedback.find({ product: id }).populate({
        path: 'user',
        select: 'name _id',
    }).lean()
    return result;
};
export const feedbackService = {getAllFeedback, createFeedback, getFeedbackById}