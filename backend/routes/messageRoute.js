const express=require('express');
const { Auth } = require('../middleware/Auth');
const router=express.Router();

const{getUsersForSidebar,getMessages,sendMessage}=require('../controllers/messageController')

router.get('/users',Auth,getUsersForSidebar);
router.get('/:id',Auth,getMessages);
router.post('/send/:id',Auth,sendMessage);


module.exports=router;