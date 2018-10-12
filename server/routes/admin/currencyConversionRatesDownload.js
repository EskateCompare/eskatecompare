var router = require('express').Router();
var mongoose = require('mongoose');
var currencyFunctions = require('../common/currencyRates');


let CurrencyConversionRateDownload = mongoose.model('CurrencyConversionRateDownload');

router.put('/rates', async function(req, res, next) {
      let ccrd = null;
      try {
        let ccrd = await currencyFunctions.getUpdateCurrencyRates();
        return res.json(ccrd);
      } catch (error) {
        console.log("CAUGHT");
        console.log('error',error.response.data.description);
    }

})

module.exports = router;
