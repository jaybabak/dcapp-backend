const express = require('express');
const mongoose = require('mongoose')
const User = mongoose.model('User');
const passport = require('passport');
const router = new express.Router();


router.get('/dashboard', (req, res) => {

  // console.log('--------------------asdfasdfasdkfjaklsdfjakls;djfakls;jdfklas;dfjkla;sdjfklas;jdfkl;asjdfkl;asjdfakl;sjdfkl;asjdfal;---a-asdf-asf--sdf-adsf-as-df-asdf-as-df-asdf-a-sdf-asdf-a-sdf-asdf-a-dsfa-sf-asdf------------------');
  //
  // console.error(req);
  //
  // console.log('--------------------asdfasdfasdkfjaklsdfjakls;djfakls;jdfklas;dfjkla;sdjfklas;jdfkl;asjdfkl;asjdfakl;sjdfkl;asjdfal;---a-asdf-asf--sdf-adsf-as-df-asdf-as-df-asdf-a-sdf-asdf-a-sdf-asdf-a-dsfa-sf-asdf------------------');

  // res.status(200).json({
  //   message: "You're authorized to see this secret message.",
  //   // user values passed through from auth middleware
  //   user: req.user,
  //   test: 'testst'
  // });

  return passport.authenticate('facebook-token'),
  function (req, res) {
    // do something with req.user
    res.status(200).json({
      message: "You're authorized to see this secret message.",
      // user values passed through from auth middleware
      user: req.user
    });
  }



});


module.exports = router;
