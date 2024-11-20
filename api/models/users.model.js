import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    about:{
        type:String
    },
    location:{
        type:String
    },
    profilePicture:{
        type:String,
        default:"https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png",
    },
    isAdmin:{
        type:Boolean,
        default:true
    }
},{timestamps:true});


const User = mongoose.model('User', userSchema);

export default User;