const express = require('express');
const router = express.Router();
const passport = require('passport');
const { findOrders, findOrderById, removeOrder, order } = require('../controllers/order.Controller');
const authRole = require('../passport/authRole');


//Create Order
router.post('/orders',passport.authenticate('bearer', { session: false }),order)

// Get order
router.get('/orders',passport.authenticate('bearer', { session: false }),authRole("ADMIN","CUSTOMER"), findOrders)

// find order by id
router.get('/orders/:id',passport.authenticate('bearer', { session: false }),authRole("ADMIN","CUSTOMER"),findOrderById)


//Delete order

router.delete('/order/:id',passport.authenticate('bearer', { session: false }),authRole("ADMIN"),removeOrder)

module.exports = router;