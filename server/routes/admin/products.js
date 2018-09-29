var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product')

router.post('/', async function(req, res, next) {

    var product = req.body.product;
    product = new Product(req.body.product);
    product.save().then(function(product) {
      return res.json({ product : product })
    }).catch(function(err) {
      return res.json({ err: err })
    });
})

router.put('/normalizeRecommendations', async function(req, res, next) {
  Product.find({}).then(function(products) {
    products.forEach(async function(product) {
      if (!product.toObject().hasOwnProperty('ratings') || !product.toObject().ratings.hasOwnProperty('recommendations') || !product.toObject().ratings.recommendations.hasOwnProperty('yes')) {
        product['ratings']['recommendations'] = {
          'yes' : 0,
          'no' : 0,
          'maybe' : 0
        }
        product.save().then(function(prod) {
          console.log(prod.name);
        }).catch(function(err) {
          console.log(product.name + ' ' + err)
        })
      }
    })
    return res.json({whoo : 'whoo'})
  })
})

router.put('/normalizeImpressions', async function(req, res, next) {
  Product.find({}).then(function(products) {
    products.forEach(async function(product) {
      if (!product.toObject().hasOwnProperty('impressions') || product.impressions == null) {
        product['impressions'] = [];
        product.save().then(function(prod) {
          console.log('saved', prod.name)
        }).catch(function(err) {
          console.log(product.name + ' ' + err)
        })
      }
    })
    return res.json({ whoo : 'whoo' })
  })
})

module.exports = router;
