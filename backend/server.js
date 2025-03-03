const app = require('./app')
const http = require("http")
// requiring database connection
const ConnectDb = require('./db/db')
// calling the function we exported from db.js
ConnectDb()
const Port = process.env.Port || 3000

const server = http.createServer(app)

// initialize socket after creating the server
const { initializeSocket } = require('./socket');
initializeSocket(server);

server.listen(Port, () => {
  console.log(`server running on port: ${Port}`)
})

