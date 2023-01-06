const express = require('express')
const postRoutes = require("./routes/posts")
const app = express()
const bodyParser = require("body-parser");
const port = 3004
app.use(express.urlencoded());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const mongoose = require('mongoose');
const cors = require("cors")
mongoose.connect(
    "mongodb+srv://lalatendu_14:Liku2324@cluster0.cb2danw.mongodb.net/realestateproject?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("successfully connected to db");
    },
    (err) => {
        console.log(err);
    }
);
app.use(cors({
    origin: "*"
}))
app.use("/posts", postRoutes)
app.get("/", (req, res) => {
    res.send("welcome to home page")
})
app.listen(port, () => console.log(`App listening on port ${port}!`))
module.exports = app;   
// var cloudinary = require('cloudinary').v2;
// const dotenv=require('dotenv')
// var path = require('path');
// const {v4}=require("uuid");
// const fs =require("fs")

// const methodoverride = require("method-override")

// app.use(methodoverride('_method'))
// Parse JSON bodies (as sent by API clients)

// app.use(express.static('images'))
// const multer=require("multer");
// const fileUpload = require("express-fileupload")
// const upload=multer({dest:"images"})


// app.use(fileUpload({
//     useTempFiles:true
// }))
// cloudinary.config({
//     cloud_name:"dgi111dfx",
//     api_key:"824257723988796",
//     api_secret:"21AwblGpCzNsbbYaNOduOYITjg4"
// })



// if (typeof (process.env.CLOUDINARY_URL) === 'undefined') {
//     console.warn('!! cloudinary config is undefined !!');
//     console.warn('export CLOUDINARY_URL or set dotenv file');
//   } else {
//     console.log('cloudinary config:');
//     console.log(cloudinary.config());
//   }

