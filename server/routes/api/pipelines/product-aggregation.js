var mongoose = require('mongoose');
var Product = mongoose.model('Product')

exports.aggregationFilter = function (params, doSkipLimit) {
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

        let rangeMatch = {};

        var rangeArray = [];
        var rawParams = params[rangeMatchesParams[i]];
        rangeArray = rawParams.split(',');   // list like 0-250,400-600
        //make list of or conditions

        //or condition pairs array
        let rangeMatchConditions = [];
         rangeArray.forEach(function(minMaxPair) {
          minMaxPair = minMaxPair.split('-');
          let matchObject = {};
          if (minMaxPair.length > 1) {
            matchObject[rangeMatchesLookupKeys[i]] = { $gte : Number(minMaxPair[0]), $lt : Number(minMaxPair[1]) }
          } else {
            matchObject[rangeMatchesLookupKeys[i]] = { $gte : Number(minMaxPair[0]) }
          }
          rangeMatchConditions.push(matchObject)
        })
        rangeMatch = { $or : rangeMatchConditions  }

        pipeline.push({
          $match :  rangeMatch
        })
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

        let priceMatch = {};

        let priceMatchConditions = [];
         priceParamArray.forEach(function(minMaxPair) {
          minMaxPair = minMaxPair.split('-');
          let matchObject = {};
          if (minMaxPair.length > 1) {
            matchObject['bestPrice'] = { $gte : Number(minMaxPair[0]), $lt : Number(minMaxPair[1]) }
          } else {
            matchObject['bestPrice'] = { $gte : Number(minMaxPair[0]) }
          }
          priceMatchConditions.push(matchObject)
        })
        priceMatch = { $or : priceMatchConditions  }

        pipeline.push({
          $match :  priceMatch
        })
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
      if (params.sortBy == 'price') sortKey = 'bestPrice';
      if (params.sortBy == 'rating') sortKey = 'ratings.compositeScore';
      if (params.sortBy == 'discount') sortKey = 'discount';
      if (params.sortBy == 'speed') sortKey = 'specs.speed';
      if (params.sortBy == 'range') sortKey = 'specs.range';

      var sortDir = params.sortDir;
      var sortDirParam = sortDirDefault;
      if (sortDir == 'asc') sortDirParam = 1;

      let sortObject = {};

      sortObject[sortKey] = Number(sortDirParam);

      pipeline.push( { $sort : sortObject } );

      console.log(pipeline);

      if (doSkipLimit) {

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

      } //end of skipLimit conditional

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

      await products.eachAsync(function(prod) {   //iterates through cursor, and final formatting
        prod.brand = prod.brand[0];
        prod.image = prod.image[0];
        returnProducts.push(prod)
      })

      resolve(returnProducts);

  })
}
