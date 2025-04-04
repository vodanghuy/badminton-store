var express = require('express');
var router = express.Router();
var userSchema = require('../schemas/user')
var roleSchema = require('../schemas/role')
var userController = require('../controllers/users')
// Get check_authentication and check_authorization functions
let {check_authentication, check_authorization} = require('../utils/check_auth')
// Get constants
let constants = require('../utils/constants')

// Get all users
router.get('/',check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function(req, res, next) {
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
router.get('/:id',check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function(req, res, next) {
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
router.post('/',check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function(req, res, next) {
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
router.put('/:id',check_authentication, check_authorization(constants.USER_PERMISSION), async function(req, res, next) {
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
router.delete('/:id',check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function(req, res, next) {
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
