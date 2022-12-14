require('dotenv/config');
const CategoryService = require('../services/category.service');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await CategoryService.createCategory(name);
    return res.status(201).json(category);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Erro Interno' });
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Erro Interno' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};