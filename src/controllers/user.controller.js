require('dotenv/config');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

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
    res.status(500).json({ message: 'Erro Interno' });
  }
};

module.exports = {
  createUser,
};