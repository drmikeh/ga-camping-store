'use strict';

var express = require('express');
var controller = require('./cart.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get   ('/:userid/cart/',        auth.isAuthenticated(), controller.get);
router.post  ('/:userid/cart/:itemid', auth.isAuthenticated(), controller.addItem);
router.delete('/:userid/cart/:itemid', auth.isAuthenticated(), controller.removeItem);
router.delete('/:userid/cart/',        auth.isAuthenticated(), controller.removeAllItems);

module.exports = router;
