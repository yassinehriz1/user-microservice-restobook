const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function (next) {
    const user = this;
    if(!user.isModified('passowrd')){
        return next();
    }
    try {
        
        const salt = bcrypt.genSalt();
        user.password = bcrypt.hash(this.password, salt);
        next();
    } catch(err) {
        return next(err)
    }
})


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;