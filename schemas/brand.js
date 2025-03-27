let mongoose = require('mongoose')
let brandSchema = mongoose.Schema({
    name:{
        type:String,
        unique: true,
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: "false"
    }
},
{
    timestamps:true
})
module.exports = mongoose.model('brand', brandSchema)