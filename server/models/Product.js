var mongoose = require('mongoose');
var slug = require('slug');
var uniqueValidator = require('mongoose-unique-validator');

var Brand = mongoose.model('Brand');

var ProductSchema = new mongoose.Schema({
  brand: {type: mongoose.Schema.Types.ObjectId, ref: 'Brand'},
  deals: [{type: mongoose.Schema.Types.ObjectId, ref: 'Deal'}],
  name: { type: String, unique: true },
  slug: {type: String, lowercase: true, unique: true},  //auto-generated
  image: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'},
  additionalImages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}],
  thumbnail: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'},
  specs: {
    year: Number,
    msrp: Number,  //us dollars
    msrpCurrency: String,
    range: Number,  //miles
    speed: Number, //mph
    weight: Number,
    maxWeight: Number,
    drive: { type : String, enum: ['belt', 'hub'] },
    hillGrade: Number,   //%
    speedModes: Number,  //number of modes
    batteryCapacity: Number,  //mAh
    batteryPower: Number, //watts
    batteryWattHours: Number, //Wh
    chargeTime: Number,  //minutes
    width: Number,
    trucksWidth: Number, //inches
    wheelbaseLength: Number,  //inches
    length: Number,   //board length inches
    wheelDiameter: Number,  //mm
    terrain: String,
    style: String,
    deckMaterials: [{ type: String, enum: ['carbon fiber', 'kevlar', 'wood', 'bamboo', 'fiberglass', 'polyurethane'] }],
    manufacturerWarranty: Number,  //months
    tags: [{ type: String, enum: ['travel safe', 'battery removable', 'companion app', 'water resistant', '']}]
  },
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
    {type: mongoose.Schema.Types.ObjectId, ref: 'Review'}
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




//ProductSchema.index({ "name": "text"});
ProductSchema.index({ "specs.style" : "text"})

mongoose.model('Product', ProductSchema);
