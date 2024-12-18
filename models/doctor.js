import mongoose from 'mongoose';
import User from './userModel.js'; // Assuming you renamed user.js to User.js

// Doctor schema
const doctorSchema = new mongoose.Schema({
  profilePicture: {
    type: String, // URL to the profile picture
    default: null, // Default can be null or a placeholder URL
  },
  specialization: { 
    type: String, default: '' 
  }, // e.g., Cardiologist
  secondarySpecialization: { 
    type: String 
  }, // Optional secondary specialization
  yearsOfExperience: { 
    type: Number, 
    default: '' 
  }, // e.g., 5
  licenseNumber: { 
    type: String,
    default: '' 
  }, // Medical license number
  licenseAuthority: { 
    type: String, 
    default: '' 
  }, // Licensing authority
  licenseExpiration: { 
    type: Date, 
    default: '' 
  }, // Expiry of license
  affiliatedHospitals: [{ 
    type: String }], // List of affiliated hospitals or clinics
  education: [
    {
      degree: { 
        type: String, 
        default: '' 
      }, // e.g., MBBS, MD
      institution: { 
        type: String, 
        default: '' 
      }, // e.g., Harvard Medical School
      graduationYear: { 
        type: Number, 
        default: '' 
      }, // e.g., 2020
    },
  ],
  certifications: [
    {
      certificationName: { 
        type: String, 
        default: '' 
      }, // e.g., FACS
      issuedBy: { 
        type: String, 
        default: '' 
      }, // e.g., Board of Surgery
      yearObtained: { 
        type: Number, 
        default: '' 
      }, // e.g., 2018
    },
  ],
  biography: { 
    type: String }, // Doctor's short biography
  languagesSpoken: [{ 
    type: String }], // e.g., English, Spanish
  consultingHours: {
    start: { 
      type: String 
    }, // e.g., "09:00"
    end: { 
      type: String 
    }, // e.g., "17:00"
  },
  consultationFees: {
    initial: { 
      type: Number, 
      required: false 
    }, // e.g., 100
    followUp: { 
      type: Number, 
      required: false 
    }, // e.g., 50
  },
  officeAddress: { 
    type: String 
  }, // Clinic or hospital address
  availableServices: [{ 
    type: String 
  }], // e.g., "Surgery", "Telemedicine"
  patients: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient' 
  }], // Related patients
  ratings: {
    averageRating: { 
      type: Number, 
      default: 0 
    }, // Average patient rating
    totalReviews: { 
      type: Number, 
      default: 0 
    }, // Total number of reviews
  },
  profileCompleted: { 
    type: Boolean, 
    default: false 
  }, // Tracks second-step registration
}, { timestamps: true });

// Discriminator
const Doctor = User.discriminator('doctor', doctorSchema);

export default Doctor;
