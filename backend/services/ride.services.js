const rideModel = require('../models/ride.model')
const mapsService  = require('../services/maps.services')
const crypto = require('crypto');
const { sendMessageToSocketid } = require('../socket');

function getOtp(num) {
    const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
    return otp;
    
}

async function getFare (pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }

    // Get the distance and time from the existing mapsService function
    const result = await mapsService.getDistanceTime(pickup, destination);
    const { distanceInKm, travelTimeInMinutes } = result;

    // Convert string values to numbers
    const distanceInKmNumber = parseFloat(distanceInKm.replace(" km", ""));
    const travelTimeInMinutesNumber = parseFloat(travelTimeInMinutes.replace(" minutes", ""));

    // Define the rates in PKR for different vehicle types
    const rates = {
        auto: { perKm: 10, perMinute: 3 },
        car: { perKm: 25, perMinute: 5 },
        motorcycle: { perKm: 5, perMinute: 1 },
    };

    // Calculate fare for each vehicle type
    const fares = {}
    Object.keys(rates).forEach(vehicleType => {
        const rate = rates[vehicleType];
        const distanceFare = rate.perKm * distanceInKmNumber;
        const timeFare = rate.perMinute * travelTimeInMinutesNumber;
        fares[vehicleType] = parseFloat((distanceFare + timeFare).toFixed(2)); // Rounded fare
    });

    return fares;
}

module.exports.getFare = getFare;



module.exports.CreateRide = async ({
     user,  pickup, destination, vehicleType
}) =>{
    if(!pickup || !destination || !vehicleType) {
        throw new Error (" All fields are required")
    }
     
    // calculating fare using getfare function
    const fare = await getFare(pickup,destination,vehicleType)
     
    const CreateRide = rideModel.create({
       user,
       pickup,
       destination,
       vehicleType,
       otp: getOtp(6),
       fare:fare[vehicleType]
    })
    
    return CreateRide;
}

module.exports.confirmRide = async ({
    rideId,
    captain
}) => {
    try{
        await rideModel.findOneAndUpdate({
            _id: rideId,
        }, {
            status: "accepted",
            captain:captain._id
        })
         const ride = await rideModel.findOne({ 
            _id:rideId
         }).populate("user").populate("captain").select("+otp");
        if (!ride) {
            throw new Error("Ride not available");
        }
        return ride;

    }catch(err)
       {
        console.log(err)
    }
    
}


module.exports.rideStarted = async ({
    rideId,
    otp,
    captain
}) => {
    try{
        const ride = await rideModel.findOne({_id:rideId}).populate("user").populate("captain").select("+otp");
        if (!ride) {
            throw new Error("Ride not available");
        }
        if(ride.otp !== otp) {
            throw new Error("Invalid OTP");
        }
        await rideModel.findOneAndUpdate({
            _id: rideId,
        }, {
            status: "ongoing",
        })
        return ride;
    }catch(err)
    {
        console.log(err)
    }

}

module.exports.rideEnd = async({
    rideId,captain
}) =>{
    try{
        await rideModel.findOneAndUpdate({
            _id: rideId,
        }, {
            status: "completed",
        })
        const ride = await rideModel.findOne({ 
            _id:rideId,
            captain:captain._id
         }).populate("user").populate("captain").select("+otp");
        if (!ride) {
            throw new Error("Ride not available");
        }
        return ride;
    }catch(err){
        console.log(err)
    }
}

module.exports.cancelRide = async ({
      rideId
}) => {
    try{
        const ride = await rideModel.findOneAndDelete({
            _id:rideId
        }).populate("user").populate("captain");
        console.log(ride)
        if (!ride) {
            throw new Error("Ride not available");
        }
        return ride;
    }catch(err){
        console.log(err)
    }
}