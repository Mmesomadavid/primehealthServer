// Simulating the patientController.js file
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  age: { type: Number, required: true },
  maritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'] },
  address: {
    street: String,
    country: String,
    state: String,
    city: String,
  },
  healthInfo: {
    height: Number,
    weight: Number,
    disabilities: String,
    addictions: String,
  },
  emergencyContact: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  religion: String,
  occupation: String,
  title: String,
  numberOfChildren: Number,
  profilePhoto: String,
  appointmentStatus: { type: String, enum: ['Scheduled', 'No Appointment'], default: 'No Appointment' },
  lastVisit: { type: Date, default: null },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  entitledHospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
export default Patient