const express = require('express')
const router = express.Router()
const { createComment, deleteComment } = require('../controllers/commentController')


router.post('/', createComment)
router.delete('/:commentId', deleteComment)

module.exports = router 