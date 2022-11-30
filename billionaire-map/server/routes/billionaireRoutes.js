const express = require('express')
const router = express.Router()
const {
    getBillionaires
} = require('../controllers/billionaireController')

const { protect } = require('../middleware/authMiddleware')


// If we decide to protect routes
//router.route('/').get(protect, getBillionaires)

router.route('/').get(getBillionaires)

module.exports = router