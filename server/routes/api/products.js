var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product')

router.get('/:slug', async function(req, res, next) {

  let product = await Product.findOne({ slug : req.params.slug }).exec();
  

    return res.json({ product });
})

router.get('/', async function(req, res, next) {
  //Replace this find with filter function
  Product.find({}).select('-reviews').populate('brand').populate('deals').exec().then(function(products) {
    return res.json({ products })
  })
})


module.exports = router;
