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

  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Welcome to Opicoc",
    text: `Congratulations ${otpRecord.userData.FirstName}. Your account has been registered.
             Explore the amazing bases and enhance your gaming experiences with us.
             Stay Connected.
                        ~ Opicoc`,
  });

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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Login Successful" });
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

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//is user logged in or not
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }
};

// Send Reset Password OTP
export const sendResetOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Email Not Found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 5 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Reset User Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Email, OTP and New Password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = "0";
    await user.save();

    return res.json({
      success: true,
      message: "Password has been reseted successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
