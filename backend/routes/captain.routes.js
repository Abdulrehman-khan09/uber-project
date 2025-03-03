const express = require('express');
const router = express.Router();
const { body } = require('express-validator');``
const captainController = require('../controllers/captain.controller');
const Auth = require('../Auth/Auth')

router.post('/register',  
  [
    body('email').isEmail().trim().withMessage('Enter a valid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('username must be atleast 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('password must be atleast 6 characters long'),
    body('vehicle.carColor').isLength({ min: 3 }).withMessage('car color must be atleast 3 characters long'),
    body('vehicle.carPlate').isLength({ min: 3 }).withMessage('Plate number must be atleast 3 characters long'),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage('Capacity must be atleast 1'),
  ],
    captainController.registerCaptain
)

router.post('/login',[
   
  body('email').isEmail().trim().withMessage('Enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('password must be atleast 6 characters long'),
],
   captainController.loginCaptain)

router.get('/profile', Auth.AuthCaptain ,captainController.getProfile)

router.get('/logout', Auth.AuthCaptain ,captainController.LogoutCaptain)

module.exports = router;