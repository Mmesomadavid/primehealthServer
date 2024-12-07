import Joi from 'joi';

export const validateUserSignup = (user) => {
  const schema = Joi.object({
    accountType: Joi.string().valid('doctor', 'hospital').required(),
    email: Joi.string().email().required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().pattern(/^\+?\d{10,15}$/).required(),
  });

  return schema.validate(user);
};

export const validateUserLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
};

export const validatePatientInput = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    phoneNumber: Joi.string().pattern(new RegExp('^[0-9]{10,15}$')).required(),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      country: Joi.string().required(),
    }).required(),
    emergencyContact: Joi.object({
      name: Joi.string().required(),
      relationship: Joi.string().required(),
      phoneNumber: Joi.string().pattern(new RegExp('^[0-9]{10,15}$')).required(),
    }).required(),
    occupation: Joi.string().allow(''),
    numberOfChildren: Joi.number().min(0).default(0),
    spouse: Joi.object({
      name: Joi.string().allow(''),
      phoneNumber: Joi.string().pattern(new RegExp('^[0-9]{10,15}$')).allow(''),
    }),
    education: Joi.array().items(
      Joi.object({
        institution: Joi.string().required(),
        degree: Joi.string().required(),
        yearCompleted: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
      })
    ),
    allergies: Joi.array().items(Joi.string()),
    addictions: Joi.array().items(
      Joi.object({
        substance: Joi.string().required(),
        status: Joi.string().valid('current', 'past', 'never').required(),
        additionalInfo: Joi.string().allow(''),
      })
    ),
    bloodType: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').required(),
    medicalHistory: Joi.string().allow(''),
    insuranceInfo: Joi.string().allow(''),
    isActive: Joi.boolean().default(true),
  });

  return schema.validate(data);
};

