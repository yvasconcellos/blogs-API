require('dotenv/config');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';
const errorMessage = 'Erro Interno';

const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userAlreadyExists = await UserService.getByEmail(email);
    if (userAlreadyExists) return res.status(409).json({ message: 'User already registered' });
    
    const newUser = await UserService.createUser(req.body);
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { userId: newUser.id } }, secret, jwtConfig);
    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: errorMessage });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await UserService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: errorMessage });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getByUserId(id);
    if (!user) {
      return res.status(404).json({
        message: 'User does not exist',
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: errorMessage });
  }
};

const deleteUser = async (req, res) => {
  try {
    await UserService.deleteUser(req.user.dataValues.id);
    return res.status(204).end();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: errorMessage });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};