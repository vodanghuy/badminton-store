let express = require("express")
let router = express.Router()
let userController = require("../controllers/users")
let jwt = require("jsonwebtoken")
let constants = require("../utils/constants")

router.post('/login', async function(req, res, next) {
    try {
        let username = req.body.username
        let password = req.body.password
        let result = await userController.checkLogin(username, password)
        if(result) {
            res.status(200).send({
                message: "Đăng nhập thành công",
                data: jwt.sign({
                    id: result,
                    expireIn: (new Date(Date.now() + 3600 * 1000)).getTime()
                },constants.SECRET_KEY)
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

module.exports = router