const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Settings', settingsSchema, 'settings');