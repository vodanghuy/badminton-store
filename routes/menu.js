let express = require('express');
var router = express.Router();
var menuController = require('../controllers/menu');

router.get('/', async function(req, res, next) {
    try {
        let menus = await menuController.getAllMenu();
        res.status(200).send(menus);
    } catch (error) {
        next(error)
    }
})
router.post('/', async function(req, res, next) {
    try {
        let menu = await menuController.createMenu(req.body);
        res.status(200).send(menu);
    } catch (error) {
        next(error)
    }
})
router.put('/:id', async function(req, res, next) {
    try {
        let menu = await menuController.updateMenu(req.params.id, req.body);
        res.status(200).send(menu);
    } catch (error) {
        next(error)
    }
})
router.delete('/:id', async function(req, res, next) {
    try {
        let menu = await menuController.deleteMenu(req.params.id);
        res.status(200).send(menu);
    } catch (error) {
        next(error)
    }
})


module.exports = router;
