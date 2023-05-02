import express from "express";
import { feedbackController } from "../controllers/feedback.controller.js";
const router = express.Router()

router.route("/feedback").get(feedbackController.getAllFeedback).post(feedbackController.createFeedback)
router.route("/feedback/:id").get(feedbackController.getFeedbackById)
export const feedbackRoute = router