var express = require('express');
var router = express.Router();
var productSchema = require('../schemas/product');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let products = await productSchema.find({});
  res.status(200).send({
    products
  })
});

module.exports = router;
