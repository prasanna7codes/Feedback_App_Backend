import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";

const router = Router();

//signup

router.post('/register',async(req,res)=>{
    const {name,email,password} = req.body;

    try{

      const exists = await User.findOne({email});
      if(exists)
        return res.status(400).json({ message: "User already exists" });


    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({name,email,password:hashed})


    return res.status(201).json({message:"signed up successfulyy"})
    
    }catch(err){
        console.status(500).error("error is",err.message)
    }


});


//login 
router.post('/login',async(req,res)=>{

    try{

    const {email,password}=req.body;
    
    const user = await User.findOne({email});

    if(!user){
        return res.json({message:"user does not exist"}).status(400);
    }

        const matched = await bcrypt.compare(password,user.password);
        if(!matched){
            return res.json({message:"Invalid password"}).status(400);  
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
        //I could have done res.json{token,user}, but it will expose my password to the frontend also , bcoz I will be giving the entire dat au get from my database  


        }catch(err){
            console.error("the error is ", err.message).status(500)
        }

});


export default router ;
