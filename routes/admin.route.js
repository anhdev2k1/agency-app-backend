import express from 'express';
import { AdminController } from '../controllers/admin.controller.js';
const router = express.Router();

router.route('/stats').get(AdminController.getStats);
router.route('/partner').get(AdminController.getPartners)
router.route('/partner/:id').patch(AdminController.updatePartner)
export const AdminRoute = router;
