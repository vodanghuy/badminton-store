let mongoose = require('mongoose')
let categorySchema = mongoose.Schema({
    name:{
        type:String,
        unique: [true, "Tên danh mục phải là duy nhất"],
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: "false"
    },
    slug: String
},
{
    timestamps:true
})
module.exports = mongoose.model('category', categorySchema)