const { generateToken } = require('../lib/utils');
const User=require('../models/userModel');
const bcrypt=require('bcrypt');

exports.Signup=async(req,res)=>{
    try{
        const {fullName,email,password}=req.body;
        if(!fullName || !email ||!password){
            return res.status(400).json({
                success:false,
                message:"Required fields are missing."
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                success:false,
                message:"Password must be at least of 6 character."
            })
        }

        //user exist or not 
        const user=await User.findOne({email});
        if(user){
            return res.status(401).json({
                success:false,
                message:"User already exist."
            })
        }
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            fullName,email,password:hashPassword
        });

        if(newUser){
            // generate the token
            generateToken(newUser._id,res);
            await newUser.save();
            return res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"Invalid User data"
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server error . Please try again later!"
        })
        
    }
}



exports.Login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(201).json({
                success:false,
                message:"Email and Password must be required."
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid User."
            })
        }
        const  isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({
                message:"Invalid Creditianls"
            })
        }

        generateToken(user._id,res);
        
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error. Please try again sometime later!"
        })
    }
}



exports.Logout=async(req,res)=>{
    try{
        res.cookie('token',"",{maxAge:0});
        res.status(200).json({
            success:true,
            message:"Logged out successfully."
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error."
        })
        
    }
}


exports.updateProfile=async(req,res)=>{
    try{
        const {profilePic}=req.body;
        const userId=req.user._id;
        if(!profilePic){
            return res.status(400).json({
                message:"Profile Pic is required",
            })
        }
        const uploadResponse=await cloudinary.uploader.upload(profilePic);
        const updateUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},
            {new:true}
        )
        return res.status(201).json({
            success:true,
            message:"Profile picture updated successfully.",
            updateUser
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server error while updating the profile picture."
        })
    }
}

exports.checkAuth=async(req,res)=>{
    try{
        res.status(200).json(req.user);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}