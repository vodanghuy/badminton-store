let mongoose = require('mongoose')
let userSchema = mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
    },
    fullName:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth:{
        type: Date,
        required: true,
    },
    gender:{
        type: String,
        required: true
    },
    address:{
        type:String,
        default: ""
    },
    role:{
        type: mongoose.Types.ObjectId,
        ref: 'role',
        default: 1
    },
    isDeleted:{
        type: Boolean,
        default: "false"
    }
},
{
    timestamp: true
})
module.exports = mongoose.model('user', userSchema)