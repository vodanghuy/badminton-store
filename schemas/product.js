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
        required: true
    },
    imageURL:{
        type:String,
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
    }
},
{
    timestamps:true
})
module.exports = mongoose.model('product', productSchema)