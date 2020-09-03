const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required!'],
    index: {
      unique: true
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
  },
  firstName: {
    type: String,
    required: [true, 'First name is required!'],
  },
  lastName: String,
});

module.exports = mongoose.model('User', userSchema, 'users');