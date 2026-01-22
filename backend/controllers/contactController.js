import contactModel from "../models/contactModel.js";
import transporter from "../config/nodemaileer.js";

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.json({
        success: false,
        message: "Required fields missing",
      });
    }

    await contactModel.create({
      name,
      email,
      subject,
      message,
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: process.env.NOTIFICATION_RECEIVER_EMAIL,
      subject: "New message Alert",
      text: `A new message has been sent from ${email}. Name ~[${name}]
             Please Check inbox in system -Opicoc`,
    });

    res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get all messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await contactModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get notifications of new message
export const getUnreadCount = async (req, res) => {
  try {
    const count = await contactModel.countDocuments({ isRead: false });

    res.json({
      success: true,
      count,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// mark message as read
export const markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }

    await contactModel.findByIdAndUpdate(id, { isRead: true });

    res.json({ success: true });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//send email to contact

export const sendEmail = async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: subject,
      text: message,
    });

    res.json({ success: true, message: "Message Sent Successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
