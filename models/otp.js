import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    minLength: 5,
    maxLength: 225,
  },
  phone: { // Added phone field
    type: String,
    validate: {
      validator: function (v) {
        // Optional phone validation logic (e.g., regex for phone numbers)
        return v ? /^[0-9]{10,15}$/.test(v) : true;
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  code: {
    type: String,
    default: function () {
      return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // Document will be deleted after 10 minutes
  },
});

// Add validation to ensure either email or phone is provided
otpSchema.pre("save", function (next) {
  if (!this.email && !this.phone) {
    return next(new Error("Either email or phone must be provided."));
  }
  next();
});

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
