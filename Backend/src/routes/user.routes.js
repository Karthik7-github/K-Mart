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

router.put('/delete-item/:id',UserController.DeleteFromCart);

router.get('/get-cart/:id',UserController.GetCart);

router.post('/create-payment',UserController.CreatePayemtBox);

router.put('/update-payment/:id',UserController.Generatereceipt);

router.get('/get-payments/:id',UserController.GetPayments);

router.post('/insert-many',UserController.AddProducts);

module.exports = router;