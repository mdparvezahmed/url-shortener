const e = require('express');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    type:{
        type: String,
        enum: ['free', 'premium'],
        default: 'free'
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);


module.exports = User;