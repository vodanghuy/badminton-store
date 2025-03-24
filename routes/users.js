var express = require('express');
var router = express.Router();
var userSchema = require('../schemas/user')
var roleSchema = require('../schemas/role')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* CREATE user */
router.post('/', async function(req,res,next){
  
})

module.exports = router;
