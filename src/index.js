const express=require("express")

const cors=require("cors");

const app=express();

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    return res.status(200).send({message:"welcome to ecommerce api - node",status:true})
})

//auth routers
const authRouters=require("./routes/auth.route.js");
app.use("/auth",authRouters);

//user routers
const userRouters=require("./routes/user.route.js");
app.use("/api/users",userRouters);

//product router

const productRouters=require("./routes/product.routes.js");
app.use("/api/products",productRouters);
 
//admin product router
const adminProductRouters=require("./routes/adminProducts.route.js");
app.use("/api/admin/products",adminProductRouters);

//cart router

const cartRouters=require("./routes/cart.route.js");
app.use("/api/cart",cartRouters);

// //cart item router
         
const cartItemRouters=require("./routes/cartItem.route.js");
app.use("/api/cart_items",cartItemRouters);

// //order route

const orderRouters=require("./routes/order.route.js");
app.use("/api/orders",orderRouters);

// //admin order route

const adminOrderRouters=require("./routes/adminOrder.route.js");
app.use("/api/admin/orders",adminOrderRouters);

// //review route

const reviewRouters=require("./routes/review.route.js");
app.use("/api/reviews",reviewRouters);

// //rating route

const ratingRouters=require("./routes/rating.route.js");
app.use("/api/ratings",ratingRouters);

module.exports=app;