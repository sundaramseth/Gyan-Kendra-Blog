import mongoose from "mongoose";
import { type } from "os";

const postScema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
       },
    category:{
        type:String,
        default:'uncategorized'
       },
    postImage:{
        type:String,
        default:'https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg',
       },
    content:{
        type:String,
        required:true
       },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    likes: {
        type: Array,
        default: [],
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
    createdOn:{
        type: Date,
        default:Date.now()
    }
    },{timeStamp:true});

const Post = mongoose.model('Post',postScema);

export default Post;

