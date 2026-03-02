import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import socialRouter from "./routes/Social.route.js"
import bandMemberRouter from "./routes/BandMember.route.js"
import tourRouter from "./routes/Tour.route.js"

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This is the safest way to ensure Render finds the folder
app.set("views", path.resolve(__dirname, "views")); 
app.set("view engine", "ejs");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

app.use("/api/v1/socials", socialRouter);
app.use("/api/v1/bandMembers", bandMemberRouter);
app.use("/api/v1/tours", tourRouter);

app.get("/", (req, res) => {
    res.send("<h1>Concrete Static API is Live</h1><p>Visit /api/v1/socials/crud for admin.</p>");
});


export default app;