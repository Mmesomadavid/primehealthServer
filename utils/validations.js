import Joi from 'joi';

export const validateUserSignup = (user) => {
  const schema = Joi.object({
    accountType: Joi.string().valid('doctor', 'hospital').required(),
    fullname: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().pattern(/^\+?\d{10,15}$/).required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
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
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(new RegExp('^[0-9]{10,15}$')).required(),
    age: Joi.number().min(0).required(),
    maritalStatus: Joi.string().valid('Single', 'Married', 'Divorced', 'Widowed'),
    address: Joi.object({
      street: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string()
    }),
    healthInfo: Joi.object({
      height: Joi.number().min(0),
      weight: Joi.number().min(0),
      disabilities: Joi.string(),
      addictions: Joi.string()
    }),
    emergencyContact: Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string().pattern(new RegExp('^[0-9]{10,15}$')),
      address: Joi.string()
    }),
    religion: Joi.string(),
    occupation: Joi.string(),
    title: Joi.string(),
    numberOfChildren: Joi.number().min(0)
  });

  return schema.validate(data);
};
