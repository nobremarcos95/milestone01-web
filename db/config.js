const mongoose = require('mongoose');


const conn = 'mongodb+srv://web-user:i3FXCgZtjIXViEve@web.iyhbl.mongodb.net/test?retryWrites=true&w=majority&appName=web';
const connect = mongoose.connect('mongodb://localhost:27017');

connect
  .then(() => {
    console.log('deu bom');
  })
  .catch((error) => {
    console.log('deu ruim', error);
  });

// Creating db schemas
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model('users', LoginSchema);

module.exports = collection;