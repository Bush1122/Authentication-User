
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/mogoauthentication', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password: String,

});

module.exports = mongoose.model('User', userSchema);
