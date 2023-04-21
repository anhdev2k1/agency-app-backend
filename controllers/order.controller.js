import { orderService } from "../services/order.service.js";
const getOrder = async (req, res) => {
  try {
    const result = await orderService.getOrder();
    res.status(200).json({
      status: "Get order successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
const getOrderByShop = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await orderService.getOrderByShop(id);
    res.status(200).json({
      status: "Get order successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await orderService.getOrderById(id);
    res.status(200).json({
      status: "Get order successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
const createOrder = async (req, res) => {
  try {
    const result = await orderService.createOrder(req.body);
    res.status(200).json({
      status: "Create Order successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await orderService.updateOrder(id, req.body);
    res.status(200).json({
      status: "Create Order successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
export const orderController = {
  getOrder,
  createOrder,
  getOrderByShop,
  getOrderById,
  updateOrder,
};
