import express from'express';
import { updatePatientProfile } from'../controllers/patientController.js';

const router = express.Router();

// For Patient
router.put('/profile/:id', updatePatientProfile);

export default router;
