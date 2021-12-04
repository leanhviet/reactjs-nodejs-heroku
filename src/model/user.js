const mongoose = require('mongoose');

const user = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  }
}, {
  collection: 'user'
});

module.exports = mongoose.model('user', user);
