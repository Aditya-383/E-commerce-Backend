const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwtProvider = require("../config/jwtProvider")


const createUser = async (userData) => {
    try {
        console.log("yes1");
        let { firstName, lastName, email, password } = userData;
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new Error("user already exist with email :", email)
        }
        
        password = await bcrypt.hash(password, 8);
        
        // console.log("yy");
        const user = await User.create({ firstName, lastName, email, password });

        console.log("created user", user)

        return user;

    } catch (error) {
        throw new Error(error.message)
    }
}

// get the information about user by userId
const findUserById = async(userId) => {
    try {
        const user = await User.findById(userId)
        // .populate("address");
        if (!user) {
            throw new Error("user not found with id : ", userId)
        }
        //  console.log(user);
        return user;

    } catch (error) {
        throw new Error(error.message)
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({email});
        if (!user) {
            throw new Error("user not found with email : ", user._Id)
        }
        console.log(user);
        return user;

    } catch (error) {
        throw new Error(error.message)
    }
}

const getUserProfilrByToken=async(token)=>{
    try{
        const userId = jwtProvider.getUserIdFromToken(token);
        const  user=await findUserById(userId)
        if (!user) {
            throw new Error("user not found with id : ", userId)
        }

        return user;

    } catch(error){
        throw new Error(error.message)

    }
}

const getAllUsers=async()=>{
    try{
        const users=await User.find();
        return users;
    } catch(error){
        throw new Error(error.message);
    }
}
module.exports = {
     createUser,
     getUserByEmail,
     findUserById,
     getUserProfilrByToken,
     getAllUsers,
    }