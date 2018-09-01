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

module.exports = router;
