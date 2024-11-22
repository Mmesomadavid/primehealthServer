import Hospital from "../models/hospital.model.js";

// Update Hospital Profile
export const updateHospitalProfile = async (req, res, next) => {
  try {
    const user = await Hospital.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body, isProfileComplete: true },
      { new: true },
    );

    // Generate JWT
    const token = user.genAuthToken();

    res.status(200).send({
      message: "Profile updated successfully.",
      token,
      accountType: user.accountType,
      isProfileComplete: user.isProfileComplete
    });
  } catch (err) {
    next(err);
  }
};

export const getHospitals = async (req, res, next) => {
  try {
    const Hospitals = await Hospital.find()
    res.status(200).send(Hospitals);
  } catch (err) {
    next(err);
  }
}

// Add this new function
export const getHospitalProfile = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).send({ message: "Hospital not found" });
    }
    res.status(200).send(hospital);
  } catch (err) {
    next(err);
  }
};

