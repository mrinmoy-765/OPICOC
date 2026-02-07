import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import contactRouter from "./routes/contactRoutes.js";
import requestRouter from "./routes/requestRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    // origin: "https://superb-marshmallow-f18f00.netlify.app", // your frontend URL
    credentials: true,
  }),
);

//API Endpoints
app.get("/", (req, res) => res.send("API Working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/review", reviewRouter);
app.use("/api/request", requestRouter);
app.use("/api/contact", contactRouter);
app.listen(port, () => console.log(`Server started on PORT:${port}`));
