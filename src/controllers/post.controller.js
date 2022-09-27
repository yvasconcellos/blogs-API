require('dotenv/config');
const postService = require('../services/post.service');

const errorMessage = 'Erro Interno';

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
    return res.status(500).json({ message: errorMessage });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: errorMessage });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);
    if (!post) {
      return res.status(404).json({
      message: 'Post does not exist',
    });
  }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: errorMessage });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    
    const idValidation = await postService.getPostById(id);

    if (idValidation.userId !== req.user.dataValues.id) {
      return res.status(401).json({
        message: 'Unauthorized user',
      });
    }

    const post = await postService.updatePost(title, content, id);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: errorMessage });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const idValidation = await postService.getPostById(id);
    if (!idValidation) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    if (idValidation.userId !== req.user.dataValues.id) {
      return res.status(401).json({
        message: 'Unauthorized user',
      });
    }
    await postService.deletePost(id);
    return res.status(204).end();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: errorMessage });
  }
};

const getPostsByQuery = async (req, res) => {
  try {
    const { q } = req.query;
    const post = await postService.getPostsByQuery(q);
    if (!post) {
      return res.status(200).json([]);
  }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: errorMessage });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByQuery,
};