const express = require("express")
const app = express()
// setting cors
const cors = require('cors')
app.use(cors())
// setting env
const dotenv = require('dotenv')
dotenv.config()
// importing routes of user
const UserRoutes = require('./routes/user.routes')
// captain routes
const CaptainRoutes = require('./routes/captain.routes')
// requiring maps routes
const mapsRoutes = require('./routes/maps.routes')
// requiring ride routes
const rideRoutes = require('./routes/ride.routes')
// requring cookie parser 
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// middlewares for post request
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// command for executing router function
app.use("/users",UserRoutes)
app.use("/captains",CaptainRoutes)
app.use("/maps", mapsRoutes)
app.use("/rides",rideRoutes)

// testing purpose
app.get("/",(req,res)=>{
     res.send("hlo world")
})

module.exports = app