require('dotenv').config();

const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const jwt = require('jsonwebtoken')

//get
router.get('/getAllRooms', async (req, res) => {
    try{
      const rooms = await Room.find()
  
      res.send({ message: "get all rooms success", allRooms: rooms});
  
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
});

//post
router.post('/createRoom', authenticateToken, async (req, res) => {
    //przy tworzeniu room moge wysylac tyko swoj token(nickname i id) i dane do room
    //zwiekszyc liczbe roomsow dla typa
    console.log(req.user)
    // try {
    //   const newRoom = await new Room(newRoomData)

    //   const dataToSend = newRoom
    res.status(400).json({ message: 'err.message' })

    //   await newRoom.save()
    //   res.send({ message: "room created", newRoom: dataToSend });
    // } catch (err) {
    //   if ( err && err.code !== 11000 ) {
    //     res.status(400).json({ message: err.message })
    //   } else if ( err && err.code === 11000 ) {
    //     res.status(400).json({ message: "roomName is taken" })
    //   }
    // }
});

//delete
router.delete('/deleteRoom/:id', async (req, res) => {
    try {
      const user = await Room.findById(req.params.id)

      await user.remove()
  
      res.send({
        deletedUserId: res.user.id
      });
  
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
});

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    //dodac obsluge bledu niewlasciwego tokenu
    //twoja sesja wygasla czy cos
    if (token == null) return res.sendStatus(401)
    //brak tokenu hmm czyli hyba tez ze sesja wygasla czycos i trzeba wylogowac tamtą osobe  czy jaki refresh tokenu
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, jwtInfo) => {
        console.log("ver")
        if (err) return res.sendStatus(403)//obsluzyc zeby pokazalo ze sesja wygasla 
        req.user = jwtInfo
        next()
    })
  }

module.exports = router;