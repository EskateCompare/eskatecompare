var router = require('express').Router();
var mongoose = require('mongoose');

var UpdateStats = mongoose.model('UpdateStats')

router.post('/', async function(req, res, next) {

    var updateStats = req.body.updateStats;
    updateStats = new UpdateStats(req.body.updateStats);
    updateStats.save().then(function(updateStats) {
      return res.json({ updateStats : updateStats })
    }).catch(next);

})

module.exports = router;
