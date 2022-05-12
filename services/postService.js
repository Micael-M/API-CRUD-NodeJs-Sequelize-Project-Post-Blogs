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
  }); // { attributes: { exclude: ['UserId'] } }
  return result;
};

const postById = async (id) => {
  const result = await BlogPost.findByPk(id, {
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  console.log('Não tem um id válido');
  console.log(result);
  if (!result) {
    console.log(result);
    // const error = new Error();
    // error.message = 'Post does not exist';
    // error.code = 'postNotFound';
    // throw error;
    return {
      error: {
        message: 'Post does not exist',
      },
    };
  }
  return result;
};

module.exports = {
  createPost,
  getPosts,
  postById,
};