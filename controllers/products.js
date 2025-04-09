let productsSchema = require('../schemas/product');
let brandSchema = require('../schemas/brand');
let categorySchema = require('../schemas/category');
//npm i slugify
var slugify = require('slugify');

module.exports = {
    buildQuery: function (query) {
        let result = {};
        if(query.name)
        {
            result.name = new RegExp(query.name, 'i')
        }
        result.price = {}
        if(query.price)
        {
            if(query.price.$gte)
            {
                result.price.$gte = Number(query.price.$gte)
            }
            else
            {
                result.price.$gte = 0
            }
            if(query.price.$lte)
            {
                result.price.$lte = Number(query.price.$lte)
            }
            else
            {
                result.price.$lte = 1000000000
            }
        }
        else
        {
            result.price.$gte = 0
            result.price.$lte = 1000000000
        }
        return result;
    },

    // Get all products
    getAllProducts: async function (query) {
        return await productsSchema.find(this.buildQuery(query)).populate({
            path: 'category',
            select: 'name'
        }).populate({
            path: 'brand',
            select: 'name'
        });
    },

    // Get product by id
    getProductById: async function (id) {
        return await productsSchema.findById(id).populate({
            path: 'category',
            select: 'name'
        }).populate({
            path: 'brand',
            select: 'name'
        });
    },

    //Create product
    createProduct: async function (name, price, description, quantity, categoryI, brandI, imageURL) {
        let category = await categorySchema.findOne({
            name: categoryI
        });
        if (!category) {
            throw new Error('Danh mục không tồn tại');
        }
        let brand = await brandSchema.findOne({
            name: brandI
        });
        if (!brand) {
            throw new Error('Thương hiệu không tồn tại');
        }
        let existingProduct = await productsSchema.findOne({
            name: name
        });
        if (existingProduct) {
            throw new Error('Sản phẩm đã tồn tại');
        }
        let newProduct = new productsSchema({
            name: name,
            price: price,
            description: description ? description : "",
            quantity: quantity ? quantity : 0,
            category: category._id,
            brand: brand._id,
            imageURL: imageURL ? imageURL : "",
            // Tạo đường dẫn slug từ tên sản phẩm
            slug: slugify(name, {
                lower: true
            })
        });
        return await newProduct.save();
    },

    // Update product
    updateProduct: async function (id, body) {
        let product = await productsSchema.findById(id);
        if (!product) {
            throw new Error('Không tìm thấy sản phẩm');
        }
        if (body.name) {
            let existingProduct = await productsSchema.findOne({
                name: body.name
            });
            if(existingProduct)
            {
                throw new Error('Sản phẩm đã tồn tại');
            }
            product.name = body.name;
        }
        if (body.price) {
            product.price = body.price;
        }
        if (body.description) {
            product.description = body.description;
        }
        if (body.quantity) {
            product.quantity = body.quantity;
        }
        if (body.imageURL) {
            product.imageURL = body.imageURL;
        }
        if (body.category) {
            let category = await categorySchema.findOne({
                name: body.category
            });
            if (!category) {
                throw new Error('Danh mục không tồn tại');
            }
            product.category = category._id;
        }
        if (body.brand) {
            let brand = await brandSchema.findOne({
                name: body.brand
            });
            if (!brand) {
                throw new Error('Thương hiệu không tồn tại');
            }
            product.brand = brand._id;
        }
        await product.save();
        return product;
    },

    // Delete product
    deleteProduct: async function (id) {
        let product = await productsSchema.findById(id);
        if (!product) {
            throw new Error('Không tìm thấy sản phẩm');
        }
        product.isDeleted = true;
        await product.save();
        return product;
    },
    // Get product by brand
    getProductsByBrand: async function (brandId) {
        let brand = await brandSchema.findById(brandId);
        return await productsSchema.find({
            category: brand.name
        })
    },
    // Get product by category
    getProductsByCategory: async function(categoryId)
    {
        let category = await categorySchema.findById(categoryId);
        return await productsSchema.find({
            category: category.name
        })
    },
    updateQuantity: async function(id, quantity){
        let product = await productsSchema.findById(id)
        product.quantity -= quantity
        return await product.save()
    }
}