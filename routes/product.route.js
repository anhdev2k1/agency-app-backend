import express from 'express';
import { ProductController } from '../controllers/product.controller.js';
const router = express.Router();

router
  .route('/products')
  .get(ProductController.GetProducts)
  .post(ProductController.CreateProduct);
router.route('/products/:id').get(ProductController.GetProductsByShop);
router.route('/product/search').get(ProductController.SearchProducts);
router
  .route('/product/:id')
  .get(ProductController.GetProductById)
  .delete(ProductController.DeleteProduct);
router.route('/product/:id/edit').patch(ProductController.UpdateProduct);
router.route('/listProduct').post(ProductController.GetProductByIds);

export const ProductRoute = router;
