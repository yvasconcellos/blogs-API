const express = require('express');
const postController = require('../controllers/post.controller.js');
const validation = require('../middlewares/postValidation');
const validToken = require('../auth/validateJWT');

const router = express.Router();

router.post('/', validToken, validation.postValidation, postController.createPost);
router.get('/', validToken, postController.getPosts);
router.get('/search', validToken, postController.getPostsByQuery);
router.get('/:id', validToken, postController.getPostById);
router.put('/:id', validToken, validation.updatePostValidation, postController.updatePost);
router.delete('/:id', validToken, postController.deletePost);

module.exports = router;