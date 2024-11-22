import mongoose from 'mongoose';
import User from '../models/user.model.js'

const hospitalSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  type: { type: String, default: '' },
  registrationNumber: { type: String, default: '' },
  yearEstablished: { type: Number, default: new Date().getFullYear() },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    country: { type: String, default: 'Nigeria' },
  },
  contactInfo: {
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    website: { type: String, default: '' },
  },
  facilities: [{ type: String }],
  specialties: [{ type: String }],
  numberOfBeds: { type: Number, default: 0 },
  accreditations: [{ type: String }],
  description: { type: String, default: '' },
  logo: { type: String, default: null },
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  medicalRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord' }],
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
  isProfileComplete: { type: Boolean, default: false }
}, { timestamps: true });

const Hospital = User.discriminator('hospital', hospitalSchema);
export default Hospital;

