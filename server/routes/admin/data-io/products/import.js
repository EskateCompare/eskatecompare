var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product');
var Image = mongoose.model('Image');
var Brand = mongoose.model('Brand');

var fs = require('fs');
var fastCsv = require('fast-csv');
var dottie = require('dottie');

router.get('/doChanges', async function(req, res, next) {
  fs.readFile("./csvs/staged_import_changes.json", 'utf8', async function(err, contents) {
    if (err) return res.json({error: err});
    var changesObject = JSON.parse(contents);

    var changedProds = [];

    var changePromises = changesObject.changes.map(function(prodChange) {
      return new Promise(async function(resolve, reject) {
        let product;
        product = await Product.findOne({name: prodChange.name}).lean().exec();
        if (!product) {  //new product
          if (!prodChange.changes.hasOwnProperty('new')) {
            console.log("error prod not found:", prodChange.name)
            resolve()
            return;
          console.log('creating new prod:', prodChange.name)
          } else {
              await createNewProduct(prodChange.name, prodChange.changes.new);
              await addProductImages(prodChange.name, prodChange.changes.new);
              changedProds.push(prodChange)
              resolve();
              return;
          }
        } else { //existing product
          let changeObject = {};
          prodChange.changes.forEach(function(changes) {

            Object.keys(changes).forEach(async function(key) {
              var newVal = '';
              if (key == 'image.source' || key == 'thumbnail.source') {
                  //create new Image, save it after product
                  let image = new Image();
                  image.source = changes[key].new;
                  image.product = product._id;
                  image.type = key.split('.')[0]
                  if (image.type == 'image') image.type = 'main';
                  image.description = product.name + ' ' + image.type + ' image';
                  image.save().then(function(){})
              }
                else  {
                  newVal = changes[key].new;
                  product[key] = newVal;
                  changeObject[key] = newVal;
                }
            })
          })

          Product.findOneAndUpdate({name: product.name}, {$set : changeObject}, {returnOriginal:false}).then(function(error, result) {
            console.log('error:',error);
            console.log('result:',result);
            changedProds.push(product);
            resolve()
          })
        }
        //product.save().then(function() {

        //}).catch(function(err) {
        //  console.log("Error: " + err)
        //  reject(err)
      //  })


      })
    });
    Promise.all(changePromises).then(function() {
      return res.json({changedProds: changedProds})
    })
  })
})

let createNewProduct = async function(name, productBody) {
  return new Promise(async function(resolve, reject) {
    let newProduct = new Product();
    newProduct.name = name;
    newProduct.specs = productBody.specs;
    newProduct.ratings = {};
    newProduct.ratings.compositeScore = null;
    newProduct.ratings.recommendations = {
      'yes' : 0,
      'maybe' : 0,
      'no' : 0
    }
    newProduct.impressions = [];

    if (dottie.get(productBody, 'brand.name') != "" && dottie.get(productBody, 'brand.name') != undefined) {
      let brandObject = await Brand.findOne({name : dottie.get(productBody, 'brand.name')});
      if (brandObject) newProduct.brand = brandObject._id;
    }



    newProduct.save().then(function(newProd) {
      resolve();
    }).catch(function(err) {
      console.log('newProd save error:', err)
      reject(err);
    })
  })
}

let addProductImages = async function(name, productBody) {
  return new Promise(async function(resolve, reject) {


    if (dottie.get(productBody, 'image.source') != "" && dottie.get(productBody, 'image.source') != undefined) {
      let newImage = new Image();
      newImage.source = dottie.get(productBody, 'image.source');
      let associatedProduct = await Product.findOne({name: name});
      newImage.product = associatedProduct._id;
      newImage.type = 'main';
      newImage.description = name + ' main image';
      await newImage.save();
    }
    if (dottie.get(productBody, 'thumbnail.source') != "" && dottie.get(productBody, 'thumbnail.source') != undefined) {
      let newImage = new Image();
      newImage.source = dottie.get(productBody, 'thumbnail.source');
      let associatedProduct = await Product.findOne({name: name});
      newImage.product = associatedProduct._id;
      newImage.type = 'thumbnail';
      newImage.description = name + ' thumbnail image';
      await newImage.save();
    }
    resolve();
  })
}

