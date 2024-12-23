import express from 'express';
import { createPatient, getPatients, updatePatient } from '../controllers/patientController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createPatient);
router.get('/', authMiddleware, getPatients);
router.put('/:id', authMiddleware, updatePatient);

export default router;

