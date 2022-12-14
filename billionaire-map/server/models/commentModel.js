const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const commentSchema = mongoose.Schema({
    body: String,
    name: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = mongoose.model("Comment", commentSchema) 
