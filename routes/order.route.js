import express from "express";
import { orderController } from "../controllers/order.controller.js";
import { UserVerifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router
  .route("/order")
  .get(orderController.getOrder)
  .post(orderController.createOrder);
router.route("/shop/order/:id").get(orderController.getOrderByShop);
router
  .route("/order/:id")
  .get(orderController.getOrderById)
  .put(orderController.updateOrder);
export const OrderRoute = router;
