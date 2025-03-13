import express from "express";
import dotenv from "dotenv";
import prisma from "./src/config/db.js";
import postrouter from "./src/routes/postRoutes.js";
import userrouter from "./src/routes/userRoutes.js"
import authroutes from "./src/routes/authRoutes.js"
import errorHandler from "./src/middlewares/errorHandler.js";
import adminRoutes from './src/routes/adminRoutes.js';


import cors from "cors";

dotenv.config();

const app = express();

// export const BASE_URL = process.env.BASE_URL; // BASE_URL अब export होगा
// // console.log("Base URL:", BASE_URL);

app.use(cors());
app.use(express.json()); // ✅ This allows Express to parse JSON requests
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", postrouter);
app.use("/api/user", userrouter);
app.use("/auth",authroutes);
app.use('/admin', adminRoutes);

app.use(errorHandler);  // ise sabse niche rakhte h

app.get("/", (req, res) => {
    return res.send("blog project");
});

const PORT = process.env.PORT || 5055;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
