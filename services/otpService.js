import OTP from "../models/otp.js"
import rateLimit from 'express-rate-limit';
import { otpMail } from "./emailService.js";

export const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: 'Too many OTP requests from this IP, please try again after 15 minutes',
});


export const sendOTP = async (email) => {
  const otp = new OTP({ email });
  const emailData = await otpMail(email, otp.code);
  if (emailData.error) {
    return { error: emailData.error };
  } 
  else {
    await otp.save();
    return { message: "success" };
  }
};

export const validateOTP = async (email, otp) => {
  const code = await OTP.findOne({ email, code: otp });
  if (!code) return false;

  return true;
};