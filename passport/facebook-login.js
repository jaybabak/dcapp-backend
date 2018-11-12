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
      // console.log('---------------------------');
      // console.log(user);
      // console.log('---------------------------');

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
          role: 'customer',
          type: 'facebook'
        };

        const newUser = new User(userData);

        newUser.save((err, user) => {
          if (err) { return cb(err); }

          return cb(null);
        });


      }

      return cb(err, user);
    });
  }
);
