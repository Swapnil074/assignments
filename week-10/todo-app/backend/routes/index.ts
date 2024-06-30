const { Router } = require('express')
const userRouter=require('./user')
const todoRouter=require('./todo')


const router=Router()

router.use('/user',userRouter)
router.use('/todo',todoRouter)

module.exports=router;