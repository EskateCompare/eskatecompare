var mongoose = require('mongoose');
var slug = require('slug');
var uniqueValidator = require('mongoose-unique-validator');

var Store = mongoose.model('Store');
var Product = mongoose.model('Product');

var DealSchema = new mongoose.Schema({
  store: {type: mongoose.Schema.Types.ObjectId, ref: 'Store'},
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  originalPrice: Number,   //in currency of store
  salesPrice: Number, //in currency of store
  lastChecked: Date,
  availability: Boolean
})

mongoose.model('Deal', DealSchema);
