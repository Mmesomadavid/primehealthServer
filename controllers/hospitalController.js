import Hospital from "../models/hospital.js";

// Update Hospital Profile
export const updateHospitalProfile = async (req, res, next) => {
  try {
    // Validate the provided ID
    if (!req.params.id) {
      return res.status(400).send({ error: "Hospital ID is required." });
    }

    const user = await Hospital.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true } // Return the updated document
    );

    // Check if the hospital exists
    if (!user) {
      return res.status(404).send({ error: "Hospital not found." });
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

// Get All Hospitals
export const getHospitals = async (req, res, next) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).send(hospitals);
  } catch (err) {
    next(err);
  }
};
