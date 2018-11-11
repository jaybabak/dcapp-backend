const User = require('mongoose').model('User');
const FacebookTokenStrategy = require('passport-facebook-token');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const findOrCreate = require('mongoose-find-or-create');

module.exports = new FacebookTokenStrategy({
    clientID: '192651401441339',
    clientSecret: 'f0b2a79200ff171b6d605d360f63456d',
  },
  function(accessToken, refreshToken, profile, cb) {

    User.find({ 'email': profile.emails[0].value }, function (err, user) {
      // console.log('---------------Pa');
      // console.log(profile);
      // console.log(profile.emails[0].value);
      // console.log(accessToken);
      // console.log('!!!!!---------------Pa');
      console.log('---------------------------');
      console.log(user);
      console.log('---------------------------');

      if (err) {

        return res.status(400).json({
          success: false,
          message: 'Could not process the form.'
        });
        // return cb(err);
      }

      if(user === undefined || user.length == 0){
        console.log('NO USER WITH THAT EMAIL FOUND');

        const userData = {
          email: profile.emails[0].value,
          password: '',
          facebook: {
            token: accessToken,
            avatar: profile.photos[0].value
          },
          name: profile.name.givenName,
          lastName: profile.name.familyName,
          mobileNumber: '61322222222',
          address: [
            {
              addressName: 'test',
              addressType: 'test',
              street: 'test',
              buildingName: 'test',
              floor: 'test',
              additionalDirections: 'test',
              lat: 'test',
              long: 'test',
              preferredAddress: true
            }
          ],
          role: String,
          type: String
        };

        const newUser = new User(userData);

        newUser.save((err, user) => {
          if (err) { return cb(err); }

          return cb(null);
        });


      }

      console.log('----------------USER FOUND');

      return cb(err, user);
    });
  }
);

// /**
//  * Return the Passport Local Strategy object.
//  */
// module.exports = new FacebookStrategy({
//   clientID: '192651401441339',
//   clientSecret: 'f0b2a79200ff171b6d605d360f63456d',
//   callbackURL: "http://localhost:5000/auth/facebook/cb"
// }, (accessToken, refreshToken, profile, done) => {
//   // console.log(req);
//   User.findOrCreate({'facebook.id': profile.id}, function(err, user) {
//     if (err) { return done(err); }
//     console.log(user);
//     done(null, user);
//   });
//   const userData = {
//     email: email.trim(),
//     password: password.trim(),
//     name: req.body.name.trim(),
//     lastName: req.body.lastName.trim(),
//     mobileNumber: req.body.mobileNumber.trim(),
//     address: [
//       {
//         addressName: req.body.addressName.trim(),
//         addressType: req.body.addressType.trim(),
//         street: req.body.street.trim(),
//         buildingName: req.body.buildingName.trim(),
//         floor: req.body.floor.trim(),
//         additionalDirections: req.body.additionalDirections.trim(),
//         lat: req.body.lat.trim(),
//         long: req.body.long.trim(),
//         preferredAddress: req.body.preferredAddress.trim()
//       }
//     ]
//   };
//
//   const newUser = new User(userData);
//   console.log(newUser);
//   newUser.save((err) => {
//     if (err) { return done(err); }
//
//     return done(null);
//   });
// });
