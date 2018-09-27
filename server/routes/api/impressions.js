var router = require('express').Router();
var mongoose = require('mongoose');

let Impression = mongoose.model('Impression');

router.get('/', async function(req, res, next) {
  Impression.find({}).then(function(impressions) {
    return res.json(impressions);
  }).catch(next);
})

module.exports = router;
