import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    request: { type: String, requied: true },
    requestImage: { type: String, default: "" },
    userId: { type: String, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    email: {
      type: String,
    },
    userImage: { type: String, default: "" },
  },
  { timestamps: true },
);

const requestModel =
  mongoose.models.requests || mongoose.model("requests", requestSchema);

export default requestModel;
