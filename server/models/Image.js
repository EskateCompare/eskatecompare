var mongoose = require('mongoose');
var slug = require('slug');

var Product = mongoose.model('Product');

var ImageSchema = new mongoose.Schema({
  source: String, //url
  description: String,
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  type: {type: String, enum: ['thumbnail', 'main', 'additional']}
})

mongoose.model('Image', ImageSchema);

var Image = mongoose.model('Image');

ImageSchema.post('save', async function(doc, next) {
  Product.findOne({_id: doc.product}).lean().exec().then(async function(product) {
    console.log("here 1");
    let setObject = {};
    switch (doc.type) {
      case 'thumbnail':
      console.log("here 2");
        setObject['thumbnail'] = doc._id
        break;
      case 'main':
        setObject['image'] = doc._id
        break;
      case 'additional':
        product.additionalImages.push(doc._id)
        setObject['additionalImages'] = product.additionalImages
        break;

    }
    console.log("here 3");
    Product.findOneAndUpdate({ slug: product.slug}, {$set : setObject}, {new : true}).then(function(error, result) {
      console.log("error: " + error);
      console.log("result: " + result);
      next();
    })
  })
})
