const express = require('express')
const Auth = require('../Auth/Auth')
const router = express.Router()
const mapsController = require("../controllers/maps.controller")
const {query} = require('express-validator')

router.get('/get-coordinates',
    Auth.AuthUser,
    query('address').isString().isLength({min:3}).withMessage('Enter valid address'),
    mapsController.getCoordinates)

router.get('/get-distance-time',
    Auth.AuthUser,
    query('pickup').isString().isLength({min:3}).withMessage('Enter valid address'),
    query('destination').isString().isLength({min:3}).withMessage('Enter valid address'),
    mapsController.getDistanceTime)

router.get('/get-suggestions',
    Auth.AuthUser,
    mapsController.getSuggestions)



module.exports = router