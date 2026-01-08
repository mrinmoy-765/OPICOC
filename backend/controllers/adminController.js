import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import axios from "axios";
import FormData from "form-data";

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

//create product
export const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    // Build form-data EXACTLY as freeimage.host expects
    const formData = new FormData();
    formData.append("source", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const apiKey = process.env.FREEIMAGE_KEY;

    const uploadRes = await axios.post(
      `https://freeimage.host/api/1/upload?key=${apiKey}`,
      formData,
      {
        headers: formData.getHeaders(),
        maxBodyLength: Infinity,
      }
    );

    // console.log("Image res", res);

    if (!uploadRes.data?.success) {
      return res.status(400).json({
        success: false,
        message: "Image hosting failed",
      });
    }

    const productImage = uploadRes.data.image.display_url;

    const { title, price, description } = req.body;

    const links = JSON.parse(req.body.links);

    await productModel.create({
      title,
      price,
      description,
      links,
      productImage,
    });

    res.json({
      success: true,
      message: "Product created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log("error", error);
  }
};
