import express from 'express';
import DBMongoose from './configs/index.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRoute } from './routes/user.route.js';
import { ShopRoute } from './routes/shop.route.js';
import { ProductRoute } from './routes/product.route.js';
import { CategoryRoute } from './routes/category.route.js';
import { cartRoute } from './routes/cart.route.js';
import { transactionRoute } from './routes/transaction.route.js';
import { OrderRoute } from './routes/order.route.js';
import { feedbackRoute } from './routes/feedback.route.js';
import { AdminRoute } from './routes/admin.route.js';
import { contactRoute } from './routes/contact.route.js';
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
DBMongoose();
app.get('/', (req, res) => {
  res.status(200).send('Hello Văn Anh');
});
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use('/api/auth', UserRoute);
app.use('/api', ShopRoute);
app.use('/api', ProductRoute);
app.use('/api', CategoryRoute);
app.use('/api', cartRoute);
app.use('/api', transactionRoute);
app.use('/api', OrderRoute);
app.use('/api/admin', AdminRoute);
app.use('/api', feedbackRoute);
app.use('/api',contactRoute)
app.listen(PORT, () => {
  console.log(`The app is listening on port ${PORT}`);
});
