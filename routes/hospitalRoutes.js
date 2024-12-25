import express from'express';
const router = express.Router();
import { getHospitals, updateHospitalProfile } from'../controllers/hospitalController.js';

router.get('/', getHospitals);
router.put('/profile/:id', updateHospitalProfile);

export default router;