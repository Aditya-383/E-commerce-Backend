

// product's database


const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        // required:true,    
    },
    discountedPrice: {
        type: Number,

    },
    discountedPrice: {
        type: Number
    },
    discountPresent: {
        type: Number
    },
    quantity: {
        type: Number,
        required: true,
    },
    brand: {
        type: String
    },
    color: {
        type: String
    },
    sizes: {
        name: { type: Number },
        quantity: { type: Number }
    },
    imageUrl: {
        type: String,
    },
    rating:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref: "reviews"
    }
    ],
        
    numRatings: {
        type: Number,
        default: 0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Product = mongoose.model("products", productSchema);
module.exports = Product; 