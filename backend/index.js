const express=require('express');

const app=express();
const dotenv=require('dotenv');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const authRoute=require('./routes/authRoute');
const messageRoute=require('./routes/messageRoute');

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:['http://localhost:5173','https://chat-app-one-umber-68.vercel.app'],
    credentials:true
}));

// routes configuration
app.use('/auth/api',authRoute);
app.use('/message/api',messageRoute);
// database config
const db=require('./config/db');
db();


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is listening to the PORT ${PORT}`)
})
