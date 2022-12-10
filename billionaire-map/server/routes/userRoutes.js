const express = require('express')
const router = express.Router()
const {registerUser, loginUser, logoutUser, getMe} = require('../controllers/userController')
const { ironSession } = require("next-iron-session")
 
const session = ironSession({
    cookieName: "user",
    password: process.env.SECRET_COOKIE_PASSWORD
    // if your localhost is served on http:// then disable the secure flag
    // cookieOptions: {
    //   secure: process.env.NODE_ENV === "production",
    //},
  });
 
router.post('/', session, registerUser)
router.post('/login', session, loginUser)
router.post('/delete', session, logoutUser)
router.post('/me', session, getMe)



module.exports = router
