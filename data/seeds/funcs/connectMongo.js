const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const mongoUrl = process.env.MONGO_URI

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoUrl)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

module.exports = connectDB
