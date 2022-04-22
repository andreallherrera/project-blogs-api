const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING, 
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { 
    timestamps: false,
  });
  
  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, 
      { foreignKey: 'userId', as: 'user' });
    blogPost.belongsToMany(models.Category,
      { foreignKey: 'postId', through: 'PostsCategories', as: 'categories' });
  };
  return blogPost;
};

module.exports = BlogPost;