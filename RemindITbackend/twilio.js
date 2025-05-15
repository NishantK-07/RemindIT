// const express=require("express");


// const app= express();


const dotenv=require("dotenv")
dotenv.config();

const {getCurrentUserFromToken} = require("./controller/UserController")
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);
const sendsms=async (body)=>{
    const token = req.cookies.jwt;
    const user = await getCurrentUserFromToken(token);  // Ensure it's awaited since it's async

    if (!user.phoneNumber) {
      return res.status(400).json({
        message: "User phone number not found",
        status: "failure",
      });
    }
    let msgOptions={
        from : process.env.TWILIOPHNO,
        to:user.phoneNumber,
        body,
    };
    try {
        const message=await client.messages.create(msgOptions)
        // .create({
        //     to: '+18777804236'
        // })
        // .then(message => console.log(message.sid));
        // console.log(message)
    } catch (error) {
        // console.log(err)
    }
}

sendsms("Your revision task scheduled for today")