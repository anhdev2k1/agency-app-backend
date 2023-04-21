import express from "express";
import { CartController } from "../controllers/cart.controller.js";
import { UserVerifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router
  .route("/cart")
  .get(CartController.getCart)
  .post(CartController.addToCart)
  .put(CartController.updateCart);
router.route("/cart/:id").delete(CartController.deleteCart);
router
  .route("/cartUser")
  .post(UserVerifyToken.verifyToken, CartController.getCartByUser);
export const cartRoute = router;
