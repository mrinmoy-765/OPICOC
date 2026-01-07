import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    review: { type: String, requied: true },
    reviewImage: { type: String, default: "" },
    rating: { type: Number, required: true },
    userId: { type: String, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },

    email: {
      type: String,
    },
    userImage: { type: String, default: "" },
  },
  { timestamps: true }
);

const reviewModel =
  mongoose.models.reviews || mongoose.model("reviews", reviewSchema);

export default reviewModel;
