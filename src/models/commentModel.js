const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    Comment: {
        type: String
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

module.exports = mongoose.model("Likes", commentSchema)


