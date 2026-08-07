const jwt=require('jsonwebtoken');
const User=require('../models/userModel');


exports.Auth=async(req,res,next)=>{
    try{
        const token=req.cookies.token;

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token not found."
            })
        }

        const decode=await jwt.verify(token,process.env.JWT_SECRET);

        if(!decode){
            return res.status(400).json({
                success:false,
                message:"Token is invalid."
            })
        }

        const user=await User.findById(decode.userId).select("-password");

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found."
            })
        }

        req.user=user;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal server error while verifying token. Please try again later!"
        })
    }
}