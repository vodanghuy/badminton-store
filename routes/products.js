var express = require('express');
var router = express.Router();
var productController = require('../controllers/products');
const { check_authentication, check_authorization } = require('../utils/check_auth');
let path = require('path')
let form_data = require('form-data')
let fs = require('fs')
let axios = require('axios')
var multer = require("multer");

/* GET home page. */
router.get('/', async function(req, res, next) {
  let products = await productController.getAllProducts(req.query);
  if(products.length != 0)
  {
    res.status(200).send(products);
  }
});

// GET product by id
router.get('/:id', async function(req, res, next) {
  try {
    let product = await productController.getProductById(req.params.id);
    res.status(200).send({
      success:true,
      data: product
    });
  } catch (error) {
    res.status(404).send({
      message: error.message
    });
  }
});

//Get product by brand
router.get('/brand/:id', async function(req, res, next) {
  try {
    let products = await productController.getProductsByBrand(req.params.id);
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send({
      message: error.message
    });
  }
});

// Get product by category
router.get('/category/:id', async function(req, res, next) {
  try {
    let products = await productController.getProductsByCategory(req.params.id);
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send({
      message: error.message
    });
  }
});

// Create a product
router.post('/', async function(req, res, next) {
  try {
    let body = req.body;
    let newProduct = await productController.createProduct(body.name, body.price, body.description , body.quantity, body.category, body.brand, body.imageURL);
    res.status(200).send({
      success:true,
      message: "Thêm sản phẩm thành công",
      data: newProduct
    });
  } catch (error) {
    res.status(404).send({
      message: error.message
    });
  }
});

// Update product
router.put('/:id', async function(req, res, next) {
  try {
    let updatedProduct = await productController.updateProduct(req.params.id, req.body);
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(404).send({
      message: error.message
    });
  }
});

// Delete product
router.delete('/:id', async function(req, res, next) {
  try {
    let deletedProduct = await productController.deleteProduct(req.params.id);
    res.status(200).send({
      success: true,
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    res.status(404).send({
      message: error.message
    });
  }
});
let avatarPath = path.join(__dirname, "../public/products");
let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, avatarPath),
  filename: (req, file, cb) =>
    cb(null, new Date(Date.now()).getTime() + "-" + file.originalname),
});
let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/image/)) {
      cb(new Error("tao chi nhan file anh thoi"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
// Upload avatar
router.post("/change_image/:id",upload.single("image"),async function (req, res, next) {
    if (req.file) {
      let newform = new form_data();
      let filepath = path.join(avatarPath, req.file.filename);
      newform.append("image", fs.createReadStream(filepath));
      let result = await axios.post("http://localhost:4000/uploadProduct", newform, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fs.unlinkSync(filepath);
      let newURL = result.data.message;
      let product = await productController.getProductById(req.params.id);
      product.imageURL = newURL;
      await product.save();
      res.status(200).send({
        success: true,
        message: product,
      });
    }
  }
);
module.exports = router;
