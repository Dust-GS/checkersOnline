require("dotenv").config();

const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// id jest w parametrzes _id
//get
router.get("/getAllRooms", async (req, res) => {
  try {
    const rooms = await Room.find().select("roomName ownerId playersId");

    res.send({ message: "get all rooms success", allRooms: rooms });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getOneRoom/:roomId", async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);

    res.send({ message: "get room success", room: room });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//post
router.post("/createRoom", authenticateToken, async (req, res) => {
  try {
    //sprawdzamy czy user moze stworzyc pokoj
    const user = await User.findById(req.user.id);
    if (user.numberOfRooms > 0)
      return res.status(400).json({ message: "you already have a room" });

    const newRoomData = req.body;
    const newRoom = await new Room(newRoomData);
    //jak będzie haslo to tutaj dataToSend bedzie bez hasla
    const dataToSend = newRoom;

    await newRoom.save();
    res.send({ message: "room created", newRoom: dataToSend });

    // zwiekszyc liczbe roomsow dla typa na jeden
    // ale dopiero jak stworzy sie room
    const filter = { nickname: req.user.nickname };
    const update = { numberOfRooms: 1, roomIdYouCreated: dataToSend.id };
    await User.findOneAndUpdate(filter, update);
  } catch (err) {
    if (err && err.code !== 11000) {
      res.status(400).json({ message: err.message });
    } else if (err && err.code === 11000) {
      res.status(400).json({ message: "roomName is taken" });
    }
  }
});

//delete
router.delete("/deleteRoom/:id", async (req, res) => {
  try {
    const user = await Room.findById(req.params.id);

    await Room.deleteMany();

    res.send({
      deletedUserId: res.user.id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //dodac obsluge bledu niewlasciwego tokenu
  //twoja sesja wygasla czy cos
  if (token == null)
    return res.send(401).json({ message: "your session has expired" });
  //brak tokenu hmm czyli hyba tez ze sesja wygasla czycos i trzeba wylogowac tamtą osobe  czy jaki refresh tokenu

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, jwtInfo) => {
    if (err) return res.send(403).json({ message: "your session has expired" }); //obsluzyc zeby pokazalo ze sesja wygasla
    req.user = jwtInfo;
    if (req.body.ownerId !== req.user.id)
      return res
        .send(403)
        .json({ message: "you cant create room for another account" });
    next();
  });
}

module.exports = router;
