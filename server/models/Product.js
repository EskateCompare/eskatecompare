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
    drive: { type : String, enum: ['belt', 'hub', 'gear drive'] },
    hillGrade: Number,   //%
    speedModes: Number,  //number of modes
    batteryCapacity: Number,  //mAh
    batteryPower: Number, //watts, sum of all motors
    batteryWattHours: Number, //Wh
    chargeTime: Number,  //minutes
    width: Number,
    trucksWidth: Number, //inches
    wheelbaseLength: Number,  //inches
    length: Number,   //board length inches
    wheelDiameter: Number,  //mm
    terrain: String,
    style: String,
    deckMaterials: [{ type: String, enum: ['carbon fiber', 'kevlar', 'wood', 'bamboo', 'fiberglass', 'polyurethane', ''] }],
    manufacturerWarranty: Number,  //months
    tags: [{ type: String, enum: ['travel safe', 'battery removable', 'companion app', 'water resistant', 'remoteless', '']}]
  },
  ratings: {
    recommendations: {
      yes: Number,
      maybe: Number,
      no: Number
    },
    external: {
      average: Number,
      amount: Number
    },
    internal: {
      average: Number,
      amount: Number
    }
  },
  impressions: [
      { impression: { type: mongoose.Schema.Types.ObjectId, ref: 'Impression' },
        votes: {
          yes: Number,
          no: Number
        } }
  ],
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


ProductSchema.virtual('compositeScore').get(function() {
  if (this.ratings.toObject().hasOwnProperty('recommendations') && this.ratings.recommendations.length > 0) {
    let totalDiff = this.ratings.recommendations.yes - this.ratings.recommendations.no;
    let totalRecommendations = this.ratings.recommendations.yes + this.ratings.recommendations.maybe + this.ratings.recommendations.no;
    let score = 50 + (( totalDiff / totalRecommendations + 1) * 50)

    return score
  } else {
    return null
  }
})

//ProductSchema.index({ "name": "text"});
ProductSchema.index({ "specs.style" : "text"})

mongoose.model('Product', ProductSchema);
