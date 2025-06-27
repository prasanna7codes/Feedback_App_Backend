import mongoose from 'mongoose';


import dotenv from 'dotenv';


dotenv.config ();

const ConnectDB = async () =>{

    try {

       await mongoose.connect(process.env.MONGODB_URI)
       console.log("mongo db connected");

    }catch(err){
        console.log("MongoDB connection failed",err.message)



    }
}

export default ConnectDB ; 