import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemaileer.js";
import axios from "axios";
import FormData from "form-data";

//get user data(profile)
export const getUserData = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await userModel.findById(id);

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    res.json({
      success: true,
      userData: {
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        country: user.country,
        zipCode: user.zipCode,
        image: user.image,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//update user profile
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const { FirstName, LastName, phone, address, country, city, zipCode } =
      req.body;

    if (FirstName === "" || LastName === "") {
      return res.json({
        success: false,
        message: "FirstName/LastName Can not be Empty",
      });
    }

    const user = await userModel.findByIdAndUpdate(
      id,
      {
        FirstName,
        LastName,
        phone,
        address,
        country,
        city,
        zipCode,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//change password
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword.length < 6) {
      return res.json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // FIND USER BY _id
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid user",
      });
    }

    // COMPARE HASHED PASSWORD
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // HASH NEW PASSWORD
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // SEND EMAIL
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Changed",
      text: `Your password has been changed successfully. If this wasn't you, contact support immediately.`,
    });

    return res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//profile image upload
export const uploadProfileImage = async (req, res) => {
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

    //  console.log("Image res", res);

    if (!uploadRes.data?.success) {
      return res.status(400).json({
        success: false,
        message: "Image hosting failed",
      });
    }

    const imageUrl = uploadRes.data.image.display_url;

    // Save URL in MongoDB
    const user = await userModel.findByIdAndUpdate(
      req.user.id,
      { image: imageUrl },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile image updated",
      image: imageUrl,
      user,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};
