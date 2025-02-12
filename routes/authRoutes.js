import express from "express";
import passport from "passport";
import { registerUser, loginUser, refreshToken, logout } from "../controllers/authController.js";

const router = express.Router();

// Google OAuth Login
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.json({ message: "Google OAuth login successful", user: req.user });
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.json({ message: "Logout successful" });
  });
});


// GitHub OAuth Login
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.json({ message: "GitHub OAuth login successful", user: req.user });
  }
);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

export default router; 