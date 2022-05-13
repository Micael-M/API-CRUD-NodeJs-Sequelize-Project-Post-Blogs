const express = require('express');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');

const { validName, validEmail, validPassword } = require('./controllers/middlewares/userValidate');
const { loginValidate } = require('./controllers/middlewares/loginValidate');
const jwtAuth = require('./controllers/middlewares/jwtAuth');
const postValidate = require('./controllers/middlewares/postValidate');
const validCategory = require('./controllers/middlewares/validCategory');
const authorizeUser = require('./controllers/middlewares/authorizeUser');
const authorizeDel = require('./controllers/middlewares/authorizeDel');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// Requisite 1 post - /user
app.post('/user', validName, validEmail, validPassword, userController.createUser);

// Requisite 3 get - /user
app.get('/user', jwtAuth, userController.getUsers);

// Requisite 4 get /user/:id
app.get('/user/:id', jwtAuth, userController.userById);

// Requisite 2 post - /login
app.post('/login', loginValidate, loginController.login);

// Requisite 5 post - /categories
app.post('/categories', jwtAuth, categoryController.createCategory);

// Requisite 6 get - /categories
app.get('/categories', jwtAuth, categoryController.getCategories);

// Requisite 7 post - /categories
app.post('/post', jwtAuth, postValidate, validCategory, postController.createPost);

// Requisite 8 get /post
app.get('/post', jwtAuth, postController.getPosts);

// Requisite 9 get /post/:id
app.get('/post/:id', jwtAuth, postController.postById);

// Requisite 10 put /post/:id
app.put('/post/:id', jwtAuth, authorizeUser, postController.putPost);

// Requisite 11 delete /post/:id
app.delete('/post/:id', jwtAuth, authorizeDel, postController.delPost);

// Requisite 12 delete /post/:id
app.delete('/user/:me', jwtAuth, userController.deleteUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
