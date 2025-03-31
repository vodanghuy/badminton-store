var express = require('express');
var router = express.Router();
var productController = require('../controllers/products');

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
    res.status(200).send(product);
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
    res.status(200).send(newProduct);
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
    res.status(200).send(deletedProduct);
  } catch (error) {
    res.status(404).send({
      message: error.message
    });
  }
});
module.exports = router;
