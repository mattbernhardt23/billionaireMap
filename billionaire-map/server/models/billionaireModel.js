const mongoose = require('mongoose')
const Schema = mongoose.Schema

const billionaireSchema = mongoose.Schema({
        country: String,
        city: String,
        person: {
            name: String,
            imageExists: Boolean
        },
        category: String,
        industries: Array,
        source: String,
        finalWorth: Number,
        birthDate: Date,
        age: Number,
        bios: Array,
        squareImage: String,
        geoLocation: {
            lat: Number,
            lng: Number
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
},
{
    timestamps: true,
})

module.exports = mongoose.model("Billionaire", billionaireSchema)