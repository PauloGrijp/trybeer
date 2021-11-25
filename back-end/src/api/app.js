const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
const { loginController, register } = require('../controllers/loginController');
const { getProducts } = require('../controllers/productsController');
const { getSeller, getOrders, getUsers, deleteUsers } = require('../controllers/usersController');
const { createOrder, findOrder } = require('../controllers/Orders');
const { 
  verifyName,
  verifyEmail,
  verifyPassword,
  verifyDbUser,
  verifyNameDB,
  verifyEmailDB,
  } = require('../middlewares/middleLogin');
// const { validateJWT } = require('../middlewares/tokenVerify');

app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '..', '..', 'public')));

app.post('/login', verifyEmail, verifyPassword, verifyDbUser, loginController);
app.post('/register', 
verifyName, verifyEmail, verifyPassword, verifyNameDB, verifyEmailDB, register);
app.get('/products', getProducts);
app.get('/sellers', getSeller);
app.post('/neworder', createOrder);
app.get('/oneorder/:id', findOrder);
app.get('/allorders', getOrders);
app.get('/allusersadm', getUsers);
app.delete('/deleteuser/:id', deleteUsers);

app.get('/coffee', (_req, res) => res.status(418).end());
// bodega
module.exports = app;
