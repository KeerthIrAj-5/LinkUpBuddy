import express from "express";
import {
  getAdmin,
  getStudent,
  getAlumni,
  getCompany,
  getStudentQueries,
  removeQueries,
  removeStudent,
  getAlumniAnswers,
  removeAnswers,
  removeAlumni,
  addCompany,
  removeCompany,
  getAllQueries,
  getAllAnswers,
} from "../controllers/admin.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Test endpoint
router.get("/check", (req, res) => {
  res.status(200).json({ "status": "Okay !" });
});

/* READ */
// Get admin by ID
router.get("/:id/admin", verifyToken,getAdmin);
router.get("/:companyId/company",getCompany);
// Get student by ID
router.get("/:id/student/:studId", verifyToken, getStudent);

// Get alumni by ID
router.get("/:id/alumni/:alumId",verifyToken, getAlumni);
// Get all queries
router.get("/:id/queries", getAllQueries);
// Get all answers
router.get("/:id/answers", getAllAnswers);
// Get queries of a specific student
router.get("/:id/student/:studId/queries",getStudentQueries);

// Get answers of a specific alumni
router.get("/:id/alumni/:alumId/answers", getAlumniAnswers);
router.get("/companies", getAllQueries);
/* UPDATE */
router.post("/addCompany", addCompany);
// Remove a student
router.delete("/:id/student/:studId/remove", removeStudent);

// Remove an alumni
router.delete("/:id/alumni/:alumId/remove", removeAlumni);

// Remove a company
router.delete("/:id/company/:companyId/remove", removeCompany);

// Remove a query
router.delete("/:id/query/:queryId/remove", removeQueries);

// Remove an answer
router.delete("/:id/answer/:answerId/remove", removeAnswers);

export default router;
