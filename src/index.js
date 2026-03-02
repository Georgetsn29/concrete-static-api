import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
import { closeOldShows } from "./controller/Tour.controller.js";
// import { Tour } from "./models/Tour.model.js";
// import { Social } from "./models/Social.model.js";

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await connectDB();
        console.log("Database connected successfully.");

        console.log("Running inventory maintenance..."); 
        await closeOldShows();

        const PORT = process.env.PORT || 8000;

        app.listen(PORT, () => {
            console.log(`✅ Server is LIVE at: http://localhost:${PORT}`);
        });
        

    } catch (error) {
        console.error("❌ STARTUP FAILED:", error.message);
    }
};

startServer();