const express = require('express');
require('../db')
const router = express.Router()   
const User = require('../Models/userModel')
router.use(express.json())
const {registerController,loginController} =require('../controllers/authController')
// const {requireSignIn,isAdmin} = require('../middleware/authMiddleware')


router.post('/register',registerController)

router.post('/login',loginController)


module.exports = router