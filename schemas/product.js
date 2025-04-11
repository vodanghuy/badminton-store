let mongoose = require('mongoose')
let productSchema = mongoose.Schema({
    name:{
        type:String,
        unique: true,
        required: true
    },
    description:{
        type:String,
        default:""
    },
    price:{
        type:Number,
        required: true
    },
    quantity:{
        type:Number,
        default: 0
    },
    imageURL:{
        type:String,
        default: ""
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category',
        required: true
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:'brand',
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: "false"
    },
    slug:String
},
{
    timestamps:true
})
module.exports = mongoose.model('product', productSchema)