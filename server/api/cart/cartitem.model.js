'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CartItemSchema = new Schema({
  item : {
    type : Schema.Types.ObjectId,
    ref: 'Item'
  },
  qty : Number
});

module.exports = mongoose.model('CartItem', CartItemSchema);
