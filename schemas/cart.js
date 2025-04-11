let mongoose = require('mongoose')
let cartSchema = mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products:[{
        productId:{
            type: mongoose.Types.ObjectId,
            ref: 'product',
            required: true
        },
        quantity:{
            type: Number,
            required: true,
            default: 1,
            min: 1
        },
    }]
},
{
    timestamps: true
})
module.exports = mongoose.model('cart', cartSchema)