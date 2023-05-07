import express from 'express';
import { AdminController } from '../controllers/admin.controller.js';
const router = express.Router();

router.route('/stats').get(AdminController.getStats);
export const AdminRoute = router;
