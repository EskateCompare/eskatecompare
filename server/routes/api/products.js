var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product')

router.get('/:slug', async function(req, res, next) {
  Product.findOne({ slug : req.params.slug }).then(function(product) {
    if (!product) {return res.sendStatus(404); }

    return res.json({ product: product });
  })
})

router.get('/', async function(req, res, next) {
  Product.find({}).populate('brand').populate('deals').exec().then(function(products) {
    return res.json({ products: products })
  })
})


module.exports = router;
