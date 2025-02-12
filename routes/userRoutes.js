import express from "express";
import { protect, authorize,  } from "../middleware/authMiddleware.js"; // ✅ Correct import

const router = express.Router();

// Protected route - only accessible with a valid token
router.get("/profile", protect, (req, res) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});

// Admin-only route (only accessible to users with role "admin")
router.delete("/admin/delete-user", protect, authorize(["admin"]), (req, res) => {
  res.status(200).json({ message: "Admin action successful" });
});

export default router;
