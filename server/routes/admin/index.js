var router = require('express').Router();

router.use('/brands', require('./brands'));
router.use('/products', require('./products'));
router.use('/stores', require('./stores'));
router.use('/deals', require('./deals'));
router.use('/updateStats', require('./updateStats'));
router.use('/images', require('./images'));
router.use('/reviews', require('./reviews'));

router.use(function(err, req, res, next) {  //4 args = error handler
  if (err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }
});

module.exports = router;
