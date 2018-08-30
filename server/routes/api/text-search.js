var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product');

router.get('/', function(req, res, next) {


    let searchString = req.query.searchString
    if (!searchString) return res.json({ error: "No search string supplied"})

    //Product.find({ $text: { $search : "long", $caseSensitive: false} }).then(function(products) {
    Product.find({'name': {'$regex': searchString, '$options' : 'i' }}, {'name':1, 'image':1, 'slug':1, '_id':0}).limit(5).populate('image').exec().then(function(products) {
      return res.json(products);
    })
})

module.exports = router;
