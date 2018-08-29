var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product')

router.get('/:slug', async function(req, res, next) {

  let product = await Product.findOne({ slug : req.params.slug }).populate('brand').populate('deals').
  populate('reviews').populate('image').populate('additionalImages').populate({ path: 'deals', populate: { path: 'store' }}).lean().exec();

  if (!product) return res.status(422).json({ 'error' : 'product not found' });

  //get rankings

  let products = await Product.find({}, 'ratings.compositeScore style brand').exec();

  let brandRank = 1;
  let styleRank = 1;
  let overallRank = 1;

  products.forEach(function(compareProd) {
    if (compareProd.ratings.compositeScore > product.ratings.compositeScore) {
      overallRank++;
      if (compareProd.style == product.style) {
        styleRank++;
      }
      if (String(compareProd.brand) == String(product.brand)) {
        brandRank++;
      }
    }
  })

  product['rankings'] = {
    overall : overallRank,
    style : styleRank,
    brand : brandRank
  }

  product.deals = product.deals.sort(function(a, b) {
    return a.salesPrice - b.salesPrice;
  })
  product.reviews = product.reviews.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  })

  //front-end mapping

  const frontEndMap = {
    "dbKey" :        ["year", "range", "speed", "weight", "drive", "batteryCapacity", "batteryRemovable", "width", "length", "waterproof", "terrain", "style", "deckMaterials", "travelSafe"],
    "displayName" :  ["Year", "Range", "Speed", "Weight", "Drive", "Battery Capacity", "Battery Removable", "Width", "Length", "Waterproof", "Terrain", "Style", "Deck Material", "Travel Safe"],
    "semanticIcon" : ["calendar check outline", "map marker alternate", "dashboard", "balance scale", "power off", "battery three quarters", "plug", "arrows alternate horizontal", "arrows alternate vertical", "tint", "road", "adjust", "diamond", "plane"]
  }

  var displaySpecs = [];

  for (var i = 0; i < frontEndMap.dbKey.length; i++) {
    var dbKey = frontEndMap.dbKey[i];
    var displayName = frontEndMap.displayName[i];
    var semanticIcon = frontEndMap.semanticIcon[i];

    var displaySpecObject = {};
    displaySpecObject["displayName"] = displayName;
    displaySpecObject["icon"] = semanticIcon;
    displaySpecObject["value"] = product.specs[dbKey];

    displaySpecs.push(displaySpecObject);

  }

  product["displaySpecs"] = displaySpecs;

  return res.json({ product });

})

router.get('/', async function(req, res, next) {
  //Replace this find with filter function
  Product.find({}).select('-reviews').populate('brand').populate('deals').populate('image').exec().then(function(products) {
    return res.json({ products })
  })
})


module.exports = router;
