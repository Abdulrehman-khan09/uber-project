
const UserModel = require('../models/user.models');
const CaptainModel = require('../models/captain.model');
const jwt = require('jsonwebtoken');
const BlacklistModel = require('../models/blacklist.model');

module.exports.AuthUser = async (req,res,next)=>{
    
         // Get token from request
         const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
           // if no token is there we will return unauthorized
         if(!token){
             return res.status(401).json({message:"Unauthorized"})
         }
            // check if token is blacklisted or not means if user is logged out or not
         const isBlacklisted = await BlacklistModel.findOne({token:token})
         // if token is blacklisted we will return unauthorized
         if(isBlacklisted){
             return res.status(401).json({message:"Unauthorized"})
         }

          try{
         const decoded = jwt.verify(token,process.env.JWT_SECRET)
         const user = await UserModel.findById(decoded._id)
          
         // set req.user to user
        req.user = user
        // calling next to pass the control 
         return next()

    } catch(error){
        return res.status(401).json({message:"Unauthorized"})
    }
}

module.exports.AuthCaptain = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    const isBlacklisted = await BlacklistModel.findOne({token:token})

    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const captain = await CaptainModel.findById(decoded._id)
        req.captain = captain
        return next()

    }catch(err){
         console.log(err)
        res.status(401).json({message:"Unauthorized"})
    }
}
