const mongoose = require('mongoose');
const CaptainModel = require('../models/captain.model')

module.exports.CreateCaptain =  async ({
    firstname,lastname,email,password,carColor,carPlate,capacity,vehicleType
   })=>{
    if (!firstname || !lastname || !email || !password || !carColor || !carPlate || !capacity || !vehicleType) {
        throw new Error("All fields are required");
      }


     const captain = await CaptainModel.create({
         fullname:
         {
            firstname,
            lastname
        },
         email,
         password,

         vehicle:{
            carColor,
            carPlate,
            capacity,
            vehicleType
        }
     })
        return captain
}

