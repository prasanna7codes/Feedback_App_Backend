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

//to delete the feedback owned by that user 
  router.delete('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findOne({ _id: req.params.id, user: req.user.userId });
    if (!feedback) return res.status(404).json({ message: 'Feedback not found or unauthorized' });

    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});