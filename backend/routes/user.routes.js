const express = require('express')
const router = express.Router()
// requiring express-validator
const {body} = require('express-validator')
// requiring the user controller
const userController = require('../controllers/user.controller')
const Auth =  require('../Auth/Auth')
// creating register route to handle user registration
router.post('/register',[
    body('email').isEmail().trim().withMessage('Enter a valid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('username must be atleast 3 characters long'),
    body('password').isLength({min:6}).withMessage('password must be atleast 6 characters long')
], userController.register)

router.post('/login',
    [
        body('email').isEmail().trim().withMessage('Enter a valid email'), 
        body('password').isLength({min:6}).withMessage('password must be atleast 6 characters long')  
    ],
userController.login)

router.get('/profile',Auth.AuthUser, userController.UserProfile)

router.get('/logout',Auth.AuthUser,userController.logout)
 
module.exports = router 