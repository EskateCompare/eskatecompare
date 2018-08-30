var router = require('express').Router();
var mongoose = require('mongoose');
var _ = require('lodash');
const unwind = require('javascript-unwind');

var pipeline = require('./pipelines/product-aggregation');

var Product = mongoose.model('Product')
var UpdateStats = mongoose.model('UpdateStats')

router.get('/', async function(req, res, next) {

  //Reference Filter
  const referenceFilter = [
    { "title" : "brands", "type" : "discrete", "attribute" : "brand.name", "displayTitle" : "Brand", "formType" : "Checkbox"},
    { "title" : "year", "type" : "discrete", "attribute" : "specs.year", "displayTitle" : "Year", "formType" : "Checkbox" },
    { "title" : "price", "type" : "ranges", "attribute" : "bestPrice", "formType" : "Checkbox",
      "ranges" : [[0, 250], [250, 500], [500, 1000], [1000-1500], [1500,9999]] },
    { "title" : "range", "type" : "ranges", "attribute" : "specs.range", "displayTitle" : "Range", "formType" : "Checkbox",
      "ranges" : [[0, 10], [10, 17], [17, 24], [24, 9999]] },
    { "title" : "battery-capacity", "type" : "ranges", "attribute" : "specs.batteryCapacity",  "displayTitle" : "Battery Capacity", "formType" : "Checkbox",
      "ranges": [[0, 3000], [3000, 6000], [6000, 10000], [10000, 999999]] },
    { "title" : "battery-removable", "type" : "discrete", "attribute" : "specs.batteryRemovable",  "displayTitle" : "Battery Removable", "formType" : "Radio" },
    { "title" : "travel-safe", "type" : "discrete", "attribute" : "specs.travelSafe",  "displayTitle" : "Travel Safe", "formType" : "Radio" },
    { "title" : "speed", "type" : "ranges", "attribute" : "specs.speed",  "displayTitle" : "Speed", "formType" : "Checkbox",
      "ranges" : [[0, 10], [10, 16], [16, 22], [22,999]] },
    { "title" : "weight", "type" : "ranges", "attribute" : "specs.weight",  "displayTitle" : "Weight", "formType" : "Checkbox",
      "ranges" : [[0, 10], [10, 15], [15, 20], [20,999]] },
    /*{ "title" : "max-weight", "type" : "ranges", "attribute" : "maxWeight",  "displayTitle" : "Max Weight", "formType" : "Checkbox",
      "ranges" : [[0, 200], [200, 300], [300, 400], [400, 999]] },*/
    { "title" : "drive", "type" : "discrete", "attribute" : "specs.drive", "displayTitle" : "Drive", "formType" : "Checkbox" },
    { "title" : "width", "type" : "ranges", "attribute" : "specs.width" ,  "displayTitle" : "Width", "formType" : "Checkbox",
      "ranges" : [[0, 3], [3, 4], [4, 6], [6, 99]] },
    { "title" : "length", "type" : "ranges", "attribute" : "specs.length" ,  "displayTitle" : "Length", "formType" : "Checkbox",
      "ranges" : [[0, 6], [6, 12], [12, 18], [18, 24], [24, 99]] },
    { "title" : "waterproof", "type" : "discrete", "attribute" : "specs.waterproof", "displayTitle" : "Waterproof", "formType" : "Radio" },
    { "title" : "terrain", "type" : "discrete", "attribute" : "specs.terrain", "displayTitle" : "Terrain", "formType" : "Checkbox" },
    { "title" : "style", "type" : "discrete", "attribute" : "specs.style", "displayTitle" : "Style", "formType" : "Checkbox" },
    { "title" : "deck-materials", "type" : "discrete", "attribute" : "specs.deckMaterials", "displayTitle" : "Deck Material", "formType" : "Checkbox" },
    { "title" : "rating", "type" : "range", "attribute" : "ratings.compositeScore", "displayTitle" : "Rating", "formType" : "Checkbox",
      "ranges" : [[0, 60], [60, 70], [70, 80], [80, 90], [90, 100]] }
  ]

  let stats = {};
  let filterOptions = [];

  //get products
  const params = req.query;

  pipeline.aggregationFilter(params, false).then(async function(products) {


  //Replace this find with filter function
  //Product.find({}).populate('brand').populate('deals').lean().exec().then(async function(products) {
    referenceFilter.forEach(function(element) {
      let optionsArray = [];
      let itemToAdd = {};
      let counts = {};
      if (element.type === "discrete") {
        let productsToCount = [];
        if (Array.isArray(eval("products[0]." + element.attribute))) {
          //unwind the products on the attribute array.
          //this implementation is a workaround with the extra step of moving the attribute to the top level of the object, since javascript-unwind doesn't sort Array
            //nested in a nested object
            // this was the original:  productsToCount = _.clone(unwind(products, element.attribute))
          //productsToCount = _.clone(products);

          products.forEach(function(prod) {
            prod['workaroundArray'] = _.get(prod, 'specs.deckMaterials');
            //console.log(prod);
            productsToCount.push(prod);
          })

          productsToCount = unwind(productsToCount, "workaroundArray")

          element.attribute = "workaroundArray";
        }
        else {
          productsToCount = products;
        }
      console.log(productsToCount.length)
      counts = _.countBy(productsToCount, function(e) {
        console.log('attribute' + element.attribute);
        return eval("e." + element.attribute)
      });

      itemToAdd = prepItemToAdd(counts, element.title, element.displayTitle, element.formType);
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

       itemToAdd = prepItemToAdd(counts, element.title, element.displayTitle, element.formType);
      }
      filterOptions.push(itemToAdd);
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

    let totalProducts = await Product.count({}).exec();
    let lastUpdatedObject = await UpdateStats.findOne({}).exec();



    stats['totalMatching'] = products.length;
    stats['totalProducts'] = totalProducts;

    stats['internalReviewsCount'] = internalReviewsCount;
    stats['externalReviewsCount'] = externalReviewsCount;

    stats['internalReviewsAverage'] = internalReviewsAvg;
    stats['externalReviewsAverage'] = externalReviewsAvg;

    var options = { year: 'numeric', month: 'long', day: 'numeric' };

    stats['lastUpdated'] = lastUpdatedObject.lastUpdated.toLocaleDateString("en-US", options);

    stats['filterOptions'] = filterOptions;

    return res.json({ stats })
  })
})

function prepItemToAdd(counts, title, displayTitle, formType) {
  let optionsArray = Object.keys(counts).map(function(key) {
     let returnOption = {};
     returnOption['label'] = key;
     returnOption['count'] = counts[key];
     return returnOption;
   })

   let itemToAdd = {};


   itemToAdd['title'] = title;
   itemToAdd['displayTitle'] = displayTitle;
   itemToAdd['options'] = optionsArray;
   itemToAdd['formType'] = formType;

   return itemToAdd;
}

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
