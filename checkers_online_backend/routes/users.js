const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    console.log(req.body)
    // const user = new User({
    //   login: req.body.login,
    //   email: req.body.email,
    //   registrationDate: new Date(req.body.registrationDate),
    // })
  
    // try {
    //   const newUser = await user.save()
      
    //   return res.send(newUser);
    // } catch (err) {
    //   res.status(400).json({ message: err.message })
    // }
});

module.exports = router;