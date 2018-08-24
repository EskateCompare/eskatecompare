var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product')

router.get('/', async function(req, res, next) {

  //Reference Filter
  const referenceFilter = [
    { "brands" : "discrete", "attribute" : "brand.name"},
    { "year" : "discrete", "attribute" : "year" },
    { "price" : "ranges", "attribute" : "deals.salesPrice", "ranges" : [[0, 200], [200, 400]] }
  ]

  //Replace this find with filter function
  Product.find({}).populate('brand').populate('deals').exec().then(function(products) {

  })
})
