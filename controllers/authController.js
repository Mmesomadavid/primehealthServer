import User from '../models/userModel.js';
import Doctor from '../models/doctorModel.js';
import Hospital from '../models/hospitalModel.js';
import bcrypt from 'bcrypt';
import { sendOTP, validateOTP } from '../services/otpService.js';
import { validateUserSignup, validateUserLogin } from '../utils/validations.js';
import AppError from '../utils/appError.js';
import { welcomeMail } from '../services/emailService.js';
import jwt from 'jsonwebtoken';

// Get user details
export const getUser = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send({ message: "Unauthorized access" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
    if (err) return res.status(403).send({ message: "Invalid token" });

    try {
      const userData = await User.findById(user.id);
      if (!userData) return next(new AppError('User not found', 404));

      res.send({ user: userData });
    } catch (err) {
      next(err);
    }
  });
};

// Signup logic
export const signup = async (req, res, next) => {
  try {
    const { error } = validateUserSignup(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    const { accountType, username, email, password, phone } = req.body;

    // Check if user already exists
    let user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (user) {
      if (user.email === email) {
        return next(new AppError("Email already registered. Please login.", 400));
      } else if (user.username === username) {
        return next(new AppError("This phone number is already registered.", 400));
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user based on account type
    if (accountType === 'hospital') {
      user = new Hospital({ accountType, username, email, phone, password: hashedPassword });
    } else if (accountType === 'doctor') {
      user = new Doctor({ accountType, username, email, phone, password: hashedPassword });
    } else {
      return next(new AppError('Invalid account type', 400));
    }

    await user.save();
    await sendOTP(email);

    // Generate JWT
    const token = user.genAuthToken();

    res.status(201).json({
      message: "User registered successfully. Check your email for OTP.",
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    next(new AppError('An error occurred during registration. Please try again.', 500));
  }
};

// OTP Verification Logic
export const verifyOTP = async (req, res, next) => {
  const { email, code } = req.body;

  // Validate the OTP
  const isValid = await validateOTP(email, code);
  if (!isValid) return next(new AppError('Invalid OTP.', 400));

  // Mark the user's email as verified
  let user = await User.findOne({ email });
  if (!user) return next(new AppError('User not found.', 404));

  try {
    user.isEmailVerified = true;
    await user.save();

    await welcomeMail(email); // Send welcome email

    const token = user.genAuthToken(); // Generate JWT

    res.status(200).send({
      message: 'Email verified successfully.',
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
  const user = await User.findOne({ email });
  if (!user) return next(new AppError('User not found.', 404));

  if (user.isEmailVerified) {
    return next(new AppError('Email already verified, please login.', 400));
  }

  // Generate and send a new OTP
  const otpCode = await saveOTP(email); // Save new OTP
  await sendOTP(email, otpCode); // Send new OTP

  res.status(200).send({ message: 'OTP sent successfully.' });
};

// Login Logic
export const login = async (req, res, next) => {
  const { error } = validateUserLogin(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) return next(new AppError('Invalid email or password.', 400));

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError('Invalid email or password.', 400));

  // Check if email is verified
  if (!user.isEmailVerified) {
    return next(new AppError('Email not verified', 400));
  }

  // Generate JWT
  const token = user.genAuthToken();

  res.send({ message: 'Logged in successfully', token, accountType: user.accountType });
};

// Request Password Reset
export const requestPasswordReset = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new AppError('User not found.', 404));

  try {
    const otpCode = await saveOTP(email);
    await sendOTP(email, otpCode);

    res.status(200).send({ message: 'Password reset OTP sent successfully.' });
  } catch (err) {
    next(err);
  }
};

// Verify Password Reset OTP
export const resetPassword = async (req, res, next) => {
  const { email, code, newPassword } = req.body;

  // Validate the OTP
  const isValid = await validateOTP(email, code);
  if (!isValid) return next(new AppError('Invalid OTP.', 400));

  // Find the user
  const user = await User.findOne({ email });
  if (!user) return next(new AppError('User not found.', 404));

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ message: 'Password reset successfully.' });
  } catch (err) {
    next(err);
  }
};
