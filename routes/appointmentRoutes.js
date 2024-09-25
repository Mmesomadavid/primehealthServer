import express from "express";
import {
  bookAppointment,
  getPatientAppointments,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/book", bookAppointment);
router.get("/:id", getPatientAppointments);

export default router;
