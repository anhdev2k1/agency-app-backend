import moment from "moment";
import { Order } from "../models/order.model.js";
import Utils from "../utils/Utils.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { Shop } from "../models/shop.model.js";
import mongoose from "mongoose";

const getStats = async (options = { type: "month" }) => {
  try {
    const orders = await Order.find({}).populate("product").lean();
    const users = await User.find({});
    const products = await Product.find({});
    const shops = await Shop.find({});

    const ordersToday = orders.filter((order) =>
      moment(order.createdAt).isSame(moment(), "day")
    );
    const usersToday = users.filter((user) =>
      moment(user.createdAt).isSame(moment(), "day")
    );

    const mostProductList = orders.reduce((productList, order) => {
      const product = order.product;
      const productId = product._id;

      const existingProduct = productList.find((p) => p._id === productId);

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

    let chartLabels = [];
    let chartData = {
      orders: [],
    };

    switch (options.type) {
      case "month":
        chartLabels = Utils.getDateListFromMonth(options.value);

        chartLabels.forEach((date) => {
          let orderCount = 0;
          let targetOrders = orders.filter((order) =>
            moment(order.createdAt).isSame(moment(date, "DD/MM/YYYY"), "day")
          );
          orderCount = targetOrders.length;
          chartData.orders.push(orderCount);
        });
        break;
      case "year":
        chartLabels = Utils.getMonthListFromYear(options.value);
        chartLabels.forEach((date) => {
          let orderCount = 0;
          let targetOrders = orders.filter((order) =>
            moment(order.createdAt).isSame(moment(date, "MM/YYYY"), "month")
          );
          orderCount = targetOrders.length;
          chartData.orders.push(orderCount);
        });
        break;

      default:
        break;
    }

    return {
      todayStat: {
        orderTotal: ordersToday.length,
        newUser: usersToday.length,
      },
      importantStat: {
        orderTotal: orders.length,
        productTotal: products.length,
        customerTotal: users.filter(
          (user) => user.role !== 3
        ).length,
        partnerTotal: users.filter(user => user.role === 2).length,
      },
      mostProduct: mostProductList.sort((a, b) => b.count - a.count),
      chartStats: {
        type: options.type,
        labels: chartLabels,
        data: chartData,
      },
    };
  } catch (error) {}
};
const getPartners = async () => {
  const result = await Shop.find({}).populate("user");
  return result;
};
const updatePartner = async (id,role) => {
  const uid = mongoose.Types.ObjectId(id);
  const result = await User.findOneAndUpdate(
    { _id: uid },
    { $set: { role: role.role } }
  );
  return result;
};
export const AdminService = {
  getStats,
  getPartners,
  updatePartner,
};
