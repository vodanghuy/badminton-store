let brandSchema = require('../schemas/brand');

module.exports = {
    getAllBrands: async function(){
        return await brandSchema.find({})
    }
}