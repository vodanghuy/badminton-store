var express = require("express");
var router = express.Router();
var categoryController = require("../controllers/categories");
const category = require("../schemas/category");

/* Get all categories. */
router.get('/', async function (req, res, next) {
    try {
        let categories = await categoryController.getAllCategories();
        res.send(categories);
    } catch (error) {
        next(error);
    }
  
});

/* Get category by id. */
router.get('/:id', async function(req,res,next){
    try {
        let category = await categoryController.getById(req.params.id)
        res.status(200).send(category)
    } catch (error) {
        res.status(404).send(error.message)
    }
    
});

/* Create a category. */

router.post('/', async function (req, res, next) {
    try {
        let body = req.body;
    let newCategory = await categoryController.createCategory(body.name);
    res.send(newCategory);
    } catch (error) {
        res.status(404).send({
            message: error.message
        })
    }
    
});

// Update category
router.put('/:id', async function(req,res,next){
    try {
        let updatedCategory = await categoryController.updateCategory(req.params.id,req.body);
        res.status(200).send(updatedCategory);
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        })
    }
});

// Delete category
router.delete('/:id', async function(req,res,next){
    try {
        let deletedCategory = await categoryController.deleteCategory(req.params.id)
        res.status(200).send(deletedCategory);
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        })
    }
})
module.exports = router;
