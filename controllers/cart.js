let cartSchema = require('../schemas/cart')
let productSchema = require('../schemas/product')
let productController = require('./products')
let orderSchema = require('../schemas/order')
module.exports = {
    // Get cart by userId
    getCartByUserId: async function(userId){
        let cart = await cartSchema.findById(userId).populate('product.productId')
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
    addProductToCart: async function(userId, products){
        let cart = await cartSchema.findOne({userId: userId});
        for(const p of products){
            let product = await productSchema.findById(p.productId)
            if(!product){
                throw new Error('Sản phẩm không tồn tại')
            }
            if(product.quantity < p.quantity){
                throw new Error('Số lượng sản phẩm ${p.productId} không đủ');
            }
            if(p.quantity <= 0){
                throw new Error('Số lượng sản phẩm không được bé hơn hoặc bằng không');
            }
        }
        for (const p of products) {
            let product = cart.products.find(i => i.productId == p.productId)
            if(product){
                if(!product.quantity){
                    product.quantity += 1
                    //await productController.updateQuantity(p.productId, 1)
                }
                else{
                    product.quantity += p.quantity
                    //await productController.updateQuantity(p.productId, p.quantity)
                }
            }
            else{
                cart.products.push(p)
            }
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
