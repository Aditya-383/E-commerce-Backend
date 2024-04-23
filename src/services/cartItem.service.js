const CartItem = require("../models/cartItem.model.js");
const userService = require("../services/user.service.js");


async function updateCartItem(userId, cartItemId, cartItemData) {
    try {
        console.log(cartItemId);
        const item = await findCartItemById(cartItemId);

        // if (!item) {
        //     throw new Error("cart item not found: ", cartItemId);
        // }
        const user = await userService.findUserById(item.userId);
        if (!user) {
            throw new Error("user not found: ", userId);
        }

        if (user._id.toString() === userId.toString()) {
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedPrice = item.quantity * item.product.discountedPrice;

            const updateCartItem = await item.save();
            return updateCartItem;
        }
        else {
            throw new Error("you can't update this cart item")
        }
    } catch (error) {
        throw new Error(error.message);
    }
}


async function removeCartItem(userId, cartItemId) {
    console.log(cartItemId);
    const cartItem = await findCartItemById(cartItemId);
    const user = await userService.findUserById(userId);

    if (user._id.toString() === cartItem.userId.toString()) {
        return await CartItem.findByIdAndDelete(cartItemId);
    }
    else {
        throw new Error("Youn cant't remove aother user's item")
    }
}


async function findCartItemById(cartItemId) {
    const cartItem = await CartItem.findById(cartItemId).populate("product");
    if (cartItem) {
        return cartItem;
    } else {
        throw new Error("Cart Item Not Found With Id ", cartItemId);
    }
}

module.exports = {
    updateCartItem,
    removeCartItem,
    findCartItemById,
}