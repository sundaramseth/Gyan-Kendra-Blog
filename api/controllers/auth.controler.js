import User from "../models/users.model.js";
import bcryptjs from 'bcryptjs'

export const signup = async(req, res)=>{
    const {username, email, password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return res.status(400).json({message:'All fields are reuired'})
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
     console.log(error);
    }

}