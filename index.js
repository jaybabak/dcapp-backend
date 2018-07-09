const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var mongoose = require('mongoose');
require('./models/index').connect();



const User = mongoose.model('User');

//====ROOT DIRECTORY===//


app.get('/:name', function(req, res) {

  console.log(req.params.name);

  const testUser =  {
    email: req.params.name + Math.round(Math.random()*10) + '@test.com',
    name: req.params.name + 'Robot ID: ' + Math.round(Math.random()*10),
    password: '123456'
  }

  var person = new User(testUser);

  person.save((err) => {

     if (err) return handleError(err);

     console.info('Saved:' + '\n');
     console.info(testUser);

     res.json({
       testUser
     });


  });

});

app.get('/users', function(req, res) {

  User.find({}, function(err, docs){

    if (err) return handleError(err);

    console.info("Returning all items:\n");
    console.info(docs);

    var results = [];
    results = docs;

    res.json(results);
  });



});

app.listen(port, () => console.log(`Listening on port ${port}`));
