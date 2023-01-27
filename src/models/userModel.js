const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    Email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    Mobile: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    Gender:{
        type:String,
        enum:["Male","Female","Other"],
        require:true
    },
    BirthDate:{
        type:String,
        require:true
    },
    LikesData:[],
    Comments:[],
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);