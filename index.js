const express = require('express');
const userController = require('./controllers/userController');
// const jwtAuth = require('./controllers/middlewares/jwtAuth');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// Requisite 1 post - /user
app.post('/user', userController.createUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));