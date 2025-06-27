import jwt from 'jsonwebtoken'


const authMiddleware = (req,res,next)=>{

    const authHeader = req.headers.authorization;

    //authorization: Bearer eyJhbGciOiJn , looks like this 


      if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }


  const token = authHeader.split(' ')[1];

  try {


    const decoded = jwt.verify(token,process.env.JWT_SECRET);// this will give me userID , bcoz that is what i used for tokenization 

    req.user = decoded; 
    next();

  }catch(err){
    return res.status(401).json({ message: 'Invalid token' });
  }




} 


export default authMiddleware