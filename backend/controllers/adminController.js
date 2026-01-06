import userModel from "../models/userModel.js";

//get all users list
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({ role: "user" })
      .select("_id FirstName LastName email image createdAt")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Users Fetched Successfully",
      users,
    });
  } catch (error) {
    res.json({
      sucess: false,
      message: error.message,
    });
  }
};

//get all admin list
export const getAllAdmins = async (req, res) => {
  try {
    const users = await userModel
      .find({ role: "admin" })
      .select("_id FirstName LastName email image createdAt")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Admin List Fetched Successfully",
      users,
    });
  } catch (error) {
    res.json({
      sucess: false,
      message: error.message,
    });
  }
};
