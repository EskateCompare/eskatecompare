var router = require('express').Router();
var mongoose = require('mongoose');

var Store = mongoose.model('Store')

router.post('/', async function(req, res, next) {

    var store = req.body.store;
    store = new Store(req.body.store);
    store.save().then(function(store) {
      return res.json({ store : store })
    }).catch(next);

})

module.exports = router;
