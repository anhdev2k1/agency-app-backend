import { Shop } from '../models/shop.model.js';
import { User } from '../models/user.model.js';
import { Order } from '../models/order.model.js';
import Utils from '../utils/Utils.js';
import mongoose from 'mongoose';
import moment from 'moment';

const CreateShop = async (data) => {
  const newShop = await Shop.create(data);
  const uid = mongoose.Types.ObjectId(data.user);
  const updateUser = await User.findOneAndUpdate(
    { _id: uid },
    { $set: { role: 2 } }
  );
  return newShop;
};
const GetShop = async () => {
  const getShop = await Shop.find({}).populate('user');
  return getShop;
};
const GetShopById = async (idUser) => {
  const uid = mongoose.Types.ObjectId(idUser);
  const getShop = await Shop.findOne({ user: uid }).populate('user');
  return getShop;
};
const getShopByIdPage = async (idPage) => {
  const pid = mongoose.Types.ObjectId(idPage);
  const getShop = await Shop.findOne({ _id: pid }).populate('user');
  return getShop;
};
const UpdateShop = async (pageID, content) => {
  const pid = mongoose.Types.ObjectId(pageID);
  const update = await Shop.updateOne({ _id: pid }, { page: content.page });
  return update;
};
const DeleteShop = async (idShop) => {
  const sid = mongoose.Types.ObjectId(idShop);
  const deleteShop = await Shop.deleteOne({ _id: sid });
  return deleteShop;
};

const getShopOrderStats = async (idShop, options = { type: 'month' }) => {
  const shopOrders = await Order.find({ shop_id: idShop })
    .populate('product')
    .lean();

  const mostProductList = shopOrders.reduce((productList, order) => {
    const product = order.product;
    const productId = product.id;

    const existingProduct = productList.find((p) => p.id === productId);

    if (existingProduct) {
      existingProduct.count++;
    } else {
      productList.push({
        ...product,
        count: 1,
      });
    }

    return productList;
  }, []);

  const todayOrders = shopOrders.filter((order) =>
    moment(order.createdAt).isSame(moment(), 'day')
  );

  let chartLabels = [];
  let chartData = {
    income: [],
    orders: [],
  };

  switch (options.type) {
    case 'month':
      chartLabels = Utils.getDateListFromMonth(options.value);

      chartLabels.forEach((date) => {
        let income = 0;
        let orderCount = 0;
        let targetOrders = shopOrders.filter((order) =>
          moment(order.createdAt).isSame(moment(date, 'DD/MM/YYYY'), 'day')
        );
        income = targetOrders.reduce((sum, order) => sum + order.amount, 0);
        orderCount = targetOrders.length;
        chartData.income.push(income);
        chartData.orders.push(orderCount);
      });
      break;
    case 'year':
      chartLabels = Utils.getMonthListFromYear(options.value);
      chartLabels.forEach((date) => {
        let income = 0;
        let orderCount = 0;
        let targetOrders = shopOrders.filter((order) =>
          moment(order.createdAt).isSame(moment(date, 'MM/YYYY'), 'month')
        );
        income = targetOrders.reduce((sum, order) => sum + order.amount, 0);
        orderCount = targetOrders.length;
        chartData.income.push(income);
        chartData.orders.push(orderCount);
      });
      break;

    default:
      break;
  }

  return {
    todayStat: {
      total: todayOrders.length,
      unconfirm: todayOrders.filter((order) => order.status === 0).length,
      shipping: todayOrders.filter((order) => order.status === 2).length,
      shipped: todayOrders.filter((order) => order.status === 3).length,
    },
    orderStats: {
      income: shopOrders.reduce((sum, order) => {
        return sum + order.amount;
      }, 0),
      total: shopOrders.length,
      unconfirm: shopOrders.filter((order) => order.status === 0).length,
      confirmed: shopOrders.filter((order) => order.status === 1).length,
      shipping: shopOrders.filter((order) => order.status === 2).length,
      shipped: shopOrders.filter((order) => order.status === 3).length,
      canceled: shopOrders.filter((order) => order.status === 4).length,
    },
    mostProduct: mostProductList,
    chartStats: {
      type: options.type,
      labels: chartLabels,
      data: chartData,
    },
  };
};

export const ShopService = {
  CreateShop,
  GetShop,
  GetShopById,
  UpdateShop,
  DeleteShop,
  getShopByIdPage,
  getShopOrderStats,
};
