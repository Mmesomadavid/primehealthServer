import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// Base user schema
const userSchema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      enum: ["doctor", "patient"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  { discriminatorKey: "accountType", timestamps: true },
);

userSchema.methods.genAuthToken = function () {
  return jwt.sign(
    { id: this._id, accountType: this.accountType },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: "6h",
    },
  );
};

const User = mongoose.model("User", userSchema);
export default User;
