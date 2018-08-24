var router = require('express').Router();
var mongoose = require('mongoose');

var Brand = mongoose.model('Brand')

router.post('/', async function(req, res, next) {

    var brand = req.body.brand;
    brand = new Brand(req.body.brand);
    brand.save().then(function(brand) {
      return res.json({ brand : brand })
    }).catch(next);

})

module.exports = router;
