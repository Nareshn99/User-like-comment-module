const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    isLike: {
        type: Boolean,
        default: false
    },
    LikedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

module.exports = mongoose.model("Like", likesSchema)