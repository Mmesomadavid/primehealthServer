import User from './userModel.js'
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  // Personal Info
  profilePicture: { type: String, default: null },
  username: { type: String, default: '', unique: true },
  biography: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  address: {
    streetAddress: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String }
  },

  // Professional Info
  specialization: { type: String },
  secondarySpecialization: { type: String },
  medicalQualifications: { type: String },
  yearsOfExperience: { type: Number },
  licenseNumber: { type: String },
  licenseAuthority: { type: String },
  licenseExpiration: { type: Date },
  licenseType: { type: String, enum: ['registered', 'boardCertified', 'specialist'] },
  licensePicture: { type: String },
  clinicalSkills: [{ type: String }],
  researchPublications: { type: String },
  awardsRecognition: [{
    name: { type: String },
    year: { type: String }
  }],
  languagesSpoken: [{ type: String }],

  // Work Experience
  currentPosition: { type: String },
  currentHospital: { type: String },
  previousEmployers: [{
    hospitalName: { type: String },
    role: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    current: { type: Boolean },
    keySkills: [{ type: String }]
  }],

  // Availability
  daysAvailable: [{ type: String }],
  timeSlots: [{
    startTime: { type: String },
    endTime: { type: String }
  }],
  consultationTypes: [{ type: String }],

  // Additional fields
  affiliatedHospitals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' }],
  education: [{
    degree: { type: String },
    institution: { type: String },
    graduationYear: { type: Number }
  }],
  certifications: [{
    certificationName: { type: String },
    issuedBy: { type: String },
    yearObtained: { type: Number }
  }],
  consultationFees: {
    initial: { type: Number },
    followUp: { type: Number }
  },
  availableServices: [{ type: String }],
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
  ratings: {
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
  },
  profileCompleted: { type: Boolean, default: false }
}, { timestamps: true });

const Doctor = User.discriminator('doctor', doctorSchema);
export default Doctor;

