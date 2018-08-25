var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product')

router.get('/:slug', async function(req, res, next) {

  let product = await Product.findOne({ slug : req.params.slug }).exec();

  if (!product) return res.status(422).json({ 'error' : 'product not found' });

  //get rankings

  let products = await Product.find({}).select('ratings.compositeScore').exec();



  return res.json({ products });




})

router.get('/', async function(req, res, next) {
  //Replace this find with filter function
  Product.find({}).select('-reviews').populate('brand').populate('deals').exec().then(function(products) {
    return res.json({ products })
  })
})


module.exports = router;
