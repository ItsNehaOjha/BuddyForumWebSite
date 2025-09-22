import path from "path";
import express from "express";
import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import complaintRoutes from "./routes/complaint.route.js";
import notificationRoutes from "./routes/notification.route.js"  
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();
cloudinary.config ({
    cloud_name: "drsaay0v",
    api_key: "226395533919326",
    api_secret: "yyk-hceSnTlTnqOdg1dzmw5ZJU8",
})
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes 
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes); 
app.use("/api/notifications", notificationRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});
