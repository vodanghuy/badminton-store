let cartSchema = require('../schemas/cart')
let productSchema = require('../schemas/product')
let productController = require('./products')
let orderSchema = require('../schemas/order')
module.exports = {
    // Get cart by userId
    getCartByUserId: async function(userId){
        let cart = await cartSchema.find({
            userId: userId
        })
        if(cart)
        {
            return cart
        }
        else
        {
            throw new Error('')
        }
    },
    // Create cart
    createCart: async function(userId){
        // let existingCart = await cartSchema.findOne({userId: userId})
        // if(existingCart)
        // {
        //     throw new Error('Giỏ hàng đã tồn tại')
        // }
        let newCart = new cartSchema({
            userId: userId,
            products: []
        })
        return await newCart.save()
    },
    // Update cart
    updateCart: async function(userId, product){
        let cart = await cartSchema.findOne({userId: userId})
        if(!cart)
        {
            throw new Error('Giỏ hàng không tồn tại')
        }
        cart.product = product
        await cart.save()
        return cart
    },
    // Delete cart
    deleteAllProducts: async function(userId){
        let cart = await cartSchema.findOne({userId: userId})
        if(!cart)
        {
            throw new Error('Giỏ hàng không tồn tại')
        }
        cart.products = []
        return await cart.save()
        
    },
    // Add product to cart
    addProductToCart: async function(userId, productId){
        let cart = await cartSchema.findOne({userId: userId});
            let product = await productSchema.findById(productId)
            if(!product){
                throw new Error('Sản phẩm không tồn tại')
            }
            if(product.quantity == 0){
                throw new Error('Sản phẩm đã hết hàng')
            }
            let existingProduct = cart.products.find(i => i.productId == productId)
            if(existingProduct){
                if (product.quantity < existingProduct.quantity + 1) {
                    throw new Error('Số lượng sản phẩm trong kho không đủ');
                  }
                existingProduct.quantity += 1
            }
            else{
                cart.products.push({
                    productId: product._id,
                    quantity: 1
                })
            }
        
        return await cart.save()
    },
    checkout: async function(userId){
        // Tìm và kiểm tra giỏ hàng của người dùng
        let cart = await cartSchema.findOne({ userId: userId });
        if (!cart || cart.products.length === 0) {
            throw new Error('Giỏ hàng trống hoặc không tồn tại');
        }
        let totalAmount = 0
        const products = [];
        for (const p of cart.products) {
            let product = await productSchema.findById(p.productId);
            if(product.quantity < p.quantity){
                throw new Error('Sản phẩm không đủ số lượng');
            }
            totalAmount += product.price * p.quantity
            products.push({
                productId: p.productId,
                quantity: p.quantity,
                price: product.price
            })
        }
        let newOrder = new orderSchema({
            userId: userId,
            products: products,
            totalAmount: totalAmount,
            status: 'pending'
        })
        await newOrder.save()
        for (const p of cart.products) {
            await productController.updateQuantity(p.productId, p.quantity)
        }
        cart.products = []
        return await cart.save();
    }
}
