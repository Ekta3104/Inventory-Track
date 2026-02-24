const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:["admin","employee"],
        default:"employee"
    },
    otp:String,
    otpExpire:Date,
    resetToken:String,
    resetExpire:Date

})

module.exports=mongoose.model("User",userSchema)