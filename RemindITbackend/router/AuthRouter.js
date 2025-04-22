const express=require("express")

const {signuphandler,loginhandler,profilehandler,logouthandler,forgethandler,resethandler}=require("../controller/AuthController")


const AuthRouter=express.Router();

AuthRouter.patch("/forgetpassword",forgethandler)
AuthRouter.patch("/resetpassword/:userId",resethandler)
AuthRouter.post("/login",loginhandler);
AuthRouter.post("/signup",signuphandler);

AuthRouter.get("/profile",profilehandler)
AuthRouter.post("/logout",logouthandler)


module.exports= AuthRouter