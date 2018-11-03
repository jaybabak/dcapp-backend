var mongoose = require('mongoose');
const dbUri = 'mongodb://localhost:27017/dcapp';
// const dbUri = 'mongodb://phot0x:welcomesm14@ds217131.mlab.com:17131/dcapp';

module.exports.connect = () => {



  mongoose.connect(dbUri, { useNewUrlParser: true });

  mongoose.Promise = global.Promise;

  var db = mongoose.connection;

  db.on('error', (err) => {
    //on Error emit error type/description
    // console.error(`Mongoose connection error: ${err}`);
    console.error.bind(console, 'MongoDB connection error:')

  });

  db.once('open', function() {
    // we're connected!
    console.log('connecting to ' + dbUri);
    console.info('Connection opened succesfully!');
  });

  //Load Models
  require('./user');

}
