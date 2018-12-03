const express = require('express');
const app = express();
var cors = require('cors');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const passport = require('passport');

//DATABASE
const mongoose = require('mongoose');
const db = require('./models/index')
db.connect(); //make connection to Database
const User = mongoose.model('User');
const Store = mongoose.model('Store');
const Subscription = mongoose.model('Subscription');

//AUTHENTICATION
app.use(passport.initialize());

//TELL APP TO PARSE
app.use(bodyParser.urlencoded({ extended: false }));

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
const FacebookTokenStrategy = require('./passport/facebook-login');

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
passport.use('facebook-token', FacebookTokenStrategy);


// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


//====GET ALL USERS END POINT===//

app.get('/users', cors(), function(req, res) {

  User.find({}, function(err, docs){

    if (err) return console.error(err);

    // console.info("Returning all items:\n");
    // console.info(docs);

    var results = [];
    results = docs;

    res.json(results);
  });

});

app.get('/stores', cors(), function(req, res) {

  Store.find({}, function(err, docs){

    if (err) return console.error(err);

    // console.info("Returning all items:\n");
    // console.info(docs);

    var results = [];
    results = docs;

    res.json(results);
  });

});


app.get('/subscription/add', cors(), function(req, res) {

  // console.log(req);

  var firstName = decodeURIComponent(req.query.firstName);
  var lastName = decodeURIComponent(req.query.lastName);
  var email = decodeURIComponent(req.query.email);
  var phoneNumber = decodeURIComponent(req.query.phoneNumber);

  console.log(firstName);
  console.log(lastName);
  console.log(email);
  console.log(phoneNumber);





  Subscription.find({email: email}, function(err, subs){

    if (err) return console.error(err);

    // console.info("Returning all items:\n");
    console.info(subs.length);

    if(subs.length == 0){
      console.info('word its workings');

      subscriptionObject = {
        name: firstName,
        lastName: lastName,
        email: email,
        mobileNumber: phoneNumber
      };

      const newSubscription = new Subscription(subscriptionObject);

      newSubscription.save((err) => {
        if (err) {

          return res.status(200).json({
            success: false,
            message: 'Failed signing up, email has already been used.',
          });

          // return done(err);
        }

        console.log('Succesfully Saved!');

        // return done(null);
        return res.status(200).json({
          success: true,
          message: 'You have successfully signed up! Pending status at the moment.',
          subscription: subscriptionObject
        });
      });




    }else {
      return res.status(200).json({
        success: false,
        message: 'Failed signing up, email has already been used.',
      });

    }


    // var results = [];
    // results = docs;
    //
    // res.json(results);
  });

});


app.listen(port, () => console.log(`Listening on port ${port}`));
