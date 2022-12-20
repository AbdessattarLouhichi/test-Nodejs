const User = require('../models/authentication');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Register new user
exports.register = async (req,res)=>{
    try {
        const {email,password} = req.body
           
        // Check if user exists
        const found = await User.findOne({email : email})
       
        if (found){
            res.status(400).json({message : 'Email is already  used'})
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        // save user 
        const newUser = await User.create(req.body);
        console.log(password , hashedPassword)
        res.status(201).json(newUser)

    } catch (error) {
        res.status(500).json({message : 'Server Error'})
    }
    
}

// login user
exports.login = async (req,res)=>{
    try {
       const {email, password} = req.body;

       // find user
        const user = await User.findOne({email : email})
       
        if(!user){
           return res.status(400).json({message : "user does not exist"})
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){return res.status(400).json({message : "check your email or your password!"})};
        
        // generate user token
        const data={
            userId : user._id,
            userEmail:user.email
        }
        const token = jwt.sign(data,secret, {expiresIn : '1h'});


        return res.status(200).json({user : user, token : token});

    } catch (error) {
        res.status(500).json({message :"Server Error"})
    }
}