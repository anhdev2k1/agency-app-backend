import { UserService } from "../services/user.service.js";

const RegisterUser = async (req, res) => {
  try {
    const result = await UserService.RegisterUser(req.body);
    res.status(200).json({
      status: "Register successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
const LoginUser = async (req, res) => {
  try {
    const result = await UserService.LoginUser(req.body);
    res.status(200).json({
      status: "Login successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const { user } = req;
    const result = await UserService.getCurrentUser(user);
    res.status(200).json({
      status: "Login successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      data: error,
    });
  }
};
const GetAllUser = async (req, res) => {
  try {
    const result = await UserService.GetAllUser();
    res.status(200).json({
      status: "Get All User successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      data: error,
    });
  }
};
const GetUserById = async (req, res) => {
  try {
    const result = await UserService.GetUserById(req.params.id);
    res.status(200).json({
      status: "Get User successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      data: error,
    });
  }
};
const ChangePassword = async (req, res) => {
  try {
    const result = await UserService.ChangePassword(req.body);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: error.message,
    });
  }
};
const DeleteUser = async (req, res) => {
  try {
    const result = await UserService.DeleteUser(req.params.id);
    res.status(200).json({
      status: "Delete successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      data: error,
    });
  }
};
const UpdateUser = async (req, res) => {
  try {
    const result = await UserService.UpdateUser(req.body);
    res.status(200).json({
      status: "Update successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      data: error,
    });
  }
};
export const UserController = {
  LoginUser,
  RegisterUser,
  getCurrentUser,
  GetAllUser,
  GetUserById,
  DeleteUser,
  UpdateUser,
  ChangePassword,
};
