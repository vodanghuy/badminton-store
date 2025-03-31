const category = require('../schemas/category');
let categorySchema = require('../schemas/category');

module.exports = {
    // Get all categories
    getAllCategories: async function(){
        return await categorySchema.find();
    },
    // Get category by id
    getById: async function(id){
        let category = await categorySchema.findById(id);
        if(category)
        {
            return category;
        }
        else
        {
            throw new Error('Không tìm thấy danh mục');
        }
    },
    // Create category
    createCategory: async function(name){
        let newCategory = new categorySchema({
            name: name,
        })
        return await newCategory.save();
    },
    // Update category
    updateCategory: async function(id, body)
    {
        let updatedCategory = await categorySchema.findById(id);
        if(body.name)
        {
            updatedCategory.name = body.name;
        }
        await updatedCategory.save();
        return updatedCategory;
    },
    // Delete category
    deleteCategory: async function(id)
    {
        let deletedCategory = await categorySchema.findById(id);
        deletedCategory.isDeleted = true
        await deletedCategory.save();
        return deletedCategory;
    }
}