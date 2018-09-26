var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product');

router.post('/', async function(req, res, next) {

  /*Product.find({}).then(function(products) {
    products.forEach(function(prod) {
      prod.ratings.recommendations = {
        'yes' : 0,
        'maybe' : 0,
        'no' : 0
      }
      prod.save();
    })
  })
  return;*/

  Product.findOne({slug: req.body.product}).then(function(product, error) {
    if (!product) return res.json({error: error})
    if (!product.toObject().ratings.hasOwnProperty('recommendations')) {
      product.ratings.recommendations = {
        'yes' : 0,
        'maybe' : 0,
        'no' : 0
      }
    }
    for (var key in req.body.recommendChange) {
      console.log(key);
      console.log(req.body.recommendChange[key])
      if (Math.abs(req.body.recommendChange[key]) < 2) {
        product.ratings['recommendations'][key] += Number(req.body.recommendChange[key]);
      } else {
        return res.json({error: "value must be between 1 and -1"})
      }
    }
    product.save().then(function(prod) {
      return res.json(prod.ratings.recommendations);
    }).catch(next);
  }).catch(next);
})

module.exports = router;
