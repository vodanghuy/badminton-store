let userSchema = require('../schemas/user')
let roleSchema = require('../schemas/role')

module.exports = {
    // Create user
    createUser: async function(body) {
        // Check if user already exists
        let existingUsername = await userSchema.findOne({ username: body.username })
        if(existingUsername) {
            throw new Error("Tên tài khoản đã tồn tại")
        }
        let existingEmail = await userSchema.findOne({ email: body.email })
        if(existingEmail) {
            throw new Error("Email đã tồn tại")
        }
        let role = await roleSchema.findOne({
            name: body.role
        })
        let user = new userSchema({
            username: body.username,
            password: body.password,
            email: body.email,
            fullName: body.fullName,
            phoneNumber: body.phoneNumber,
            dateOfBirth: body.dateOfBirth,
            gender: body.gender,
            address: body.address ? body.address : "",
            role: role._id
        })
        user = await user.save()
        return user
    },
    // Get all users
    getAllUsers: async function() {
        let users = await userSchema.find({ isDeleted: false }).populate({
            path: 'role',
            select: 'name'
        })
        return users
    },
    // Get user by ID
    getUserById: async function(id) {
        let user = await userSchema.findById(id).populate({
            path: 'role',
            select: 'name'
        })
        if(!user) {
            throw new Error("Không tìm thấy người dùng")
        }
        return user
    },
    // Update user
    updateUser: async function(id, body){
        let user = await userSchema.findById(id)
        if(!user) {
            throw new Error("Không tìm thấy người dùng")
        }
        if(body.email) {
            let existingEmail = await userSchema.findOne({ email: body.email })
            if(existingEmail) {
                throw new Error("Email đã tồn tại")
            }
        }
        if(body.fullName){
            user.fullName = body.fullName
        }
        if(body.phoneNumber){
            user.phoneNumber = body.phoneNumber
        }
        if(body.dateOfBirth){
            user.dateOfBirth = body.dateOfBirth
        }
        if(body.gender){
            user.gender = body.gender
        }
        if(body.address){
            user.address = body.address
        }
        if(body.role){
            let role = await roleSchema.findOne({
                name : body.role
            })
            user.role = role._id
        }
        user = await userSchema.findByIdAndUpdate(id, body, { new: true })
        return user
    },
    // Delete user
    deleteUser: async function(id) {
        let user = await userSchema.findById(id)
        if(!user) {
            throw new Error("Không tìm thấy người dùng")
        }
        user.isDeleted = true
        await user.save()
        return user
    }
}