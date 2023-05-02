const getAllFeedback = async (req, res) => {
  try {
    const result = await feedbackService.getAllFeedback();
    res.status(200).json({
      status: "Get all feedback successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(403).json(error);
  }
};
const createFeedback = async (req, res) => {
  try {
    const result = await feedbackService.createFeedback(req.body);
    res.status(200).json({
      status: "create feedback successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(403).json(error);
  }
};
const getFeedbackById = async (req, res) => {
  try {
    const result = await feedbackService.getFeedbackById(req.params.id);
    res.status(200).json({
      status: "Get feedback successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(403).json(error);
  }
};
export const feedbackController = {
  getAllFeedback,
  createFeedback,
  getFeedbackById,
};
