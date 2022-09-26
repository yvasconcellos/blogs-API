const schemas = require('./schema');

const loginValidation = (req, res, next) => {
  const validation = schemas.loginSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .json({ message: validation.error.details[0].message });
}
  next();
};

module.exports = {
  loginValidation,
};