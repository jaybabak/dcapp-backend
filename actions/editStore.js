
const validator = require('validator');
const Store = require('mongoose').model('Store');



module.exports = function editStore(req, res) {
    const results = validateStoreEditForm(req, res);

    return results;

};

function validateStoreEditForm(payload, res) {


  const storeObject = payload.body;
  console.log(storeObject);

  const errors = {};
  let isFormValid = true;
  let message = '';

  //Status
  if(storeObject.status !== null){
    //do nothing
    Store.findByIdAndUpdate(storeObject.id, { $set: { status: storeObject.status } }, { upsert: true, new: true }, function(err){

      if (err) {
          isFormValid = false;

      }else{
        console.log('Succesfully updated status to:' + storeObject.status);
      }
    });
  }



  //Name
  if(storeObject.name === ""){
    //do nothing
  }else{
    if (!storeObject || typeof storeObject.name !== 'string' || validator.isEmpty(storeObject.name)) {
      isFormValid = false;
      errors.name = 'Please provide a valid name';
      errors.nameInvalid = true;
      errors.step1Valid = false;
    }else{

      Store.findByIdAndUpdate(storeObject.id, { $set: { name: storeObject.name } }, { upsert: true, new: true }, function(err){

        if (err) {
            isFormValid = false;

        }else{
          console.log('Succesfully updated name!');
        }

      });
    }
  }



  //Description
  if(storeObject.description === ""){
    //do nothing
  }else{
    if (!storeObject || typeof storeObject.description !== 'string' || validator.isEmpty(storeObject.description)) {
      isFormValid = false;
      errors.description = 'Please provide a valid description';
      errors.descriptionInvalid = true;
      errors.step1Valid = false;
    }else{

      Store.findByIdAndUpdate(storeObject.id, { $set: { description: storeObject.description } }, { upsert: true, new: true }, function(err){

        if (err) {
            isFormValid = false;

        }else{
          console.log('Succesfully updated description!');
        }

      });
    }
  }


  //Address
  if(storeObject.address === ""){
    //do nothing
  }else{
    if (!storeObject || typeof storeObject.address !== 'string' || validator.isEmpty(storeObject.address)) {
      isFormValid = false;
      errors.address = 'Please provide a valid address';
      errors.addressInvalid = true;
      errors.step1Valid = false;
    }else{
      Store.findByIdAndUpdate(storeObject.id, { $set: { 'address.address': storeObject.address } }, { upsert: true, new: true }, function(err){

        if (err) {
            isFormValid = false;

        }else{
          console.log('Succesfully updated address!');
        }

      });
    }
  }


  //Address 2
  if(storeObject.address2 === ""){
    //do nothing
  }else{
    if (!storeObject || typeof storeObject.address2 !== 'string' || validator.isEmpty(storeObject.address2)) {
      isFormValid = false;
      errors.address2 = 'Please provide a valid address';
      errors.address2Invalid = true;
      errors.step1Valid = false;
    }else{
      Store.findByIdAndUpdate(storeObject.id, { $set: { 'address.address2': storeObject.address2 } }, { upsert: true, new: true }, function(err){

        if (err) {
            isFormValid = false;

        }else{
          console.log('Succesfully updated address2!');
        }
      });
    }
  }


  //Email
  if(storeObject.businessEmail === ""){
    //do nothing
  }else{
    if (!storeObject || typeof storeObject.businessEmail !== 'string' || !validator.isEmail(storeObject.businessEmail)) {
      isFormValid = false;
      errors.businessEmail = 'Please provide a correct email address.';
      errors.businessEmailInvalid = true;
      errors.step1Valid = false;
    }else{
      Store.findByIdAndUpdate(storeObject.id, { $set: { 'businessEmail': storeObject.businessEmail } }, { upsert: true, new: true }, function(err){

        if (err) {
            isFormValid = false;

        }else{
          console.log('Succesfully updated email address (business)!');
        }
      });
    }
  }


  //Phone Number
  if(storeObject.phoneNumber === ""){
    //do nothing
  }else{
    if (!storeObject || typeof storeObject.phoneNumber !== 'string' || !validator.isInt(storeObject.phoneNumber)) {
      isFormValid = false;
      errors.phoneNumber = 'Please provide a correct phone number.';
      errors.phoneNumberInvalid = true;
      errors.step1Valid = false;
    }else{
      Store.findByIdAndUpdate(storeObject.id, { $set: { 'phoneNumber': storeObject.phoneNumber } }, { upsert: true, new: true }, function(err){

        if (err) {
            isFormValid = false;

        }else{
          console.log('Succesfully updated business phone number!');
        }
      });
    }
  }


  //Service Fee
  if(storeObject.serviceFee === ""){
    //do nothing
  }else{
    if (!storeObject || typeof storeObject.serviceFee !== 'string' || !validator.isInt(storeObject.serviceFee)) {
      isFormValid = false;
      errors.serviceFee = 'Please enter only numbers, no characters.';
      errors.serviceFeeInvalid = true;
      errors.step1Valid = false;
    }else{
      Store.findByIdAndUpdate(storeObject.id, { $set: { 'serviceFee': storeObject.serviceFee } }, { upsert: true, new: true }, function(err){

        if (err) {
            isFormValid = false;

        }else{
          console.log('Succesfully service fee!');
        }
      });
    }
  }


  //Minimum Order
  if(storeObject.minimumOrder === ""){
    //do nothing
  }else{
    if (!storeObject || typeof storeObject.minimumOrder !== 'string' || !validator.isInt(storeObject.minimumOrder)) {
      isFormValid = false;
      errors.minimumOrder = 'Please enter only numbers, no characters.';
      errors.minimumOrderInvalid = true;
      errors.step1Valid = false;
    }else{
      Store.findByIdAndUpdate(storeObject.id, { $set: { 'minimumOrder': storeObject.minimumOrder } }, { upsert: true, new: true }, function(err){

        if (err) {
            isFormValid = false;
        }else{
          errors.minimumOrderInvalid = false;
          console.log('Succesfully updated minimum order!');
        }
      });
    }
  }


    // console.log(payload.user[0]._id);

    nodeObject = {
      name: storeObject.name,
      description: storeObject.description,
      serviceFee: storeObject.serviceFee,
      phoneNumber: storeObject.phoneNumber,
      businessEmail: storeObject.businessEmail,
      address: {
        address: storeObject.address,
        address2: storeObject.address2,
      },
      minimumOrder: storeObject.minimumOrder,
      businessHours: {
        monday: {
          open: '',
          close: '',
        },
        tuesday: {
          open: '',
          close: '',
        },
        wednesday: {
          open: '',
          close: '',
        },
        thursday: {
          open: '',
          close: '',
        },
        friday: {
          open: '',
          close: '',
        },
        saturday: {
          open: '',
          close: '',
        },
        sunday: {
          open: '',
          close: '',
        },
      },
      status: storeObject.status ? true : false,
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
