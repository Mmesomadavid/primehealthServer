import Appointment from '../models/appointmentModel.js';
import User from '../models/userModel.js';
import AppError from "../utils/appError.js";
import { alertDoctor, pendingAppointmentMail } from "../services/emailService.js";



export const bookAppointment = async (req, res, next) => {
  try {
    const { patientId, doctorId, reason } = req.body;

    // Check if both patient and doctor exist
    const patient = await User.findById(patientId);
    const doctor = await User.findById(doctorId);

    if (!patient || !doctor) next(new AppError("Patient or Doctor not found", 404))

    // Create a new appointment
    const newAppointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      reason
    });

    await newAppointment.save();

    await pendingAppointmentMail(patient.email)
    await alertDoctor(doctor.email, reason)

    return res.status(201).json({
      message: 'Appointment booked successfully',
    });
  } catch (err) {
    next(err);
  }
};


export const getPatientAppointments = async (req, res, next) => {
  try {
    const { id: patientId } = req.params;

    const appointments = await Appointment.find({ patient: patientId })
      .populate('doctor', 'firstName lastName specialization')
      .exec();

    if (!appointments || appointments.length === 0) {
      return next(new AppError('No appointments found for this patient.', 404));
    }

    res.json(appointments);
  } catch (error) {
    next(new AppError('Error fetching patient appointments. Please try again later.', 500));
  }
};