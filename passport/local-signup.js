const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim(),
    lastName: req.body.lastName.trim(),
    mobileNumber: req.body.mobileNumber.trim(),
    address: [
      {
        addressName: req.body.addressName.trim(),
        addressType: req.body.addressType.trim(),
        street: req.body.street.trim(),
        buildingName: req.body.buildingName.trim(),
        floor: req.body.floor.trim(),
        additionalDirections: req.body.additionalDirections.trim(),
        lat: req.body.lat.trim(),
        long: req.body.long.trim(),
        preferredAddress: req.body.preferredAddress.trim()
      }
    ],
    role: 'customer',
    type: 'local'
  };

  const newUser = new User(userData);
  newUser.save((err) => {
    if (err) { return done(err); }

    return done(null);
  });
});
