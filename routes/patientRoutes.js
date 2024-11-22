import express from 'express';
import { addPatient } from '../controllers/patient.Controller.js';
import { authMiddleware } from '../middlewares/auth.Middleware.js';
import upload from '../middlewares/upload.Middleware.js';

const router = express.Router();

// POST /api/patients
router.post('/', authMiddleware, upload.single('profilePhoto'), addPatient);

export default router;