import mongoose from 'mongoose';
import User from './userModel.js';

const doctorSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
    default: null,
  },
  specialization: { 
    type: String, 
    default: '' 
  },
  secondarySpecialization: { 
    type: String 
  },
  yearsOfExperience: { 
    type: Number, 
    default: '' 
  },
  licenseNumber: { 
    type: String,
    default: '' 
  },
  licenseAuthority: { 
    type: String, 
    default: '' 
  },
  licenseExpiration: { 
    type: Date, 
    default: '' 
  },
  affiliatedHospitals: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Hospital' 
  }],
  education: [
    {
      degree: { 
        type: String, 
        default: '' 
      },
      institution: { 
        type: String, 
        default: '' 
      },
      graduationYear: { 
        type: Number, 
        default: '' 
      },
    },
  ],
  certifications: [
    {
      certificationName: { 
        type: String, 
        default: '' 
      },
      issuedBy: { 
        type: String, 
        default: '' 
      },
      yearObtained: { 
        type: Number, 
        default: '' 
      },
    },
  ],
  biography: { 
    type: String 
  },
  languagesSpoken: [{ 
    type: String 
  }],
  consultingHours: {
    start: { 
      type: String 
    },
    end: { 
      type: String 
    },
  },
  consultationFees: {
    initial: { 
      type: Number, 
      required: false 
    },
    followUp: { 
      type: Number, 
      required: false 
    },
  },
  officeAddress: { 
    type: String 
  },
  availableServices: [{ 
    type: String 
  }],
  patients: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient' 
  }],
  ratings: {
    averageRating: { 
      type: Number, 
      default: 0 
    },
    totalReviews: { 
      type: Number, 
      default: 0 
    },
  },
  profileCompleted: { 
    type: Boolean, 
    default: false 
  },
}, { timestamps: true });

const Doctor = User.discriminator('doctor', doctorSchema);

export default Doctor;

