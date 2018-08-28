var mongoose = require('mongoose');
var slug = require('slug');

var ImageSchema = new mongoose.Schema({
  source: String //url
})

mongoose.model('Image', ImageSchema);
