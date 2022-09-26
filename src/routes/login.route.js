const express = require('express');
const loginController = require('../controllers/login.controllers.js');
const loginValidation = require('../middlewares/loginValidation');

const router = express.Router();

router.post('/', loginValidation.loginValidation, loginController.getEmailAndPassword);

module.exports = router;