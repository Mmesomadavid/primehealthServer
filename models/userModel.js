import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// Base user schema
const userSchema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      enum: ["doctor", "patient", "hospital"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: { // Added phone verification
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["User", "Doctor", "Hospital", "Patient"],
      default: "User",
    },
  },
  { discriminatorKey: "accountType", timestamps: true },
);

// Generate JWT token method
userSchema.methods.genAuthToken = function () {
  return jwt.sign(
    { id: this._id, accountType: this.accountType },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "6h",
    },
  );
};

const User = mongoose.model("User", userSchema);
export default User;
