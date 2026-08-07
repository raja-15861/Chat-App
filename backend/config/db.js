const mongoose=require('mongoose');


const db=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Server is connected with Database successfully.")
    }).catch((err)=>{
        console.log(err);
        console.log('Somthing went wrong while connecting to Database');
        process.exit(0);
    })
}

module.exports=db;