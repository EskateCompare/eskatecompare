var router = require('express').Router();
var mongoose = require('mongoose');
var currencyRates = require('../common/currencyRates');
var Product = mongoose.model('Product');

router.get('/', function(req, res, next) {


    let searchString = req.query.searchString
    if (!searchString) return res.json({ error: "No search string supplied"})

    //Product.find({ $text: { $search : "long", $caseSensitive: false} }).then(function(products) {
    Product.find({'name': {'$regex': searchString, '$options' : 'i' }}, {'name':1, 'image':1, 'slug':1, 'specs': 1, '_id':0}).limit(5).populate('image').
      populate('deals').lean().exec().then(function(products) {
      let formattedSearchResults = [];

      var searchItemBuildingPromises =
      products.map(async function(product) {
        return new Promise(async function(resolve, reject) {
          let formattedSearchItem = {};
          product.deals = product.deals.map(async function(deal) {
            if (deal.currency != "USD" && deal.currency != "") {
              deal.convertedPrice = await currencyRates.convertCurrency(deal.salesPrice, deal.currency, "USD");
              return deal;
            } else {
              deal.convertedPrice = deal.salesPrice;
              return deal;
            }
          })

          if (product.specs.msrpCurrency != "USD" && product.specs.msrpCurrency != "") {
            product.specs.msrp = await currencyRates.convertCurrency(Number(product.specs.msrp), product.specs.msrpCurrency, "USD")
          }

          if (product.hasOwnProperty('deals') && product.deals.length > 0) {
            product.deals = product.deals.sort(function(a, b) {
              return a.convertedPrice - b.convertedPrice;
            })
            product.bestPrice = product.deals[0].convertedPrice;
          } else {
            product.bestPrice = product.hasOwnProperty('specs') ? product.specs.msrp : "??"
          }


          formattedSearchItem.title = product.name;
          formattedSearchItem.image = product.image.source;
          formattedSearchItem.price = product.bestPrice;
          formattedSearchItem.slug = product.slug;

          //console.log(formattedSearchItem);

          formattedSearchResults.push(formattedSearchItem);
          resolve();
          })
      })

      Promise.all(searchItemBuildingPromises).then(function() {
        return res.json(formattedSearchResults);
      })
    })
})

module.exports = router;
