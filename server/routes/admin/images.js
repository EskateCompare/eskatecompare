var router = require('express').Router();
var mongoose = require('mongoose');

var Image = mongoose.model('Image');

router.post('/', async function(req, res, next) {

    var image = req.body.image;
    image = new Image(req.body.image);
    image.save().then(function(image) {
      return res.json({ image : image })
    }).catch(next);

})

module.exports = router;
