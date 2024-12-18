import mongoose from 'mongoose';
import User from './userModel.js'; // Assuming you renamed user.js to User.js

// Hospital schema
const hospitalSchema = new mongoose.Schema({
  profilePicture: {
    type: String, // URL to the profile picture
    default: null, // Default can be null or a placeholder URL
  },
  organizationName: { type: String, required: true, unique: true }, // Name of the hospital/clinic
  registrationNumber: { type: String, required: true, unique: true }, // Government/Legal registration number
  licenseNumber: { type: String, required: true, unique: true }, // Operating license
  licenseAuthority: { type: String, required: true }, // Authority that issued the license
  licenseExpiration: { type: Date, required: true }, // Expiry date of the license
  contactEmail: { type: String, required: true }, // General email address for the hospital
  contactPhone: { type: String, required: true }, // General phone number
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  website: { type: String }, // Hospital's official website
  facilities: [
    {
      name: { type: String, required: true }, // e.g., ICU, Emergency Room
      description: { type: String }, // Optional details about the facility
    },
  ],
  departments: [
    {
      name: { type: String, required: true }, // e.g., Cardiology, Neurology
      head: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }, // Department head (Doctor)
      staffCount: { type: Number, default: 0 }, // Number of staff in the department
    },
  ],
  servicesOffered: [{ type: String }], // e.g., Surgery, Diagnostics, Emergency
  operatingHours: {
    start: { type: String, required: true }, // e.g., "08:00"
    end: { type: String, required: true }, // e.g., "20:00"
  },
  totalBeds: { type: Number, default: 0 }, // Total beds in the hospital
  availableBeds: { type: Number, default: 0 }, // Currently available beds
  emergencyContact: {
    name: { type: String, required: true }, // Contact person for emergencies
    phone: { type: String, required: true },
    email: { type: String },
  },
  ratings: {
    averageRating: { type: Number, default: 0 }, // Average patient rating
    totalReviews: { type: Number, default: 0 }, // Total number of reviews
  },
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }], // List of doctors associated with the hospital
  profileCompleted: { type: Boolean, default: false }, // Tracks second-step registration
}, { timestamps: true });

// Discriminator
const Hospital = User.discriminator('hospital', hospitalSchema);

export default Hospital;
