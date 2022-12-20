const express = require('express');
const router = express.Router();
const passport = require('passport');
const { findProducts, findProductById, updateProduct, removeProduct } = require('../controllers/product.Controller');
const authRole = require('../passport/authRole');

// Get customer
router.get('/products', findProducts)

// find customer by id
router.get('/products/:id',findProductById)

//Update customer
router.put('/products/:id',passport.authenticate('bearer', { session: false }),authRole(["admin"]),updateProduct)

//Delete customer

router.delete('/products/:id',passport.authenticate('bearer', { session: false }),authRole(["admin"]),removeProduct)

module.exports = router;