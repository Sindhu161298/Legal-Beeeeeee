const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // only if using email/password login
  googleId: { type: String }, // optional: for Google Login
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
