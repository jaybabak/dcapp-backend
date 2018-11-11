const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const findOrCreate = require('mongoose-findorcreate');

// define the User model schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  facebook: {
    token: String,
    avatar: String,
  },
  name: String,
  lastName: String,
  mobileNumber: String,
  address: [{
    addressName: String,
    addressType: String,
    street: String,
    buildingName: String,
    floor: String,
    additionalDirections: String,
    lat: String,
    long: String,
    preferredAddress: Boolean,
  }],
  role: String,
  type: String
});


/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;


  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});


/**
 * Find the facebook id if it exists in database if not create the user.
 *
 * @param {string} profile
 * @returns {object} callback
 */






module.exports = mongoose.model('User', UserSchema);
