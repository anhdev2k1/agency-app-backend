import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Image } from "../models/image.model.js";
import {Shop} from "../models/shop.model.js"
import {Product} from "../models/product.model.js"
import {Cart} from "../models/cart.model.js"
const RegisterUser = async (data) => {
  try {
    const { password, _id, role } = data;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    data.password = hashPassword;
    const checkEmail = await User.findOne({ email: data.email });
    if (checkEmail) {
      throw new Error("Email đã được sử dụng!");
    }
    const newUser = await User.create(data);
    const token = jwt.sign(
      { id: newUser._doc._id, role: role },
      process.env.TOKEN_SECRET
    );
    const resultUser = await User.findOne({ _id: newUser._doc._id });
    return { ...resultUser._doc, token };
  } catch (error) {
    throw error;
  }
};
const LoginUser = async (data) => {
  try {
    const { email, password } = data;
    const isUser = await User.findOne({ email })
      .populate("shop")
      .populate("url");
    if (!isUser) {
      throw new Error("Có vẻ Email bạn nhập không đúng!");
    }
    const isMatchPassword = bcrypt.compareSync(password, isUser.password);
    if (!isMatchPassword) {
      throw new Error("Mật khẩu bạn nhập không đúng!");
    }
    const token = jwt.sign(
      { id: isUser._id, role: isUser.role },
      process.env.TOKEN_SECRET
    );
    return { ...isUser._doc, token };
  } catch (error) {
    throw error;
  }
};
const getCurrentUser = async (data) => {
  const { id } = data;
  const uid = mongoose.Types.ObjectId(id);
  const isCurrentUser = await User.findOne({ _id: uid })
    .populate("shop")
    .populate("url");
  return isCurrentUser;
};
const GetAllUser = async () => {
  const getAllUser = await User.find({});
  return getAllUser;
};
const GetUserById = async (idUser) => {
  const uid = mongoose.Types.ObjectId(idUser);
  const getUser = User.findOne({ _id: uid }).populate("shop").populate("url");
  return getUser;
};
const DeleteUser = async (idUser) => {
  const uid = mongoose.Types.ObjectId(idUser);
  // const deleteUser = await User.deleteOne({ _id: uid });
  let promiseShop = new Promise((resole, reject) => {
    const deleteShop = Shop.deleteOne({user : uid}, err => {
      if(err) reject(err)
      else resole("Đã xoá thành công")
    })
  })
  let deleteCart = new Promise((resole, reject) => {
     Cart.deleteOne({user_id : uid}, err => {
      if(err) reject(err)
      else resole("Đã xoá thành công")
    })
  })
  let findShop = await Shop.findOne({user: uid})
  await Product.deleteOne({shop: findShop._id})
  let promiseUser = new Promise((resole, reject) => {
    const deleteUser =  User.deleteOne({ _id: uid }, err => {
      if(err) reject(err)
      else resole("Đã xoá thành công")
    })
  })
  Promise.all([promiseShop,promiseUser, deleteCart]).then(result => {return result}).catch(err => {return err})
};
const UpdateUser = async (data) => {
  const { _id, url, newPassword, ...rest } = data;
  const uid = mongoose.Types.ObjectId(_id);
  if (typeof url !== "undefined") {
    const dataImg = {
      type: "user",
      url,
    };
    const result = await Image.create(dataImg);
    const idImg = result._doc._id;
    await User.updateOne({ _id: uid }, { $set: { url: idImg }, ...rest });
  } else if (typeof newPassword !== "undefined") {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);
    await User.findOneAndUpdate(
      { _id: uid },
      { $set: { password: hashPassword } }
    );
  } else await User.findOneAndUpdate({ _id: uid }, rest);
  const findUserUpdated = await User.findOne({ _id: uid })
    .populate("shop")
    .populate("url");
  return findUserUpdated;
};

const ChangePassword = async (data) => {
  const { id, password } = data;
  const uid = mongoose.Types.ObjectId(id);
  try {
    const isUser = await User.findOne({ _id: uid });
    const isMatchPassword = bcrypt.compareSync(password, isUser.password);
    if (!isMatchPassword) {
      throw new Error("Mật khẩu bạn nhập không đúng!");
    }
    return isUser;
  } catch (error) {
    throw error;
  }
};
export const UserService = {
  RegisterUser,
  LoginUser,
  getCurrentUser,
  GetAllUser,
  GetUserById,
  DeleteUser,
  UpdateUser,
  ChangePassword,
};
