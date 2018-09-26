var router = require('express').Router();
var mongoose = require('mongoose');
var dottie = require('dottie');
var fs = require('fs');
var fastCsv = require('fast-csv');

var Impression = mongoose.model('Impression');

router.get('/doChanges', async function(req, res, next) {
  fs.readFile("./csvs/staged_impressions_import.json", 'utf8', async function(err, contents) {
    if (err) return res.json({error: err})
    var changesObject = JSON.parse(contents);
    var changedImps = [];
    if (changesObject.changes.length < 1) return res.json({'changes' : 'no changes'})
    var changePromises = changesObject.changes.map(function(impChanges) {
      return new Promise(async function(resolve, reject) {
        let impression;
        impression = await Impression.findOne({customId: impChanges.CustomId}).lean().exec();
        if (!impression) {
          if (!impChanges.changes.hasOwnProperty('new')) {
            console.log("error impression not found:", impChanges.text)
            resolve()
            return;
          } else {
            await createNewImpression(impChanges.changes.new)
            changedImps.push(impChanges);
            resolve();
            return;
          }
        } else {
          let changeObject = {};
          impChanges.changes.forEach(function(changes) {
            Object.keys(changes).forEach(async function(key) {
              var newVal = '';
              newVal = changes[key].new;
              impression[key] = newVal;
              changeObject[key] = newVal;
            })
          })

          Impression.findOneAndUpdate({customId: impression.customId}, {$set : changeObject}, {returnOriginal:false}).then(function(error, result) {
            console.log('error:',error);
            console.log('result:',result);
            changedImps.push(impression);
            resolve()
          })
        }
      })
      Promise.all(changePromises).then(function() {
        return res.json({changedImps: changedImps})
      })
    })
  })
})

let createNewImpression = async function(impressionBody) {
  return new Promise(async function(resolve, reject) {
    let newImpression = new Impression();
    newImpression.content = impressionBody.content;
    newImpression.customId = impressionBody.CustomId;
    newImpression.connotation = impressionBody.connotation;
    newImpression.save().then(function(newImp) {
      resolve();
    }).catch(function(err) {
      console.log('newImpression save error:',err)
      reject(err);
    })
  })
}

router.get('/findChanges/:filePath', async function(req, res, next) {

  var csvEntries = [];
  var changes = [];

  var fieldsToCheck = ['content', 'connotation']
  var checkFieldsIndices = [0, 2]

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

        var db_impression = await Impression.findOne({customId : entry[1]}).lean().exec();

        let thisObjectChanges = {};

        if (db_impression == null) {
          console.log('impression not found:',entry[1])
          thisObjectChanges['new'] = {}
          fieldsToCheck.forEach(function(field, i) {
            dottie.set(thisObjectChanges['new'], field, entry[checkFieldsIndices[i]])
          })
          dottie.set(thisObjectChanges['new'], 'CustomId', entry[1])
          changes.push({text: entry[0], changes : thisObjectChanges})
        } else {
          thisObjectChanges = await getChanges(db_impression, entry, fieldsToCheck, checkFieldsIndices);

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
      fs.writeFile("./csvs/staged_impressions_import.json", JSON.stringify(jsonForFile, null, 2), function(err) {
        if (err) return res.json({error: err});
        return res.json({entriesChecked: entriesCheckedCount,
                          changes: changes
                        });
      })
    })
  })

})

getChanges = async function (db_object, entry, fieldsToCheck, checkFieldsIndices) {
  return new Promise(async function(resolve, reject) {
    //expects JSON object of db_product, not mongoose object
    var changes = [];
    //console.log("product:", db_product.name);

    var fieldCheckPromises = fieldsToCheck.map(async function(fieldName, i) {
      return new Promise(async function(resolve, reject) {
        //console.log(dbField);
        var csvIndex = checkFieldsIndices[i];
        var dbField = dottie.get(db_object, fieldName) == undefined ? "" : dottie.get(db_object, fieldName);  //the field value from the existing db object

        let csvEntry = "";
        if (entry.length > csvIndex){
          csvEntry = entry[csvIndex];
        }

        var _hasDiff = hasDiff(dbField, csvEntry);

        if (_hasDiff) {
          var changeObject = {};

          changeObject[fieldName] = {old: dbField, new: csvEntry}

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
