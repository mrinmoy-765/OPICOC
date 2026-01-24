import mongoose from "mongoose";

const townhallSchema = new mongoose.Schema(
  {
    townhalls: { type: String, required: false },
  },
  { timestamps: true },
);

const townhallModel =
  mongoose.models.townhalls || mongoose.model("townhalls", townhallSchema);

export default townhallModel;
