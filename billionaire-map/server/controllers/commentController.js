const Billionaire = require('../models/billionaireModel')
const Comment = require('../models/commentModel')
const asyncHandler = require('express-async-handler')

const createComment = asyncHandler(async (req, res) => {
    
    
    const billionaire = await Billionaire.findById(req.body.params.billionaire._id);
    const comment = new Comment(req.body.params.comment);
    billionaire.comments.push(comment);
    await comment.save();
    await billionaire.save();
    res.status(200).send("Comment Posted")
})


const deleteComment = asyncHandler(async (req, res) => {
    console.log("params", req.params)
    const { id, commentId } = req.params
    await Billionaire.findByIdAndUpdate(id, {$pull: { comments: commentId}})
    await Comment.findByIdAndDelete(commentId);
    res.status(200).send("Comment Deleted")
})

module.exports = {
    createComment,
    deleteComment
}