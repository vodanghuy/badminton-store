let mongoose = require('mongoose')

let menuSchema = mongoose.Schema({
    // Nội dung hiển thị trên menu
    text:{
        type:String,
        required: true
    },
    // Đường dẫn cho các mục menu
    // Ví dụ: /vot-cau-long
    url:{
        type:String,
        required: true
    },
    order:{
        type:Number,
        required: true,
        default: 0
    },
    parent:{
        type:mongoose.Types.ObjectId,
        ref:'menu',
        default: null
    }
},
{
    timestamps:true
})
module.exports = mongoose.model('menu', menuSchema)