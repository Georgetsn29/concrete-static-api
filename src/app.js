import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import socialRouter from "./routes/Social.route.js"
import bandMemberRouter from "./routes/BandMember.route.js"
import tourRouter from "./routes/Tour.route.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

app.use("/socials", socialRouter);
app.use("/bandMembers", bandMemberRouter);
app.use("/tours", tourRouter);


export default app;