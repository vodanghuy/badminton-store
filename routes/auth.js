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
// Sign up
router.post('/signup', async function(req, res, next) {
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
router.get('/me', async function(req,res,next){
    try {
        if(!req.headers || !req.headers.authorization){
            throw new Error("Bạn chưa đăng nhập")
        }
        if(!req.headers.authorization.startsWith("Bearer")){
            throw new Error("Bạn chưa đăng nhập")
        }
        let token = req.headers.authorization.split(" ")[1];
        let result = jwt.verify(token, constants.SECRET_KEY)
        let user_id = result.id
        if(result.expireIn > Date.now()){
            let user = await userController.getUserById(user_id);
            res.send({
                success: true,
                data: user
            })
        }
        else
        {
            throw new Error ("Token hết hạn")
        }
    } catch (error) {
        next(error)
    }
})
module.exports = router