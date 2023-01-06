const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const Posts = require("../models/posts")
router.use(express.urlencoded());
const cors = require("cors")
router.use(bodyParser.json())
const methodoverride = require("method-override")
router.use(methodoverride('_method'))
router.use(cors({
    origin: "*"
}))
router.get("/", async (req, res) => {
    try {
        const user = await Posts.find()
        res.status(200).json({
            success: true,
            user: user
        })
        res.send("welcome to user page")
    } catch (e) {
        res.status(400).json(e.message)
    }
})
router.post("/", async (req, res) => {
    console.log(req.body)
    // const {name,location,description}=req.body;
    // const files=req.file.PostImage
    // cloudinary.uploader.upload(files.useTempFiles,(err,result)=>{
    //     console.log(result)
    // })
    // 
    const newPost = await Posts.create({
        name: req.body.name,
        location: req.body.location,
        likes: req.body.likes,
        description: req.body.description,
        PostImage: req.body.PostImage,
        date: req.body.date
    })
    res.json({
        message: "success",
        newPost: newPost
    })
})
router.delete("/", async (req, res) => {
    try {
        const deleted = await Posts.deleteMany()
        res.json({
            message: "success",
            deleted
        })
    } catch (err) {
        console.log(err)
    }
})
module.exports = router