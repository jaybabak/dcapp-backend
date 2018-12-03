const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const findOrCreate = require('mongoose-findorcreate');

// define the User model schema
const SubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  name: String,
  lastName: String,
  mobileNumber: String,
});


/**
 * The pre-save hook method.
 */
SubscriptionSchema.pre('save', function saveHook(next) {
  const sub = this;

  console.log(sub);

  return next();

});


/**
 * Find the facebook id if it exists in database if not create the user.
 *
 * @param {string} profile
 * @returns {object} callback
 */






module.exports = mongoose.model('Subscription', SubscriptionSchema);
