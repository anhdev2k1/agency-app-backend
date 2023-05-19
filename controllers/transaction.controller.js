import { transactionService } from "../services/transaction.service.js";

const getTransaction = async (req, res) => {
  try {
    const result = await transactionService.getTransaction();
    res.status(200).json({
      status: "Register successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const createTransaction = async (req, res) => {
  try {
    const result = await transactionService.createTransaction(req.body);
    res.status(200).json({
      status: "Create transaction successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
const getTransactionByUser = async (req, res) => {
  try {
    const { user } = req;
    const result = await transactionService.getTransactionByUser(user);
    res.status(200).json({
      status: "Create transaction successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await transactionService.updateTransaction(id, req.body);
    res.status(200).json({
      status: "Create Order successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
export const transactionController = { getTransaction, createTransaction, getTransactionByUser, updateTransaction };
