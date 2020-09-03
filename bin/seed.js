const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// MongoDB
mongoose
  .connect('mongodb://localhost:27017/nodejs', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

const User = require('../app/Models/User');
const Settings = require('../app/Models/Settings');

const userData = {
  username: 'admin2',
  email: 'webmaster@node.js2',
  password: 'admin',
  firstName: 'Admin',
  lastName: 'Admin'
};

const settingsData = [{
  name: 'title2',
  type: 'String',
  value: 'NodeJS'
}];

User.create(userData, (err) => {
  if (err) return console.error(err);

  return console.log('Users data sent successfully');
});
Settings.create(settingsData, (err) => {
  if (err) return console.error(err);

  return console.log('Settings data sent successfully');
});