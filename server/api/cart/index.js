'use strict';

var express = require('express');
var controller = require('./cart.controller');

var router = express.Router();

router.get   ('/',        controller.get);
router.post  ('/:itemid', controller.addItem);
router.delete('/:itemid', controller.removeItem);
router.delete('/',        controller.removeAllItems);

module.exports = router;
