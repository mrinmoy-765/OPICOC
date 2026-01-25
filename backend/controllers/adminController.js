import userModel from "../models/userModel.js";
import townhallModel from "../models/townHall.js";
import productModel from "../models/productModel.js";
import aboutModel from "../models/aboutModel.js";
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
      },
    );

    // console.log("Image res", res);

    if (!uploadRes.data?.success) {
      return res.status(400).json({
        success: false,
        message: "Image hosting failed",
      });
    }

    const productImage = uploadRes.data.image.display_url;

    const {
      title,
      price,
      badge,
      description,
      townHall,
      createdBy,
      maxSell,
      seasonStartDate,
      seasonEndDate,
    } = req.body;

    const links = JSON.parse(req.body.links);

    await productModel.create({
      title,
      price,
      badge,
      description,
      townHall,
      links,
      productImage,
      createdBy,
      maxSell,
      seasonStartDate,
      seasonEndDate,
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

//get all products
export const getBases = async (req, res) => {
  try {
    const bases = await productModel.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "All Products Fetched Successfully",
      bases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: error.message,
    });
  }
};

//get product by id
export const getSpecificBase = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Base ID is required",
      });
    }

    const base = await productModel.findById(id);

    if (!base) {
      return res.status(404).json({
        success: false,
        message: "Base not found",
      });
    }

    res.json({
      success: true,
      message: "Product Fetched Successfully",
      base,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update product
export const updateBase = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Base ID is required",
      });
    }

    let {
      title,
      price,
      badge,
      description,
      townHall,
      links,
      productImage,
      maxSell,
      seasonStartDate,
      seasonEndDate,
      updatedBy,
    } = req.body;

    // Handle image upload if a new file is provided
    if (req.file) {
      try {
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
          },
        );

        if (!uploadRes.data?.success) {
          return res.status(400).json({
            success: false,
            message: "Image hosting failed",
          });
        }

        // Update productImage with the new uploaded image URL
        productImage = uploadRes.data.image.display_url;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Error uploading image: " + uploadError.message,
        });
      }
    }
    // If no file is provided, productImage will be the existing URL from the body

    // Parse links if it's a string (from FormData)
    const parsedLinks = typeof links === "string" ? JSON.parse(links) : links;

    const updatedBase = await productModel.findByIdAndUpdate(
      id,
      {
        title,
        price,
        badge,
        description,
        townHall,
        links: parsedLinks,
        productImage,
        maxSell,
        seasonStartDate,
        seasonEndDate,
        updatedBy,
      },
      { new: true, runValidators: true },
    );

    if (!updatedBase) {
      return res.status(404).json({
        success: false,
        message: "Base not found",
      });
    }

    res.json({
      success: true,
      message: "Base updated successfully",
      base: updatedBase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete product
export const deleteBase = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Base ID is required",
      });
    }

    const deletedBase = await productModel.findByIdAndDelete(id);

    if (!deletedBase) {
      return res.status(404).json({
        success: false,
        message: "Base not found",
      });
    }

    res.json({
      success: true,
      message: "Base deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get townHall List for search suggestion
export const getTownHalls = async (req, res) => {
  try {
    const townHall = await townhallModel.find();

    res.json({
      success: true,
      messsage: "TownHall Fetched Successfully",
      townHall,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//generate about
export const generateAbout = async (req, res) => {
  try {
    let { heading, content } = req.body;

    await aboutModel.create({ heading, content });

    res.json({
      success: true,
      message: "About Content Generated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//get about list
export const getAbout = async (req, res) => {
  try {
    const about = await aboutModel.find().sort({ createsAt: -1 });
    res.json({
      success: true,
      message: "Fetched Successfully",
      about,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//get about by id
export const getSpecificAbout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }

    const about = await aboutModel.findById(id);

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    res.json({
      success: true,
      message: "Fetched Successfully",
      about,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update about content

export const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id not Found",
      });
    }

    const { heading, content } = req.body;

    const updateAbout = await aboutModel.findByIdAndUpdate(
      id,
      {
        heading,
        content,
      },
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      success: true,
      message: "About updated successfully",
      data: updateAbout,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//delete about content
export const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }

    const deletedAbout = await aboutModel.findByIdAndDelete(id);

    if (!deletedAbout) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    res.json({
      success: true,
      message: "About Content deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
