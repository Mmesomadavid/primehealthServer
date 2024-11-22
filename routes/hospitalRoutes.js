import express from 'express';
import { getHospitals, updateHospitalProfile, getHospitalProfile } from '../controllers/hospital.controller.js';

const router = express.Router();

// Get all hospitals (public route)
router.get('/', getHospitals);

// Get hospital profile (protected route)
router.get('/profile/:id', getHospitalProfile);

// Update hospital profile (protected route)
router.put('/profile/:id', updateHospitalProfile);

export default router;

