var router = require('express').Router();
var mongoose = require('mongoose');

var Deal = mongoose.model('Deal');

router.post('/', async function(req, res, next) {


    var deal = req.body.deal;
    deal = new Deal(req.body.deal);
    deal.save().then(function(deal) {
      return res.json({ deal : deal })
    }).catch(next);

})

module.exports = router;
