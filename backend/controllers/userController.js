const jwt = require('jsonwebtoken')

const User = require('../models/userModel');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn:'1d'});
}


const login_user = async (req,res) => {
    const {email, password} = req.body;
    try{
        
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.status(200).json({email,token});
    }catch(error){
        console.log('Login POST Request failed');
        res.status(400).json({error:error.message});
    }
}

const signup_user = async (req,res) => {
    console.log('Trying signup Post request...');
    const {email, password} = req.body;
    try{
        const user = await User.signup(email,password);
        
        const token = createToken(user._id);

        console.log('Post Success');
        res.status(200).json({email,token});
    }catch(error){
        console.log('POST Failed');
        res.status(400).json({error:error.message});
        
    }
};

module.exports = {login_user, signup_user};