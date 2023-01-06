const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addPostsSchema = new Schema({
  name:{type:String,required:true},
  location:String,
  likes:Number,
  description:String,
  PostImage:String,
date:String
},{timestamps:true})                                                         
const addPostModel = mongoose.model("Posts", addPostsSchema);
module.exports = addPostModel;