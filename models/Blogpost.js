const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: DataTypes.NUMBER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.NUMBER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
  });

  return blogPost;
};

module.exports = BlogPost;