router.get('/findChanges/:filePath', async function(req, res, next) {
  //Searches for file within filepath of project structure
    //Upgrade by adding ability to accept file from client

  //get all products
  var csvEntries = [];
  var changes = [];
  /* total glossary of working fields
  var fieldsToCheck = ['name', 'brand', 'compatibleSubstances'];
  var checkFieldsIndices = [1, 4, 6];
  */
  //fields to run
  var fieldsToCheck = ['brand.name', 'image.source', 'thumbnail.source', 'specs.year', 'specs.msrp', 'specs.msrpCurrency', 'specs.range', 'specs.speed', 'specs.weight', 'specs.maxWeight', 'specs.drive', 'specs.hillGrade',  'specs.speedModes',  'specs.batteryCapacity', 'specs.batteryPower',    'specs.batteryWattHours', 'specs.chargeTime', 'specs.width', 'specs.length', 'specs.wheelDiameter', 'specs.terrain', 'specs.style', 'specs.deckMaterials', 'specs.manufacturerWarranty', 'specs.tags'];
  var checkFieldsIndices = [1,             3,               4,                6,            8,                9,                 10,            11,             12,              13 ,             14  ,             15 ,                16 ,                    17 ,                  18  ,                         19,                  20,               21,            24,               25,                   26,             27,               28,                        29,                  30];  //in the csv file
  var entriesCheckedCount = 0;

  fs.readFile(req.params.filePath, 'utf8', async function(err, contents) {
    if (err) console.log(err);
    csvEntries = contents.split('\n');

    var csvEntriesPromises = csvEntries.map(async function(entry, i) {
      return new Promise(async function(resolve, reject) {
        if (i == 0) { resolve(); return }
        entry = entry.split(',');
        entry = entry.map(function(field) {
          field = field.trim();
          if (field.indexOf('|') != -1)  return field.split('|')
          else return field
        })

        var db_product = await Product.findOne({name: entry[0]}).populate('brand').populate('image').populate('thumbnail').lean().exec();

        let thisObjectChanges = {};

        if (db_product == null) {
          //create new product
          console.log('prod not found:',entry[0])
          if (entry[7] != 'false') { //is variant, don't add for now
            resolve();
            return;
          }
          thisObjectChanges['new'] = {}
          fieldsToCheck.forEach(function(field, i) {
            dottie.set(thisObjectChanges['new'], field, entry[checkFieldsIndices[i]])
          })
          changes.push({name: entry[0], changes : thisObjectChanges})

        } else {
          thisObjectChanges = await getChanges(db_product, entry, fieldsToCheck, checkFieldsIndices);

          if (thisObjectChanges.length > 0) {
            changes.push({name: db_product.name, changes: thisObjectChanges})
          }
        }



        entriesCheckedCount++;
        resolve();
        return;
      })
    })
    Promise.all(csvEntriesPromises).then(function() {
      var jsonForFile = {};
      jsonForFile['changes'] = changes;
      fs.writeFile("./csvs/staged_import_changes.json", JSON.stringify(jsonForFile, null, 2), function(err) {
        if (err) return res.json({error: err});
        return res.json({entriesChecked: entriesCheckedCount,
                        changes: changes
                        });
      })
    })
  })
})

getChanges = async function (db_product, entry, fieldsToCheck, checkFieldsIndices) {
  return new Promise(async function(resolve, reject) {
    //expects JSON object of db_product, not mongoose object
    var changes = [];
    //console.log("product:", db_product.name);

    var fieldCheckPromises = fieldsToCheck.map(async function(fieldName, i) {
      return new Promise(async function(resolve, reject) {
        //console.log(dbField);
        var csvIndex = checkFieldsIndices[i];
        var dbField = dottie.get(db_product, fieldName) == undefined ? "" : dottie.get(db_product, fieldName);  //the field value from the existing db object

        let csvEntry = "";
        if (entry.length > csvIndex){
          csvEntry = entry[csvIndex];
        }


        //exceptions requiring extra lookups/modifications
        //console.log(csvEntry);
        let brand = "";
        /*if (fieldName == 'brand') {
          //console.log ("CHECKING BRAND");
          dbField = String(dbField);  // for _id comparison

          brand = await Brand.findOne({slug: csvEntry}).exec();
          if (!brand) {
            csvEntry = dbField;
            //console.log("Error on brand slug lookup for brand slug: " + csvEntry);
          }  else {
            brand = brand.toObject();
            csvEntry = String(brand._id);
          }
        }
        else if (fieldName == 'compatibleSubstances') {

          if (dbField.length > 0) dbField = dbField.join('|');

        }*/
          //console.log(dbField + "-" + csvEntry);
        //console.log(dbField + " " + csvEntry)
        var _hasDiff = hasDiff(dbField, csvEntry);


        if (_hasDiff) {
          var changeObject = {};

          changeObject[fieldName] = {old: dbField, new: csvEntry}
          /*if (fieldName == 'brand') {
            changeObject[fieldName].newReadable = brand.slug;
          }*/
          changes.push(changeObject);
          //console.log("CHANGED PUSHED");
        }
        resolve();
      })
    })
      Promise.all(fieldCheckPromises).then(function() {
        //console.log("changes: " + changes);
        resolve(changes);
      })
  })
}



let hasDiff = function (val1, val2) {
  let anyDiff = false;
  if (val1  != val2) {
    anyDiff = true;
  }

    //if toString matches, it's good
  if (val1.toString() == val2.toString()) {
    anyDiff = false;
  }


  //ARRAY STUFF
  else if (val2 instanceof Array) {
    //console.log("IS AN ARRAY");
      if (val1.length == val2.length) {
      //  console.log("SAME LENGTH " + attribute);
        var arrayDiff = false;
        for (var i = 0; i < val1.length; i++) {
          if (val1[i].toString() != val2[i].toString()) {
            arrayDiff = true;
          }
        } if (!arrayDiff) anyDiff = false;
      }

  }

  //EMPTY ARRAY STUFF
  else if (typeof val2 == 'object') {
    //recursive check here
    if (typeof val2 == 'object') {   //temporary solution for now, only occurs for empty arrays
      diff = false;
    }
  }

  return anyDiff;
}

module.exports = router;
