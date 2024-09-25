import Patient from "../models/patientModel.js";

// Update Patient Profile
export const updatePatientProfile = async (req, res, next) => {
  try {
    const user = await Patient.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );

    // Generate JWT
    const token = user.genAuthToken();

    res.status(200).send({
      message: "Profile updated successfully.",
      token,
      accountType: user.accountType,
    });
  } catch (err) {
    next(err);
  }
};
