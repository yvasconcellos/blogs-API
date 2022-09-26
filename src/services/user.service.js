const { User } = require('../models');

const getEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  return user;
};

module.exports = {
  getEmailAndPassword,
};