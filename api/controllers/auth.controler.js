import { error } from "console";
import User from "../models/users.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const signup = async(req, res, next)=>{
    const {username, email, password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
       next(errorHandler(400, 'All Fields are required'))
    }

    const hashPassword = bcryptjs.hashSync(password,10);

    const newUser = new User({
        username,
        email,
        password: hashPassword
    });

    try{
        await newUser.save();
        res.json('Signup Successful')
    }
    catch(error){
    next(error);
    }

}