const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// define the User model schema
const StoreSchema = new mongoose.Schema({
  uid: { type: Schema.Types.ObjectId, required: true },
  name: String,
  description: String,
  serviceFee: Number,
  phoneNumber: String,
  businessEmail: {
    type: String,
    index: { unique: true }
  },
  address: {
    address: String,
    address2: String,
    lat: String,
    long: String,
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
 * The pre-save hook method.
 */
StoreSchema.pre('save', function saveHook(next) {
  const user = this;
  // console.log(this);
  // console.log('----------Store Was Saved');

  return next();

});


/**
 * Find the facebook id if it exists in database if not create the user.
 *
 * @param {string} profile
 * @returns {object} callback
 */

module.exports = mongoose.model('Store', StoreSchema);
