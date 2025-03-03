const express = require('express')
const router  =express.Router()
const {body,query} = require('express-validator')
const Auth = require("../Auth/Auth")
const rideController = require('../controllers/ride.controller')

router.post('/create',
    Auth.AuthUser,
    body('pickup').isString().isLength({min:3}).withMessage("enter valid address"),
    body('destination').isString().isLength({min:3}).withMessage("enter valid address"),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('invalid vehicle type'),
    rideController.createRide
)

router.get('/get-fare',
    Auth.AuthUser,
    query('pickup').isString().isLength({min:3}).withMessage("enter valid address"),
    query('destination').isString().isLength({min:3}).withMessage("enter valid address"),
    rideController.getFare
    
)

router.post('/confirm-ride',
    Auth.AuthCaptain,
    body('rideId').isMongoId().withMessage('invalid ride id'),
    rideController.confirmRide
)

router.get('/ride-started',
    Auth.AuthCaptain,
    query('rideId').isMongoId().withMessage('invalid ride id'),
    query('otp').isString().isLength({min:3}).withMessage('invalid otp'),
    rideController.rideStarted
)
router.post('/ride-end',
    Auth.AuthCaptain,
    body('rideId').isMongoId().withMessage('invalid ride id'),
    rideController.rideEnd
)

router.post('/cancel-ride',
    Auth.AuthCaptain,
    body('rideId').isMongoId().withMessage('invalid ride id'),
    rideController.cancelRide
)
module.exports = router