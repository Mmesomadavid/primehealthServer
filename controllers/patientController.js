import Patient from '../models/patient.js';
import Doctor from '../models/doctor.js';
import Hospital from '../models/hospital.js';

export const createPatient = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(403).json({ message: 'Only authorized doctors can create patients' });
    }

    const hospital = await Hospital.findOne({ doctors: doctorId });

    if (!hospital) {
      return res.status(403).json({ message: 'Doctor is not associated with any hospital' });
    }

    const newPatient = new Patient({
      ...req.body,
      primaryDoctor: doctorId,
      hospital: hospital._id,
    });

    await newPatient.save();

    doctor.patients.push(newPatient._id);
    await doctor.save();

    res.status(201).json({ message: 'Patient created successfully', patient: newPatient });
  } catch (error) {
    res.status(500).json({ message: 'Error creating patient', error: error.message });
  }
};

export const getPatients = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const patients = await Patient.find({ primaryDoctor: doctorId })
      .select('firstName lastName dateOfBirth gender');

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const patientId = req.params.id;

    const patient = await Patient.findOne({ _id: patientId, primaryDoctor: doctorId });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found or you are not authorized to update this patient' });
    }

    Object.assign(patient, req.body);
    await patient.save();

    res.status(200).json({ message: 'Patient updated successfully', patient });
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient', error: error.message });
  }
};

