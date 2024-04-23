
const jwtProvider=require("../config/jwtProvider.js");
const userService=require("../services/user.service.js");


const authenticate=async(req,res,next)=>{
    //Bearer token......
    try {
        console.log("hii1;")
        const token=req.headers.authorization?.split(" ")[1];
       
        if(!token){
            return res.status(404).send({error:"token not found....."})
        }

        const userId=jwtProvider.getUserIdFromToken(token);
        const user= await userService.findUserById(userId);
        req.user=user;
        // console.log(user)
    } catch (error) {
        return res.status(500).send({error:"authenticatot"});
    }

    next();
}

module.exports=authenticate