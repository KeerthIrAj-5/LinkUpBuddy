import express from "express";
import { getCompanyQueries } from "../controllers/company.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Test endpoint
router.get("/check", (req, res) => {
    res.status(200).json({ "status": "Okay" });
});

/* READ */
// Endpoint to get feed queries for a company
router.get("/:id/queries",getCompanyQueries);

// Endpoint to get user-specific queries for a company
// router.get("/:userId/:companyId/queries", verifyToken, getUserQueries);

export default router;
