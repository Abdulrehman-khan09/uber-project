 // this route will handle user creation
const userModel = require('../models/user.models');
// creating user function in database
module.exports.createUser = async (
    {
    firstname,lastname,email,password
})=>{
    if(!firstname || !email || !password){
        throw new Error('All fields are required')
    }
     
    const user = userModel.create({
        fullname:{
            firstname,
            lastname,
        },
        email,
        password,
    })
    return user
}
