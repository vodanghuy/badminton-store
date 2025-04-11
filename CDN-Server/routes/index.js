var express = require('express');
var router = express.Router();
let multer = require('multer'); // Used for file uploads
let path = require('path');
let avatarPath = path.join(__dirname, '../avatars') // Path to store uploaded avatars


let storage = multer.diskStorage({
  destination: (req, file, cb) =>{cb(null, avatarPath)}, // Folder to store the file
  filename: (req, file, cb) => {
    cb(null, new Date(Date.now()).getTime()+'-'+file.originalname) // File name
  }
})

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Check if the file is an image
    if(!file.mimetype.match(/image/)){
      cb(new Error('Chỉ chấp nhận file ảnh')) // Only accept image files
    }
    cb(null, true)
  },
  limits:{
    fileSize: 10 * 1024 * 1024 // Limit file size to 10MB
  }
})

router.post('/upload', upload.single('avatar'), async function (req, res, next){
  if(req.file){
    let url = `http://localhost:4000/avatars/`+req.file.filename
    res.status(200).send({
      message: url
    })
  }
})
router.get('/avatars/:filename', async function (req, res, next){
  let avaPath = path.join(avatarPath, req.params.filename)
  res.sendFile(avaPath)
})

module.exports = router;
