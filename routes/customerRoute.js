const express = require('express');
const router = express.Router();
const passport = require('passport');
const { findCustomers, findCustomerById, updateCustomer, removeCustomer } = require('../controllers/customer.Controller');
const authRole = require('../passport/authRole');

// Get customer
router.get('/customers',passport.authenticate('bearer', { session: false }),authRole(["admin","customer"]), findCustomers)

// find customer by id
router.get('/customers/:id',passport.authenticate('bearer', { session: false }),authRole(["admin", "customer"]),findCustomerById)

//Update customer
router.put('/customers/:id',passport.authenticate('bearer', { session: false }),authRole(["admin"]),updateCustomer)

//Delete customer

router.delete('/customers/:id',passport.authenticate('bearer', { session: false }),authRole(["admin"]),removeCustomer)

module.exports = router;