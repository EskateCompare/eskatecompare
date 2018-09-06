var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product');

router.get('/', function(req, res, next) {


    let searchString = req.query.searchString
    if (!searchString) return res.json({ error: "No search string supplied"})

    //Product.find({ $text: { $search : "long", $caseSensitive: false} }).then(function(products) {
    Product.find({'name': {'$regex': searchString, '$options' : 'i' }}, {'name':1, 'image':1, 'slug':1, 'specs': 1, '_id':0}).limit(5).populate('image').
      populate('deals').lean().exec().then(function(products) {
      let formattedSearchResults = [];


      products.forEach(function(product) {
          let formattedSearchItem = {};
          console.log(product.name);
          if (product.hasOwnProperty('deals') && product.deals.length > 0) {
            product.deals = product.deals.sort(function(a, b) {
              return a.salesPrice - b.salesPrice;
            })
            product.bestPrice = product.deals[0].salesPrice;
          } else {

            product.bestPrice = product.hasOwnProperty('specs') ? product.specs.msrp : "??"
          }

          formattedSearchItem.title = product.name;
          formattedSearchItem.image = product.image.source;
          formattedSearchItem.price = product.bestPrice;

          formattedSearchResults.push(formattedSearchItem);
      })




      return res.json(formattedSearchResults);
    })
})

module.exports = router;
