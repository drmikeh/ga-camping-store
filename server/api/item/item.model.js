'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name:        String,
  category:    String,
  price:       { type: Number, min: 0, max: 9999.99 },
  qty:         { type: Number, min: 0, max: 999 },
  rating:      { type: Number, min: 0, max: 5.0 },
  description: String,
  imageFile:   String
});

module.exports = mongoose.model('Item', ItemSchema);
