import express from "express";
import {
  signup,
  login,
  verifyOTP,
  resendOTP,
  getUser,
  resetPassword
} from "../controllers/auth.controller.js";
import { otpLimiter } from "../services/otpService.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", otpLimiter, resendOTP);
router.post("/password-reset", resetPassword);
router.get("/me", getUser);

export default router;