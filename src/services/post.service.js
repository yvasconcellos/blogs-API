const { BlogPost, Category, PostCategory } = require('../models');

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

module.exports = {
  createPost,
  categoryValidation,
};