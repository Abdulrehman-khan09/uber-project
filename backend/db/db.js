const mongoose = require('mongoose');

 function ConnectDb(){
    mongoose.connect(process.env.MONGO_URI, {
    }).then(()=>{
        console.log("Database connected successfully")
    }).catch((err)=>{
        console.log(err)
    })
 }

 module.exports = ConnectDb
