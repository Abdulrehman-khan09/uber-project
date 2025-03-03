const rideService = require('../services/ride.services')
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.services')
const {sendMessageToSocketid} = require('../socket')
const userModel = require('../models/user.models');
const rideModel = require('../models/ride.model');

module.exports.createRide = async(req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

   const { pickup , destination , vehicleType} = req.body

   if(!pickup || !destination || !vehicleType) {
    throw new Error (" All fields are required")
}
    try {
        const ride = await rideService.CreateRide({
            user:req.user._id,
            pickup,
            destination,
            vehicleType,
        })
         res.status(200).json(ride)

        // modification for sending ride to socket to find appropriate drivers according to pickup
        const pickupCoordinates = await mapService.getCoordinates(pickup)
        const captainsInRadius = await mapService.getCaptainsInRadius(pickupCoordinates.lon,pickupCoordinates.lat,300)
        // getting data of user requesting for ride
        const rideWithUser = await rideModel.findOne({_id:ride._id}).populate("user")
        // sending ride to all captains in radius
        ride.otp = ''
        captainsInRadius.map(captain => {
            sendMessageToSocketid(captain.socketId,{
                event:'new-ride',
                data:rideWithUser
            })
        })

    }catch(err){
           throw new Error (err.message)
    }
}

module.exports.getFare = async (req, res) => {     
    if (!req.query || Object.keys(req.query).length === 0) {         
        return res.status(400).json({ error: "Query parameters are missing" });     
    }      

    const errors = validationResult(req);     
    if (!errors.isEmpty()) {         
        return res.status(400).json({ errors: errors.array() });     
    }      

    try {         
        const { pickup, destination } = req.query;          

        if (!pickup || !destination) {             
            return res.status(400).json({ error: "Pickup and destination are required" });         
        }          

        const fare = await rideService.getFare(pickup, destination);      
           
        return res.status(200).json({ fare });     

    } catch (error) {         
        return res.status(500).json({ error: error.message });     
    } 
};

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body

    if(!rideId) {
        throw new Error (" All fields are required")
    }
    try {
        const ride = await rideService.confirmRide({
            rideId,
            captain:req.captain
        })
        res.status(200).json(ride)

        sendMessageToSocketid(ride.user.socketId,{
            event:'ride-confirmed',
            data:ride
        })

    }catch(err){
        console.log(err)
    }
}

module.exports.rideStarted = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query

    if(!rideId || !otp) {
        throw new Error (" All fields are required")
    }
    try {
        const ride = await rideService.rideStarted({
            rideId,
            otp,
            captain:req.captain
        })
        res.status(200).json(ride)
        sendMessageToSocketid(ride.user.socketId,{
            event:'ride-started',
            data:ride
        })

    }catch(err){
        console.log(err)
    }
}


module.exports.rideEnd = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {rideId} = req.body
    try{
        const ride = await rideService.rideEnd({rideId,captain:req.captain})
        res.status(200).json(ride)

        sendMessageToSocketid(ride.user.socketId,{
            event:'ride-ended',
            data:ride
        })

    } catch(err){
        console.log(err)
    }
}  

module.exports.cancelRide = async (req, res) => {
    try{
        const {rideId} = req.body
         console.log(rideId)
        const ride = await rideService.cancelRide({rideId})

        res.status(200).json(ride)

        sendMessageToSocketid(ride.user.socketId,{
            event:'ride-cancelled',
            data:ride
        })
    } catch(err){
        console.log(err)
    }
}
