const userModel = require('../models/userModel');
const likeModel = require('../models/likesModel');
const commentModel = require('../models/commentModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { isValidBody, isValidGender, isValidEmail, isValidMobile, isValidBirthDate, isValidPassword, isValidName } = require('../utils/validation')


const createUser = async (req, res) => {
    try {
        let { Name, Email, Mobile, password, Gender, BirthDate } = req.body
        //validation for emptyBody
        if (!isValidBody(req.body)) {
            return res.status(400).send({ status: false, message: "Please Enter Some Input" });
        }
        if (!Name) {
            return res.status(400).send({ status: false, message: "Name Is Mandatory " });
        }
        if (!isValidName(Name)) {
            return res.status(400).send({ status: false, message: "Name should be alphabatical Order And String only" });
        }
        if (!Gender) {
            return res.status(400).send({ status: false, message: "Gender Is Mandatory " });
        }
        if (!isValidGender(Gender)) {
            return res.status(400).send({ status: false, message: "Gender should be Male,Female,Other only" });
        }
        //validation for email
        if (!Email) {
            return res.status(400).send({ status: false, message: "Email Is Mandatory " });
        }
        if (!isValidEmail(Email)) {
            return res.status(400).send({ status: false, message: "Invalid Email" });
        }
        //validation for Mobile 
        if (!Mobile) {
            return res.status(400).send({ status: false, message: "Mobile Is Mandatory" });
        }
        if (!isValidMobile(Mobile)) {
            return res.status(400).send({ status: false, message: "Invalid Mobile" });
        }
        //validation for Birth Date
        if (!BirthDate) {
            return res.status(400).send({ status: false, message: "BirthDate Is Mandatory" });
        }
        if (!isValidBirthDate(BirthDate)) {
            return res.status(400).send({ status: false, message: "Invalid BirthDate" });
        }
        // Check for the uniqueness of Email and Mobile
        let user = await userModel.find({ $or: [{ Email }, { Mobile }] })
        for (let key of user) {
            if (key.Email == Email.trim().toLowerCase()) {
                return res.status(409).send({ status: false, message: "Given Email is already taken" })
            }
            if (key.Mobile == Mobile) {
                return res.status(409).send({ status: false, message: "Given Mobile is already taken" })
            }
        }
        //validation for password
        if (!password) {
            return res.status(400).send({ status: false, message: "password Is Mandatory" });
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, message: "Weak Password,Minimum eight and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character" })
        }
        //bcrypt password
        const hashedPassword = await bcrypt.hash(password, 10)
        //create document
        let dataCreted = { Name, Gender, Email, Mobile, BirthDate }
        dataCreted.password = hashedPassword
        let data = await userModel.create(dataCreted)
        return res.status(201).send({ status: true, message: "User created successfully", data: data });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}



