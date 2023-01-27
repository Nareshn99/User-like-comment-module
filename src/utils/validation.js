const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const phoneRegex = /^[6-9]{1}[0-9]{9}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,15}$/
const nameRegex = /^[a-z A-Z]*$/
const mongoose = require("mongoose")


const isValidName = (data) => {
    if (typeof data == "string" && data.trim().length !== 0 && nameRegex.test(data.trim())) return true
    return false
}
const isValidMobile = (data) => {
    if (typeof data == "string" && data.trim().length !== 0 && phoneRegex.test(data.trim())) return true
    return false
}

const isValidEmail = (data) => {
    if (typeof data == "string" && data.trim().length !== 0 && emailRegex.test(data.trim())) return true
    return false
}

const isValidPassword = (data) => {
    if (typeof data == "string" && data.trim().length !== 0 && passwordRegex.test(data.trim())) return true
    return false
}

const isValidBirthDate= (data) => {
    if (typeof data == "string" && /\d{2}-\d{2}-\d{4}/.test(data)) return true
    return false
}

const isValidObjectId = (data) => {
    if (mongoose.Types.ObjectId.isValid(data)) return true
    return false
}


const isValidGender = (data) => {
    let arr = ["Male","Female","Other"]
    if (typeof data == "string" && data.trim().length !== 0 && arr.includes(data.trim())) return true
    return false
}

const isValidBody = function (data) {
    return Object.keys(data).length > 0;
};



module.exports = {
   isValidEmail, isValidMobile,isValidBirthDate, isValidPassword, isValidObjectId, isValidName, isValidGender,isValidBody
}