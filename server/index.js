import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
//import dotenv from "dotenv";
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
import { registerAlumni, registerStudent } from "./controllers/auth.js";
import dotenv from "dotenv";
console.log(process.env.MONGO_URL); 
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
app.post("/auth/registerAlumni", upload.single("picture"), registerAlumni);
app.post("/auth/registerStudent", upload.single("picture"), registerStudent);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/alumni", alumniRoutes);
app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);
app.use("/company", companyRoutes);
app.use("/queries", queriesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));
