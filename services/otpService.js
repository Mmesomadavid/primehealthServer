import OTP from "../models/otp.js"
import rateLimit from 'express-rate-limit';
import { otpMail } from "./emailService.js";


export const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: 'Too many OTP requests from this IP, please try again after 15 minutes',
});


export const sendOTP = async (phone) => {
  const otp = new OTP({ phone });
  const phoneData = await otpMail(phone, otp.code);
  if (phoneData.error) {
    return { error: phoneData.error };
  } 
  else {
    await otp.save();
    return { message: "success" };
  }
};

export const validateOTP = async (phone, otp) => {
  const code = await OTP.findOne({ phone, code: otp });
  if (!code) return false;

  return true;
};