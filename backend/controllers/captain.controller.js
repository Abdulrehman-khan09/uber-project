const CaptainModel = require('../models/captain.model')
const {validationResult} = require('express-validator')
const CaptainService = require('../services/captain.services')
const BlacklistModel = require('../models/blacklist.model')

module.exports.registerCaptain = async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { fullname, email, password, vehicle } = req.body;
  
       const captainExists = await CaptainModel.findOne({ email });
       
       if(captainExists){
           return res.status(400).json({message: 'Captain already exists'})
       }

      const hashedPassword = await CaptainModel.hashPassword(password);
  
      const captain = await CaptainService.CreateCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        carColor: vehicle.carColor,
        carPlate: vehicle.carPlate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
      });

      const token = captain.generateAuthToken();
      
      return res.status(201).json({ token, captain });

    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
module.exports.loginCaptain = async (req, res) => {

   const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email,password} = req.body;

    const captain = await CaptainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message: 'Username or password is incorrect'});
    }
    const isMatch = await captain.ComparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: 'Username or password is incorrect'});
    }
    const token = captain.generateAuthToken();

    res.cookie('token',token)
    res.status(201).json({token,captain})
}

module.exports.getProfile = async (req,res)=>{
    res.status(200).json({captain: req.captain})
}

module.exports.LogoutCaptain = async (req,res)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
      await  BlacklistModel.create({token:token})
    res.clearCookie('token')
    res.status(201).json({message: 'Logged out successfully'})
}
