const Category = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  category.associate = (models) => {
    category.belongsToMany(models.BlogPost,
      { foreignKey: 'categoryId', through: 'PostsCategories', as: 'category-blogpost' });
  };
  return category;
};

module.exports = Category;