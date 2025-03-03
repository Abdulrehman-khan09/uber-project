const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
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
        select:false
    },
    socketId:{
        type:String
    },
})

// making methods for hashing password ,comparing password and generating jwt token
UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' })
    return token
}

UserSchema.statics.hashPassword = async function(password){
   return await bcrypt.hash(password,10)
}

UserSchema.methods.ComparePassword = async function(password){
   return await bcrypt.compare(password,this.password)
}

const UserModel = mongoose.model('user',UserSchema)

module.exports = UserModel