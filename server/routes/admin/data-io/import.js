var router = require('express').Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product');

var fs = require('fs');
var fastCsv = require('fast-csv');
var dottie = require('dottie');

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
    //return res.json(csvEntries);
    //slug, name, type, brandSlug, brandEgress, deals
    var csvEntriesPromises = csvEntries.map(async function(entry, i) {
      return new Promise(async function(resolve, reject) {
        if (i == 0) { resolve(); return }
        entry = entry.split(',');

        //console.log(entry);
        var db_product = await Product.findOne({name: entry[0]}).populate('brand').populate('image').populate('thumbnail').lean().exec();
        //console.log(db_product);
        if (db_product == null) {
          //create new product

          resolve();
          return;
        } else {
          //console.log("slug found");
        }

        let thisObjectChanges = await getChanges(db_product, entry, fieldsToCheck, checkFieldsIndices);

        if (thisObjectChanges.length > 0) {
          changes.push({name: db_product.name, changes: thisObjectChanges})
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
    console.log(db_product.name);

    var fieldCheckPromises = fieldsToCheck.map(async function(fieldName, i) {
      return new Promise(async function(resolve, reject) {
        console.log(dbField);
        var csvIndex = checkFieldsIndices[i];
        var dbField = dottie.get(db_product, fieldName) == undefined ? "" : dottie.get(db_product, fieldName);  //the field value from the existing db object

        let csvEntry = "";
        if (entry.length > csvIndex){
          console.log(db_product.name);
          csvEntry = entry[csvIndex].trim(); //the cell value from the csv file
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
        console.log(dbField + " " + csvEntry)
        var _hasDiff = hasDiff(dbField, csvEntry);


        if (_hasDiff) {
          var changeObject = {};

          changeObject[fieldName] = {old: dbField, new: csvEntry}
          /*if (fieldName == 'brand') {
            changeObject[fieldName].newReadable = brand.slug;
          }*/
          changes.push(changeObject);
          console.log("CHANGED PUSHED");
        }
        resolve();
      })
    })
      Promise.all(fieldCheckPromises).then(function() {
        console.log("changes: " + changes);
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
