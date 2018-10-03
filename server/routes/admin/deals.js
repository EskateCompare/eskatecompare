var router = require('express').Router();
var mongoose = require('mongoose');

var Deal = mongoose.model('Deal');
var Product = mongoose.model('Product');

router.post('/', async function(req, res, next) {


    var deal = req.body.deal;
    deal = new Deal(req.body.deal);
    deal.save().then(function(deal) {
      return res.json({ deal : deal })
    }).catch(next);

})

router.delete('/', async function(req, res, next) {
  Deal.findOne({_id: req.body.dealId}).then(function(deal) {
    if (!deal) return res.json({not_found : 'not found'})
    Product.findOne({_id: deal.product}).lean().exec().then(async function(product) {
      if (!product) {
        console.log('no prod');
        next();
      }
      console.log('found');
      let newProductDealsArray = product.deals.filter(function(_deal) {
        return String(_deal._id) != String(deal._id)
      })
      console.log('newdealsarray',newProductDealsArray)
      //update products deals array
      Product.findOneAndUpdate({ _id: deal.product}, {$set : {deals: newProductDealsArray}}, {new : true}).then(function(error, result) {
        console.log('error',error);
        console.log('result',result);
      })
    })
    deal.remove().then(function(thing) {
      return res.json(thing);
    })
  })
})

router.delete('/all', async function(req, res, next) {

  Deal.find({}).then(function(deals) {
    console.log(deals);
    deals.forEach(function(deal) {
      //if (!deal) return res.json({not_found : 'not found'})
      Product.findOne({_id: deal.product}).lean().exec().then(async function(product) {
        if (!product) {
          console.log('no prod');
          //next();
        }
        console.log('found');
        let newProductDealsArray = product.deals.filter(function(_deal) {
          return String(_deal._id) != String(deal._id)
        })
        console.log('newdealsarray',newProductDealsArray)
        //update products deals array
        Product.findOneAndUpdate({ _id: deal.product}, {$set : {deals: newProductDealsArray}}, {new : true}).then(function(error, result) {
          console.log('error',error);
          console.log('result',result);
        })
      })
      deal.remove().then(function(thing) {
        //return res.json(thing);
      })
    })
  })
})

module.exports = router;
