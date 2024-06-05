import express from "express";
import {
  getStudent,
  getCompany,
  getStudentBookmarks,
  getStudentQueries,
  removeStudent,
  addRemoveBookmarks,
  removeStudentQueries,
  addStudentQueries,
  getFeedCompanies,
} from "../controllers/student.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/check", (req, res) => {
  res.status(200).json({ "status": "Okay" });
});

/* READ */
// Endpoint to get student details by ID
router.get("/:id", getStudent);

// Endpoint to get company details by ID
router.get("/:companyId", getCompany);

// Endpoint to get student's queries
router.get("/:id/queries", getStudentQueries);

// Endpoint to get student's bookmarks
router.get("/:id/bookmarks", getStudentBookmarks);

/* UPDATE */
// Endpoint to add a student's query
router.post("/:studId/student/:companyId/addQuery", addStudentQueries);
// Endpoint to add or remove a student
router.delete("/:id/remove", removeStudent);

// Endpoint to add or remove a bookmark for a students
router.patch("/:id/:companyId/bookmarks", addRemoveBookmarks);

// Endpoint to add or remove queries for a student
router.delete("/:id/:queryId/remove", removeStudentQueries);
router.get("/:id/companies", getFeedCompanies);
export default router;
