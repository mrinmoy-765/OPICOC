import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

const aboutModel =
  mongoose.models.abouts || mongoose.model("abouts", aboutSchema);
export default aboutModel;
