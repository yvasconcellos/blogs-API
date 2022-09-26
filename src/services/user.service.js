const { User } = require('../models');

const getEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  return user;
};

const createUser = async (data) => {
  const { displayName, email, password, image } = data;
  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

module.exports = {
  getEmailAndPassword,
  createUser,
  getByEmail,
};