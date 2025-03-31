var express = require("express");
var router = express.Router();
var brandSchema = require("../schemas/brand");
var brandController = require("../controllers/brands");
const brand = require("../schemas/brand");
/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    let brands = await brandController.getAllBrands();
    res.status(200).send({
      brands,
    });
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
});

// Create a brand
router.post("/", async function (req, res, next) {
  try {
    let body = req.body;
    let newBrand = await brandController.createBrand(
      body.name,
      body.description = body.description ? body.description : ""
    );
    res.status(200).send(newBrand);
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
});

// Get brand by id
router.get("/:id", async function (req, res, next) {
  try {
    let brand = await brandController.getBrandById(req.params.id);
    res.status(200).send(brand);
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
});

//Update brand
router.put("/:id", async function (req, res, next) {
  try {
    let updatedBrand = await brandController.updateBrand(
      req.params.id,
      req.body
    );
    res.status(200).send(updatedBrand);
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
});

// Delete brand
router.delete("/:id", async function (req, res, next) {
  try {
    let deletedBrand = await brandController.deleteBrand(req.params.id);
    res.status(200).send(deletedBrand);
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
});
module.exports = router;
