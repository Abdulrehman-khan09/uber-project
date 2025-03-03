const { Server } = require("socket.io");
const userModel = require('./models/user.models')
const captainModel = require('./models/captain.model')

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
   
      // event of join which will update socket id's
    socket.on("join", async (data) => {
        const {  userType , userId } = data;
        console.log(userType , userId)
        if (userType === "user") {
           await userModel.findByIdAndUpdate(userId, { socketId:socket.id});
      } else if (userType === "captain") {
         await captainModel.findByIdAndUpdate(userId, { socketId:socket.id });
      }
    });

    socket.on("getCaptainLocation", async (data) => {
      // getting captains from db and than updating it with its live location
      // this is done to get specific drivers in a specific radius of request
      const {userId , location , userType} = data
      // some validations
      if(!location || !location.latitude || !location.longitude){
        console.log("Location not provided")
      }
      else if(userType === "captain"){
      const captains = await captainModel.findByIdAndUpdate(userId, { location:{
        ltd:location.latitude,
        lng:location.longitude
      },
    })
    }
      
    })
     
    
    socket.on("disconnect", () => {
      console.log(`client disconnected: ${socket.id}`);
    });
  });

  return io;
};

const sendMessageToSocketid = (socketId,  message) => {
  if (io) {
    io.to(socketId).emit( message.event, message.data);
  } else {
    console.error("Socket.io has not been initialized.");
  }
};

module.exports = { initializeSocket, sendMessageToSocketid };
