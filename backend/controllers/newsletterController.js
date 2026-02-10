import newsletterModel from "../models/newsletterModel.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!req.body)
      console.debug(
        "newsletter.subscribe: req.body is undefined - check request Content-Type and body payload",
      );
    if (!email) return res.status(400).json({ message: "Email is required" });

    // basic email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email))
      return res.status(400).json({ message: "Invalid email" });

    const exists = await newsletterModel.findOne({
      email: email.toLowerCase(),
    });
    if (exists) return res.status(200).json({ message: "Already subscribed" });

    await newsletterModel.create({ email: email.toLowerCase() });
    return res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//get all subscription email list
export const getAllEmails = async (req, res) => {
  try {
    const emails = await newsletterModel
      .find()

      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Email List Fetched Successfully",
      emails,
    });
  } catch (error) {
    res.json({
      sucess: false,
      message: error.message,
    });
  }
};
