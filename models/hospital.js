import mongoose from 'mongoose';
import User from './userModel.js';

const hospitalSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
    default: null,
  },
  organizationName: { type: String, default: '', unique: true },
  registrationNumber: { type: String, default: '', unique: true },
  licenseNumber: { type: String, default: '', unique: true },
  licenseAuthority: { type: String, default: '' },
  licenseExpiration: { type: Date, default: '' },
  contactEmail: { type: String, default: '' },
  contactPhone: { type: String, default: '' },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    postalCode: { type: String, default: '' },
  },
  website: { type: String },
  facilities: [
    {
      name: { type: String, default: '' },
      description: { type: String },
    },
  ],
  departments: [
    {
      name: { type: String, default: '' },
      head: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
      staffCount: { type: Number, default: 0 },
    },
  ],
  servicesOffered: [{ type: String }],
  operatingHours: {
    start: { type: String, default: '' },
    end: { type: String, default: '' },
  },
  totalBeds: { type: Number, default: 0 },
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

