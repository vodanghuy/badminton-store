var express = require('express');
var router = express.Router();
var brandSchema = require('../schemas/brand');
/* GET home page. */
router.get('/', async function(req, res, next) {
  let brands = await brandSchema.find({});
  res.status(200).send({
    brands
  })
});
module.exports = router;
