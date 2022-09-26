const express = require('express');
const categoryController = require('../controllers/category.controller.js');
const validation = require('../middlewares/categoryValidation');
const validToken = require('../auth/validateJWT');

const router = express.Router();

router.post('/', validToken, validation.categoryValidation, categoryController.createCategory);

module.exports = router;