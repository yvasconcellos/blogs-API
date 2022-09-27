const schemas = require('./schema');

const postValidation = (req, res, next) => {
  const validation = schemas.postSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .json({ message: validation.error.details[0].message });
}
  next();
};

module.exports = {
  postValidation,
};