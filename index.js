const express = require('express');
const userController = require('./controllers/userController');
const { validName, validEmail, validPassword } = require('./controllers/middlewares/userValidate');
// const jwtAuth = require('./controllers/middlewares/jwtAuth');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// Requisite 1 post - /user
app.post('/user', validName, validEmail, validPassword, userController.createUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));