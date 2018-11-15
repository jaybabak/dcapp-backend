
const validator = require('validator');
const Store = require('mongoose').model('Store');



module.exports = function addStore(req, res) {






    const results = validateLoginForm(req, res);

    // console.log(results);

    return results;

};

function validateLoginForm(payload, res) {


  const storeObject = payload.body;
  // console.log(storeObject);

  // console.log(validator.isEmail(storeObject.businessEmail));
  // console.log(validator.isInt(storeObject.phoneNumber));

  const errors = {};
  let isFormValid = true;
  let message = '';

  //Name
  if (!storeObject || typeof storeObject.name !== 'string') {
    isFormValid = false;
    errors.name = 'Please provide a valid name';
    errors.nameInvalid = true;
    errors.step1Valid = false;
  }

  //Description
  if (!storeObject || typeof storeObject.description !== 'string') {
    isFormValid = false;
    errors.description = 'Please provide a valid description';
    errors.descriptionInvalid = true;
    errors.step1Valid = false;
  }

  //Address
  if (!storeObject || typeof storeObject.address !== 'string') {
    isFormValid = false;
    errors.address = 'Please provide a valid address';
    errors.addressInvalid = true;
    errors.step1Valid = false;
  }

  //Address 2
  if (!storeObject || typeof storeObject.address2 !== 'string') {
    isFormValid = false;
    errors.address2 = 'Please provide a valid address';
    errors.address2Invalid = true;
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

  //Minimum Order
  if (!storeObject || typeof storeObject.minimumOrder !== 'string' || !validator.isInt(storeObject.minimumOrder)) {
    isFormValid = false;
    errors.minimumOrder = 'Please enter only numbers, no characters.';
    errors.minimumOrderInvalid = true;
    errors.step1Valid = false;
  }


    // console.log(payload.user[0]._id);

    nodeObject = {
      uid: payload.user[0]._id,
      name: storeObject.name,
      description: storeObject.description,
      serviceFee: storeObject.serviceFee,
      phoneNumber: storeObject.phoneNumber,
      businessEmail: storeObject.businessEmail,
      address: {
        address: storeObject.address,
        address2: storeObject.address2,
        lat: '75',
        long: '74',
      },
      minimumOrder: storeObject.minimumOrder,
      businessHours: {
        monday: {
          open: '9AM',
          close: '10PM',
        },
        tuesday: {
          open: '9AM',
          close: '10PM',
        },
        wednesday: {
          open: '9AM',
          close: '10PM',
        },
        thursday: {
          open: '9AM',
          close: '10PM',
        },
        friday: {
          open: '9AM',
          close: '10PM',
        },
        saturday: {
          open: '9AM',
          close: '10PM',
        },
        sunday: {
          open: '9AM',
          close: '10PM',
        },
      },
      status: false,
    };

    // console.log(nodeObject);

    // console.log('--------\nIS THIS FORM VALID BEFORE RETURN STATEMENT: ' + isFormValid);


    return {
      success: isFormValid,
      message,
      errors,
      nodeObject
    };




}
