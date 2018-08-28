var router = require('express').Router();
var mongoose = require('mongoose');

var Review = mongoose.model('Review')

router.post('/', async function(req, res, next) {

    var review = req.body.review;
    review = new Review(req.body.review);
    review.save().then(function(review) {
      return res.json({ review : review })
    }).catch(next);

})

module.exports = router;
