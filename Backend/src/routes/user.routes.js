const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');


router.post('/resgister-user',UserController.RegisterUser);

router.get('/get-users',UserController.GetUsers);

router.post('/login',UserController.Login);

router.post('/create-product',UserController.CreateProduct);

router.get('/get-products',UserController.GetProducts);

router.post('/create-cart',UserController.CreateCart);

router.put('/update-cart/:id',UserController.UpdateCart);

router.post('/create-payment',UserController.CreatePayemtBox);

module.exports = router;