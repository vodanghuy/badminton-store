let express = require("express")
let router = express.Router()
let userController = require("../controllers/users")
let jwt = require("jsonwebtoken")
let constants = require("../utils/constants")
// Get check_authentication and check_authorization functions
let {check_authentication, check_authorization} = require("../utils/check_auth")
let {validate, UserValidation} = require("../utils/validator")
router.post('/login', UserValidation, validate, async function(req, res, next) {
    try {
        let username = req.body.username
        let password = req.body.password
        let result = await userController.checkLogin(username, password)
        let exp = new Date(Date.now() + 3600 * 1000)
        if(result) {
        // Create token
        let token = jwt.sign({
            id: result,
            expireIn: exp.getTime()
        }, constants.SECRET_KEY)
        // Set cookie
        res.cookie(
            'token', token,{ // '[cookie_name]', '[cookie_value]'
                httpOnly: true, // Cookie chỉ có thể được truy cập bởi server, không qua JavaScript ở client
                expires: exp, //Thời gian hết hạn của cookie
                signed: true //Cookie được ký bằng chuỗi bí mật (đã thiết lập trong cookieParser(''))
            }
        )
            res.status(200).send({
                message: "Đăng nhập thành công",
                data: token
            })
        } else {
            res.status(401).send({
                message: "Tên đăng nhập hoặc mật khẩu không đúng"
            })
        }
    } catch (error) {
        next(error)
    }
})
// Sign up
router.post('/signup',UserValidation, validate, async function(req, res, next) {
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
// Get me
router.get('/me', check_authentication, async function(req,res,next){
    try {
            res.send({
                success: true,
                data: req.user
            })
    } catch (error) {
        next(error)
    }
})

// Change password
router.post('/changePassword', check_authentication, async function(req,res,next){
    try {
        let oldPassword = req.body.oldPassword
        let newPassword = req.body.newPassword
        let user = await userController.changePassword(req.user._id, oldPassword, newPassword)
        res.status(200).send({
            message: "Đổi mật khẩu thành công",
            data: user
        })
    } catch (error) {
        next(error)
    }
})
module.exports = router