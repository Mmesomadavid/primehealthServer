import mongoose from 'mongoose';
import User from './userModel.js';

const hospitalSchema = new mongoose.Schema({
  hospitalLogo: { type: String, default: null },
  hospitalName: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    postalCode: { type: String, default: '' },
  },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  website: { type: String, default: '' },

  // Staff Information
  totalDoctors: { type: Number, default: 0 },
  totalNurses: { type: Number, default: 0 },
  staffingRatio: { type: String, default: '' },
  trainingPrograms: { type: String, default: '' },
  staffMembers: [{
    name: { type: String, required: true },
    position: { type: String, required: true },
    specialization: { type: String, default: '' },
  }],

  // Facilities Information
  totalBeds: { type: Number, default: 0 },
  icuBeds: { type: Number, default: 0 },
  operatingRooms: { type: Number, default: 0 },
  emergencyServices: { type: String, enum: ['24/7', 'limited', 'none'], default: 'none' },
  specializedFacilities: [{ type: String }],
  laboratoryServices: { type: String, default: '' },
  pharmacyServices: { type: String, default: '' },
  departments: [{
    name: { type: String, required: true },
    description: { type: String, default: '' },
  }],

  // Additional fields from the original schema
  registrationNumber: { type: String, default: '', unique: true },
  licenseNumber: { type: String, default: '', unique: true },
  licenseAuthority: { type: String, default: '' },
  licenseExpiration: { type: Date },
  availableBeds: { type: Number, default: 0 },
  emergencyContact: {
    name: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String },
  },
  ratings: {
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
  },
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
  profileCompleted: { type: Boolean, default: false },
}, { timestamps: true });

const Hospital = User.discriminator('hospital', hospitalSchema);

export default Hospital;