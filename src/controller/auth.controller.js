
const userService=require("../services/user.service.js");
const jwtProvider=require("../config/jwtProvider.js");
const bcrpty=require("bcrypt");
const cartService=require("../services/cart.service.js")

const register =async(req,res)=>{
    try{
        console.log("yes");
        const user=await userService.createUser(req.body);
        const jwt=jwtProvider.generateToken(user._id);

        await cartService.createCart(user);

        return res.status(200).send({jwt,message:"register success"});

    } catch(error){
        return res.status(500).send({error:error.message});
    }
}


const login=async(req,res)=>{
    console.log("111;");
    const {password,email}=req.body;
    try{
        const user=await userService.getUserByEmail(email);
        if(!user){
            return res.status(404).send({message:"user not found with email: ",email})
        }
        const isPasswordValid=await bcrpty.compare(password,user.password);
        
        // console.log("password",isPasswordValid)
        if(!isPasswordValid){   
            return res.status(401).send({message:"Invalid password"})
        }
        
        const jwt=jwtProvider.generateToken(user._id);
        // console.log("yes");
        return res.status(200).send({jwt,message:"login success"});
    } catch(error){
        return res.status(500).send({error:"not found"});
    }
}

module.exports={register,login};