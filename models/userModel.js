import mongoose from "mongoose";
import jwt  from "jsonwebtoken";

// Base user schema
const userSchema = new mongoose.Schema(
  {
    accountType: { 
        type: String, 
        enum: ['doctor', 'hospital'], 
        required: true 

    }, // Type of user
    firstName: { 
        type: String, 
        required: true,
        unique: true,
    },
    lastName: { 
        type: String, 
        required: true,
        unique: true,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    phone: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    isEmailVerified: { 
        type: Boolean, 
        default: false 
    }, // Email or account verification status

    isAccountVerified: {
        type: Boolean,
        default: false
    },

    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
  },
  { discriminatorKey: 'accountType', timestamps: true } // Enables inheritance
);

userSchema.methods.genAuthToken = function () {
    return jwt.sign(
      { id: this._id, accountType: this.accountType },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "6h",
      },
    );
  };

const User = mongoose.model('User', userSchema);
export default User
