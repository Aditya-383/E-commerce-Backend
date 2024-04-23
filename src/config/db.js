const mongoose= require("mongoose");

const mondbUrl="mongodb+srv://adityasinha382003:L9R2sU6E3XfcAfho@cluster0.xuhhuri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb=()=>{
    return mongoose.connect(mondbUrl);
}

module.exports={connectDb}