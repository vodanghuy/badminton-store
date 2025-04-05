let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
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
        unique: [true, 'Số điện thoại đã tồn tại']
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
    },
    ResetPasswordToken: String,
    ResetPasswordExpire: Date,
},
{
    timestamps: true,
})

// Mã hóa mật khẩu
userSchema.pre('save', function(next) {
    if(this.isModified('password')){
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(this.password, salt);
        this.password = hash;
    }
    next();
})
module.exports = mongoose.model('user', userSchema)