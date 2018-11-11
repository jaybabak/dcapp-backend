const express = require('express');
const validator = require('validator');
const passport = require('passport');
const router = new express.Router();

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  // console.log(payload);

  //Email
  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
    errors.emailInvalid = true;
    errors.step1Valid = false;
  }

  //Password
  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
    errors.passwordInvalid = true;
    errors.step1Valid = false;
  }

  //Name
  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
    errors.nameInvalid = true;
    errors.step1Valid = false;
  }

  // Last Name
  if (!payload || typeof payload.lastName !== 'string' || payload.lastName.trim().length === 0) {
    isFormValid = false;
    errors.lastName = 'Please provide a last name.';
    errors.lastNameInvalid = true;
    errors.step1Valid = false;
  }

  //Address name
  if (!payload || typeof payload.addressName !== 'string' || payload.addressName.trim().length === 0) {
    isFormValid = false;
    errors.addressName = 'Please provide a valid address name.';
    errors.addressNameInvalid = true;
  }

  //Address type
  if (!payload || typeof payload.addressType !== 'string' || payload.addressType.trim().length === 0) {
    isFormValid = false;
    errors.addressType = 'Please select an address type e.g: home or office.';
    errors.addressTypeInvalid = true;
  }

  //Street
  if (!payload || typeof payload.street !== 'string' || payload.street.trim().length === 0) {
    isFormValid = false;
    errors.street = 'Please enter a valid street.';
    errors.streetInvalid = true;
  }

  //Building name
  if (!payload || typeof payload.buildingName !== 'string' || payload.buildingName.trim().length === 0) {
    isFormValid = false;
    errors.buildingName = 'Please enter a valid street.';
    errors.buildingNameInvalid = true;
  }

  //Floor
  if (!payload || typeof payload.floor !== 'string' || payload.floor.trim().length === 0) {
    isFormValid = false;
    errors.floor = 'Please enter a valid street.';
    errors.floorInvalid = true;
  }

  //Additional Directions
  if (!payload || typeof payload.additionalDirections !== 'string' || payload.additionalDirections.trim().length === 0) {
    isFormValid = false;
    errors.additionalDirections = 'Please enter a valid street.';
    errors.additionalDirectionsInvalid = true;
  }

  //Mobile Number
  if (!payload || typeof payload.mobileNumber !== 'string' || payload.mobileNumber.trim().length === 0) {
    isFormValid = false;
    errors.mobileNumber = 'Please enter a valid street.';
    errors.mobileNumberInvalid = true;
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}


//SIGN UP

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }


  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.',
            emailInvalid: true
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    });
  })(req, res, next);
});


//LOGIN

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  // console.log(validationResult);
  // console.log(req);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }


  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }


    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    });
  })(req, res, next);
});



//FACEBOOK AUTHENTICATION

// router.get('/auth/facebook', passport.authenticate('facebook'));

// router.post('/facebook/login', (req, res, next) => {
//
//   console.log(req.body.token);
//
//   passport.authenticate('facebook-token'), function (req, res) {
//     console.log(req);
//     console.log(res);
//     res.send(req.user? 200 : 401);
//   }
//
//   // return res.status(400).json({
//   //   success: false,
//   //   message: 'Could not process the form.'
//   // });
//
// });

router.post('/facebook/login',
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
