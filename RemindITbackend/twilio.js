// const express=require("express");


// const app= express();


const dotenv=require("dotenv")
dotenv.config();


const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);
const sendsms=async (body)=>{
    let msgOptions={
        from : process.env.TWILIOPHNO,
        to:'+919310501448',
        body,
    };
    try {
        const message=await client.messages.create(msgOptions)
        // .create({
        //     to: '+18777804236'
        // })
        // .then(message => console.log(message.sid));
        console.log(message)
    } catch (error) {
        console.log(err)
    }
}

sendsms("hello ji padlo sab")