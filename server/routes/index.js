var router = require('express').Router();

//this is where the routes go
router.use('/api', require('./api'));

module.exports = router;
