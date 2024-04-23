const Product = require("../models/product.model.js");
const CartItem = require("../models/cartItem.model.js");
const Cart = require("../models/cart.model.js");

async function createCart(user) {
    try {
        const cart = new Cart({ user });
        const createdCart = await cart.save();
        // console.log("yes");
        return createdCart;

    } catch (error) {
        throw new Error(error.message);
    }
}

async function findUserCart(userId) {
    try {
        let cart = await Cart.findOne({ user: userId })
        console.log(userId);
        
        let cartItems = await CartItem.find({cart:cart._id})
        .populate("product");
        cart.cartItems = cartItems;

        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;

        for (let cartItem of cart.cartItems) {
            totalPrice += cartItem.price;
            totalDiscountedPrice += cartItem.discountedPrice;
            totalItem += cartItem.quantity;
        }

        cart.totalPrice = totalPrice;
        cart.totalItem = totalItem;
        cart.discounte = totalPrice - totalDiscountedPrice;

        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function addCartItem(userId,req){
   try {
      const cart = await Cart.findOne({user:userId});
      const product=await Product.findById(req.productId);

      const isPresent = await CartItem.findOne({cart:cart._id,product:product._id,userId})
      if(!isPresent){
          const cartItem= new CartItem({
              product:product._id,
              cart:cart._id,
              quantity:1,
              userId,
              price:product.price,
              size:req.size,
              discountedPrice:product.discountedPrice,
            })
            
            
            const createdCartItem=await cartItem.save();// function of mongodb
            cart.cartItems.push(createdCartItem);
            await cart.save();
            return "Item added to cart";
        }
        // console.log("yes");
   } catch (error) {
    throw new Error(error.message);
   }
}

 

module.exports = { createCart,findUserCart,addCartItem}