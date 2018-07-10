const express = require('express');
const mongoose = require('mongoose')
const User = mongoose.model('User');
const router = new express.Router();


router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    // user values passed through from auth middleware
    user: req.user
  });
});


module.exports = router;
