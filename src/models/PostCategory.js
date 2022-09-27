module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
    categoryId: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
  },
  {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostCategory,
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_posts',
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostCategory,
    });
  };

  return PostCategory;
};