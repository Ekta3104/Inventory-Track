const express=require("express")
const{register,login, forgotPassword,resetPassword}=require("../controllers/authController")
const router=express.Router() //router is created


router.post("/register",register) //post api created,when /register get post request it will call register function
router.post("/login",login)
router.post("/forgot-password",forgotPassword)
router.post("/reset-password/:token",resetPassword)

module.exports=router//router module is exported so that it can be used in server.js

//Client (frontend / Postman) request पाठवतो

//Request router कडे येते (/register किंवा /login)

//Router controller मधील function call करतो

//Controller DB, validation, JWT वगैरे काम करतो

//Response परत client ला जातो