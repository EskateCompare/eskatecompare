var mongoose = require('mongoose');

var ImpressionSchema = new mongoose.Schema({
  text: {type: String, required: true},
  connotation: {type: String, enum: ['positive', 'negative', 'neutral']}
})

mongoose.model('Impression', ImpressionSchema);
