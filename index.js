const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const passport = require('passport');

//DATABASE
const mongoose = require('mongoose');
const db = require('./models/index')
db.connect(); //make connection to Database
const User = mongoose.model('User');

//AUTHENTICATION
app.use(passport.initialize());

//TELL APP TO PARSE
app.use(bodyParser.urlencoded({ extended: false }));

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);


// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

//====ADD USER END POINT===//

app.get('/add/:name', function(req, res) {

  console.log(req.params.name);

  const testUser =  {
    email: req.params.name + Math.round(Math.random()*10) + '@test.com',
    name: req.params.name + '' + Math.round(Math.random()*10),
    password: '123456'
  }

  var Person = new User(testUser);

  Person.save((err) => {

     if (err) return console.error(err);

     console.info('Saved:' + '\n');
     console.info(testUser);

     res.json({
       testUser
     });


  });

});

//====GET ALL USERS END POINT===//

app.get('/users', function(req, res) {

  User.find({}, function(err, docs){

    if (err) return console.error(err);

    console.info("Returning all items:\n");
    console.info(docs);

    var results = [];
    results = docs;

    res.json(results);
  });



});

app.listen(port, () => console.log(`Listening on port ${port}`));
