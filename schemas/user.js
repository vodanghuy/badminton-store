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
        required: true,
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
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: "false"
    }
},
{
    timestamps: true
})
module.exports = mongoose.model('user', userSchema)