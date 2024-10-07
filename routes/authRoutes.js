import express from "express";
import {
  signup,
  login,
  verifyOTP,
  resendOTP,
  getUser,
} from "../controllers/authController.js";
import { otpLimiter } from "../services/otpService.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", otpLimiter, resendOTP);
router.get("/me", getUser);

export default router;