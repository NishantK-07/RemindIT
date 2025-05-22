const mongoose =require("mongoose");
const cors = require('cors');
const express=require("express");


const app= express();


const dotenv=require("dotenv")
dotenv.config();
const dblink=`mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.xznlp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dblink).then(function(connection){
        console.log("connected sucesfully to db ")
    }).catch(err=>{
        console.log(err)
    })


app.use(express.json());
const cookieparser=require("cookie-parser")
app.use(cookieparser())



const corsConfig = {
  origin:process.env.Frontend_url || true,
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization','X-Requested-With','X-HTTP-Method-Override','Accept'], // Allowed headers
  credentials:true
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));


const AuthRouter=require("./router/AuthRouter")
app.use("/api/auth",AuthRouter)


const UserRouter = require("./router/UserRouter");
app.use("/api/user", UserRouter);

const Notesrouter= require("./router/NotesRouter");
app.use("/api/notes",Notesrouter)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});