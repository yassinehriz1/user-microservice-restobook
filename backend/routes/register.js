const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user.model")
const bycrpt = require("bcryptjs");



const router = express.Router();


router.post('/register',async (req,res,next)=>{
    const { username , password , email } = req.body;

    try{
        const hashedPassword = await bycrpt.hash(password, 10);
        const newUser = new User({
            username : username,
            email : email,
            password : hashedPassword,
        })
        await newUser.save();
        res.json({ message: 'Registration successful!' });

    } catch(err){
        next(err);
    }
    
})

module.exports = router;