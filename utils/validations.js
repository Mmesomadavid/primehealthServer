import Joi  from 'joi';

export const validateUserSignup = (user) => {
  const schema = Joi.object({
    accountType: Joi.string().valid('doctor', 'patient').required(),
    email: Joi.string().email().required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
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


