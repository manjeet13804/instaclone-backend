const express = require('express')
var cloudinary = require('cloudinary').v2;
const dotenv=require('dotenv')
var path = require('path');
const {v4}=require("uuid");
const fs =require("fs")
const methodoverride = require("method-override")
const app = express()
const bodyParser = require("body-parser");
const port = 3004
app.use(express.urlencoded());
app.use(methodoverride('_method'))
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('images'))
const multer=require("multer");
const cors=require("cors")
const fileUpload=require("express-fileupload")
const upload=multer({dest:"images"})

app.use(cors({
    origin:"*"
}))
app.use(fileUpload({
    useTempFiles:true
}))
cloudinary.config({
    cloud_name:"dgi111dfx",
    api_key:"824257723988796",
    api_secret:"21AwblGpCzNsbbYaNOduOYITjg4"
})
const user = [
    {
        "name": "Siva",
        "location": "Bengaluru",
        "likes": 64,
        "description": "Kick start your career",
        "PostImage": "https://res.cloudinary.com/dgi111dfx/image/upload/v1668923025/10x_efkwgc.png",
        "date": "12/02/2022"
    },
    {
        "name": "Neeraj",
        "location": "Pune",
        "likes": 30,
        "description": "Sample Description",
        "PostImage": "https://res.cloudinary.com/dgi111dfx/image/upload/v1668923026/nature_ozyxms.jpg",
        "date": "15/05/2022"
    },
    {
        "name": "Rahul",
        "location": "Hyderabad",
        "likes": 30,
        "description": "Sample Description for Post",
        "PostImage": "https://res.cloudinary.com/dgi111dfx/image/upload/v1668923025/flight_wtivqr.webp",
        "date": "10/06/2022"
    }
]

app.get("/user",(req,res)=>{
    res.status(200).json({
        user:user
    })
})
if (typeof (process.env.CLOUDINARY_URL) === 'undefined') {
    console.warn('!! cloudinary config is undefined !!');
    console.warn('export CLOUDINARY_URL or set dotenv file');
  } else {
    console.log('cloudinary config:');
    console.log(cloudinary.config());
  }
app.post("/user",
(req,res)=>{
    
    const {name,location,description}=req.body;
    const files=req.file.PostImage
    cloudinary.uploader.upload(files.useTempFiles,(err,result)=>{
        console.log(result)
    })
    const newPost={
        name,
        location,
        likes:0,
        description,
        PostImage:req.file.path,
        date:new Date()
    }
   user.unshift(newPost)
   res.send({
       success:true,
      
   })   
}
)
app.set("views", "./views");
app.set("view engine", "ejs");
app.listen(port, () => console.log(`App listening on port ${port}!`))
module.exports = app;   
