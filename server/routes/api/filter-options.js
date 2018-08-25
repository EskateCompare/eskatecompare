var router = require('express').Router();
var mongoose = require('mongoose');
var _ = require('lodash');
const unwind = require('javascript-unwind');

var Product = mongoose.model('Product')

router.get('/', async function(req, res, next) {

  //Reference Filter
  const referenceFilter = [
    { "title" : "brands", "type" : "discrete", "attribute" : "brand.name"},
    { "title" : "year", "type" : "discrete", "attribute" : "year" },
    { "title" : "price", "type" : "ranges", "attribute" : "bestPrice",
      "ranges" : [[0, 250], [250, 500], [500, 1000], [1000-1500], [1500,9999]] },
    { "title" : "range", "type" : "ranges", "attribute" : "range",
      "ranges" : [[0, 10], [10, 17], [17, 24], [24, 9999]] },
    { "title" : "battery-capacity", "type" : "ranges", "attribute" : "batteryCapacity",
      "ranges": [[0, 3000], [3000, 6000], [6000, 10000], [10000, 999999]] },
    { "title" : "battery-removable", "type" : "discrete", "attribute" : "batteryRemovable" },
    { "title" : "speed", "type" : "ranges", "attribute" : "speed",
      "ranges" : [[0, 10], [10, 16], [16, 22], [22,999]] },
    { "title" : "weight", "type" : "ranges", "attribute" : "weight",
      "ranges" : [[0, 10], [10, 15], [15, 20], [20,999]] },
    { "title" : "max-weight", "type" : "ranges", "attribute" : "maxWeight",
      "ranges" : [[0, 200], [200, 300], [300, 400], [400, 999]] },
    { "title" : "drive", "type" : "discrete", "attribute" : "drive" },
    { "title" : "width", "type" : "ranges", "attribute" : "width" ,
      "ranges" : [[0, 3], [3, 4], [4, 6], [6, 99]] },
    { "title" : "length", "type" : "ranges", "attribute" : "length" ,
      "ranges" : [[0, 6], [6, 12], [12, 18], [18, 24], [24, 99]] },
    { "title" : "waterproof", "type" : "discrete", "attribute" : "waterproof" },
    { "title" : "terrain", "type" : "discrete", "attribute" : "terrain" },
    { "title" : "style", "type" : "discrete", "attribute" : "style" },
    { "title" : "deck-materials", "type" : "discrete", "attribute" : "deckMaterials" },
    { "title" : "rating", "type" : "range", "attribute" : "ratings.compositeScore",
      "ranges" : [[0, 60], [60, 70], [70, 80], [80, 90], [90, 100]] }
  ]

  let stats = {};
  let filterOptions = [];

  //Replace this find with filter function
  Product.find({}).populate('brand').populate('deals').lean().exec().then(function(products) {
    referenceFilter.forEach(function(element) {


      let itemToAdd = {};
      let counts = {};
      if (element.type === "discrete") {
        if (Array.isArray(eval("products[0]." + element.attribute))) {
          productsToCount = _.clone(unwind(products, element.attribute))
        }
        else {
          productsToCount = products;
        }
      counts = _.countBy(productsToCount, function(e) {
        return eval("e." + element.attribute)
      });
      itemToAdd[element.title] = counts;

      }
      else {

        let ranges = element.ranges;
        products.forEach(function(e) {
          var deals = e.deals.sort(function(a, b) {
            return a.salesPrice - b.salesPrice;
          })
          e.bestPrice = deals[0].salesPrice;
          ranges.forEach(function(minMaxArray) {
            let value = eval("e." + element.attribute);
            if (value > minMaxArray[0] && value <= minMaxArray[1]) {
              let bucketTitle = minMaxArray[0] + "-" + minMaxArray[1];
              counts[bucketTitle] = counts.hasOwnProperty(bucketTitle) ? counts[bucketTitle] + 1 : 1;
              return;
            }
          })
        })
        itemToAdd[element.title] = counts;
      }
      filterOptions.push( itemToAdd )
    })

    let internalReviewsCount = _.sumBy(products, function(e) {
      return e.ratings.internal.amount
    })
    let externalReviewsCount = _.sumBy(products, function(e) {
      return e.ratings.external.amount
    })
    let internalReviewsAvg;
    let externalReviewsAvg;

    let internalReviewsScores = [];
    let internalReviewsAmounts = [];
    let externalReviewsScores = [];
    let externalReviewsAmounts = [];

    products.forEach(function(product) {
      internalReviewsScores.push(product.ratings.internal.average);
      internalReviewsAmounts.push(product.ratings.internal.amount);
      externalReviewsScores.push(product.ratings.external.average);
      externalReviewsAmounts.push(product.ratings.external.amount);
    })



    internalReviewsAvg = weightedMean(internalReviewsScores, internalReviewsAmounts);
    externalReviewsAvg = weightedMean(externalReviewsScores, externalReviewsAmounts);

    stats['total-matching'] = products.length;

    stats['internal-reviews-count'] = internalReviewsCount;
    stats['external-reviews-count'] = externalReviewsCount;

    stats['internal-reviews-average'] = internalReviewsAvg;
    stats['external-reviews-average'] = externalReviewsAvg;



    stats['filterOptions'] = filterOptions;

    return res.json({ stats })
  })
})

function weightedMean(arrValues, arrWeights) {

  var result = arrValues.map(function (value, i) {

    var weight = arrWeights[i];
    var sum = value * weight;

    return [sum, weight];
  }).reduce(function (p, c) {

    return [p[0] + c[0], p[1] + c[1]];
  }, [0, 0]);

  return result[0] / result[1];
}

module.exports = router;
