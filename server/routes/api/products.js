var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product')

router.get('/:slug', async function(req, res, next) {

  let product = await Product.findOne({ slug : req.params.slug }).populate('brand').populate('deals').
  populate('reviews').populate('image').populate('additionalImages').populate({ path: 'deals', populate: { path: 'store' }}).lean().exec();

  if (!product) return res.status(422).json({ 'error' : 'product not found' });

  //get rankings

  let products = await Product.find({}, 'ratings.compositeScore style brand').exec();

  let brandRank = 1;
  let styleRank = 1;
  let overallRank = 1;

  products.forEach(function(compareProd) {
    if (compareProd.ratings.compositeScore > product.ratings.compositeScore) {
      overallRank++;
      if (compareProd.style == product.style) {
        styleRank++;
      }
      if (String(compareProd.brand) == String(product.brand)) {
        brandRank++;
      }
    }
  })

  product['rankings'] = {
    overall : overallRank,
    style : styleRank,
    brand : brandRank
  }

  product.deals = product.deals.sort(function(a, b) {
    return a.salesPrice - b.salesPrice;
  })
  product.reviews = product.reviews.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  })

  //front-end mapping

  const frontEndMap = {
    "dbKey" :        ["year", "range", "speed", "weight", "drive", "batteryCapacity", "batteryRemovable", "width", "length", "waterproof", "terrain", "style", "deckMaterials", "travelSafe"],
    "displayName" :  ["Year", "Range", "Speed", "Weight", "Drive", "Battery Capacity", "Battery Removable", "Width", "Length", "Waterproof", "Terrain", "Style", "Deck Material", "Travel Safe"],
    "semanticIcon" : ["calendar check outline", "map marker alternate", "dashboard", "balance scale", "power off", "battery three quarters", "plug", "arrows alternate horizontal", "arrows alternate vertical", "tint", "road", "adjust", "diamond", "plane"]
  }

  var displaySpecs = [];

  for (var i = 0; i < frontEndMap.dbKey.length; i++) {
    var dbKey = frontEndMap.dbKey[i];
    var displayName = frontEndMap.displayName[i];
    var semanticIcon = frontEndMap.semanticIcon[i];

    var displaySpecObject = {};
    displaySpecObject["displayName"] = displayName;
    displaySpecObject["icon"] = semanticIcon;
    displaySpecObject["value"] = product.specs[dbKey];

    displaySpecs.push(displaySpecObject);

  }

  product["displaySpecs"] = displaySpecs;

  return res.json({ product });

})

router.get('/', async function(req, res, next) {
  //Replace this find with filter function

  const params = req.query;

  console.log(params);

  aggregationFilter(params).then(function(products) {
    return res.json({ products })
  })
  /*
  Product.find({}).select('-reviews').populate('brand').populate('deals').populate('image').exec().then(function(products) {
    return res.json({ products })
  })*/
})


