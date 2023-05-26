import { AdminService } from '../services/admin.service.js';

const getStats = async (req, res) => {
  try {
    const { type, value } = req.query;
    const result = await AdminService.getStats({ type, value });
    res.status(200).json({
      status: 'Success',
      data: result,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
const getPartners = async (req, res) => {
  try {
    const result = await AdminService.getPartners();
    res.status(200).json({
      status: 'Success',
      data: result,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
const updatePartner = async (req, res) => {
  try {
    const {id} = req.params
    const result = await AdminService.updatePartner(id,req.body);
    res.status(200).json({
      status: 'Success',
      data: result,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
export const AdminController = {
  getStats,
  getPartners,
  updatePartner
};
