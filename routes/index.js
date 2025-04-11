var express = require('express');
var router = express.Router();
let categorySchema = require('../schemas/category')
let productSchema = require('../schemas/product')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get products by category slug
router.get('/api/:categoryslug', async function(req, res, next) {
  let categoryslug = req.params.categoryslug;
  let category = await categorySchema.findOne({
    slug: categoryslug
  })
  if(category){
    let products = await productSchema.find({
      category: category._id
    })
    res.status(200).send(products)
  }
  else{
    res.status(404).send({
      message: 'Không tìm thấy danh mục'
    })
  }
});

// Get product by category slug
router.get('/api/:categoryslug/:productslug', async function(req, res, next) {
  let categoryslug = req.params.categoryslug;
  let productslug = req.params.productslug;
  let category = await categorySchema.findOne({
    slug: categoryslug
  })
  if(category){
    let products = await productSchema.findOne({
      category: category._id,
      slug: productslug
    })
    res.status(200).send(products)
  }
  else{
    res.status(404).send({
      message: 'Không tìm thấy danh mục'
    })
  }
});
module.exports = router;
