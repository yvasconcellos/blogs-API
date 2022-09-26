module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: false,
    tableName: 'categories',
    underscored: true,
  });

  // Category.associate = (models) => {
  //   Category.hasOne(models.BlogPost,
  //     { foreignKey: 'user_id', as: 'blog_posts' });
  // };

  return Category;
};