import Joi  from 'joi';

export const validateUserSignup = (user) => {
  const schema = Joi.object({
    accountType: Joi.string().valid('hospital', 'doctor').required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    phone: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
};
