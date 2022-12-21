const express = require('express');
const router = express.Router();
const passport = require('passport');
const { findProducts, findProductById, updateProduct, removeProduct, createProduct } = require('../controllers/product.Controller');
const authRole = require('../passport/authRole');


// Get product
router.post('/createProduct',passport.authenticate('bearer', { session: false }),authRole("ADMIN"),createProduct)

// Get product
router.get('/products', findProducts)

// find product by id
router.get('/products/:id',findProductById)

//Update product
router.put('/products/:id',passport.authenticate('bearer', { session: false }),authRole("ADMIN"),updateProduct)

//Delete product

router.delete('/products/:id',passport.authenticate('bearer', { session: false }),authRole("ADMIN"),removeProduct)

module.exports = router;