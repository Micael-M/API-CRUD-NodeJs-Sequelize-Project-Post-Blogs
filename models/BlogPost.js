module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.STRING,
      foreignKey: true,
    },
  },
  {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'user' });
  };
  return BlogPost;
};
