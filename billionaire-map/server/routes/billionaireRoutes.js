const express = require('express')
const router = express.Router()
const { getBillionaires } = require('../controllers/billionaireController')


router.get('/', getBillionaires)

module.exports = router  