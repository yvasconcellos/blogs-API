const express = require('express');
const userController = require('../controllers/user.controller.js');
const validation = require('../middlewares/userValidation');

const router = express.Router();

router.post('/', validation.userValidation, userController.createUser);

module.exports = router;