import express from "express";
import { transactionController } from "../controllers/transaction.controller.js";
import { UserVerifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router
  .route("/transaction")
  .get(transactionController.getTransaction)
  .post(transactionController.createTransaction);
router
  .route("/transaction/user")
  .post(UserVerifyToken.verifyToken, transactionController.getTransactionByUser);
router.route("/transaction/:id").put(transactionController.updateTransaction)
export const transactionRoute = router;
