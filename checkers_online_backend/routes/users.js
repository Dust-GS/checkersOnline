const express = require('express');
const router = express.Router();
const argon2 = require("argon2");
const User = require('../models/User');

router.get('/getAllUsers', async (req, res) => {
    try{
      const users = await User.find()
  
      res.send({ message: "get all users success", allUsers: users});
  
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
});

router.post('/createUser', async (req, res) => {
    let hash
    const nickname = req.body.nickname
    const password = req.body.password 

    try {
      hash = await argon2.hash(password, "herbrhtjhds")

      const newUser = await new User({
        nickname: nickname,
        password: hash
      })

      await newUser.save()
      res.send({ message: "user created", newUser: newUser });
    } catch (err) {
      if ( err && err.code !== 11000 ) {
        res.status(400).json({ message: err.message })
      } else if ( err && err.code === 11000 ) {
        res.status(400).json({ message: "nickname is taken" })
      }
    }
});

router.post('/login', getUser, async (req, res) => {
  const password = req.body.password

  try {
    if(await argon2.verify(res.user.password, password)){
      res.send({ message: "log in successful", userData: res.user });
    } else {
      res.status(404).json({ message: "password incorrect"})
    }
  } catch (err) {
    console.log(err)
  }
});

router.delete('/deleteUser/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id)

      await user.remove()
  
      res.send({
        deletedUserId: res.user.id
      });
  
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
});

async function getUser(req, res, next){
    let user
  
    try {
      user = await User.findOne({ nickname: req.body.nickname })
      if (user == null) {
        return res.status(404).json({ message: 'Cant find the user'})
      }
    } catch (err) {
      return res.status(500).json({ message: err.message})
    }
  
    res.user = user
    next()
  }

module.exports = router;