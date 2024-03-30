const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://swapnil:esXpcdLC9eIcQ5fa@cluster0.nkdjgy8.mongodb.net/paytm-basic')

const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,
})
const accountSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:'true'
    },
    balance:{
        type:Number,
        required:true
    }
})


const User=mongoose.model('User', userSchema)
const Account=mongoose.model('Account',accountSchema)

module.exports={User,Account}

