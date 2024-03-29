const jwt=require('jsonwebtoken')
const JWT_SECRET=require('../config')
const authMiddleware=(req,res,next)=>{
    const authHeader=req.header.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({})
    }
    const token=authHeader.split('')[1]
    try{
        const data=jwt.verify(token,JWT_SECRET)
        req.userId=data.userId
        next()
    }catch(err){
        return res.status(403).json({})

    }

}
module.exports={authMiddleware}