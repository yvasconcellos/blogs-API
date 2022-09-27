const express = require('express');
const userController = require('../controllers/user.controller.js');
const validation = require('../middlewares/userValidation');
const validToken = require('../auth/validateJWT');

const router = express.Router();

router.post('/', validation.userValidation, userController.createUser);
router.get('/', validToken, userController.getAllUsers);
router.get('/:id', validToken, userController.getUserById);
router.delete('/me', validToken, userController.deleteUser);

module.exports = router;