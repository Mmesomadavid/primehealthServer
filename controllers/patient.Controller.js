import Patient from '../models/patient.model.js';
import Hospital from '../models/hospital.model.js';
import { validatePatientInput } from '../utils/validations.js';

export const addPatient = async (req, res) => {
  try {
    // Parse nested JSON strings in the request body
    const parsedBody = {
      ...req.body,
      address: JSON.parse(req.body.address || '{}'),
      healthInfo: JSON.parse(req.body.healthInfo || '{}'),
      emergencyContact: JSON.parse(req.body.emergencyContact || '{}')
    };

    // Validate input
    const { error } = validatePatientInput(parsedBody);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the hospital exists
    const hospital = await Hospital.findById(req.user.hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    // Create new patient
    const newPatient = new Patient({
      ...parsedBody,
      entitledHospital: req.user.hospitalId,
      createdBy: req.user._id,
      profilePhoto: req.file ? req.file.path : undefined,
      appointmentStatus: 'No Appointment',
      lastVisit: null,
      status: 'Active'
    });

    // Save patient to database
    await newPatient.save();

    // Add patient to hospital's patients array
    hospital.patients.push(newPatient._id);
    await hospital.save();

    // Prepare the response data
    const patientResponse = {
      id: newPatient._id,
      firstName: newPatient.firstName,
      lastName: newPatient.lastName,
      email: newPatient.email,
      phoneNumber: newPatient.phoneNumber,
      age: newPatient.age,
      appointmentStatus: newPatient.appointmentStatus,
      lastVisit: newPatient.lastVisit,
      status: newPatient.status,
      profilePhoto: newPatient.profilePhoto
    };

    res.status(201).json({
      message: 'Patient added successfully',
      patient: patientResponse
    });
  } catch (error) {
    console.error('Error adding patient:', error);
    res.status(500).json({ message: 'Error adding patient', error: error.message });
  }
};

// You can keep your existing getPatients function here, or add it if you haven't already
export const getPatients = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = 'All' } = req.query;
    const query = {
      entitledHospital: req.user.hospitalId,
      $or: [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ]
    };

    if (status !== 'All') {
      query.status = status;
    }

    const patients = await Patient.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .select('firstName lastName email appointmentStatus lastVisit status profilePhoto');

    const count = await Patient.countDocuments(query);

    res.json({
      patients,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};