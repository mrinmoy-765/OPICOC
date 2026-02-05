import axios from "axios";
import requestModel from "../models/requestbaseModel.js";
import FormData from "form-data";
import transporter from "../config/nodemaileer.js";

export const createRequest = async (req, res) => {
  try {
    const { request, userId, FirstName, LastName, email, userImage } = req.body;

    let requestImageUrl = "";

    // If image exists → upload to freeimage.host
    if (req.file) {
      const formData = new FormData();
      formData.append("image", req.file.buffer.toString("base64"));

      const imgRes = await axios.post(
        `https://freeimage.host/api/1/upload?key=${process.env.FREEIMAGE_KEY}`,
        formData,
      );

      requestImageUrl = imgRes.data.image.display_url;
    }

    const newRequest = await requestModel.create({
      request,
      userId,
      FirstName,
      LastName,
      email,
      userImage,
      requestImage: requestImageUrl,
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: process.env.NOTIFICATION_RECEIVER_EMAIL,
      subject: "New Request Alert",
      text: `A new request has been sent from ${email}. 
        Name ~${FirstName}
        Please Check  system -Opicoc`,
    });

    res.json({
      success: true,
      message: "Request submitted successfully",
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await requestModel.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "Request fetched successfully",
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
