import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import alumniRoutes from "./routes/alumni.js";
import studentRoutes from "./routes/student.js";
import adminRoutes from "./routes/admin.js";
import companyRoutes from "./routes/company.js";
import queriesRoutes from "./routes/queries.js";
import { register } from "./controllers/auth.js";
//import { createQueries } from "./controllers/queries.js";
import { verifyToken } from "./middleware/auth.js";
import Admin from "./models/Admin.js";
import Student from "./models/Student.js";
import Company from "./models/Company.js";
import Alumni from "./models/Alumni.js";
import Queries from "./models/Queries.js";
import { admins, alumni, students, queries } from "./data/index.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
//app.post("/queries", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/alumni", alumniRoutes);
app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);
app.use("/company", companyRoutes);
app.use("/queries", queriesRoutes);
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
const con = mongoose.connect(process.env.MONGO_URL);

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
