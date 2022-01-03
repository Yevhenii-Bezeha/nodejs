const Joi = require("joi");

const signupValidate = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().max(30).required(),
    password: Joi.string().alphanum().max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }
  next();
};

const signinValidate = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().alphanum().max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }
  next();
};

const checkSubscription = (req, res, next) => {
  const schema = Joi.object({
    subscription: Joi.any().valid("starter", "pro", "business").required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }
  next();
};

module.exports = {
  signupValidate,
  signinValidate,
  checkSubscription,
};
