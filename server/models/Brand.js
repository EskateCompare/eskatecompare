var mongoose = require('mongoose');
var slug = require('slug');
var uniqueValidator = require('mongoose-unique-validator');

var BrandSchema = new mongoose.Schema({
  slug: String,
  name: String,
  logo: String, //url
  country: String
})

BrandSchema.plugin(uniqueValidator, { message: 'Slug or product not unique' });

BrandSchema.methods.slugify = function() {
  this.slug = slug(this.name);
};

BrandSchema.pre('validate', function(next) {
  if (!this.slug) {
    this.slugify();
  } else if (this.slug != slug(this.name)) {
    this.slugify();
  }
  next();
});

mongoose.model('Brand', BrandSchema);
