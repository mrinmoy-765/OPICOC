import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },

    otp: { type: String, required: true },

    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, //TTL auto delete
    },

    attempts: { type: Number, default: 0 },

    userData: {
      FirstName: String,
      LastName: String,
      password: String,
    },
  },
  { timestamps: true }
);

const OtpModel = mongoose.model("otp", otpSchema);
export default OtpModel;
