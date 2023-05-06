import express from 'express';
import { ShopController } from '../controllers/shop.controller.js';
const router = express.Router();

router.route('/shop').post(ShopController.CreateShop);
router.route('/shops').get(ShopController.GetShop);
router
  .route('/shop/:id') //idPage
  .post(ShopController.UpdateShop)
  .get(ShopController.getShopByIdPage)
  .delete(ShopController.DeleteShop);
router.route('/shop/:id/content').get(ShopController.GetShopById);
router.route('/shop/:id/order_stats').get(ShopController.getShopOrderStats);
export const ShopRoute = router;
