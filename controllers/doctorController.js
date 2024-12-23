import Doctor from "../models/doctor.js";

// Update Doctor Profile
export const updateDoctorProfile = async (req, res, next) => {
  try {
    // Validate the provided ID
    if (!req.params.id) {
      return res.status(400).send({ error: "Doctor ID is required." });
    }

    const user = await Doctor.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true } // Return the updated document
    );

    // Check if the doctor exists
    if (!user) {
      return res.status(404).send({ error: "Doctor not found." });
    }

    // Generate JWT
    const token = user.genAuthToken(); // Ensure genAuthToken exists and is correct

    res.status(200).send({
      message: "Profile updated successfully.",
      token,
      accountType: user.accountType,
    });
  } catch (err) {
    next(err);
  }
};

// Get All Doctors
export const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).send(doctors);
  } catch (err) {
    next(err);
  }
};
