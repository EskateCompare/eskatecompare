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
    { "title" : "brands", "type" : "discrete", "attribute" : "brand.name", "displayTitle" : "Brand", "formType" : "checkbox"},
    { "title" : "style", "type" : "discrete", "attribute" : "specs.style", "displayTitle" : "Style", "formType" : "checkbox" },
    { "title" : "deckMaterials", "type" : "discrete", "attribute" : "specs.deckMaterials", "displayTitle" : "Deck Material", "formType" : "checkbox" },
    { "title" : "range", "type" : "ranges", "attribute" : "specs.range", "displayTitle" : "Range  (miles)", "formType" : "checkbox",
      "ranges" : [[0, 10], [10, 17], [17, 24], [24]] },
    { "title" : "drive", "type" : "discrete", "attribute" : "specs.drive", "displayTitle" : "Drive", "formType" : "checkbox" },
    /*{ "title" : "batteryCapacity", "type" : "ranges", "attribute" : "specs.batteryCapacity",  "displayTitle" : "Battery Capacity (mAh)", "formType" : "checkbox",
      "ranges": [[0, 3000], [3000, 6000], [6000, 10000], [10000]] },*/

    { "title" : "speed", "type" : "ranges", "attribute" : "specs.speed",  "displayTitle" : "Speed (mph)", "formType" : "checkbox",
      "ranges" : [[0, 10], [10, 16], [16, 22], [22]] },
    { "title" : "terrain", "type" : "discrete", "attribute" : "specs.terrain", "displayTitle" : "Terrain", "formType" : "checkbox" },
    { "title" : "features", "type" : "discrete", "attribute" : "specs.tags", "displayTitle" : "Features", "formType" : "checkbox", "logicType" : "and" },
    { "title" : "year", "type" : "discrete", "attribute" : "specs.year", "displayTitle" : "Year", "formType" : "checkbox" },
    { "title" : "price", "type" : "ranges", "attribute" : "bestPrice", "formType" : "checkbox", "displayTitle" : "Price",
      "ranges" : [[0, 250], [250, 500], [500, 1000], [1000, 1500], [1500]] },

    { "title" : "weight", "type" : "ranges", "attribute" : "specs.weight",  "displayTitle" : "Weight (pounds)", "formType" : "checkbox",
      "ranges" : [[0, 10], [10, 15], [15, 20], [20]] },
    { "title" : "maxWeight", "type" : "ranges", "attribute" : "specs.maxWeight",  "displayTitle" : "Max Load (pounds)", "formType" : "Checkbox",
      "ranges" : [[0, 200], [200, 250], [250, 300], [300]] },

    { "title" : "width", "type" : "ranges", "attribute" : "specs.width" ,  "displayTitle" : "Board Width (inches)", "formType" : "checkbox",
      "ranges" : [[0, 3], [3, 4], [4, 6], [6]] },
    /*{ "title" : "trucksWidth", "type" : "ranges", "attribute" : "specs.trucksWidth",  "displayTitle" : "Trucks Width (inches)", "formType" : "checkbox",
      "ranges": [[0, 10], [10, 12], [12, 15], [15]] },*/
    { "title" : "length", "type" : "ranges", "attribute" : "specs.length" ,  "displayTitle" : "Board Length (inches)", "formType" : "checkbox",
      "ranges" : [[0, 6], [6, 12], [12, 18], [18, 24], [24]] },
    /*{ "title" : "wheelBaseLength", "type" : "ranges", "attribute" : "specs.wheelbaseLength",  "displayTitle" : "Wheelbase Length (inches)", "formType" : "checkbox",
      "ranges": [[0, 24], [24, 30], [30, 36], [36]] },*/
    { "title" : "wheelDiameter", "type" : "ranges", "attribute" : "specs.wheelDiameter",  "displayTitle" : "Wheel Diameter (mm)", "formType" : "checkbox",
      "ranges": [[0, 80], [80, 85], [85, 90], [90, 95], [95]] },
    { "title" : "hillGrade", "type" : "ranges", "attribute" : "specs.hillGrade",  "displayTitle" : "Hill Grade (%)", "formType" : "checkbox",
      "ranges": [[0, 16], [16, 21], [21, 26], [26]] },
    { "title" : "speedModes", "type" : "discrete", "attribute" : "specs.speedModes", "displayTitle" : "Speed Modes (#)", "formType" : "checkbox" },

    { "title" : "batteryPower", "type" : "ranges", "attribute" : "specs.batteryPower",  "displayTitle" : "Battery Power (W)", "formType" : "checkbox",
      "ranges": [[0, 2500], [2500, 3500], [3500, 5000], [5000]] },
    { "title" : "batteryWattHours", "type" : "ranges", "attribute" : "specs.batteryWattHours",  "displayTitle" : "Battery Watt Hours  (Wh)", "formType" : "checkbox",
      "ranges": [[0, 100], [100, 150], [150, 200], [200]] },
    { "title" : "chargeTime", "type" : "ranges", "attribute" : "specs.chargeTime",  "displayTitle" : "Battery Charge Time (minutes)", "formType" : "checkbox",
      "ranges": [[0, 90], [90, 150], [150, 210], [210]] },

    { "title" : "manufacturerWarranty", "type" : "ranges", "attribute" : "specs.manufacturerWarranty",  "displayTitle" : "Manufacturer Warranty (months)", "formType" : "checkbox",
      "ranges": [[0, 6], [6, 12], [12, 24], [24]] },
    { "title" : "rating", "type" : "range", "attribute" : "ratings.compositeScore", "displayTitle" : "Rating", "formType" : "checkbox",
      "ranges" : [[0, 60], [60, 70], [70, 80], [80, 90], [90]] }
  ]

  let stats = {};
  let unsortedFilterOptions = [];
  let sortedFilterOptions = [];

  //get products
  const params = req.query;

  //pipeline.aggregationFilter(params, false).then(async function(products) {


  //Replace this find with filter function
  //Product.find({}).populate('brand').populate('deals').lean().exec().then(async function(products) {
  let filterOptionsPromises = referenceFilter.map(async function(element) {
      return new Promise(async function(resolve, reject) {
        let elementToSkip = element.title;
        if (element.hasOwnProperty('logicType') && element.logicType == 'and' ) elementToSkip = "";  //don't exclude from filter if AND

        let displayLogicType = 'and';
        if (params.hasOwnProperty(element.title) && !(element.hasOwnProperty('logicType') && element.logicType == 'and'))
         { displayLogicType = 'or' }

        let products = await pipeline.aggregationFilter(params, false, [elementToSkip]);
        let optionsArray = [];
        let itemToAdd = {};
        let counts = {};
        if (element.type === "discrete") {
          let productsToCount = [];
          if ((Product.schema.paths[element.attribute]) != undefined && Product.schema.paths[element.attribute].hasOwnProperty('instance')
                && Product.schema.paths[element.attribute].instance == 'Array') {
            //unwind the products on the attribute array.
            //this implementation is a workaround with the extra step of moving the attribute to the top level of the object, since javascript-unwind doesn't sort Array
              //nested in a nested object
              // this was the original:  productsToCount = _.clone(unwind(products, element.attribute))
            //productsToCount = _.clone(products);

            products.forEach(function(prod) {
              prod['workaroundArray'] = _.get(prod, element.attribute);
              //console.log(prod);
              if (prod['workaroundArray'] == undefined || prod['workaroundArray'] == '') prod['workaroundArray'] = [];
              productsToCount.push(prod);
            })
            productsToCount = unwind(productsToCount, "workaroundArray")

            element.attribute = "workaroundArray";
          }
          else {
            productsToCount = products;
          }

        //productsToCount = _.pick(productsToCount, _.identity);
        counts = _.countBy(productsToCount, function(e) {
          e.specs = _.pickBy(e.specs, _.identity);
          if (eval("e." + element.attribute) == undefined) return "";
          return eval("e." + element.attribute)
        });

        itemToAdd = prepItemToAdd(counts, element.title, element.displayTitle, element.formType, displayLogicType);
        }

        else {

          let ranges = element.ranges;
          products.forEach(function(e) {
            /*var deals = e.deals.sort(function(a, b) {
              return a.salesPrice - b.salesPrice;
            })
            e.bestPrice = deals[0].salesPrice;*/
            ranges.forEach(function(minMaxArray) {
              let value = eval("e." + element.attribute);
              if (value >= minMaxArray[0] && (minMaxArray.length == 1 || value < minMaxArray[1])) {
                let bucketTitle = "";
                if (minMaxArray.length > 1) {
                  bucketTitle = minMaxArray[0] + "-" + minMaxArray[1];
                } else {
                  bucketTitle = minMaxArray[0] + "+"
                }
                counts[bucketTitle] = counts.hasOwnProperty(bucketTitle) ? counts[bucketTitle] + 1 : 1;
                return;
              }
            })
          })

         itemToAdd = prepItemToAdd(counts, element.title, element.displayTitle, element.formType, displayLogicType);
        }
        unsortedFilterOptions.push(itemToAdd);
        resolve();
    })
  })

  await Promise.all(filterOptionsPromises);
    //pipeline call with full filter to get stats
  pipeline.aggregationFilter(params, false).then(async function(products) {

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

    //sort filter options

    referenceFilter.forEach(function(element) {
      //get array from unsortedFilter;
      for (let i = 0; i < unsortedFilterOptions.length; i++) {
        if (unsortedFilterOptions[i].title == element.title) {
          sortedFilterOptions.push(unsortedFilterOptions[i]);
        }
      }
    })

    stats['filterOptions'] = sortedFilterOptions;

    return res.json({ stats })
  })
})

function prepItemToAdd(counts, title, displayTitle, formType, logicType) {
  let optionsArray = Object.keys(counts).map(function(key) {

     let returnOption = {};
     returnOption['label'] = key;
     returnOption['count'] = counts[key];

     if (logicType == 'or') returnOption['count'] += "+";

     return returnOption;
   })

   optionsArray = optionsArray.filter(function(option) {
     return option.label != "";
   })

   console.log(optionsArray);


   optionsArray.sort(function(a, b) {
     let aTest = a.label.split('-')[0].split('+')[0];
     let bTest = b.label.split('-')[0].split('+')[0];

     //numbers
     if (!isNaN(aTest)) {
       return aTest - bTest;
     }

     //words
     else  if (aTest < bTest) return -1;
     else return 1;

   })

  console.log(optionsArray);

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
