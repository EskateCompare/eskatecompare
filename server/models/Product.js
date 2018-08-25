var mongoose = require('mongoose');
var slug = require('slug');
var uniqueValidator = require('mongoose-unique-validator');

var Brand = mongoose.model('Brand');

var ProductSchema = new mongoose.Schema({
  brand: {type: mongoose.Schema.Types.ObjectId, ref: 'Brand'},
  deals: [{type: mongoose.Schema.Types.ObjectId, ref: 'Deal'}],
  name: { type: String, unique: true },
  slug: {type: String, lowercase: true, unique: true},  //auto-generated
  image: String,
  additionalImages: [String],
  year: Number,
  msrp: Number,  //us dollars
  range: Number,  //miles
  speed: Number, //mph
  weight: Number,
  maxWeight: Number,
  drive: String,
  batteryCapacity: Number,  //mAh
  batteryRemovable: Boolean,
  width: Number,
  length: Number,
  waterproof: Boolean,
  terrain: String,
  style: String,
  deckMaterials: [String],
  travelSafe: Boolean,
  ratings: {
    external: {
      average: Number,
      amount: Number
    },
    internal: {
      average: Number,
      amount: Number
    },
    compositeScore: Number
  },
  reviews: [
    {
      name: String,
      date: Date,
      rating: Number,
      content: String,
      source: String
    }
  ],
  popularity: Number,
  value: Number
})

ProductSchema.plugin(uniqueValidator, { message: 'Slug or product not unique' });

ProductSchema.methods.slugify = function() {
  this.slug = slug(this.name);
};

ProductSchema.pre('validate', function(next) {
  if (!this.slug) {
    this.slugify();
  } else if (this.slug != slug(this.name)) {
    this.slugify();
  }
  next();
});

mongoose.model('Product', ProductSchema);
