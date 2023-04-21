import { CartService } from "../services/cart.service.js";

const getCart = async (req, res) => {
  try {
    const result = await CartService.getCart();
    res.status(200).json({
      status: "Get all cart successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
const getCartByUser = async (req, res) => {
  try {
    const { user } = req;
    const result = await CartService.getCartByUser(user);
    res.status(200).json({
      status: "Get cart by user successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
const addToCart = async (req, res) => {
  try {
    const result = await CartService.addToCart(req.body);
    res.status(200).json({
      status: "Add to cart successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
const updateCart = async (req, res) => {
  try {
    const result = await CartService.updateCart(req.body);
    res.status(200).json({
      status: "Update cart successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
const deleteCart = async (req, res) => {
  try {
    const result = await CartService.deleteCart(req.params.id);
    res.status(200).json({
      status: "Update cart successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
export const CartController = {
  getCart,
  addToCart,
  getCartByUser,
  updateCart,
  deleteCart,
};
