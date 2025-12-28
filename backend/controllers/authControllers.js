import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import OtpModel from "../models/TemporaryOTP.collection.js";
import transporter from "../config/nodemaileer.js";

//register
//Step 1: Register → Send OTP (NO user save)
export const register = async (req, res) => {
  const { FirstName, LastName, email, password } = req.body;

  if (!FirstName || !LastName || !email || !password) {
    return res.json({ success: false, message: "Missing details" });
  }

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.json({ success: false, message: "User already exists" });
  }

  const existingOtp = await OtpModel.findOne({ email });

  //  Rate limit: block resend if OTP still valid
  if (existingOtp && existingOtp.expiresAt > new Date()) {
    return res.json({
      success: false,
      message: "OTP already sent. Please wait 5 minutes.",
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedPassword = await bcrypt.hash(password, 10);

  await OtpModel.findOneAndUpdate(
    { email },
    {
      otp,
      attempts: 0,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      userData: { FirstName, LastName, password: hashedPassword },
    },
    { upsert: true, new: true }
  );

  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Verify your email",
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
  });

  res.json({ success: true, message: "OTP sent to email" });
};

//Step 2: Verify OTP → Save User
export const verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;

  const otpRecord = await OtpModel.findOne({ email });

  if (!otpRecord) {
    return res.json({ success: false, message: "OTP expired or not found" });
  }

  //  Max attempts
  if (otpRecord.attempts >= 5) {
    await OtpModel.deleteOne({ email });
    return res.json({
      success: false,
      message: "Too many attempts. Please register again.",
    });
  }

  //  Wrong OTP
  if (otpRecord.otp !== otp) {
    otpRecord.attempts += 1;
    await otpRecord.save();

    return res.json({
      success: false,
      message: `Invalid OTP. Attempts left: ${5 - otpRecord.attempts}`,
    });
  }

  //  OTP correct → create user
  await userModel.create({
    email,
    FirstName: otpRecord.userData.FirstName,
    LastName: otpRecord.userData.LastName,
    password: otpRecord.userData.password,
  });

  await OtpModel.deleteOne({ email });

  res.json({
    success: true,
    message: "Email verified & account created",
  });
};

//log in
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invallid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: userModel._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
