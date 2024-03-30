const {Router}=require('express')
const zod=require('zod')
const {authMiddleware}=require('../middleware/index')
const { Account } = require('../db')
const { default: mongoose } = require('mongoose')
const router=Router()

const balanceBody=zod.object({
    balance:zod.number()
})

router.get('/balance',authMiddleware,async(req,res)=>{
    const userId=req.userId
    const account=await Account.findOne({
        userId:userId
    })
    res.status(200).json({
        balance: account.balance
    })
})
router.post('/transfer',authMiddleware,async(req,res)=>{
    const userId=req.userId
    const session=await mongoose.startSession()
    session.startTransaction()
    const {amount, to}=req.body
    const account=await Account.findOne({
        userId:userId
    }).session(session)

    if(!account || account.balance<amount){
        await session.abortTransaction()
        return res.status(400).json({
            	message: "Insufficient balance"
        })
    }
    const toAccount=await Account.findOne({
        userId:to
    }).session(session)
    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Invalid account"
        })
    }
    await Account.updateOne({userId:userId},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)
    await session.commitTransaction()
    res.json({
        message: "Transfer succesful"
    })
})

module.exports=router
