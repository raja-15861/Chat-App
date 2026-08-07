const express=require('express');
const router=express.Router();
const {Signup,Login,Logout,updateProfile,checkAuth}=require('../controllers/authController');
const {Auth}=require('../middleware/Auth');

router.post('/signup',Signup);

router.post('/login',Login);

router.post('/logout',Logout);


router.put('/update-profile',Auth,updateProfile);

router.get('/check',Auth,checkAuth)
module.exports=router;