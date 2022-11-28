const asyncHandler = require('express-async-handler')
const Billionaire = require('../models/billionaireModel')

// Get Billionaires
//@route GET /api/billionaires
const getBillionaires = asyncHandler(async (req, res) => {
    const query = {"country": req.query.country}
    console.log(req.query.country)
    const billionaires = await Billionaire.find({country: req.query.country})
    return res.status(200).json({billionaires})
})

module.exports = {
    getBillionaires,
}
