import Doctor from "../models/doctor.js";

// Update Doctor Profile
export const updateDoctorProfile = async (req, res, next) => {
  try {
    const user = await Doctor.findOneAndUpdate(
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


export const getDoctors = async (req, res, next) => {
  
  try {
    const doctors = await Doctor.find()
    res.status(200).send(doctors);
  } catch (err) {
    next(err);
  }
}