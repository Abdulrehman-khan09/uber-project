const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{type:String,
        required:true,
        minLenth:[3,"username must be atleast 3 characters long"]
        },
        lastname:{type:String,
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:[6,"Enter a valid email"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Enter a valid email"]
    },
    password:{
        type:String,
        required:true,
        select:false,
        min:[6,"password must be atleast 6 characters long"]
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    location:{
        ltd:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    },
    vehicle:{
        carColor:{
            type:String,
            required:true
        },
        carPlate:{
            type:String,
            required:true,
            min:[3,"Plate number must be atleast 3 characters long"]
        },
        capacity:{
            type:Number,
            required:true,
            min:[1," Capacity must be atleast 1"]
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','auto','moto']
        }
        
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' })
    return token
}

captainSchema.statics.hashPassword = async function(password){
   return await bcrypt.hash(password,10)
}

captainSchema.methods.ComparePassword = async function(password){
   return await bcrypt.compare(password,this.password)
}

const CaptainModel = mongoose.model('captain',captainSchema)

module.exports = CaptainModel