const Message=require('../models/messageModel');
const User=require('../models/userModel');
const cloudinary=require('../lib/cloudinary');


exports.getUsersForSidebar=async(req,res)=>{
    try{
        const loggedInUsers=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUsers}}).select("-password");
        return res.status(200).json({
            success:true,
            message:"Users fetched successfully.",
            filteredUsers
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error.Please try again later!"
        })
    }
}

exports.getMessages=async(req,res)=>{
    try{
        const {id:userToChatId}=req.params;
        const myId=req.user._id;
        const messages=await Message.find({
            $or:[
                {senderId:myId,recieverId:userToChatId},
                {senderId:userToChatId,recieverId:myId}
            ]
        })

        return res.status(200).json({
            success:true,
            message:"All messages fetched successfully.",
            messages
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

exports.sendMessage=async(req,res)=>{
    try{
        const {text,image}=req.body;
        const {id:recieverId}=req.params;
        const senderId=req.user._id;
        
        let imageUrl;

        if(image){
            // upload base64 image to cloudinary
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }

        const newMessage=new Message({
            senderId,
            recieverId,
            image:imageUrl,
            text
        })
        await newMessage.save();

        //todo:- realtime functionality goes here->socket.io

        return res.status(201).json({
            success:true,
            message:"New message send successfully",
            newMessage
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error. Please try again later!s"
        })
    }
}