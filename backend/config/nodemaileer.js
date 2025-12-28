import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // MUST be true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD, // Google App Password
  },
});

export default transporter;
