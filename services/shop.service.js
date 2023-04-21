import { Shop } from "../models/shop.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
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
  const getShop = await Shop.find({}).populate("user");
  return getShop;
};
const GetShopById = async (idUser) => {
  const uid = mongoose.Types.ObjectId(idUser);
  const getShop = await Shop.findOne({ user: uid }).populate("user");
  return getShop;
};
const getShopByIdPage = async (idPage) => {
  const pid = mongoose.Types.ObjectId(idPage);
  const getShop = await Shop.findOne({ _id: pid }).populate("user");
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
export const ShopService = {
  CreateShop,
  GetShop,
  GetShopById,
  UpdateShop,
  DeleteShop,
  getShopByIdPage
};
