import axios from "axios";
import reviewModel from "../models/reviewModel.js";
import FormData from "form-data";

export const createReview = async (req, res) => {
  try {
    const { review, rating, userId, FirstName, LastName, email, userImage } =
      req.body;

    let reviewImageUrl = "";

    // If image exists → upload to freeimage.host
    if (req.file) {
      const formData = new FormData();
      formData.append("image", req.file.buffer.toString("base64"));

      const imgRes = await axios.post(
        `https://freeimage.host/api/1/upload?key=${process.env.FREEIMAGE_KEY}`,
        formData
      );

      reviewImageUrl = imgRes.data.image.display_url;
    }

    const newReview = await reviewModel.create({
      review,
      rating,
      userId,
      FirstName,
      LastName,
      email,
      userImage,
      reviewImage: reviewImageUrl,
    });

    res.json({
      success: true,
      message: "Review submitted successfully",
      review: newReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "Review fetched successfully",
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
