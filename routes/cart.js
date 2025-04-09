var express = require('express');
var router = express.Router();
var cartController = require('../controllers/cart');
var { check_authentication, check_authorization } = require('../utils/check_auth');
var constants = require('../utils/constants');

/* GET home page. */
router.get('/',check_authentication, function(req, res, next) {
  
});
router.post('/', check_authentication, async function(req,res,next){
    try {
        let products = req.body.products
        let userId = req.user._id
        let result = await cartController.addProductToCart(userId, products)
        res.status(200).send({
            message: "Thêm sản phẩm vào giỏ hàng thành công",
            data: result
        })
    } catch (error) {
        next(error)
    }
})
router.delete('/', check_authentication, async function(req,res,next){
    try {
        let cart = await cartController.deleteAllProducts(req.user._id)
        res.status(200).send({
            message: "Xóa sản phẩm trong giỏ hàng thành công",
            data: cart
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router;
