const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// define the User model schema
const StoreSchema = new mongoose.Schema({
  uid: { type: Schema.Types.ObjectId, required: true },
  name: String,
  description: String,
  address: String,
  address2: String,
  serviceFee: Number,
  phoneNumber: String,
  businessEmail: {
    type: String,
    index: { unique: true }
  },
  minimumOrder: Number,
  businessHours: {
    monday: {
      open: String,
      close: String,
    },
    tuesday: {
      open: String,
      close: String,
    },
    wednesday: {
      open: String,
      close: String,
    },
    thursday: {
      open: String,
      close: String,
    },
    friday: {
      open: String,
      close: String,
    },
    saturday: {
      open: String,
      close: String,
    },
    sunday: {
      open: String,
      close: String,
    },
  },
  status: Boolean,

});


/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
StoreSchema.methods.comparePassword = function comparePassword(password, callback) {
  // bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 */
StoreSchema.pre('save', function saveHook(next) {
  const user = this;

  console.log(this);
  console.log('----------Store Was Saved');
  //
  //
  // // proceed further only if the password is modified or the user is new
  // if (!user.isModified('password')) return next();
  //
  //
  // return bcrypt.genSalt((saltError, salt) => {
  //   if (saltError) { return next(saltError); }
  //
  //   return bcrypt.hash(user.password, salt, (hashError, hash) => {
  //     if (hashError) { return next(hashError); }
  //
  //     // replace a password string with hash value
  //     user.password = hash;
  //
  //     return next();
  //   });
  // });
});


/**
 * Find the facebook id if it exists in database if not create the user.
 *
 * @param {string} profile
 * @returns {object} callback
 */

module.exports = mongoose.model('Stores', StoreSchema);
