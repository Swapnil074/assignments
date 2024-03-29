const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://swapnil:esXpcdLC9eIcQ5fa@cluster0.nkdjgy8.mongodb.net/paytm-basic')

const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,
})

const User=mongoose.model('User', userSchema)

module.exports({User})

