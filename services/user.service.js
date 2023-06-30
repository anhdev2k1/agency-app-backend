import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Image } from "../models/image.model.js";
import { Shop } from "../models/shop.model.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";
import generateCode from '../utils/Utils.js'

import {google} from 'googleapis'
import nodemailer from 'nodemailer'

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REFRESH_TOKEN,
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const RegisterUser = async (data) => {
  try {
    const { password, _id, role } = data;
    let foundUser = await User.findOne({ email: data.email });

    if (foundUser ) {
      throw new Error("Email đã được sử dụng!");
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    data.password = hashPassword;

    // if(foundUser && !foundUser.isVerified) {
    //   await foundUser.updateOne({
    //     $set: {
    //       password: data.password,
    //       role,
    //     }
    //   })
    // }

    if(!foundUser){
      foundUser = await User.create(data);
    }
    // const { code, codeLifeTimeMinutes, expiresIn } = generateCode.generateCode()

    // await foundUser.updateOne({
    //   $set: {
    //     code: code,
    //     expiresIn: expiresIn,
    //   }
    // })

    // await sendGmail(foundUser.email, code, codeLifeTimeMinutes)
    console.log(foundUser);
    const token = jwt.sign(
      { id: foundUser._id, role: role },
      process.env.TOKEN_SECRET
    );
    return { ...foundUser, token };
  } catch (error) {
    throw error;
  }
};

const verifyCode = async (data) => {
  try {
    const foundUser = await User.findOne({ email: data.email });
    if(!foundUser) {
      throw new Error('User is not found')
    }

    if (foundUser.code !== data.code){
      throw new Error('Code is invalid');
    }

    const isValid = Number(new Date(foundUser.expiresIn)) - Date.now();
    if (isValid < 0) {
      throw new Error('Code is expired! Please re-sent code again');
    }

    await foundUser.updateOne({
      $set: {
        code: null,
        expiresIn: null,
        isVerified: true,
      },
    });

    const token = jwt.sign(
      { id: foundUser._doc._id, role: foundUser.role },
      process.env.TOKEN_SECRET
    );
    const resultUser = await User.findOne({ _id: foundUser._doc._id });
    return { ...resultUser._doc, token };

  } catch (error) {
    throw error
  }
}

const sendCodeAgain = async (data) => {
  try {
    const foundUser = await User.findOne({ email: data.email });
    if(!foundUser) throw new Error('User is not found')


    const { code, codeLifeTimeMinutes, expiresIn } = generateCode();

    await foundUser.updateOne({
      $set: {
        code: code,
        expiresIn: expiresIn,
      },
    });

    await sendGmail(foundUser.email, code, codeLifeTimeMinutes)

  } catch (error) {
    throw error
  }
}




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
  // const deleteUser = await User.deleteOne({ _id: uid });
  // let promiseShop = new Promise((resole, reject) => {
  //   const deleteShop = Shop.deleteOne({user : uid}, err => {
  //     if(err) reject(err)
  //     else resole("Đã xoá thành công")
  //   })
  // })
  // let deleteCart = new Promise((resole, reject) => {
  //    Cart.deleteMany({user_id : uid}, err => {
  //     if(err) reject(err)
  //     else resole("Đã xoá thành công")
  //   })
  // })
  // let findShop = await Shop.findOne({user: uid})
  // await Product.deleteMany({shop: findShop._id})
  // let promiseUser = new Promise((resole, reject) => {
  //   const deleteUser =  User.deleteOne({ _id: uid }, err => {
  //     if(err) reject(err)
  //     else resole("Đã xoá thành công")
  //   })
  // })
  // Promise.all([promiseShop,promiseUser, deleteCart]).then(result => {return result}).catch(err => {return err})
  try {
    const uid = mongoose.Types.ObjectId(idUser);
    // const deleteUser = await User.findOneAndUpdate(
    //   { _id: uid },
    //   { deletedAt: moment().toDate() },
    //   { new: true }
    // );
    const deleteUser = await User.findOneAndUpdate({_id: uid},{ deletedAt : Date.now()})
    return deleteUser;
  } catch (error) {
    throw error
  }
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

const sendGmail = async (email, code, codeLifeTimeMinutes) => {
  const accessToken = await oAuth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      type: 'OAUTH2',
      user: 'info.anhdev@gmail.com',
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      // refreshToken: process.env.REFRESH_TOKEN,
      // accessToken: accessToken.token?.toString(),
    },
  });

  await transporter.sendMail({
    from: '"Agency" <info.anhdev@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Verify your email ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: `<p>Your code: <b>${code}</b><br/>This email is only valid for ${codeLifeTimeMinutes} minutes</p>`, // html body
  });
}

export const UserService = {
  RegisterUser,
  verifyCode,
  sendCodeAgain,
  LoginUser,
  getCurrentUser,
  GetAllUser,
  GetUserById,
  DeleteUser,
  UpdateUser,
  ChangePassword,
};
