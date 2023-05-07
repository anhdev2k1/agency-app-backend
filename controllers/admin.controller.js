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

export const AdminController = {
  getStats,
};
