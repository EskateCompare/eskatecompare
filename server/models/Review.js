var mongoose = require('mongoose');
var slug = require('slug');

var ReviewSchema = new mongoose.Schema({
  name: String,
  date: Date,
  rating: Number,
  content: String,
  source: String
})

mongoose.model('Review', ReviewSchema);
