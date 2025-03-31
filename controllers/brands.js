let brandSchema = require('../schemas/brand');

module.exports = {
    // Get all brands
    getAllBrands: async function(){
        return await brandSchema.find()
    },
    // Create brand
    createBrand: async function(name, description){
        let existingBrand = await brandSchema.findOne({name: name})
        if(existingBrand)
        {
            throw new Error('Thương hiệu đã tồn tại')
        }
        let newBrand = new brandSchema({
            name: name,
            description: description
        })
        return await newBrand.save()
    },
    // Get brand by id
    getBrandById: async function(id){
        let brand = await brandSchema.findById(id)
        if(brand)
        {
            return brand
        }
        else
        {
            throw new Error('Không tìm thấy thương hiệu')
        }
    },
    // Update brand
    updateBrand: async function(id, body){
        let brand = await brandSchema.findById(id)
        if(!brand)
        {
            throw new Error('Không tìm thấy thương hiệu')
        }
        if(body.name)
        {
            brand.name = body.name
        }
        if(body.description)
        {
            brand.description = body.description
        }
        await brand.save()
        return brand
    },
    // Delete brand
    deleteBrand: async function(id){
        let brand = await brandSchema.findById(id)
        if(!brand)
        {
            throw new Error('Không tìm thấy thương hiệu')
        }
        brand.isDeleted = true
        await brand.save()
        return brand
    }
}