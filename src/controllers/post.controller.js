require('dotenv/config');
const postService = require('../services/post.service');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    
    const categoriesValidation = await postService.categoryValidation(categoryIds);

    if (!categoriesValidation) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }

    const category = await postService.createPost(title, content, req.user, categoryIds);
    return res.status(201).json(category);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Erro Interno' });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Erro Interno' });
  }
};

module.exports = {
  createPost,
  getPosts,
};