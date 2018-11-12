const express = require('express');
const mongoose = require('mongoose')
const User = mongoose.model('User');
const passport = require('passport');
const router = new express.Router();


router.post('/dashboard',
  passport.authenticate('facebook-token', {session: false}),
  function (req, res) {
        // console.log(req);
        // console.log(res);
        // do something with req.user
        // res.send(req.user? 200 : 401);
        // console.log(req);
        // console.log(res);

    res.status(200).json({
      success: true,
      message: 'You have successfully logged in!',
      user: req.user
    });

  }
);

router.post('/add/store',
  passport.authenticate('facebook-token', {session: false}),
  function (req, res) {
        // console.log(req);
        // console.log(res);
        // do something with req.user
        // res.send(req.user? 200 : 401);
        // console.log(req);
        // console.log(res);

    res.status(200).json({
      success: true,
      message: 'You have successfully logged in!',
      user: req.user
    });

  }
);


module.exports = router;
