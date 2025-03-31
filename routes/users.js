var express = require('express');
var router = express.Router();
var userSchema = require('../schemas/user')
var roleSchema = require('../schemas/role')
var userController = require('../controllers/users')

// Get all users
router.get('/', async function(req, res, next) {
  try {
    let users = await userController.getAllUsers()
    res.status(200).json({
      success: true,
      data: users
    })
  } catch (error) {
    next(error)
  }
})
// Get user by ID
router.get('/:id', async function(req, res, next) {
  try {
    let user = await userController.getUserById(req.params.id)
    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error)
  }
})
// Create user
router.post('/', async function(req, res, next) {
  try {
    let user = await userController.createUser(req.body)
    res.status(201).json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error)
  }
})
// Update user
router.put('/:id', async function(req, res, next) {
  try {
    let user = await userController.updateUser(req.params.id, req.body)
    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error)
  }
})
// Delete user
router.delete('/:id', async function(req, res, next) {
  try {
    let user = await userController.deleteUser(req.params.id)
    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error)
  }
})
module.exports = router;
