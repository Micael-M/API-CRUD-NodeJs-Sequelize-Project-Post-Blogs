const { BlogPost, Category, Users } = require('../models');
const categoryService = require('./categoryService');

const createPost = async (title, content, categoryIds, userId) => {
  const isCategory = await Promise.all(categoryIds.map(async (c) => {
    try {
      const category = await categoryService.getById(c);
      if (category === null) throw new Error();
    } catch (err) {
      return null;
    }
  }));
  if (isCategory === null) {
    return false;
  }
  const result = await BlogPost.create({ userId, content, title });
  return result;
};

const getPosts = async () => {
  const result = await BlogPost.findAll({
    attributes: { exclude: ['UserId'] },
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

// Requisite 9 - get /post/id
const postById = async (id) => {
  const result = await BlogPost.findByPk(id, {
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!result) {
    return {
      error: {
        message: 'Post does not exist',
      },
    };
  }
  return result;
};

// Requisite 10 - get /post/id
const putPost = async (title, content, id) => {
  const result = await BlogPost.findByPk(id, { 
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  result.title = title;
  result.content = content;

  // Atualizando as informações
  await result.save();
  return result;
};

const delPost = async (id) => BlogPost.destroy({ where: { id } });
module.exports = {
  createPost,
  getPosts,
  postById,
  putPost,
  delPost,
};