const { connect } = require("mongoose");
const app = require(".");
const { connectDb } = require("./config/db");

const PORT=5000;
app.listen(PORT, async()=>{
    await connectDb();
    console.log("ecommerce api listning : ",PORT);
})

//middleware?