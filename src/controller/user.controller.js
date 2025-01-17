const userService=require("../services/user.service");

const getUserProfile=async(req,res)=>{
    try{
        const jwt=req.headers.authorization?.split(" ")[1];
        if(!jwt){
            return res.status(404).send({error:"token not found"})
        }
        
        const user = await userService.getUserProfilrByToken(jwt);
        console.log("yes");
        
            return res.status(200).send(user);
    } catch(error){
        return res.status(500).send({error:"can not get"})
    }
}

const  getAllUsers=async(req,res)=>{
    try {
        const users=await userService.getAllUsers();
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={getAllUsers,getUserProfile};