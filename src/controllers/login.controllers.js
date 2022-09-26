require('dotenv/config');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const getEmailAndPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.getEmailAndPassword(email, password);
  
    if (!user) return res.status(400).json({ message: 'Invalid fields' });

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Erro Interno' });
  }
};

module.exports = {
  getEmailAndPassword,
};