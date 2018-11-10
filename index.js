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

app.get('/users', function(req, res) {

  User.find({}, function(err, docs){

    if (err) return console.error(err);

    // console.info("Returning all items:\n");
    // console.info(docs);

    var results = [];
    results = docs;

    res.json(results);
  });

});

app.listen(port, () => console.log(`Listening on port ${port}`));
