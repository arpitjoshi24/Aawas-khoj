const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String, // hashed password
  phone: String,
  verificationCode: String,
  isVerified: Boolean
});

module.exports = mongoose.model('User', UserSchema);
