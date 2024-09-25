import mongoose from 'mongoose';
import User from './userModel.js';

// Doctor schema (discriminator)
const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  phoneNumber: {
    type: String,
    default: ''
  },
  specialization: {
    type: String,
    default: ''
  },
  licenseNumber: {
    type: String,
    default: ''
  },
  experienceYears: {
    type: Number,
    default: 0
  },
  clinicAddress: {
    street: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: ''
    },
    postalCode: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      default: ''
    }
  },
  education: [{
    degree: {
      type: String,
      default: ''
    },
    institution: {
      type: String,
      default: ''
    },
    yearOfCompletion: {
      type: Number,
      default: null
    }
  }],
  availability: [{
    day: {
      type: String,
      default: ''
    },
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    }
  }],
});

const Doctor = User.discriminator('doctor', doctorSchema);
export default Doctor;
