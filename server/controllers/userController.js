//Sign up new user

import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt, { hash } from "bcryptjs"; 
import cloudinary from '../lib/cloudinary.js'


export const signup =  async (req , res)=>{
    const {fullName ,email , password ,bio} = req.body;
    try{
        if(!fullName || !email  || !password || !bio){
           return res.json({success :false , message :"Midssing Details"}) 
        }
        const user= await User.findOne({email});
        if(user){
             return res.json({success :false , message :"Account Already Exist"}) 
        }

        //encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        //add new user
        const newUser = await User.create({fullName , email , password:hashedPassword , bio});


        //authenticate token
        const token = generateToken(newUser._id);
        res.json({success : true , userData : newUser , token , message : "Account Created Successfully"})
    }
    catch(error){
        console.log(error.message)
        res.json({success : false , message : error.message})

    }
}



//Controller for login user
export const login =  async (req , res)=>{
    try{
         const { email , password } = req.body;
         const userData = await User.findOne({email});
         const isPasswordCorrect = await bcrypt.compare(password ,userData.password);

         if(!isPasswordCorrect){
            return  res.json({success : false , message : 'Invalid Credential'})
         }

         const token = generateToken(newUser._id);
        res.json({success : true , userData , token , message : "Login Successfully"})
    }
    catch(error){
        console.log(error.message)
        res.json({success : false , message : error.message})
    }
}


//controller to check if user is authnticated
export const checkAuth = (req , res)=>{
    res.json({success:true , user:req.user});
}



//Controller to update user profilr details
export const updateProfile = async (req,res) =>{
    try{
        const {profilePic ,bio , fullName} = req.body

        const userId = req.user._id;
        let updatedUser ;
        if(!profilePic){
            updatedUser  = await User.findByIdAndUpdate(userId ,{bio ,fullName} , {new:true})
        }
        else {
            const upload =await cloudinary.uploader.upload(profilePic);
            updatedUser =  await User.findByIdAndUpdate(userId ,{profilePic :upload.secure_url,bio ,fullName} , {new:true})
        }
        res.json({success:true ,user:updatedUser})
    }
    catch(error){
        console.log(error.message)
        res.json({success:false ,message : error.message})
    }
}