const asyncHandler = require('express-async-handler')
const Billionaire = require('../models/billionaireModel')

// Get Billionaires
//@route GET /api/billionaires
const getBillionaires = asyncHandler(async (req, res) => {
    const query = {"country": req.query.country}
    const billionaires = await Billionaire.find({country: req.query.country})

    if(billionaires){
        return res.status(200).json({billionaires})
    } else {
        res.status(400)
        throw new error("No Billionaires Here")
    }
})

const getAllBillionaires = asyncHandler(async (req, res) => {
    const billionaires = await Billionaire.find()

    if(billionaires){
        return res.status(200).json({billionaires})
    } else {
        res.status(400)
        throw new error("No Billionaires Here")
    }
})

module.exports = {
    getBillionaires,
    getAllBillionaires
}
  