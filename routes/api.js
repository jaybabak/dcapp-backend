const express = require('express');
const mongoose = require('mongoose')
const User = mongoose.model('User');
const Store = mongoose.model('Store');
const passport = require('passport');
const router = new express.Router();

const addStore = require('../actions/addStore.js');
const editStore = require('../actions/editStore.js');
const getPendingStores = require('../actions/getPendingStores.js');

router.post('/dashboard',
  passport.authenticate('facebook-token', {session: false}),
  function (req, res) {

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
    const storeValidationResults = addStore(req, res);


    if(!storeValidationResults.success){

      return res.status(200).json({
        success: storeValidationResults.success,
        message: storeValidationResults.message,
        user: req.user,
        errors: storeValidationResults.errors,
      });


    }

    var storeObjectFromReq = storeValidationResults.nodeObject;

    const errors = {};
    let isFormValid = true;
    let message = 'Store Saved Successfully!';

    let storeObject = new Store(storeObjectFromReq);

    storeObject.save(function(err) {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          console.log('--------------------------------');
          console.log(err);
          console.log('--------------------------------');

          isFormValid = false;

          return res.status(409).json({
            success: isFormValid,
            message: 'Check the form for errors. That email is already taken',
            errors: {
              businessEmail: 'This email is already taken.',
              businessEmailInvalid: true
            }
          });
        }

      }else{
        return res.status(200).json({
          success: true,
          message: 'You have successfully signed up! Pending status at the moment.'
        });
      }
    });

  }
);

router.post('/edit/store',
  passport.authenticate('facebook-token', {session: false}),
  function (req, res) {

    const storeValidationResults = editStore(req, res);
    console.log(storeValidationResults);

    if(!storeValidationResults.success){

      return res.status(200).json({
        success: storeValidationResults.success,
        message: storeValidationResults.message,
        user: req.user,
        errors: storeValidationResults.errors,
      });


    }

    var storeObjectFromReq = storeValidationResults.nodeObject;
    //
    const errors = {};
    let isFormValid = true;
    let message = 'Store updated successfully!';

    return res.status(200).json({
      success: storeValidationResults.success,
      message: storeValidationResults.message,
      user: req.user,
      errors: storeValidationResults.errors,
    });



    // let storeObject = new Store(storeObjectFromReq);

    // storeObject.save(function(err) {
    //   if (err) {
    //     if (err.name === 'MongoError' && err.code === 11000) {
    //       console.log('--------------------------------');
    //       console.log(err);
    //       console.log('--------------------------------');
    //
    //       isFormValid = false;
    //
    //       return res.status(409).json({
    //         success: isFormValid,
    //         message: 'Check the form for errors. That email is already taken',
    //         errors: {
    //           businessEmail: 'This email is already taken.',
    //           businessEmailInvalid: true
    //         }
    //       });
    //     }
    //
    //   }else{
    //     return res.status(200).json({
    //       success: true,
    //       message: 'You have successfully signed up! Pending status at the moment.'
    //     });
    //   }
    // });

  }
);

router.post('/stores/pending',
  passport.authenticate('facebook-token', {session: false}),
  function (req, res) {

    getPendingStores(req, res);

    // res.status(200).json({
    //   success: true,
    //   message: 'You have accessed the Pending Stores page!',
    //   user: req.user
    // });

  }
);



module.exports = router;
