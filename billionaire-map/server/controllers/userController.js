const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

 
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// @desc Register a New User
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    
    // Validation
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please include all fields')
    }

    //Find if User Already Exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User Already Exists')
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    // If Creation of User was Succesful
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new error('Invalid User Data')
    }
})
 
// @desc Register a New User
// @route /api/users/login
// @access Private
const loginUser = asyncHandler( async (req, res) => {   
    const {email, password} = req.body
    
    const user = await User.findOne({email})

    // Check That Passwords Match
    if(user && (await bcrypt.compare(password, user.password))) {
        req.session.set("user", {id: user._id.toString()})
        console.log(req.session)
        await req.session.save()
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Credentials")
    }
})


// @desc Get Current User
// @route /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  if (req.session.get('user') === undefined){
    return res.status(400).send("Unable to Retrieve User")
  }
  const id = req.session.get("user").id
  const user = await User.findById(id)
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id)
})
})

const logoutUser = asyncHandler(async (req, res) => {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send("Unable to logout user")
            } else {
                res.send("Logout Successful")
            }
        })
})

module.exports = {
    registerUser,
    loginUser,
    logoutUser, 
    getMe
}