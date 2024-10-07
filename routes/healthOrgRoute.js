import express from'express';
import { updatePatientProfile } from'../controllers/healthOrgController';

const router = express.Router();

// For Health Organisations
router.put('/profile/:id', updateHealthOrgProfile);

export default router;
