import mongoose from 'mongoose';
import User from './userModel.js';

const patientSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
    default: null,
  },
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  allergies: [String],
  medicalHistory: [
    {
      condition: String,
      diagnosisDate: Date,
      treatment: String,
    },
  ],
  currentMedications: [
    {
      name: String,
      dosage: String,
      frequency: String,
    },
  ],
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
}, { timestamps: true });

const Patient = User.discriminator('patient', patientSchema);

export default Patient;

