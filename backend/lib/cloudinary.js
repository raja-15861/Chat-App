const cloudinary=require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    API_SECRET:process.env.API_SECRET
})


module.exports=cloudinary;