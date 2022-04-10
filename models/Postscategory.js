const PostsCategory = (sequelize, DataTypes) => {
  const postsCategory = sequelize.define('PostsCategory', {
    postId: DataTypes.NUMBER,
    categoryId: DataTypes.NUMBER,
  }, {
    timestamps: false,
  });

  return postsCategory;
};

module.exports = PostsCategory;