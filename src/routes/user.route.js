const express =require("express");
const router=express.Router();
const userController=require("../controller/user.controller.js");


router.get("/profile",userController.getUserProfile);
router.post("/",userController.getAllUsers);


module.exports=router;