import mongoose from 'mongoose';
import User from './userModel.js';

// Patient schema (discriminator)
const patientSchema = new mongoose.Schema({
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
  dateOfBirth: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Other'
  },
  address: {
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
  emergencyContact: {
    name: {
      type: String,
      default: ''
    },
    relationship: {
      type: String,
      default: ''
    },
    phoneNumber: {
      type: String,
      default: ''
    }
  },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', ''],
    default: ''
  },
  medicalHistory: [{
    condition: {
      type: String,
      default: ''
    },
    dateDiagnosed: {
      type: Date,
      default: null
    },
    treatment: {
      type: String,
      default: ''
    }
  }],
  allergies: [{
    name: {
      type: String,
      default: ''
    },
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe'],
      default: 'mild'
    }
  }],
  currentMedications: [{
    name: {
      type: String,
      default: ''
    },
    dosage: {
      type: String,
      default: ''
    },
    frequency: {
      type: String,
      default: ''
    }
  }],
});

const Patient = User.discriminator('patient', patientSchema);
export default Patient;
