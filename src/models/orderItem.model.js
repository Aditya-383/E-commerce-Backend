

// orderItem database


const mongoose = require("mongoose");


const orderItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
        
    },
    size:{
    
            type:String,
    },
    quantity:{
        type:Number,
        required:true,
        
    },
    price:{
        type:Number,
        required:true,
       
    },
    discountedPrice:{
        type:Number,
        required:true,
        
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
        
    },
    
  
 
})  

const OrderItem=mongoose.model("orderItem",orderItemSchema);
module.exports=OrderItem ; 