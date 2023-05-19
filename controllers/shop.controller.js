import { ShopService } from '../services/shop.service.js';

const CreateShop = async (req, res) => {
  try {
    const result = await ShopService.CreateShop(req.body);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
const GetShop = async (req, res) => {
  try {
    const result = await ShopService.GetShop({});
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
const GetShopById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ShopService.GetShopById(id);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
const getShopByIdPage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ShopService.getShopByIdPage(id);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
const UpdateShop = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ShopService.UpdateShop(id, req.body);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const DeleteShop = async (req, res) => {
  try {
    const result = await ShopService.DeleteShop(req.params.id);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getShopOrderStats = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, value } = req.query;
    const result = await ShopService.getShopOrderStats(id, { type, value });
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
export const ShopController = {
  CreateShop,
  GetShop,
  GetShopById,
  UpdateShop,
  DeleteShop,
  getShopByIdPage,
  getShopOrderStats,
};
