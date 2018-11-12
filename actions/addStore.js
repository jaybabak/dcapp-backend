const validator = require('validator');



module.exports = function addStore(req) {


    const results = validateLoginForm(req);

    return results;

};

function validateLoginForm(payload) {


  const storeObject = payload.body;
  // console.log(storeObject);

  // console.log(validator.isEmail(storeObject.businessEmail));
  console.log(validator.isInt(storeObject.phoneNumber));

  const errors = {};
  let isFormValid = true;
  let message = '';

  //Name
  if (!storeObject || typeof storeObject.name !== 'string' || !validator.isAlphanumeric(storeObject.name)) {
    isFormValid = false;
    errors.name = 'Please provide a valid name';
    errors.nameInvalid = true;
    errors.step1Valid = false;
  }

  //Email
  if (!storeObject || typeof storeObject.businessEmail !== 'string' || !validator.isEmail(storeObject.businessEmail)) {
    isFormValid = false;
    errors.businessEmail = 'Please provide a correct email address.';
    errors.businessEmailInvalid = true;
    errors.step1Valid = false;
  }

  //Phone Number
  if (!storeObject || typeof storeObject.phoneNumber !== 'string' || !validator.isInt(storeObject.phoneNumber)) {
    isFormValid = false;
    errors.phoneNumber = 'Please provide a correct phone number.';
    errors.phoneNumberInvalid = true;
    errors.step1Valid = false;
  }

  //Service Fee
  if (!storeObject || typeof storeObject.serviceFee !== 'string' || !validator.isInt(storeObject.serviceFee)) {
    isFormValid = false;
    errors.serviceFee = 'Please enter only numbers, no characters.';
    errors.serviceFeeInvalid = true;
    errors.step1Valid = false;
  }

  //Service Fee
  if (!storeObject || typeof storeObject.minimumOrder !== 'string' || !validator.isInt(storeObject.minimumOrder)) {
    isFormValid = false;
    errors.minimumOrder = 'Please enter only numbers, no characters.';
    errors.minimumOrderInvalid = true;
    errors.step1Valid = false;
  }


  //
  // if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
  //   isFormValid = false;
  //   errors.password = 'Please provide your password.';
  // }
  //
  // if (!isFormValid) {
  //   message = 'Check the form for errors.';
  // }

  return {
    success: isFormValid,
    message,
    errors
  };
}