var aggregationFilter = function(params) {
  return new Promise(async function(resolve, reject) {

    const sortByDefault = "ratings.compositeScore";
    const sortDirDefault = -1;
    const pageNumDefault = 1;
    const perPageDefault = 20;

    var pipeline = []
      //initial match

      var initialMatch = {};

      //within range

      var rangeMatchesParams =     ["batteryCapacity",      'rating',                 'length',        'width',      'weight',       'speed',       'range'];
      var rangeMatchesLookupKeys = ["specs.batteryCapacity", 'ratings.compositeScore', 'specs.length', 'specs.width', 'specs.weight', 'specs.speed', 'specs.range'];

      for (var i = 0; i < rangeMatchesParams.length; i++) {

        if (!params.hasOwnProperty(rangeMatchesParams[i])) {
          continue;
        }

        var rangeArray = [];
        var rawParams = params[rangeMatchesParams[i]];
        rangeArray = rawParams.split(',');

        initialMatch[rangeMatchesLookupKeys[i]] = { $gte : Number(rangeArray[0]), $lt : Number(rangeArray[1]) }
      }

      //multi-match discrete

      var discreteMatchesParams =       ["batteryRemovable",       "travelSafe"      , 'waterproof',        "drive"       , "terrain",      "style",       'deckMaterials',        'year']
      var discreteMatchesLookupKeys =   ["specs.batteryRemovable", "specs.travelSafe", 'specs.waterproof',  "specs.drive" , "specs.terrain", "specs.style", 'specs.deckMaterials', 'specs.year' ]
      var discreteMatchesTypes =        ["boolean",                "boolean",           "boolean",         "strings"      , "strings",       "strings",     'strings',             'numbers']

      for (var i = 0; i < discreteMatchesParams.length; i++) {


        if (!params.hasOwnProperty(discreteMatchesParams[i])) {
          continue;
        }
        var rawParams = params[discreteMatchesParams[i]];


        var valuesArray = [];
        valuesArray = rawParams.split(',');

        var valueType = discreteMatchesTypes[i];

        if (valueType == "boolean") {
          valuesArray = valuesArray.map(function(value) {
            if (value == "false") return false;
            else return true;
          })
        }
        else if (valueType == "numbers") {
          valuesArray = valuesArray.map(function(value) {
            return Number(value);
          })
        }
        initialMatch[discreteMatchesLookupKeys[i]] = {
          $in : valuesArray
        }
      }

      pipeline.push({
        $match :  initialMatch
      })

      console.log(initialMatch);



      //brands lookup

      pipeline.push(
        {
          $lookup: {
            from: 'brands',
            localField: 'brand',
            foreignField: '_id',
            as: 'brand'
          }
        }
      )

      //match brand

      var brandsParamArray = [];

      if (params.hasOwnProperty('brands'))
      {
        var rawBrands = params.brands;
        brandsParamArray = rawBrands.split(',');

        pipeline.push(
          {
            $match: {
              "brand.slug": {
                $in: brandsParamArray
              }
            }
          }
        )
      }

      //lookup deals

      pipeline.push(
        {
          $lookup: {
            from: 'deals',
            localField: 'deals',
            foreignField: '_id',
            as: 'deals'
          }
        }
      )

      //add field best price

      pipeline.push(
        {
          $addFields: {
            bestPrice: {
              $min: "$deals.salesPrice"
            }
          }
        }
      )

      //match price

      var priceParamArray = [];

      if (params.hasOwnProperty('price')) {

        priceParamArray = params.price.split(',');
        var minPrice = Number(priceParamArray[0]);
        var maxPrice = Number(priceParamArray[1]);

        pipeline.push(
          {
            $match: {
              "bestPrice": {
                $gte: minPrice,
                $lte: maxPrice
              }
            }
          }
        )
      }

      //Add discount && popularity fields

      pipeline.push(
        {
          $addFields: {
            discount: {
              $subtract: [
                "$specs.msrp", "$bestPrice"
              ]
            },
            popularity: {
              $sum: [
                "$ratings.external.amount", "$ratings.internal.amount"
              ]
            }
          }
        }
      )

      //Sort

      let sortKey = sortByDefault; //default

      var sortParam = params.sortBy;

      if (params.sortBy == 'popularity') sortKey = 'popularity';
      if (params.sortBy == 'bestPrice') sortKey = 'bestPrice';
      if (params.sortBy == 'rating') sortKey = 'ratings.compositeScore';
      if (params.sortBy == 'discount') sortKey = 'discount';
      if (params.sortBy == 'speed') sortKey = 'specs.speed';
      if (params.sortBy == 'range') sortKey = 'specs.range';

      var sortDir = params.sortDir;
      var sortDirParam = sortDirDefault;
      if (sortDir == 'asc') sortDirParam = 1;

      console.log("sortkey " + sortKey)
      console.log("sortDirParam " + sortDirParam);

      let sortObject = {};

      sortObject[sortKey] = Number(sortDirParam);

      pipeline.push( { $sort : sortObject } );

      console.log(pipeline);

      //Skip

      var pageNum = pageNumDefault;
      var perPage = perPageDefault;

      if (params.hasOwnProperty('page')) {
        pageNum = params.page;
      }
      if (params.hasOwnProperty('perPage')) {
        perPage = params.perPage;
      }

      var skip = pageNum * (Number(perPage) - Number(perPage));

      pipeline.push({$skip: skip})

      //limit
      pipeline.push({$limit: Number(perPage)})

      //final lookups
      pipeline.push(
        {
          $lookup: {
            from: 'images',
            localField: 'image',
            foreignField: '_id',
            as: 'image'
          }
        }
      )
      pipeline.push(
        {
         $lookup: {
           from: 'images',
           localField: 'additionalImages',
           foreignField: '_id',
           as: 'additionalImages'
         }
       }
      )
      pipeline.push({
        $lookup: {
          from: 'reviews',
          localField: 'reviews',
          foreignField: '_id',
          as: 'reviews'
        }
      })

      //after pipeline declaration

      let products = await Product.aggregate(pipeline).cursor({}).exec();

      let returnProducts = [];

      await products.eachAsync(function(prod) {
        prod.brand = prod.brand[0];
        prod.image = prod.image[0];
        returnProducts.push(prod)
      })

      resolve(returnProducts);

  })
}


module.exports = router;
