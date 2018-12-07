const Store = require('mongoose').model('Store');

module.exports = function getPendingStores(req, res) {

  // console.log(req);


  Store.find({status: false}, function(err, docs){

    if (err) {

      return console.error(err);
    }

    // console.info("Returning all items:\n");
    // console.info(docs);

    var results = [];
    results = docs;

    if(results.length == 0){
      res.status(200).json({
        success: false,
        message: 'No pending stores at the moment!',
        user: req.user,
        data: null
      });


    }else{

      res.status(200).json({
        success: true,
        message: 'You have pending stores to review!',
        user: req.user,
        data: results
      });

    }



    console.log(docs.length);

  });

  // res.status(200).json({
  //   success: true,
  //   message: 'You have accessed the Pending Stores page!',
  //   user: req.user
  // });

  // console.log(re);

  // const errors = {};
  // let isFormValid = true;
  // let message = 'Store Saved Successfully!';
  //
  // let storeSchmeObject = new Store(nodeObject);
  //
  // return storeSchmeObject.save(function(err) {
  //   if (err) {
  //     if (err.name === 'MongoError' && err.code === 11000) {
  //       console.log('--------------------------------');
  //       console.log(err);
  //       console.log('--------------------------------');
  //
  //       isFormValid = false;
  //       errors.message = 'Duplicate Error';
  //
  //       return {
  //         isFormValid,
  //         errors,
  //         message
  //       }
  //     }
  //   }
  // });




};
