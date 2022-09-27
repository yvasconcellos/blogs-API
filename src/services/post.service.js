const { BlogPost, Category, PostCategory, User } = require('../models');

const categoryValidation = async (data) => {
    const { count } = await Category.findAndCountAll({
      where: {
        id: data,
      },
    });
  
  if (count !== data.length) {
    return false;
  }
  return true;
};

const createPost = async (title, content, userId, categoryIds) => {
  const post = await BlogPost
  .create(
    { 
      title,
      content,
      userId: userId.dataValues.id,
      published: new Date(),
      updated: new Date(),
     },
  );

  const arrayCategoryPost = categoryIds.map((category) => ({
  postId: post.dataValues.id,
  categoryId: category,
  }));

  await PostCategory.bulkCreate(arrayCategoryPost);

  return post;
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{ model: User,
    as: 'user', 
    attributes: { exclude: ['password'] },
  },
     { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return posts;
};

module.exports = {
  createPost,
  categoryValidation,
  getPosts,
};