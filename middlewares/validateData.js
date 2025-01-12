const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean(),
});

const addStatusSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing required favorite field",
  }),
});

const validateData = (req, res, next) => {
  console.log(req.body);
  if (!Object.keys(req.body).length || !req.body) {
    return res.status(400).json({ message: "missing fields" });
  }

  const { error } = addSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: `${error.details[0].message}` });
  }

  next();
};

const validateStatusData = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const { error } = addStatusSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: `${error.details[0].message}` });
  }

  next();
};

module.exports = { validateData, validateStatusData };