const login = async (req, res) => {
    try {
        let data = req.body;
        let { Email, password } = data

        //validation for emptyBody
        if (!isValidBody(req.body)) {
            return res.status(400).send({ status: false, message: "Please Enter Some Input" });
        }
        //validation for Email
        if (!Email) {
            return res.status(400).send({ status: false, message: "Email Is Mandatory " });
        }
        if (!isValidEmail(Email)) {
            return res.status(400).send({ status: false, message: "Invalid Email" });
        }
        //validation for password
        if (!password) {
            return res.status(400).send({ status: false, message: "password Is Mandatory" });
        }
        //find user from dataBase
        let user = await userModel.findOne({ Email });
        if (!user) {
            return res.status(404).send({ status: false, message: "User not found" });
        }
        let correctPass = await bcrypt.compare(password, user.password)
        if (!correctPass) {
            return res.status(400).send({ status: false, message: "Invalid Password" });
        }
        let userId = user._id;
        const token = jwt.sign({ userId: userId }, "narshdnfjdfnfvnfn", { expiresIn: "1d" });
        res.status(200).send({ status: true, message: "User logged in successfully", data: { userId: userId, token } });
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};




const getUser = async (req, res) => {
    try {
        const userId = req.param.userId
        let findUser = await userModel.findById(userId)
        return res.status(200).send({ status: true, message: "Users profile details", data: findUser })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        let userId = req.param.userId
        let { Name, Email, Mobile, password, Gender, BirthDate } = req.body
        //validation for emptyBody
        if (!isValidBody(req.body)) {
            return res.status(400).send({ status: false, message: "Please Enter Some Input" });
        }
        if (Name) {
            if (!Name) {
                return res.status(400).send({ status: false, message: "Name Is Mandatory " });
            }
            if (!isValidName(Name)) {
                return res.status(400).send({ status: false, message: "Name should be alphabatical Order And String only" });
            }
        }
        if (Gender) {
            if (!Gender) {
                return res.status(400).send({ status: false, message: "Gender Is Mandatory " });
            }
            if (!isValidGender(Gender)) {
                return res.status(400).send({ status: false, message: "Gender should be Male,Female,Other only" });
            }
        }
        //validation for email
        if (Email) {
            if (!Email) {
                return res.status(400).send({ status: false, message: "Email Is Mandatory " });
            }
            if (!isValidEmail(Email)) {
                return res.status(400).send({ status: false, message: "Invalid Email" });
            }
            let user = await userModel.findOne({ Email })
            if (user) {
                return res.status(409).send({ status: false, message: "Given Email is already taken" })
            }
        }
        //validation for Mobile 
        if (Mobile) {
            if (!Mobile) {
                return res.status(400).send({ status: false, message: "Mobile Is Mandatory" });
            }
            if (!isValidMobile(Mobile)) {
                return res.status(400).send({ status: false, message: "Invalid Mobile" });
            }
            let user = await userModel.findOne({ Mobile })
            if (user) {
                return res.status(409).send({ status: false, message: "Given Mobile is already taken" })
            }
        }
        //validation for Birth Date
        if (BirthDate) {
            if (!BirthDate) {
                return res.status(400).send({ status: false, message: "BirthDate Is Mandatory" });
            }
            if (!isValidBirthDate(BirthDate)) {
                return res.status(400).send({ status: false, message: "Invalid BirthDate" });
            }
        }
        //validation for password
        if (password) {
            if (!isValidPassword(password)) {
                return res.status(400).send({ status: false, message: "Weak Password,Minimum eight and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character" })
            }
            //bcrypt password
            var hashedPassword = await bcrypt.hash(password, 10)
            req.body.password = hashedPassword
        }
        //create document
        let data = await userModel.findOneAndUpdate({ _id: userId }, { $set: { ...req.body } }, { new: true })
        return res.status(200).send({ status: true, message: "User Updated successfully", data: data });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}




const like = async (req, res) => {
    try {
        const LikedBy = req.params.userId
        const onLike = req.query.User
        const likes = req.query.isLike


        let likeDoc = await likeModel.create({ isLike: likes, LikedBy })

        if (likes) {
            let update = await userModel.findOneAndUpdate({ _id: onLike }, { $push: { LikesData: likeDoc } }, { new: true });
            if (!update) {
                return res.status(404).send({ status: false, message: "user is not found " })
            }
            return res.status(201).send({ status: true, message: "Success", data: update })
        }

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}



const comment = async (req, res) => {
    try {
        const CommentBy = req.param.userId
        const onComment = req.body.User
        const Comment = req.body.Comment
         
        let user=await userModel.findOne({_id:onComment})
        if(user.Comments.createdBy===CommentBy){
            return res.status(400).send({ status: false, message: "You Already Add One Comment" })
        }

        let addComment = await commentModel.create({ Comment, createdBy: CommentBy })
        if (Comment) {
            let update = await userModel.findOneAndUpdate({ _id: onComment }, { $push: { Comments: addComment } }, { new: true });
            if (!update) {
                return res.status(404).send({ status: false, message: "user is not found " })
            }
            return res.status(201).send({ status: true, message: "Success", data: update })
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}




const mongoose=require('mongoose')
const getUserData = async (req, res) => {
    try {
        let data1=await userModel.aggregate([
            {$match:{}},
            {$group: {
                _id:"$Name",
                likeCount: {$sum:{$size:"$LikesData"}}
            }}
        ])

        return res.status(200).send({ status: true, message: "Users Likes Count", data: data1 })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = {
    createUser,
    login,
    getUser,
    updateUser,
    like,
    comment,
    getUserData
}