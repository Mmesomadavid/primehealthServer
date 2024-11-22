import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  scheduledAt: { type: Date, required: true },
  meetingDetails: { type: String },
  meetingId: { type: String, unique: true },
  roomId: { type: String, unique: true },
  password: { type: String, required: true },
  confirmationSent: { type: Boolean, default: false },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  colleagueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Colleague' },
  colleague: { type: mongoose.Schema.Types.ObjectId, ref: 'Colleague' },
}, { timestamps: true });
const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment