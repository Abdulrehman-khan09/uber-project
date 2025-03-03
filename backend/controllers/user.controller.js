// importing model
const UserModel = require('../models/user.models');
const { validationResult } = require('express-validator');
// import user creation function from user.services
const UserService = require('../services/user.services')
const BlacklistModel = require('../models/blacklist.model')
// this code will handle vaidations and register user
module.exports.register = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return early if validation fails
    }
    const { fullname, email, password } = req.body;
      const userExists = await UserModel.findOne({email})
      if(userExists){
          return res.status(400).json({message:"User already exists"})
      }
    // Hash password 
    const hashedPassword = await UserModel.hashPassword(password);

    // Now create the user
    try {
        const user = await UserService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
        });

        const token = await user.generateAuthToken();
        
        // Send the response with token and user data
        return res.status(201).json({ token, user });

    } catch (error) {
        // In case of any errors we will handle them
        return res.status(500).json({ message: error.message });
    }
};

// this code will execute login functionality and find user based on his registered details

module.exports.login = async (req, res) => {
    const errors = validationResult(req);

    // Handle validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find user by email
        const finduser = await UserModel.findOne({ email }).select('+password');
        if (!finduser) {
            return res.status(401).json({ message: 'Username or password is incorrect' });
        }

        // Compare passwords
        const isMatch = await finduser.ComparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Username or password is incorrect' });
        }

        // Generate token
        const token = await finduser.generateAuthToken();
          res.cookie('token',token)
        // Send token and user data
        return res.status(201).json({ token, user: finduser });
    } catch (err) {
        // Log and handle unexpected errors
        console.error(err);
        return res.status(500).json({ message: 'internal server error' });
    }
};

module.exports.UserProfile = async (req, res) => {
      res.status(200).json({
        user: req.user
    })
}

module.exports.logout = async (req,res)=>{
   res.clearCookie('token')
   const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await BlacklistModel.create({token:token})
    res.status(201).json({message:"Logged out successfully"})
}
