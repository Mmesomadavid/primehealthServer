import Doctor from "../models/doctor.js";
import Hospital from "../models/hospital.js";
import bcrypt from "bcrypt";
import { sendOTP, validateOTP } from "../services/otpService.js";
import { validateUserSignup } from "../utils/validations.js";
import AppError from "../utils/appError.js";
import { welcomeMail } from "../services/emailService.js";
import jwt from "jsonwebtoken";

// Get the authenticated user details
export const getUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
    if (err) return res.sendStatus(403);

    try {
      let userData;
      if (user.accountType === "doctor") {
        userData = await Doctor.findById(user.id);
      } else if (user.accountType === "hospital") {
        userData = await Hospital.findById(user.id);
      }

      if (!userData) return next(new AppError("User not found", 404));

      res.send({ user: userData });
    } catch (err) {
      next(err);
    }
  });
};

// Sign Up Logic
export const signup = async (req, res, next) => {
  const { error } = validateUserSignup(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const { accountType, firstName, lastName, email,  phone, password } = req.body;

  // Check if user already exists with the same email or phone
  let user;
  if (accountType === "doctor") {
    user = await Doctor.findOne({ $or: [{ email }, { phone }] });
  } else if (accountType === "hospital") {
    user = await Hospital.findOne({ $or: [{ email }, { phone }] });
  }

  if (user) {
    if (user.email === email) {
      return next(new AppError("Email already registered, Please login", 400));
    } else if (user.phone === phone) {
      return next(new AppError("Phone number already registered, Please login", 400));
    }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user based on account type
  if (accountType === "doctor") {
    user = new Doctor({
      accountType,
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });
  } else if (accountType === "hospital") {
    user = new Hospital({
      accountType,
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });
  } else {
    return next(new AppError("Invalid account type", 400));
  }

  try {
    await user.save();

    // Send OTP to the user's email
    await sendOTP(email);

    // Generate JWT
    const token = user.genAuthToken();

    res.status(201).send({
      message: "User registered successfully, check your email for OTP.",
      token,
    });
  } catch (err) {
    next(err);
  }
};

// OTP Verification Logic
export const verifyOTP = async (req, res, next) => {
  const { email, code } = req.body;

  // Validate the OTP
  const isValid = await validateOTP(email, code);
  if (!isValid) return next(new AppError("Invalid OTP.", 400));

  // Find the user by email and mark email as verified
  let user;
  user = await Doctor.findOne({ email });
  if (!user) {
    user = await Hospital.findOne({ email });
  }

  if (!user) return next(new AppError("User not found.", 404));

  try {
    user.isEmailVerified = true;
    await user.save();

    // Send a welcome email after successful email verification
    await welcomeMail(email);

    // Generate JWT
    const token = user.genAuthToken();

    res.status(200).send({
      message: "Email verified successfully.",
      token,
      accountType: user.accountType,
    });
  } catch (err) {
    next(err);
  }
};

// Resend OTP Logic
export const resendOTP = async (req, res, next) => {
  const { email } = req.body;

  // Check if the user exists
  let user;
  user = await Doctor.findOne({ email });
  if (!user) {
    user = await Hospital.findOne({ email });
  }

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  if (user.isEmailVerified) {
    return next(new AppError("Email already verified, please login.", 400));
  }

  // Generate and send a new OTP
  const result = await sendOTP(email);

  if (result.error) {
    return next(new AppError("Error sending OTP. Please try again later.", 500));
  }

  res.status(200).send({ message: "OTP sent successfully." });
};

// Login Logic
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists
  let user;
  user = await Doctor.findOne({ email });
  if (!user) {
    user = await Hospital.findOne({ email });
  }

  if (!user) return next(new AppError("Invalid email or password.", 400));

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError("Invalid email or password.", 400));

  // Check if email is verified
  if (!user.isEmailVerified) {
    return next(new AppError("Email not verified", 400));
  }

  // Generate JWT
  const token = user.genAuthToken();

  res.send({ message: "Logged in successfully", token, accountType: user.accountType });
};
