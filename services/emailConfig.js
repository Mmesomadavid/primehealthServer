import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import twilio from "twilio"; // Import Twilio

// Email Transporter Setup
export const transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000, // 10 seconds
  socketTimeout: 10000, // 10 seconds
});

export const verifyTransporter = async (retries = 3, delay = 5000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await transporter.verify();
      console.log("Email Transporter Verified");
      return;
    } catch (error) {
      console.error(
        `Email transporter verification failed on attempt ${attempt}: ${error.message}`
      );

      if (attempt < retries) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error("All attempts to verify email transporter failed. Exiting...");
        process.exit(1);
      }
    }
  }
};

// Twilio Setup
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendPhoneOTP = async (phoneNumber, otp) => {
  try {
    const message = await twilioClient.messages.create({
      body: `Your PrimeHealth OTP is: ${otp}. It expires in 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: phoneNumber, // Recipient's phone number
    });
    console.log(`SMS sent successfully to ${phoneNumber}. Message SID: ${message.sid}`);
  } catch (error) {
    console.error(`Failed to send SMS to ${phoneNumber}: ${error.message}`);
    throw new Error("Failed to send OTP via SMS.");
  }
};

// Generate OTP (shared for both email and phone)
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};
