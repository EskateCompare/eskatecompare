var router = require('express').Router();
var mongoose = require('mongoose');

router.post('/' async function(req, res, next) {

  Product.findOne({req.body.product}).then(function(product, error) {
    if (!product) return res.json({error: error})
    
  }).catch(next);
})
