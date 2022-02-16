const express = require('express');
const { Server } = require("socket.io");
const cors = require('cors')
const http = require('http');
const app = express();
const users = require('./routes/users');
const rooms = require('./routes/rooms');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use('/users', users);
app.use('/rooms', rooms);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})
// mam dostęp do io przy kazdym routcie 
// app.use((req, res, next) => {
//   req.io = io;
//   return next();
// });

require('dotenv').config();

const dbConnData = {
    host: process.env.MONGO_HOST || '127.0.0.1',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || 'local'
};

const mongoose = require('mongoose');

mongoose
  .connect(`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(response => {
    console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
    const port = process.env.PORT || 5000
    httpServer.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });

    io.on("connection", (socket) => {
      //na razie dac wszystko do tego pliku
      // console.log(socket.id)

      socket.on("join-room", (roomId) => joinRoomListener(roomId, socket))

      socket.on("send-message", message => {
        console.log(message)
      })
    });

    const joinRoomListener = (roomId, socket) => {
      socket.join(`room-${roomId}`)
    }

  })
  .catch(error => console.error('Error connecting to MongoDB', error));