const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");
const app = express();
const users = require("./routes/users");
const rooms = require("./routes/rooms");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/users", users);
app.use("/rooms", rooms);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

require("dotenv").config();

const dbConnData = {
  host: process.env.MONGO_HOST || "127.0.0.1",
  port: process.env.MONGO_PORT || 27017,
  database: process.env.MONGO_DATABASE || "local",
};

const mongoose = require("mongoose");
const Room = require("./models/Room");

mongoose
  .connect(
    `mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((response) => {
    console.log(
      `Connected to MongoDB. Database name: "${response.connections[0].name}"`
    );
    const port = process.env.PORT || 5000;
    httpServer.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });

    io.on("connection", (socket) => {
      //na razie dac wszystko do tego pliku

      socket.on("join-room", (roomId, playerId) =>
        joinRoomListener(roomId, socket, playerId)
      );

      socket.on("send-message", (message, roomId) =>
        sendMesssageListener(message, roomId, socket)
      );

      socket.on("piece-move", (roomId, updatedBoard) =>
        movePieceListener(roomId, updatedBoard, socket)
      );

      socket.on("new-winner", (roomId, winnerId) =>
        newWinnerListener(roomId, winnerId, socket)
      );
    });

    const joinRoomListener = async (roomId, socket, playerId) => {
      //sprawdzic czy tu wszystko git
      socket.join(`room-${roomId}`);
      socket.broadcast.to(`room-${roomId}`).emit("new-player", playerId);
      const room = await Room.findById(roomId);
      if (
        room.playersId.length !== 2 &&
        room.playersId.includes(playerId) === false
      ) {
        room.playersId = [...room.playersId, playerId];
        room.save();
      }
    };

    const sendMesssageListener = (message, roomId, socket) => {
      socket.broadcast.to(`room-${roomId}`).emit("receive-message", message);
    };

    const movePieceListener = (roomId, updatedBoard, socket) => {
      socket.broadcast
        .to(`room-${roomId}`)
        .emit("receive-piece-move", updatedBoard);
    };

    const newWinnerListener = (roomId, winnerId, socket) => {
      socket.broadcast
        .to(`room-${roomId}`)
        .emit("receive-new-winner", winnerId);
    };
  })
  .catch((error) => console.error("Error connecting to MongoDB", error));
