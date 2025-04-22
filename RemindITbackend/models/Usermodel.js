const mongoose =require("mongoose");

const Schemarules={
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: function (v) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
        },
    },
    password:{
        type:String,
        required:true,
        minLenght:[10,"legth should be atleast 10"],
    },
    confirmPassword:{
        type:String,
        required:true,

        validate: [function(){
            return this.password==this.confirmPassword;
        },"password should be equal to confirmpassword"]
    },
    phoneNumber: {
        type: String,
        required: true, // If each reminder is tied to a phone number
        validate: {
            validator: function (v) {
              return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 format for Twilio
            },
         },
      },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
   
    otp:{
        type:String,
    },
    otpExpiry:{
        type:Date
    }
}


const UserSchema = new mongoose.Schema(Schemarules)


UserSchema.pre("save", async function(next){
    const user = this;
    const password = user.password;
    const confirmPassword = user.confirmPassword;
    if (password == confirmPassword) {

    next()
    } else {
        const err = new Error("Password and confirmPassword are not the same ")
        next(err)
    }
})


const UserModel= mongoose.model("RemindUser",UserSchema);

module.exports= UserModel;