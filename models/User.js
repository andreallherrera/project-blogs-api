const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: DataTypes.NUMBER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return user;
};

module.exports = User;