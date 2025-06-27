import { Router } from "express";

import Feedback from "../models/Feedback";

import authMiddleware from "../middleware/authMiddleware";

const router = Router ();
router.use(authMiddleware)


router.post('/', async (req,res)=>{

    const message = req.body.message;
    const user = req.user.userId

    try{
        
        const feedback = await Feedback.create ({message,user});
        res.status(201).json(feedback);


    }
    catch(err){
        res.status(500).json({message:err.message})
    }
  })


  router.get("/", async (req,res)=>{

    try{
        const user = req.user.userId;

    const feedbacks = await Feedback.find({user})

    res.json(feedbacks);

    }catch(err){
         res.status(500).json({ message: err.message });
    }
    
  })