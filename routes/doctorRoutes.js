import express from'express';
const router = express.Router();
import { getDoctors, updateDoctorProfile } from'../controllers/doctor.Controller.js';

router.get('/', getDoctors);
router.put('/profile/:id', updateDoctorProfile);

export default router;